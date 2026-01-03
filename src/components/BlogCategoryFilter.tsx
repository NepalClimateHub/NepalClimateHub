import { useState } from 'react';
import type { Blog } from '../types/blog';
import BlogCard from './BlogCard';
import styles from '../styles/components/Blogs.module.css';
import WriteBlog from './WriteBlog';

interface Props {
  blogs: Blog[];
}

const categories = [
  'All',
  'Climate-Science',
  'Sustainability',
  'Development',
  'Environment',
  'Technology',
  'Policy',
  'Research',
];

export default function BlogCategoryFilter({ blogs }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBlogs =
    activeCategory === 'All'
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Browse by Category</h2>

      {/* Category Filter Buttons */}
      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.filterButton} ${
              activeCategory === category
                ? styles.filterButtonActive
                : styles.filterButtonInactive
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>

      {filteredBlogs.length > 0 ? (
        // Blog Cards Grid
        <div className={styles.blogsGrid}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          <WriteBlog />
        </div>
      ) : (
        <p className={styles.noResults}>No blogs found in this category.</p>
      )}
    </section>
  );
}
