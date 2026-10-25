export const OPPORTUNITY_FILTER_KEYS = [
  'type',
  'locationType',
  'province',
  'status',
  'format',
  'cost',
  'category',
] as const;

export type OpportunityFilterKey = (typeof OPPORTUNITY_FILTER_KEYS)[number];

export type OpportunityFilterState = Record<OpportunityFilterKey, string[]>;

export interface OpportunityFilterOption {
  name: OpportunityFilterKey;
  label: string;
  defaultOption: string;
  options: string[];
}

export const filterOptions: OpportunityFilterOption[] = [
  {
    name: 'type',
    label: 'Opportunity Type',
    defaultOption: 'All Types',
    options: [
      'Internship',
      'Fellowship',
      'Volunteer',
      'Job',
      'Grants',
      'Scholarship',
      'Training',
      'Grant',
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
    options: ['Physical', 'Online', 'Hybrid'],
  },
  {
    name: 'cost',
    label: 'Cost',
    defaultOption: 'All Cost Types',
    options: ['Fully_Funded', 'Partially_Funded', 'Paid', 'Free'],
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

export function createEmptyOpportunityFilters(): OpportunityFilterState {
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

export function hasActiveOpportunityFilters(
  filters: OpportunityFilterState
): boolean {
  return OPPORTUNITY_FILTER_KEYS.some((key) => filters[key].length > 0);
}

export function parseOpportunityFilters(
  searchParams: URLSearchParams
): OpportunityFilterState {
  const filters = createEmptyOpportunityFilters();

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

export function serializeOpportunityFilters(
  filters: OpportunityFilterState
): URLSearchParams {
  const params = new URLSearchParams();

  for (const key of OPPORTUNITY_FILTER_KEYS) {
    const selected = filters[key];
    if (selected.length > 0) {
      params.set(key, selected.join(FILTER_VALUE_SEPARATOR));
    }
  }

  return params;
}

export interface OpportunityFilterCandidate {
  type: string;
  locationType: string;
  province: string;
  status: string;
  format: string;
  cost: string;
  category: string[];
}

// Original component compared values case-insensitively; preserved here.
function normalize(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

export function matchesOpportunityFilters<T extends OpportunityFilterCandidate>(
  opportunity: T,
  filters: OpportunityFilterState
): boolean {
  return OPPORTUNITY_FILTER_KEYS.every((key) => {
    const selected = filters[key];
    if (selected.length === 0) return true;

    switch (key) {
      case 'category':
        return selected.some((value) =>
          opportunity.category.some((c) => normalize(c) === normalize(value))
        );
      case 'type':
      case 'locationType':
      case 'province':
      case 'status':
      case 'format':
      case 'cost': {
        const fieldValue = normalize(opportunity[key]);
        return selected.some((value) => normalize(value) === fieldValue);
      }
      default:
        return true;
    }
  });
}

export function filterOpportunities<T extends OpportunityFilterCandidate>(
  opportunities: T[],
  filters: OpportunityFilterState
): T[] {
  return opportunities.filter((opportunity) =>
    matchesOpportunityFilters(opportunity, filters)
  );
}
