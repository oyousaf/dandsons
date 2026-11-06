export const PREVIEW = true; // Drives noindex and the non-sending quote form until the owner approves.

export const business = {
  name: 'Daniel & Son Landscaping',
  short: 'Daniel & Son',
  phones: [
    { display: '07936 620911', tel: '+447936620911' },
    { display: '07555 774127', tel: '+447555774127' },
  ],
  whatsapp: 'https://api.whatsapp.com/send?phone=447936620911',
  email: 'info@danielandsonlandscape.co.uk',
  address: { street: '222 West End', village: 'Elstow', town: 'Bedford', region: 'Bedfordshire' },
  hours: 'Monday to Saturday, 8am to 6pm',
  rating: { value: '4.8', count: 137, url: 'https://g.page/r/CYFE4QYMCpjQEBM/review' },
  radiusMiles: 15,
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/danielandsonlandscaping/' },
    { label: 'Instagram', href: 'https://www.instagram.com/danielandsonlandscape/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCsC2oe8isdXtzIZmul0qZTQ' },
  ],
};

export interface ChildService {
  label: string;
  href: string;
  blurb: string;
}

export interface ServiceGroup {
  id: string;
  label: string;
  href: string;
  photo: string;
  alt: string;
  line: string;
  materials: string[];
  children: ChildService[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'patios',
    label: 'Patios',
    href: '/patio-services-bedford',
    photo: 'flag-mint-fossil.jpg',
    alt: 'Mint Fossil sandstone patio with an artificial lawn beyond',
    line: 'New patios in porcelain, sandstone and limestone, plus the care that keeps old ones looking right.',
    materials: ['Sandstone', 'Porcelain', 'Limestone'],
    children: [
      { label: 'Patio laying', href: '/patio-services-bedford/patio-laying-bedford', blurb: 'Porcelain, sandstone, limestone and concrete, on a properly prepared base.' },
      { label: 'Refurbishment and re-pointing', href: '/patio-services-bedford/patio-refurbish-bedford', blurb: 'Renew tired joints and bring back stability and a clean finish.' },
      { label: 'Pressure washing', href: '/patio-services-bedford/pressure-washing-bedford', blurb: 'Deep cleaning that lifts moss, algae, dirt and stains.' },
      { label: 'Pergola installation', href: '/patio-services-bedford/bedford-pergola-installation', blurb: 'Timber and metal pergolas that turn a patio into an outdoor room.' },
      { label: 'Garden beds', href: '/patio-services-bedford/bedford-flower-beds-railway-sleepers', blurb: 'Raised beds in sanded railway sleepers, coordinated with your patio.' },
    ],
  },
  {
    id: 'decking',
    label: 'Decking',
    href: '/decking-services-bedford',
    photo: 'flag-hardwood.jpg',
    alt: 'Oiled jatoba hardwood decking outside a set of glazed doors',
    line: 'Composite and timber decks, including hardwoods such as jatoba.',
    materials: ['Composite', 'Timber & cedar'],
    children: [
      { label: 'Timber decking', href: '/decking-services-bedford/timber-decking-bedford', blurb: 'Softwood and hardwood decks, built on a solid frame.' },
      { label: 'Composite decking', href: '/decking-services-bedford/composite-decking-bedford', blurb: 'Low-maintenance boards that will not need painting or sealing.' },
    ],
  },
  {
    id: 'turf',
    label: 'Turf',
    href: '/turf-services-bedford',
    photo: 'flag-lawn.jpg',
    alt: 'Freshly striped lawn beside a porcelain path in a Kempston garden',
    line: 'Fresh lawns, artificial grass and fixes for waterlogged ground.',
    materials: ['Natural lawn', 'Artificial grass'],
    children: [
      { label: 'Real turf', href: '/turf-services-bedford/lawn-laying-bedford', blurb: 'Ground prepared, levelled and laid with fresh turf.' },
      { label: 'Artificial grass', href: '/turf-services-bedford/artificial-grass-bedford', blurb: 'Child and pet-friendly lawns on a free-draining base.' },
      { label: 'Lawn drainage', href: '/turf-services-bedford/waterlogged-lawn-drainage', blurb: 'Practical solutions for soggy, waterlogged gardens.' },
    ],
  },
  {
    id: 'fencing',
    label: 'Fencing',
    href: '/bedford-fence-contractor',
    photo: 'cedar-fenceng-installation.jpg',
    alt: 'New horizontal-slat cedar fence along a block-paved driveway',
    line: 'Closeboard, cedar and picket fencing, with timber and composite gates.',
    materials: ['Fencing & gates'],
    children: [
      { label: 'Timber fences', href: '/bedford-fence-contractor/timber-fences-bedford', blurb: 'Featheredge, closeboard and overlap panels on secure posts.' },
      { label: 'Picket fences', href: '/bedford-fence-contractor/picket-fences-install-bedford', blurb: 'A classic, welcoming finish for front gardens.' },
      { label: 'Garden gates', href: '/bedford-fence-contractor/wooden-gate-install-bedford', blurb: 'Side, garden and driveway gates built to fit the opening.' },
    ],
  },
  {
    id: 'care',
    label: 'Garden care',
    href: '/bedford-garden-maintenance',
    photo: 'flag-redesign.jpg',
    alt: 'Well-kept garden with a shaped lawn, sandstone patio and full borders',
    line: 'One-off clearances and regular upkeep to keep a garden under control.',
    materials: ['Natural lawn', 'Raised beds'],
    children: [],
  },
];

