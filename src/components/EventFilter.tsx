import type React from 'react';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '../styles/components/EventFilter.module.css';
import { CardContainer } from './CardContainer';
import filterIcon from '../assets/icons/RightIcon.png';

interface Event {
  id: string | number;
  title: string;
  type: string;
  locationType: string;
  status: string;
  format: string;
  cost: string;
  category: string[];
  address: {
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
  };
}

interface Props {
  events: Event[];
}

const filterOptions = [
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

const EventFilter: React.FC<Props> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filters, setFilters] = useState({
    type: [] as string[],
    locationType: [] as string[],
    province: [] as string[],
    status: [] as string[],
    format: [] as string[],
    cost: [] as string[],
    category: [] as string[],
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    type: true,
    locationType: false,
    province: false,
    status: false,
    format: false,
    cost: false,
    category: false,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleExpanded = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSelection = (name: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = new Set(prev[name]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      return { ...prev, [name]: Array.from(current) };
    });
  };

  const getCountsFor = (name: string, options: string[]) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => {
      counts[opt] = 0;
    });
    events.forEach((event) => {
      if (name === 'category') {
        options.forEach((opt) => {
          if (event.category?.some((c) => c.trim() === opt.trim()))
            counts[opt]++;
        });
      } else if (name === 'province') {
        const val = event.address?.state?.trim();
        if (val && counts[val] !== undefined) counts[val]++;
      } else {
        const val = (event as any)[name]?.trim?.();
        if (val && counts[val] !== undefined) counts[val]++;
      }
    });
    return counts;
  };

  useEffect(() => {
    let result = events;

    (Object.keys(filters) as (keyof typeof filters)[]).forEach((key) => {
      const selected = filters[key];
      if (selected.length > 0) {
        if (key === 'category') {
          result = result.filter((event) =>
            selected.some((val) =>
              event.category?.some((c) => c.trim() === val.trim())
            )
          );
        } else if (key === 'province') {
          result = result.filter((event) => {
            const val = event.address?.state?.trim() || '';
            return selected.some((s) => s.trim() === val);
          });
        } else if (key === 'cost') {
          result = result.filter((event) => {
            const eventCost = event.cost ? event.cost.trim() : '';
            return selected.some(
              (s) =>
                eventCost === s.trim() || (eventCost === '' && s === 'Free')
            );
          });
        } else {
          result = result.filter((event) => {
            const val = ((event as any)[key] as string) || '';
            return selected.some((s) => val.trim() === s.trim());
          });
        }
      }
    });

    setFilteredEvents(result);
  }, [filters, events]);

  const resetFilters = () => {
    setFilters({
      type: [],
      locationType: [],
      province: [],
      status: [],
      format: [],
      cost: [],
      category: [],
    });
  };

  return (
    <div className={styles.eventFilterWrapper}>
      {/* Mobile Add Filter Button and Total Count */}
      <div className={styles.mobileFilterHeader}>
        <button
          type="button"
          className={styles.addFilterButton}
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          aria-label="Toggle filters"
        >
          <span>Add Filter</span>
          <img
            src={filterIcon.src}
            alt="Filter icon"
            className={styles.filterIcon}
          />
        </button>
        <div className={styles.totalCount}>
          Total: {filteredEvents.length}
        </div>
      </div>

      <aside
        className={`${styles.sidebar} ${
          isMobileFilterOpen ? styles.mobileFilterOpen : styles.mobileFilterClosed
        }`}
        aria-label="Event filters"
      >
        <div className={styles.sidebarInner}>
          <div className={styles.filterContainer}>
            {filterOptions.map(({ name, label, options }) => {
              const counts = getCountsFor(name, options);
              return (
                <div className={styles.filterGroup} key={name}>
                  <button
                    type="button"
                    className={styles.groupHeader}
                    onClick={() => toggleExpanded(name)}
                    aria-expanded={expanded[name] ? 'true' : 'false'}
                    aria-controls={`${name}-options`}
                  >
                    <span>{label}</span>
                    <span
                      className={`${styles.chevron} ${
                        expanded[name] ? styles.chevronOpen : ''
                      }`}
                    >
                      <FaChevronDown />
                    </span>
                  </button>
                  <ul
                    id={`${name}-options`}
                    className={`${styles.checkboxList} ${
                      expanded[name] ? '' : styles.collapsed
                    }`}
                  >
                    {options.map((option) => {
                      const checked =
                        filters[name as keyof typeof filters].includes(option);
                      return (
                        <li key={option} className={styles.checkboxItem}>
                          <label className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={checked}
                              onChange={() =>
                                toggleSelection(
                                  name as keyof typeof filters,
                                  option
                                )
                              }
                            />
                            <span className={styles.checkboxText}>
                              {option}
                            </span>
                            <span className={styles.countBadge}>
                              {counts[option] ?? 0}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* <button onClick={resetFilters} className={styles.resetButton}>
            Reset Filters
          </button> */}
        </div>
      </aside>

      <section className={styles.results}>
        {/* Selected filter chips */}
        <div className={styles.selectedChipsRow}>
          {(Object.keys(filters) as (keyof typeof filters)[]).flatMap((key) =>
            filters[key].map((value) => (
              <button
                key={`${String(key)}-${value}`}
                type="button"
                className={styles.chip}
                onClick={() => toggleSelection(key, value)}
              >
                <span className={styles.chipText}>{value}</span>
                <span className={styles.chipClose}>×</span>
              </button>
            ))
          )}
          {(Object.keys(filters) as (keyof typeof filters)[]).some(
            (k) => filters[k].length > 0
          ) && (
            <button
              type="button"
              className={styles.chipDanger}
              onClick={resetFilters}
            >
              <span className={styles.chipText}>Close</span>
              <span className={styles.chipClose}>×</span>
            </button>
          )}
        </div>
        {filteredEvents.length === 0 ? (
          <p className={styles.noResults}>No events found.</p>
        ) : (
          <CardContainer
            cardsArray={filteredEvents}
            dataType="events"
            initialCardCount={8}
          />
        )}
      </section>
    </div>
  );
};

export default EventFilter;
