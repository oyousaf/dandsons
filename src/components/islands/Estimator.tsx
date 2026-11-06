import { animate, motion, useReducedMotion } from 'motion/react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { rates } from '../../lib/site';

const gbp = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const parse = (s: string) => {
  const n = Number.parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function AnimatedTotal({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.textContent = gbp(value);
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.45,
      ease: 'easeOut',
      onUpdate: (v) => {
        node.textContent = gbp(v);
      },
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reduced]);

  return (
    <span ref={ref} aria-hidden="true">
      {gbp(value)}
    </span>
  );
}

export default function Estimator() {
  const id = useId();
  const [job, setJob] = useState<(typeof rates)[number]['id']>('paving');
  const [length, setLength] = useState('6');
  const [width, setWidth] = useState('5');
  const area = useMemo(() => parse(length) * parse(width), [length, width]);
  const selected = rates.find((r) => r.id === job) ?? rates[0];
  const total = area * selected.rate;
  const highest = Math.max(...rates.map((r) => r.rate));
  const reduced = useReducedMotion();
  const quoteHref = `/bedford-garden-quote?job=${selected.id}&area=${Math.round(area)}`;

  return (
    <div className="laid lg:grid-cols-12">
      <form className="flag p-5 sm:p-8 lg:col-span-5" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="text-title font-display">What are you planning?</legend>
          <div className="mt-4 grid gap-2">
            {rates.map((r) => (
              <label key={r.id} className="choice justify-between">
                <span className="flex items-center gap-3">
                  <input type="radio" name={`${id}-job`} checked={job === r.id} onChange={() => setJob(r.id)} />
                  {r.label}
                </span>
                <span className="spec shrink-0 text-muted">£{r.rate}/m²</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-7">
          <legend className="text-title font-display">How big is it?</legend>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-length`} className="field-label">
                Length (metres)
              </label>
              <input id={`${id}-length`} className="field" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value.replace(/[^0-9.]/g, ''))} />
            </div>
            <div>
              <label htmlFor={`${id}-width`} className="field-label">
                Width (metres)
              </label>
              <input id={`${id}-width`} className="field" inputMode="decimal" value={width} onChange={(e) => setWidth(e.target.value.replace(/[^0-9.]/g, ''))} />
            </div>
          </div>
        </fieldset>
      </form>

      <div className="flag on-band flex flex-col bg-band! p-5 text-on-band sm:p-8 lg:col-span-7">
        <p className="spec text-on-band">
          Guide price for {area ? `${Number(area.toFixed(1))} m²` : 'your area'} of {selected.short.toLowerCase()}
        </p>
        <p className="mt-3 font-display text-hero">
          <span className="text-title align-middle">from </span>
          <AnimatedTotal value={total} />
          <span className="sr-only" aria-live="polite">
            {gbp(total)}
          </span>
        </p>
        <p className="mt-3 max-w-xl text-on-band/90">Includes labour, materials and waste disposal at our starting rate. This is a guide, not a quote.</p>

        <h2 className="mt-8 spec font-mono! text-on-band">The same area in other materials</h2>
        <ul className="mt-3 grid gap-3">
          {rates.map((r) => (
            <li key={r.id}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={r.id === job ? 'font-semibold' : ''}>{r.short}</span>
                <span className="font-mono text-sm">{gbp(area * r.rate)}</span>
              </div>
              <div className="mt-1 h-2 bg-on-band/15" aria-hidden="true">
                <motion.div className={r.id === job ? 'h-full bg-on-band' : 'h-full bg-on-band/50'} initial={false} animate={{ width: `${(r.rate / highest) * 100}%` }} transition={reduced ? { duration: 0 } : { duration: 0.4 }} />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
          <a href={quoteHref} className="btn btn-solid">
            Turn this into a quote
          </a>
          <a href="/our-works" className="btn btn-outline">
            See finished projects
          </a>
        </div>
      </div>
    </div>
  );
}
