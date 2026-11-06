import type { ImageMetadata } from 'astro';
import blogsJson from '../data/blogs.json';
import projectsJson from '../data/projects.json';
import reviewsJson from '../data/reviews.json';
import servicesJson from '../data/services.json';

export type Block =
  | { t: 'p'; x: string }
  | { t: 'h3' | 'h4' | 'h5' | 'h2'; x: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] };

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  path: string;
  parent: string | null;
  title: string;
  description: string;
  h1: string;
  hero: string | null;
  heroAlt: string;
  intro: string[];
  extra: Block[];
  sections: { heading: string; blocks: Block[] }[];
  faqs: Faq[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  sort: number;
  story: string[];
  before: string;
  after: string;
  materials: string[];
  place: string | null;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  sort: number;
  hero: string;
  blocks: Block[];
  faqs: Faq[];
}

export const services = servicesJson as unknown as Record<string, Service>;
export const projects = projectsJson as Project[];
export const posts = blogsJson as unknown as Post[];
export const reviews = reviewsJson as { name: string; text: string }[];

export const projectBySlug = (needle: string) => {
  const found = projects.find((p) => p.slug.startsWith(needle));
  if (!found) throw new Error(`No project matching ${needle}`);
  return found;
};

export const projectsWith = (materials: string[], limit = 3, excludeSlug?: string) =>
  projects.filter((p) => p.slug !== excludeSlug && p.materials.some((m) => materials.includes(m))).slice(0, limit);

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*', { eager: true });
const photos = new Map(Object.entries(files).map(([path, mod]) => [path.split('/').pop() as string, mod.default]));

export const photo = (name: string): ImageMetadata => {
  const found = photos.get(name);
  if (!found) throw new Error(`Missing photo: ${name}`);
  return found;
};
