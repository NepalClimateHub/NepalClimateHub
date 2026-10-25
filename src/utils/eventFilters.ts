export const EVENT_FILTER_KEYS = [
  'type',
  'locationType',
  'province',
  'status',
  'format',
  'cost',
  'category',
] as const;

export type EventFilterKey = (typeof EVENT_FILTER_KEYS)[number];

export type EventFilterState = Record<EventFilterKey, string[]>;

export interface EventFilterOption {
  name: EventFilterKey;
  label: string;
  defaultOption: string;
  options: string[];
}

export const filterOptions: EventFilterOption[] = [
  {
    name: 'type',
    label: 'Event Type',
    defaultOption: 'All Types',
    options: [
      'Conference',
      'Side Event',
      'Seminar',
      'Summit',
      'Symposium',
      'Webinar',
      'Workshop',
      'March',
      'Event',
    ],
  },
  {
    name: 'locationType',
    label: 'Location',
    defaultOption: 'All Locations',
    options: ['National', 'International'],
  },
  {
    name: 'province',
    label: 'Province',
    defaultOption: 'All Provinces',
    options: [
      'Koshi',
      'Madhesh',
      'Bagmati',
      'Gandaki',
      'Lumbini',
      'Karnali',
      'Sudurpaschim',
      'All 7 provinces',
    ],
  },
  {
    name: 'status',
    label: 'Status',
    defaultOption: 'All Status',
    options: ['Open', 'Upcoming', 'Closed'],
  },
  {
    name: 'format',
    label: 'Format',
    defaultOption: 'All Formats',
    options: ['In-person', 'Virtual', 'Hybrid'],
  },
  {
    name: 'cost',
    label: 'Cost',
    defaultOption: 'All Cost Types',
    options: [
      'Fully Funded',
      'Partially Funded',
      'Paid',
      'Free',
      'Invite only',
    ],
  },
  {
    name: 'category',
    label: 'Category',
    defaultOption: 'All Categories',
    options: [
      'Climate Mitigation',
      'Climate Adaptation',
      'Climate Activism & Advocacy',
      'Climate Justice',
      'Social Equity',
      'Gender and Climate',
      'Youth Empowerment',
      'Climate Litigation',
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
      'Disaster Risk Management',
      'Community Resilience',
      'Climate Finance',
      'Carbon Markets',
      'Loss & Damage',
      'Climate Technology',
      'Digital Solutions',
      'Climate Policy',
      'Climate Diplomacy',
    ],
  },
];

// `,` appears in "Food, Water & Agriculture", so it can't be the separator.
const FILTER_VALUE_SEPARATOR = '|';

export function createEmptyEventFilters(): EventFilterState {
  return {
    type: [],
    locationType: [],
    province: [],
    status: [],
    format: [],
    cost: [],
    category: [],
  };
}

export function hasActiveEventFilters(filters: EventFilterState): boolean {
  return EVENT_FILTER_KEYS.some((key) => filters[key].length > 0);
}

export function parseEventFilters(
  searchParams: URLSearchParams
): EventFilterState {
  const filters = createEmptyEventFilters();

  for (const { name, options } of filterOptions) {
    const raw = searchParams.get(name);
    if (!raw) continue;

    const validValues = new Set(options);
    filters[name] = raw
      .split(FILTER_VALUE_SEPARATOR)
      .map((value) => value.trim())
      .filter((value) => validValues.has(value));
  }

  return filters;
}

export function serializeEventFilters(
  filters: EventFilterState
): URLSearchParams {
  const params = new URLSearchParams();

  for (const key of EVENT_FILTER_KEYS) {
    const selected = filters[key];
    if (selected.length > 0) {
      params.set(key, selected.join(FILTER_VALUE_SEPARATOR));
    }
  }

  return params;
}

export interface EventFilterCandidate {
  type: string;
  locationType: string;
  status: string;
  format: string;
  cost: string;
  category: string[];
  address?: { state?: string | null } | null;
}

function normalize(value: string | null | undefined): string {
  return (value ?? '').trim();
}

export function matchesEventFilters<T extends EventFilterCandidate>(
  event: T,
  filters: EventFilterState
): boolean {
  return EVENT_FILTER_KEYS.every((key) => {
    const selected = filters[key];
    if (selected.length === 0) return true;

    switch (key) {
      case 'category':
        return selected.some((value) =>
          event.category?.some((c) => normalize(c) === normalize(value))
        );
      case 'province': {
        const state = normalize(event.address?.state);
        return selected.some((value) => normalize(value) === state);
      }
      case 'cost': {
        const cost = normalize(event.cost);
        return selected.some(
          (value) =>
            cost === normalize(value) || (cost === '' && value === 'Free')
        );
      }
      case 'type':
      case 'locationType':
      case 'status':
      case 'format': {
        const fieldValue = normalize(event[key]);
        return selected.some((value) => fieldValue === normalize(value));
      }
      default:
        return true;
    }
  });
}

export function filterEvents<T extends EventFilterCandidate>(
  events: T[],
  filters: EventFilterState
): T[] {
  return events.filter((event) => matchesEventFilters(event, filters));
}
