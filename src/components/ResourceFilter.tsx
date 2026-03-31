import type React from 'react';
import { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import filterIcon from '../assets/icons/RightIcon.png';
import styles from '../styles/components/ResourceFilter.module.css';
import { CardContainer } from './CardContainer';

interface Resource {
  id: number;
  title: string;
  description: string;
  href: string;
  type: string;
  level: string;
  bannerImageUrl?: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  name: string;
  label: string;
  defaultOption: string;
  options: FilterOption[];
  inputType: 'radio' | 'checkbox';
}

interface Props {
  resources: Resource[];
}

const filterOptions: FilterConfig[] = [
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
    ] as FilterOption[],
    inputType: 'radio' as const,
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
    ] as FilterOption[],
    inputType: 'checkbox' as const,
  },
];

const ResourceFilter: React.FC<Props> = ({ resources }) => {
  const [filteredResources, setFilteredResources] = useState(resources);
  const [filters, setFilters] = useState({
    type: [] as string[],
    level: [] as string[],
  });

  // Helper function to get label for a value
  const getLabelForValue = (name: string, value: string) => {
    const filterOption = filterOptions.find((option) => option.name === name);
    if (!filterOption) return value;
    const option = filterOption.options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    type: true,
    level: false,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleExpanded = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSelection = (name: keyof typeof filters, value: string) => {
    if (name === 'type') {
      // Radio button behavior - only one selection
      setFilters((prev) => ({
        ...prev,
        [name]: prev[name].includes(value) ? [] : [value],
      }));
    } else {
      // Checkbox behavior - multiple selections
      setFilters((prev) => {
        const current = new Set(prev[name]);
        if (current.has(value)) {
          current.delete(value);
        } else {
          current.add(value);
        }
        return { ...prev, [name]: Array.from(current) };
      });
    }
  };

  const getCountsFor = (name: string, options: FilterOption[]) => {
    const counts: Record<string, number> = {};
    options.forEach((opt) => {
      counts[opt.value] = 0;
    });
    resources.forEach((resource) => {
      const val = (resource as any)[name]?.trim();
      if (val && counts[val] !== undefined) counts[val]++;
    });
    return counts;
  };

  useEffect(() => {
    let result = resources;

    (Object.keys(filters) as (keyof typeof filters)[]).forEach((key) => {
      const selected = filters[key];
      if (selected.length > 0) {
        result = result.filter((resource) => {
          const val = ((resource as any)[key] as string) || '';
          return selected.some((s) => val.trim() === s.trim());
        });
      }
    });

    setFilteredResources(result);
  }, [filters, resources]);

  const resetFilters = () => {
    setFilters({
      type: [],
      level: [],
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
          Total: {filteredResources.length}
        </div>
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
                      const checked = filters[
                        name as keyof typeof filters
                      ].includes(option.value);
                      return (
                        <li key={option.value} className={styles.checkboxItem}>
                          <label className={styles.checkboxLabel}>
                            <input
                              type={inputType}
                              name={inputType === 'radio' ? name : undefined}
                              className={styles.checkbox}
                              checked={checked}
                              onChange={() =>
                                toggleSelection(
                                  name as keyof typeof filters,
                                  option.value
                                )
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
          {/* <button onClick={resetFilters} className={styles.resetButton}>
            Reset Filters
          </button> */}
        </div>
      </aside>

      <section className={styles.results}>
        {/* Selected filter chips - only show when filters are selected */}
        {(Object.keys(filters) as (keyof typeof filters)[]).some(
          (k) => filters[k].length > 0
        ) && (
          <div className={styles.selectedChipsRow}>
            {(Object.keys(filters) as (keyof typeof filters)[]).flatMap((key) =>
              filters[key].map((value) => (
                <button
                  key={`${String(key)}-${value}`}
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
        {filteredResources.length === 0 ? (
          <p className={styles.noResults}>No resources found.</p>
        ) : (
          <CardContainer
            cardsArray={filteredResources}
            dataType="resources"
            initialCardCount={12}
          />
        )}
      </section>
    </div>
  );
};

export default ResourceFilter;
