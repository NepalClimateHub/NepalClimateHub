import { navigate } from 'astro:transitions/client';
import type React from 'react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import filterIcon from '../assets/icons/RightIcon.png';
import styles from '../styles/components/Opportunities.module.css';
import {
  type OpportunityFilterCandidate,
  type OpportunityFilterKey,
  type OpportunityFilterState,
  filterOptions,
  hasActiveOpportunityFilters,
  serializeOpportunityFilters,
} from '../utils/opportunityFilters';
import { CardContainer } from './CardContainer';

interface Opportunity extends OpportunityFilterCandidate {
  id: string | number;
  title: string;
  organization: string;
  description: string;
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
  currentPage: number;
  pageSize: number;
  totalOpportunities: number;
  totalPages: number;
  activeFilters: OpportunityFilterState;
}

const FIELD_ACCESSORS: Record<
  Exclude<OpportunityFilterKey, 'category'>,
  (opportunity: Opportunity) => string
> = {
  type: (opportunity) => opportunity.type,
  locationType: (opportunity) => opportunity.locationType,
  province: (opportunity) => opportunity.province,
  status: (opportunity) => opportunity.status,
  format: (opportunity) => opportunity.format,
  cost: (opportunity) => opportunity.cost,
};

const OpportunityFilter: React.FC<Props> = ({
  opportunities,
  currentPage,
  pageSize,
  totalOpportunities,
  totalPages,
  activeFilters,
}) => {
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

  const navigateToFilters = (nextFilters: OpportunityFilterState) => {
    const params = serializeOpportunityFilters(nextFilters);
    const query = params.toString();
    navigate(query ? `/opportunities?${query}` : '/opportunities');
  };

  const toggleSelection = (name: OpportunityFilterKey, value: string) => {
    const current = new Set(activeFilters[name]);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    navigateToFilters({ ...activeFilters, [name]: Array.from(current) });
  };

  const getCountsFor = (name: OpportunityFilterKey, options: string[]) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => {
      counts[opt] = 0;
    });

    if (name === 'category') {
      opportunities.forEach((opportunity) => {
        options.forEach((opt) => {
          if (
            opportunity.category.some(
              (c) => c.trim().toLowerCase() === opt.trim().toLowerCase()
            )
          ) {
            counts[opt]++;
          }
        });
      });
      return counts;
    }

    const getValue = FIELD_ACCESSORS[name];
    opportunities.forEach((opportunity) => {
      const val = getValue(opportunity).trim().toLowerCase();
      options.forEach((opt) => {
        if (val === opt.trim().toLowerCase()) counts[opt]++;
      });
    });

    return counts;
  };

  const resetFilters = () => {
    navigate('/opportunities');
  };

  const hasActiveFilters = hasActiveOpportunityFilters(activeFilters);
  const pageHref = (page: number) => {
    const params = serializeOpportunityFilters(activeFilters);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    return query ? `/opportunities?${query}` : '/opportunities';
  };

  return (
    <div className={styles.eventFilterWrapper}>
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
        <div className={styles.totalCount}>Total: {totalOpportunities}</div>
      </div>

      <aside
        className={`${styles.sidebar} ${
          isMobileFilterOpen
            ? styles.mobileFilterOpen
            : styles.mobileFilterClosed
        }`}
        aria-label="Opportunity filters"
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
                      const checked = activeFilters[name].includes(option);
                      return (
                        <li key={option} className={styles.checkboxItem}>
                          <label className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={checked}
                              onChange={() => toggleSelection(name, option)}
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
          {(Object.keys(activeFilters) as OpportunityFilterKey[]).flatMap(
            (key) =>
              activeFilters[key].map((value) => (
                <button
                  key={`${String(key)}-${value}`}
                  type="button"
                  className={styles.chip}
                  onClick={() => toggleSelection(key, value)}
                >
                  <span className={styles.chipText}>
                    {value.replace(/_/g, ' ')}
                  </span>
                  <span className={styles.chipClose}>×</span>
                </button>
              ))
          )}
          {hasActiveFilters && (
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
        {opportunities.length === 0 ? (
          <p className={styles.noResults}>No opportunities found.</p>
        ) : (
          <CardContainer
            cardsArray={opportunities}
            dataType="opportunities"
            initialCardCount={pageSize}
          />
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Opportunity pages">
            {currentPage > 1 ? (
              <a
                className={styles.pageLink}
                href={pageHref(currentPage - 1)}
                data-astro-prefetch="hover"
              >
                Previous
              </a>
            ) : (
              <span className={styles.pageLinkDisabled}>Previous</span>
            )}
            <span className={styles.pageStatus}>
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages ? (
              <a
                className={styles.pageLink}
                href={pageHref(currentPage + 1)}
                data-astro-prefetch="hover"
              >
                Next
              </a>
            ) : (
              <span className={styles.pageLinkDisabled}>Next</span>
            )}
          </nav>
        )}
      </section>
    </div>
  );
};

export default OpportunityFilter;
