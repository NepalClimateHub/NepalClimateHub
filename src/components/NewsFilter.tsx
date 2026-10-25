import { navigate } from 'astro:transitions/client';
import type React from 'react';
import IconChevronDown from '../assets/icons/IconChevronDown.png';
import styles from '../styles/components/News.module.css';
import {
  CATEGORY_OPTIONS,
  MODE_OPTIONS,
  type NewsFilterState,
  YEAR_OPTIONS,
  serializeNewsFilters,
} from '../utils/newsFilters';
import NewsCard from './NewsCard';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  mode: string;
  category: string[];
  publishedDate: string;
  publishedYear: string;
  newsLink: string;
  contributedBy: string;
  imgSrc?: string;
}

interface Props {
  news: NewsItem[];
  currentPage: number;
  pageSize: number;
  totalNews: number;
  totalPages: number;
  activeFilters: NewsFilterState;
}

const NewsFilter: React.FC<Props> = ({
  news,
  currentPage,
  totalNews,
  totalPages,
  activeFilters,
}) => {
  const navigateToFilters = (nextFilters: NewsFilterState) => {
    const params = serializeNewsFilters(nextFilters);
    const query = params.toString();
    navigate(query ? `/news?${query}` : '/news');
  };

  const updateFilter = (key: keyof NewsFilterState, value: string) => {
    navigateToFilters({ ...activeFilters, [key]: value });
  };

  const pageHref = (page: number) => {
    const params = serializeNewsFilters(activeFilters);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    return query ? `/news?${query}` : '/news';
  };

  return (
    <div className={styles.sectionContainer}>
      <h1 className={styles.pageTitle}>News</h1>
      <p className={styles.pageTagline}>
        Stay updated with the latest climate-related news
      </p>

      <div className={styles.filterContainer}>
        {/* Year Filter */}
        <div className={styles.filterGroup}>
          <div className={styles.selectWrapper}>
            <label htmlFor="year-filter" className={styles.visuallyHidden}>
              Filter by published year
            </label>
            <select
              id="year-filter"
              onChange={(e) => updateFilter('year', e.target.value)}
              value={activeFilters.year}
            >
              <option value="">All Published Years</option>
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span className={styles.menuDropdown}>
              <img alt="icon" src={IconChevronDown.src} />
            </span>
          </div>
        </div>

        {/* Type Filter */}
        <div className={styles.filterGroup}>
          <label htmlFor="mode-filter" className={styles.visuallyHidden}>
            Filter by news type
          </label>
          <select
            id="mode-filter"
            onChange={(e) => updateFilter('mode', e.target.value)}
            value={activeFilters.mode}
          >
            <option value="">All News Types</option>
            {MODE_OPTIONS.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          <span className={styles.menuDropdown}>
            <img alt="icon" src={IconChevronDown.src} />
          </span>
        </div>

        {/* Category Filter */}
        <div className={styles.filterGroup}>
          <label htmlFor="category-filter" className={styles.visuallyHidden}>
            Filter by news category
          </label>
          <select
            id="category-filter"
            onChange={(e) => updateFilter('category', e.target.value)}
            value={activeFilters.category}
          >
            <option value="">All News Categories</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <span className={styles.menuDropdown}>
            <img alt="icon" src={IconChevronDown.src} />
          </span>
        </div>
      </div>

      <div className={styles.totalCount}>Total: {totalNews}</div>

      {news.length > 0 ? (
        <div className={styles.newsContainer}>
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              source={item.source}
              mode={item.mode}
              publishedDate={item.publishedDate}
              newsLink={item.newsLink}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No news found!</p>
      )}

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="News pages">
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
    </div>
  );
};

export default NewsFilter;
