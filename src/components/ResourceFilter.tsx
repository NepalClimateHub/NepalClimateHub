import { navigate } from 'astro:transitions/client';
import type React from 'react';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import filterIcon from '../assets/icons/RightIcon.png';
import styles from '../styles/components/ResourceFilter.module.css';
import {
  RESOURCE_FILTER_KEYS,
  type ResourceFilterKey,
  type ResourceFilterOptionItem,
  type ResourceFilterState,
  filterOptions,
  getLabelForValue,
  hasActiveResourceFilters,
  serializeResourceFilters,
} from '../utils/resourceFilters';
import { CardContainer } from './CardContainer';

interface Resource {
  id: string;
  title: string;
  description?: string;
  href?: string;
  type: string;
  level?: string;
  bannerImageUrl?: string;
}

interface Props {
  resources: Resource[];
  currentPage: number;
  pageSize: number;
  totalResources: number;
  totalPages: number;
  activeFilters: ResourceFilterState;
}

const ResourceFilter: React.FC<Props> = ({
  resources,
  currentPage,
  pageSize,
  totalResources,
  totalPages,
  activeFilters,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    type: true,
    level: false,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleExpanded = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const navigateToFilters = (nextFilters: ResourceFilterState) => {
    const params = serializeResourceFilters(nextFilters);
    const query = params.toString();
    navigate(query ? `/resources?${query}` : '/resources');
  };

  const toggleSelection = (name: ResourceFilterKey, value: string) => {
    if (name === 'type') {
      const isSame =
        activeFilters.type.length === 1 && activeFilters.type[0] === value;
      navigateToFilters({ ...activeFilters, type: isSame ? [] : [value] });
    } else {
      const current = new Set(activeFilters.level);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }
      navigateToFilters({ ...activeFilters, level: Array.from(current) });
    }
  };

  const getCountsFor = (
    name: ResourceFilterKey,
    options: ResourceFilterOptionItem[]
  ) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => {
      counts[opt.value] = 0;
    });
    resources.forEach((resource) => {
      const val = (name === 'type' ? resource.type : resource.level)?.trim();
      if (val && counts[val] !== undefined) counts[val]++;
    });
    return counts;
  };

  const resetFilters = () => {
    navigate('/resources');
  };

  const hasActiveFilters = hasActiveResourceFilters(activeFilters);
  const pageHref = (page: number) => {
    const params = serializeResourceFilters(activeFilters);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    return query ? `/resources?${query}` : '/resources';
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
        <div className={styles.totalCount}>Total: {totalResources}</div>
      </div>

      <aside
        className={`${styles.sidebar} ${
          isMobileFilterOpen
            ? styles.mobileFilterOpen
            : styles.mobileFilterClosed
        }`}
        aria-label="Resource filters"
      >
        <div className={styles.sidebarInner}>
          <div className={styles.filterContainer}>
            {filterOptions.map(({ name, label, options, inputType }) => {
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
                      <BsChevronDown />
                    </span>
                  </button>
                  <ul
                    id={`${name}-options`}
                    className={`${styles.checkboxList} ${
                      expanded[name] ? '' : styles.collapsed
                    }`}
                  >
                    {options.map((option) => {
                      const checked = activeFilters[name].includes(
                        option.value
                      );
                      return (
                        <li key={option.value} className={styles.checkboxItem}>
                          <label className={styles.checkboxLabel}>
                            <input
                              type={inputType}
                              name={inputType === 'radio' ? name : undefined}
                              className={styles.checkbox}
                              checked={checked}
                              onChange={() =>
                                toggleSelection(name, option.value)
                              }
                            />
                            <span className={styles.checkboxText}>
                              {`${option.label} (${counts[option.value] ?? 0})`}
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
        {/* Selected filter chips - only show when filters are selected */}
        {hasActiveFilters && (
          <div className={styles.selectedChipsRow}>
            {RESOURCE_FILTER_KEYS.flatMap((key) =>
              activeFilters[key].map((value) => (
                <button
                  key={`${key}-${value}`}
                  type="button"
                  className={styles.chip}
                  onClick={() => toggleSelection(key, value)}
                >
                  <span className={styles.chipText}>
                    {getLabelForValue(key, value)}
                  </span>
                  <span className={styles.chipClose}>×</span>
                </button>
              ))
            )}
            <button
              type="button"
              className={styles.chipDanger}
              onClick={resetFilters}
            >
              <span className={styles.chipText}>Close</span>
              <span className={styles.chipClose}>×</span>
            </button>
          </div>
        )}
        {resources.length === 0 ? (
          <p className={styles.noResults}>No resources found.</p>
        ) : (
          <CardContainer
            cardsArray={resources}
            dataType="resources"
            initialCardCount={pageSize}
          />
        )}

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Resource pages">
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

export default ResourceFilter;