export const primaryNav = [
  { label: 'Our work', href: '/our-works' },
  { label: 'Cost estimator', href: '/garden-cost-calculator' },
  { label: 'Areas', href: '/areas-covered-bedford' },
  { label: 'Guides', href: '/blog-list' },
  { label: 'About', href: '/About-Us' },
];

/** Guide rates published on the business's calculator: labour, materials and waste per m². */
export const rates = [
  { id: 'paving', label: 'Sandstone or porcelain paving', short: 'Paving', rate: 180, service: 'Patio' },
  { id: 'composite', label: 'Composite decking', short: 'Composite', rate: 200, service: 'Decking' },
  { id: 'deck', label: 'Timber decking', short: 'Timber deck', rate: 150, service: 'Decking' },
  { id: 'artificial', label: 'Artificial grass', short: 'Artificial', rate: 125, service: 'Turf or artificial grass' },
  { id: 'turf', label: 'Natural turf', short: 'Natural turf', rate: 28, service: 'Turf or artificial grass' },
] as const;

export const rateByPath: Record<string, number> = {
  '/patio-services-bedford/patio-laying-bedford': 180,
  '/decking-services-bedford/timber-decking-bedford': 150,
  '/decking-services-bedford/composite-decking-bedford': 200,
  '/turf-services-bedford/lawn-laying-bedford': 28,
  '/turf-services-bedford/artificial-grass-bedford': 125,
};

export const relatedMaterials: Record<string, string[]> = {
  '/patio-services-bedford': ['Sandstone', 'Porcelain'],
  '/patio-services-bedford/patio-laying-bedford': ['Porcelain', 'Sandstone'],
  '/patio-services-bedford/patio-refurbish-bedford': ['Sandstone'],
  '/patio-services-bedford/pressure-washing-bedford': ['Porcelain'],
  '/patio-services-bedford/bedford-pergola-installation': ['Pergolas'],
  '/patio-services-bedford/bedford-flower-beds-railway-sleepers': ['Raised beds', 'Railway sleepers'],
  '/decking-services-bedford': ['Composite', 'Timber & cedar'],
  '/decking-services-bedford/timber-decking-bedford': ['Timber & cedar'],
  '/decking-services-bedford/composite-decking-bedford': ['Composite'],
  '/turf-services-bedford': ['Natural lawn', 'Artificial grass'],
  '/turf-services-bedford/lawn-laying-bedford': ['Natural lawn'],
  '/turf-services-bedford/artificial-grass-bedford': ['Artificial grass'],
  '/turf-services-bedford/waterlogged-lawn-drainage': ['Natural lawn'],
  '/bedford-fence-contractor': ['Fencing & gates'],
  '/bedford-fence-contractor/timber-fences-bedford': ['Fencing & gates'],
  '/bedford-fence-contractor/picket-fences-install-bedford': ['Fencing & gates'],
  '/bedford-fence-contractor/wooden-gate-install-bedford': ['Fencing & gates'],
  '/bedford-garden-maintenance': ['Natural lawn', 'Raised beds'],
};

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
