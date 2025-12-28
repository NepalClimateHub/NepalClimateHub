import type { Blog } from '../types/blog';
import { createSlug } from '../utils/slug';
import styles from '../styles/components/Blogs.module.css';

interface Props {
  blog: Blog;
  latestPost?: boolean;
  featuredPost?: boolean;
}

export default function BlogCard({ blog, latestPost = false, featuredPost = false }: Props) {
  const {
    bannerImageUrl,
    title,
    excerpt,
    author,
    authorImageUrl,
    readingTime,
    category,
    publishedDate,
  } = blog;

  // Format the posted date
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const slug = createSlug(title);

  // Default author image placeholder
  const defaultAuthorImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=1a1b1e&color=cefe00&size=96`;

  const cardClass = latestPost ? styles.blogCardLatest : styles.blogCard;
  const imageContainerClass = latestPost
    ? styles.imageContainerLatest
    : featuredPost ? styles.imageContainerFeatured : styles.imageContainer;
  const authorSectionClass = latestPost ? styles.authorSection : `${styles.authorSection} ${styles.authorSectionMt}`;

  return (
    <a
      href={`/blogs/${slug}`}
      className={styles.blogCardLink}
      aria-label={`Read more about ${title}`}
    >
      <article className={cardClass}>
        <figure className={imageContainerClass}>
          <img
            src={bannerImageUrl}
            alt={title}
            className={styles.blogImage}
          />
          {!latestPost && <span className={styles.blogTag}>{category}</span>}
        </figure>

        <div className={styles.blogContent}>
          <h3 className={styles.blogTitle}>{title}</h3>

          {!latestPost && <p className={styles.blogExcerpt}>{excerpt}</p>}

          <div className={authorSectionClass}>
            {!latestPost && (
              <img
                src={authorImageUrl || defaultAuthorImage}
                alt={`${author}'s profile picture`}
                className={styles.authorImage}
              />
            )}
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>
                {latestPost ? `By ${author}` : author}
              </span>
              <div className={styles.dateTime}>
                <time className={styles.date} dateTime={publishedDate}>
                  {formattedDate}
                </time>
                <span className={styles.dotSeparator} />
                <span className={styles.readingTime}>{`${readingTime} read`}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}

