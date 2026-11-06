import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react';
import { business, rates } from '../../lib/site';

const serviceOptions = [
  { id: 'patios', label: 'Patio or paving' },
  { id: 'decking', label: 'Decking' },
  { id: 'turf', label: 'Turf or artificial grass' },
  { id: 'fencing', label: 'Fencing or gates' },
  { id: 'care', label: 'Garden care or clearance' },
  { id: 'makeover', label: 'Full garden makeover' },
];
const sizeOptions = ['Under 20 m²', '20 to 50 m²', '50 to 100 m²', 'Over 100 m²', 'Not sure yet'];
const timingOptions = ['As soon as possible', 'Within 3 months', 'Later this year', 'Just exploring'];
const STEPS = ['Your project', 'The details', 'Your contact details'];

interface Values {
  services: string[];
  size: string;
  timing: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { services: [], size: '', timing: '', message: '', name: '', email: '', phone: '', location: '' };

function validate(step: number, v: Values): Errors {
  const e: Errors = {};
  if (step === 0 && v.services.length === 0) e.services = 'Choose at least one type of work.';
  if (step === 1 && v.message.trim().length < 5) e.message = 'Tell us a little about what you have in mind.';
  if (step === 2) {
    if (!v.name.trim()) e.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter an email address like name@example.com.';
    if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a phone number with at least 10 digits.';
    if (!v.location.trim()) e.location = 'Enter your town or postcode so we can check we cover it.';
  }
  return e;
}

export default function QuoteForm() {
  const id = useId();
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const job = params.get('job');
    const area = Number(params.get('area'));
    const updates: Partial<Values> = {};
    if (service && serviceOptions.some((o) => o.id === service)) updates.services = [service];
    const rate = rates.find((r) => r.id === job);
    if (rate) {
      const map: Record<string, string> = { paving: 'patios', deck: 'decking', composite: 'decking', turf: 'turf', artificial: 'turf' };
      updates.services = [map[rate.id]];
      if (area > 0) {
        updates.size = area < 20 ? sizeOptions[0] : area < 50 ? sizeOptions[1] : area <= 100 ? sizeOptions[2] : sizeOptions[3];
        updates.message = `From the cost estimator: about ${area} m² of ${rate.label.toLowerCase()}.`;
      }
    }
    if (Object.keys(updates).length) setValues((v) => ({ ...v, ...updates }));
  }, []);

  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
    moved.current = true;
  }, [step, submitted]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const toggleService = (service: string) =>
    set('services', values.services.includes(service) ? values.services.filter((s) => s !== service) : [...values.services, service]);

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => setFiles([...(e.target.files ?? [])].slice(0, 5).map((f) => f.name));

  const next = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const found = validate(step, values);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const fieldProps = (key: keyof Values) => ({
    id: `${id}-${key}`,
    name: key,
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-error` : undefined,
  });
  const errorText = (key: keyof Values) =>
    errors[key] ? (
      <p id={`${id}-${key}-error`} className="field-error">
        {errors[key]}
      </p>
    ) : null;
  const errorList = Object.entries(errors).filter(([, v]) => v);

  if (submitted) {
    return (
      <div>
        <p className="spec text-accent">Preview mode</p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-title">
          Thanks {values.name.split(' ')[0]}. This preview hasn't sent your enquiry.
        </h2>
        <p className="mt-4">This form shows how the quote journey will work. Nothing has been stored or passed on. To speak to {business.short} today, please call or use WhatsApp.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`tel:${business.phones[0].tel}`} className="btn btn-primary">
            Call {business.phones[0].display}
          </a>
          <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Message on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={next} noValidate>
      <ol className="grid grid-cols-3 gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined}>
            <span className={`block h-1.5 ${i <= step ? 'bg-accent' : 'bg-rule'}`} />
            <span className={`spec mt-2 block ${i === step ? 'text-ink' : 'text-muted'}`}>
              <span className="sm:hidden">{i + 1}</span>
              <span className="hidden sm:inline">
                {i + 1}. {s}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 border-2 border-danger p-4">
          <p className="font-semibold">Please check the following:</p>
          <ul className="mt-2 grid gap-1">
            {errorList.map(([key, message]) => (
              <li key={key}>
                <a className="underline underline-offset-4" href={`#${id}-${key}`}>
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={reduced ? false : { x: 16 }} animate={{ x: 0 }} exit={reduced ? undefined : { x: -16 }} transition={{ duration: 0.18 }}>
          <h2 ref={headingRef} tabIndex={-1} className="mt-7 text-title">
            {['What can we help with?', 'Tell us about the job', 'How can we reach you?'][step]}
          </h2>

          {step === 0 && (
            <fieldset className="mt-5" id={`${id}-services`} aria-describedby={errors.services ? `${id}-services-error` : undefined}>
              <legend className="field-label">Choose all that apply</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {serviceOptions.map((o) => (
                  <label key={o.id} className="choice">
                    <input type="checkbox" checked={values.services.includes(o.id)} onChange={() => toggleService(o.id)} />
                    {o.label}
                  </label>
                ))}
              </div>
              {errorText('services')}
            </fieldset>
          )}

          {step === 1 && (
            <div className="mt-5 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-size`} className="field-label">
                    Rough size <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <select {...fieldProps('size')} className="field" value={values.size} onChange={(e) => set('size', e.target.value)}>
                    <option value="">Choose a size</option>
                    {sizeOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${id}-timing`} className="field-label">
                    When would you like it done? <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <select {...fieldProps('timing')} className="field" value={values.timing} onChange={(e) => set('timing', e.target.value)}>
                    <option value="">Choose a time</option>
                    {timingOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor={`${id}-message`} className="field-label">
                  What do you have in mind?
                </label>
                <textarea {...fieldProps('message')} className="field min-h-36" value={values.message} onChange={(e) => set('message', e.target.value)} />
                {errorText('message')}
              </div>
              <div>
                <label htmlFor={`${id}-photos`} className="field-label">
                  Photos of the space <span className="font-normal text-muted">(optional, up to 5)</span>
                </label>
                <input id={`${id}-photos`} type="file" accept="image/*,.pdf" multiple className="field py-2.5!" onChange={onFiles} />
                {files.length > 0 && (
                  <ul className="mt-2 text-sm text-muted">
                    {files.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="field-label">
                  Your name
                </label>
                <input {...fieldProps('name')} className="field" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
                {errorText('name')}
              </div>
              <div>
                <label htmlFor={`${id}-location`} className="field-label">
                  Town or postcode
                </label>
                <input {...fieldProps('location')} className="field" autoComplete="postal-code" value={values.location} onChange={(e) => set('location', e.target.value)} />
                {errorText('location')}
              </div>
              <div>
                <label htmlFor={`${id}-phone`} className="field-label">
                  Phone
                </label>
                <input {...fieldProps('phone')} type="tel" className="field" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} />
                {errorText('phone')}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="field-label">
                  Email
                </label>
                <input {...fieldProps('email')} type="email" className="field" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} />
                {errorText('email')}
              </div>
              <p className="text-sm text-muted sm:col-span-2">
                We only use these details to reply about your project. See our{' '}
                <a href="/privacy" className="underline underline-offset-4">
                  privacy notice
                </a>
                .
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex flex-wrap gap-3">
        {step > 0 && (
          <button type="button" className="btn btn-ghost" onClick={() => { setErrors({}); setStep(step - 1); }}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {step === STEPS.length - 1 ? 'Request my quote' : 'Continue'}
        </button>
      </div>
    </form>
  );
}
