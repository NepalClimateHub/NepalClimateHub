import type React from 'react';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Opportunities.module.css';
import { FaChevronDown } from 'react-icons/fa';
import { CardContainer } from './CardContainer';

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
    options: ['Fully Funded', 'Partially Funded', 'Paid', 'Free'],
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
    locationType: true,
    province: true,
    status: true,
    format: true,
    cost: true,
    category: true,
  });

  const toggleExpanded = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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
    options.forEach((opt) => (counts[opt] = 0));
    opportunities.forEach((opp) => {
      if (name === 'category') {
        options.forEach((opt) => {
          if (opp.category?.some((c) => c.trim() === opt.trim())) counts[opt]++;
        });
      } else if (name === 'province') {
        const val = opp.province?.trim();
        if (val && counts[val] !== undefined) counts[val]++;
      } else {
        const val = (opp as any)[name]?.trim?.();
        if (val && counts[val] !== undefined) counts[val]++;
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
            selected.some((val) => opp.category?.some((c) => c.trim() === val.trim()))
          );
        } else if (key === 'province') {
          result = result.filter((opp) => {
            const val = opp.province?.trim() || '';
            return selected.some((s) => s.trim() === val);
          });
        } else {
          result = result.filter((opp) => {
            const val = ((opp as any)[key] as string) || '';
            return selected.some((s) => val.trim() === s.trim());
          });
        }
      }
    });
    setFilteredOpportunities(result);
  }, [filters, opportunities]);

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
      <aside className={styles.sidebar} aria-label="Opportunity filters">
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
                      const checked = filters[name as keyof typeof filters].includes(option);
                      return (
                        <li key={option} className={styles.checkboxItem}>
                          <label className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={checked}
                              onChange={() => toggleSelection(name as keyof typeof filters, option)}
                            />
                            <span className={styles.checkboxText}>{option}</span>
                            <span className={styles.countBadge}>{counts[option] ?? 0}</span>
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
          {((Object.keys(filters) as (keyof typeof filters)[]).some(
            (k) => filters[k].length > 0
          )) && (
            <button type="button" className={styles.chipDanger} onClick={resetFilters}>
              <span className={styles.chipText}>Close</span>
              <span className={styles.chipClose}>×</span>
            </button>
          )}
        </div>

        {filteredOpportunities.length === 0 ? (
          <p className={styles.noResults}> No opportunities found.</p>
        ) : (
          <CardContainer
            cardsArray={filteredOpportunities}
            dataType="opportunities"
            cardProfilePictureBgSize="cover"
            cardPadding="0px"
            initialCardCount={8}
          />
        )}
      </section>
    </div>
  );
};

export default OpportunityFilter;
