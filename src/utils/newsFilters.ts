export const NEWS_FILTER_KEYS = ['year', 'mode', 'category'] as const;

export type NewsFilterKey = (typeof NEWS_FILTER_KEYS)[number];

export type NewsFilterState = Record<NewsFilterKey, string>;

export const YEAR_OPTIONS = ['2025', '2024', '2023'] as const;

export const MODE_OPTIONS = ['National', 'International'] as const;

export const CATEGORY_OPTIONS = [
  'Climate Justice',
  'Social Equity',
  'Gender and Climate',
  'Youth Empowerment',
  'Climate Litigation & Legal Action',
  'Climate Activism & Advocacy',
  'Research & Education',
  'Science Communication',
  'Media Communication',
  'Indigenous Knowledge',
  'Climate and Mental Health',
  'Ecosystem Conservation',
  'Wildlife & Biodiversity',
  'Renewable Energy',
  'Environment',
  'Sustainability',
  'Pollution & Waste Management',
  'Circular Economy',
  'Transportation & Mobility',
  'Nature-Based Solutions',
  'Carbon Sequestration',
  'Food, Water & Agriculture',
  'Climate Adaptation & Mitigation',
  'Disaster Risk Management',
  'Community Resilience',
  'Climate Finance',
  'Carbon Markets',
  'Loss & Damage',
  'Climate Technology',
  'Digital Solutions',
] as const;

const VALID_YEARS = new Set<string>(YEAR_OPTIONS);
const VALID_MODES = new Set<string>(MODE_OPTIONS);
const VALID_CATEGORIES = new Set<string>(CATEGORY_OPTIONS);

export function createEmptyNewsFilters(): NewsFilterState {
  return { year: '', mode: '', category: '' };
}

export function hasActiveNewsFilters(filters: NewsFilterState): boolean {
  return NEWS_FILTER_KEYS.some((key) => filters[key] !== '');
}

export function parseNewsFilters(
  searchParams: URLSearchParams
): NewsFilterState {
  const filters = createEmptyNewsFilters();

  const year = searchParams.get('year');
  if (year && VALID_YEARS.has(year)) filters.year = year;

  const mode = searchParams.get('mode');
  if (mode && VALID_MODES.has(mode)) filters.mode = mode;

  const category = searchParams.get('category');
  if (category && VALID_CATEGORIES.has(category)) filters.category = category;

  return filters;
}

export function serializeNewsFilters(
  filters: NewsFilterState
): URLSearchParams {
  const params = new URLSearchParams();

  for (const key of NEWS_FILTER_KEYS) {
    const value = filters[key];
    if (value) params.set(key, value);
  }

  return params;
}

export interface NewsFilterCandidate {
  mode: string;
  publishedYear: string;
  category: string[];
}

function normalize(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

export function matchesNewsFilters<T extends NewsFilterCandidate>(
  item: T,
  filters: NewsFilterState
): boolean {
  const matchesYear =
    filters.year === '' ||
    String(new Date(item.publishedYear).getFullYear()) === filters.year;

  const matchesMode =
    filters.mode === '' || normalize(item.mode) === normalize(filters.mode);

  const matchesCategory =
    filters.category === '' ||
    item.category?.some(
      (cat) => normalize(cat) === normalize(filters.category)
    );

  return matchesYear && matchesMode && matchesCategory;
}

export function filterNews<T extends NewsFilterCandidate>(
  items: T[],
  filters: NewsFilterState
): T[] {
  return items.filter((item) => matchesNewsFilters(item, filters));
}
