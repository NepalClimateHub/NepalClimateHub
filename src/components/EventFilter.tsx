import { navigate } from 'astro:transitions/client';
import type React from 'react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import filterIcon from '../assets/icons/RightIcon.png';
import styles from '../styles/components/EventFilter.module.css';
import {
  type EventFilterCandidate,
  type EventFilterKey,
  type EventFilterState,
  filterOptions,
  hasActiveEventFilters,
  serializeEventFilters,
} from '../utils/eventFilters';
import { CardContainer } from './CardContainer';

interface Event extends EventFilterCandidate {
  id: string | number;
  title: string;
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
  currentPage: number;
  pageSize: number;
  totalEvents: number;
  totalPages: number;
  activeFilters: EventFilterState;
}

const EventFilter: React.FC<Props> = ({
  events,
  currentPage,
  pageSize,
  totalEvents,
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

  const navigateToFilters = (nextFilters: EventFilterState) => {
    const params = serializeEventFilters(nextFilters);
    const query = params.toString();
    navigate(query ? `/events?${query}` : '/events');
  };

  const toggleSelection = (name: EventFilterKey, value: string) => {
    const current = new Set(activeFilters[name]);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    navigateToFilters({ ...activeFilters, [name]: Array.from(current) });
  };

  const getCountsFor = (name: EventFilterKey, options: string[]) => {
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
        const val = event[name]?.trim?.();
        if (val && counts[val] !== undefined) counts[val]++;
      }
    });
    return counts;
  };

  const resetFilters = () => {
    navigate('/events');
  };

  const hasActiveFilters = hasActiveEventFilters(activeFilters);
  const pageHref = (page: number) => {
    const params = serializeEventFilters(activeFilters);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    return query ? `/events?${query}` : '/events';
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
        <div className={styles.totalCount}>Total: {totalEvents}</div>
      </div>

      <aside
        className={`${styles.sidebar} ${
          isMobileFilterOpen
            ? styles.mobileFilterOpen
            : styles.mobileFilterClosed
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
                      <FaChevronDown aria-hidden="true" />
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
          {(Object.keys(activeFilters) as EventFilterKey[]).flatMap((key) =>
            activeFilters[key].map((value) => (
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
        {events.length === 0 ? (
          <p className={styles.noResults}>No events found.</p>
        ) : (
          <CardContainer
            cardsArray={events}
            dataType="events"
            initialCardCount={pageSize}
          />
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Event pages">
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

export default EventFilter;
