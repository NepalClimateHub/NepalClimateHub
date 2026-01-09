import type { Blog } from '../types/blog';
import { createSlug } from '../utils/slug';
import styles from '../styles/components/Blogs.module.css';

export interface BlogCardProps {
  blog: Blog;
  cardType?: 'default' | 'highlight' | 'featured';
}

export default function BlogCard({
  blog,
  cardType = 'default',
}: BlogCardProps) {
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

  // Determine classes based on cardType
  const cardClass =
    cardType === 'highlight'
      ? styles.blogCardHighlight
      : cardType === 'featured'
      ? styles.blogCardFeatured
      : styles.blogCard;

  const imageContainerClass =
    cardType === 'highlight'
      ? styles.imageContainerHighlight
      : cardType === 'featured'
      ? styles.imageContainerFeatured
      : styles.imageContainer;

  return (
    <a
      href={`/blogs/${slug}`}
      className={styles.blogCardLink}
      aria-label={`Read more about ${title}`}
    >
      <article className={cardClass}>
        <figure className={imageContainerClass}>
          <img src={bannerImageUrl} alt={title} className={styles.blogImage} />
          {(cardType !== 'highlight' ) && (
            <span className={styles.blogTag}>{category?.replaceAll('-', ' ')}</span>
          )}
        </figure>

        <div className={styles.blogContent}>
          <h3 className={styles.blogTitle}>{title}</h3>

          {(cardType !== 'highlight') && (
            <p className={styles.blogExcerpt}>{excerpt}</p>
          )}

          <div className={styles.authorSection}>
            {(cardType !== 'highlight') && (
              <img
                src={authorImageUrl || defaultAuthorImage}
                alt={`${author}'s profile picture`}
                className={styles.authorImage}
              />
            )}
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>
                {(cardType !== 'highlight' ) ? author : `By ${author}`}
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
