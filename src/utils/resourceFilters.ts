export const RESOURCE_FILTER_KEYS = ['type', 'level'] as const;

export type ResourceFilterKey = (typeof RESOURCE_FILTER_KEYS)[number];

export interface ResourceFilterState {
  type: string[];
  level: string[];
}

export interface ResourceFilterOptionItem {
  value: string;
  label: string;
}

export interface ResourceFilterOption {
  name: ResourceFilterKey;
  label: string;
  defaultOption: string;
  options: ResourceFilterOptionItem[];
  inputType: 'radio' | 'checkbox';
}

export const filterOptions: ResourceFilterOption[] = [
  {
    name: 'type',
    label: 'Resource Type',
    defaultOption: 'All Types',
    options: [
      { value: 'DOCUMENTARY', label: 'Documentary' },
      { value: 'PODCASTS_AND_TELEVISION', label: 'Podcasts And Television' },
      { value: 'COURSES', label: 'Courses' },
      { value: 'PLANS_AND_POLICIES', label: 'Plans And Policies' },
      { value: 'DATA_RESOURCES', label: 'Data Resources' },
      { value: 'PLATFORMS', label: 'Platforms' },
      { value: 'RESEARCH_ARTICLES', label: 'Research Articles' },
      { value: 'THESES_&_DISSERTATIONS', label: 'Theses And Dissertations' },
      { value: 'CASE_STUDIES', label: 'Case Studies' },
      { value: 'REPORTS', label: 'Reports' },
      { value: 'TOOLKITS_AND_GUIDES', label: 'Toolkits And Guides' },
    ],
    inputType: 'radio',
  },
  {
    name: 'level',
    label: 'Level',
    defaultOption: 'All Levels',
    options: [
      { value: 'INTERNATIONAL', label: 'International' },
      { value: 'REGIONAL', label: 'Regional' },
      { value: 'NATIONAL', label: 'National' },
      { value: 'PROVINCIAL', label: 'Provincial' },
      { value: 'LOCAL', label: 'Local' },
    ],
    inputType: 'checkbox',
  },
];

// No resource filter value contains `,`, so it's a safe separator here.
const FILTER_VALUE_SEPARATOR = ',';

export function createEmptyResourceFilters(): ResourceFilterState {
  return { type: [], level: [] };
}

export function hasActiveResourceFilters(
  filters: ResourceFilterState
): boolean {
  return filters.type.length > 0 || filters.level.length > 0;
}

export function parseResourceFilters(
  searchParams: URLSearchParams
): ResourceFilterState {
  const filters = createEmptyResourceFilters();

  for (const { name, options } of filterOptions) {
    const raw = searchParams.get(name);
    if (!raw) continue;

    const validValues = new Set(options.map((option) => option.value));
    filters[name] = raw
      .split(FILTER_VALUE_SEPARATOR)
      .map((value) => value.trim())
      .filter((value) => validValues.has(value));
  }

  return filters;
}

export function serializeResourceFilters(
  filters: ResourceFilterState
): URLSearchParams {
  const params = new URLSearchParams();

  for (const { name } of filterOptions) {
    const selected = filters[name];
    if (selected.length > 0) {
      params.set(name, selected.join(FILTER_VALUE_SEPARATOR));
    }
  }

  return params;
}

export function getLabelForValue(
  name: ResourceFilterKey,
  value: string
): string {
  const filterOption = filterOptions.find((option) => option.name === name);
  const option = filterOption?.options.find((opt) => opt.value === value);
  return option ? option.label : value;
}

export interface ResourceFilterCandidate {
  type: string;
  level?: string | null;
}

function normalize(value: string | null | undefined): string {
  return (value ?? '').trim();
}

export function matchesResourceFilters<T extends ResourceFilterCandidate>(
  resource: T,
  filters: ResourceFilterState
): boolean {
  if (filters.type.length > 0) {
    const value = normalize(resource.type);
    if (!filters.type.some((selected) => normalize(selected) === value)) {
      return false;
    }
  }

  if (filters.level.length > 0) {
    const value = normalize(resource.level);
    if (!filters.level.some((selected) => normalize(selected) === value)) {
      return false;
    }
  }

  return true;
}

export function filterResources<T extends ResourceFilterCandidate>(
  resources: T[],
  filters: ResourceFilterState
): T[] {
  return resources.filter((resource) =>
    matchesResourceFilters(resource, filters)
  );
}
