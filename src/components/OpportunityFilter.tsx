import type React from 'react';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '../styles/components/Opportunities.module.css';
import { CardContainer } from './CardContainer';
import filterIcon from '../assets/icons/RightIcon.png';

interface Opportunity {
  id: string | number;
  title: string;
  type: string;
  locationType: string;
  province: string;
  status: string;
  format: string;
  cost: string;
  organization: string;
  description: string;
  category: string[];
  bannerImage: string;
  applicationDeadline: string;
  duration: string;
  applicationDetail: string;
  contactEmail: string;
  website: string;
  socials: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  contributedBy: string;
}

interface Props {
  opportunities: Opportunity[];
}

const filterOptions = [
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

const OpportunityFilter: React.FC<Props> = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] =
    useState(opportunities);
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

  const toggleExpanded = (name: string) =>
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));

  const toggleSelection = (name: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = new Set(prev[name]);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [name]: Array.from(current) };
    });
  };

  const getCountsFor = (name: string, options: string[]) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => {
      counts[opt] = 0;
    });
    opportunities.forEach((opp) => {
      if (name === 'category') {
        options.forEach((opt) => {
          if (
            opp.category?.some(
              (c) => c.trim().toLowerCase() === opt.trim().toLowerCase()
            )
          )
            counts[opt]++;
        });
      } else {
        const val =
          (name === 'province'
            ? opp.province?.trim()
            : (opp as any)[name]?.trim?.()
          )?.toLowerCase() || '';
        options.forEach((opt) => {
          if (val === opt.toLowerCase()) counts[opt]++;
        });
      }
    });
    return counts;
  };

  useEffect(() => {
    let result = opportunities;
    (Object.keys(filters) as (keyof typeof filters)[]).forEach((key) => {
      const selected = filters[key];
      if (selected.length > 0) {
        if (key === 'category') {
          result = result.filter((opp) =>
            selected.some((val) =>
              opp.category?.some(
                (c) => c.trim().toLowerCase() === val.trim().toLowerCase()
              )
            )
          );
        } else if (key === 'province') {
          result = result.filter((opp) =>
            selected.some(
              (s) =>
                (opp.province?.trim().toLowerCase() || '') ===
                s.trim().toLowerCase()
            )
          );
        } else if (key === 'cost') {
          result = result.filter((opp) => {
            const val = opp.cost?.trim().toLowerCase() || '';
            return selected.some(
              (s) =>
                val === s.trim().toLowerCase() ||
                (val === '' && s.trim().toLowerCase() === 'free')
            );
          });
        } else {
          result = result.filter((opp) =>
            selected.some(
              (s) =>
                ((opp as any)[key]?.trim()?.toLowerCase() || '') ===
                s.trim().toLowerCase()
            )
          );
        }
      }
    });
    setFilteredOpportunities(result);
  }, [filters, opportunities]);

  const resetFilters = () =>
    setFilters({
      type: [],
      locationType: [],
      province: [],
      status: [],
      format: [],
      cost: [],
      category: [],
    });

  return (
    <div className={styles.eventFilterWrapper}>
      <div className={styles.mobileFilterHeader}>
        <button
          type="button"
          className={styles.addFilterButton}
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <span>Add Filter</span>
          <img
            src={filterIcon.src}
            alt="Filter icon"
            className={styles.filterIcon}
          />
        </button>
        <div className={styles.totalCount}>
          Total: {filteredOpportunities.length}
        </div>
      </div>

      <aside
        className={`${styles.sidebar} ${isMobileFilterOpen ? styles.mobileFilterOpen : styles.mobileFilterClosed}`}
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
                      className={`${styles.chevron} ${expanded[name] ? styles.chevronOpen : ''}`}
                    >
                      <FaChevronDown />
                    </span>
                  </button>
                  <ul
                    id={`${name}-options`}
                    className={`${styles.checkboxList} ${expanded[name] ? '' : styles.collapsed}`}
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
                              {option.replace(/_/g, ' ')}
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
        </div>
      </aside>

      <section className={styles.results}>
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
        {filteredOpportunities.length === 0 ? (
          <p className={styles.noResults}>No opportunities found.</p>
        ) : (
          <CardContainer
            cardsArray={filteredOpportunities}
            dataType="opportunities"
            initialCardCount={8}
          />
        )}
      </section>
    </div>
  );
};

export default OpportunityFilter;
