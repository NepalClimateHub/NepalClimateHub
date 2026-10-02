import styles from '../styles/components/Blogs.module.css';
import BlogCard, { type BlogCardData } from './BlogCard';
import WriteBlog from './WriteBlog';

interface Props {
  blogs: BlogCardData[];
  activeCategory: string;
  currentPage: number;
  totalPages: number;
}

const categories = [
  'All',
  'Voices & Stories',
  'Community',
  'Education',
  'Environment',
  'Climate Technology',
  'Climate Policy',
  'Sustainability',
  'Climate Justice',
  'Climate Science',
];

export default function BlogCategoryFilter({
  blogs,
  activeCategory,
  currentPage,
  totalPages,
}: Props) {
  const hrefFor = (category: string, page = 1) => {
    const params = new URLSearchParams();

    if (category !== 'All') params.set('category', category);
    if (page > 1) params.set('page', String(page));

    const query = params.toString();
    return query ? `/blogs?${query}` : '/blogs';
  };

  return (
    <div className={styles.sectionContainer}>
      <WriteBlog />
      <h2 className={styles.sectionTitle}>Browse by Category</h2>

      {/* Category Filter Buttons */}
      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <a
            key={category}
            className={`${styles.filterButton} ${
              activeCategory === category
                ? styles.filterButtonActive
                : styles.filterButtonInactive
            }`}
            href={hrefFor(category)}
            aria-current={activeCategory === category ? 'page' : undefined}
            data-astro-prefetch="hover"
          >
            {category.replace('-', ' ')}
          </a>
        ))}
      </div>

      {blogs.length > 0 ? (
        // Blog Cards Grid
        <div className={styles.blogsGrid}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No blogs found in this category.</p>
      )}

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Blog pages">
          {currentPage > 1 ? (
            <a
              className={styles.pageLink}
              href={hrefFor(activeCategory, currentPage - 1)}
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
              href={hrefFor(activeCategory, currentPage + 1)}
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
}
