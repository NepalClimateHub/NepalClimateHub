import styles from '../styles/components/Blogs.module.css';

export default function WriteBlog() {
  // Default author image placeholder
  const defaultAuthorImage = `https://ui-avatars.com/api/?name=A&background=1a1b1e&color=cefe00&size=96`;

  return (
    <div className={styles.blogCardLink}>
      <article className={styles.blogCard}>
        {/* Primary colored banner with CTA text */}
        <div className={styles.writeBlogBanner}>
          <span className={styles.blogTag}>Blog Category</span>
          <div className={styles.writeBlogBannerContent}>
            <h3 className={styles.writeBlogBannerTitle}>
              Have something to say about climate or the environment?
            </h3>
            <p className={styles.writeBlogBannerExcerpt}>
              Share it with Nepal's climate-conscious community through our
              platform, socials, and 780-subscriber newsletter.
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className={styles.blogContent}>
          <div className={styles.writeBlogInfo}>
            <h3 className={styles.blogTitle}>Title of the Blog</h3>
            <button type="button" className={styles.writeBlogButton}>
              Write a Blog
            </button>
          </div>

          {/* Author section with placeholder data */}
          <div className={`${styles.authorSection} ${styles.authorSectionMt}`}>
            <img
              src={defaultAuthorImage}
              alt="Author profile picture"
              className={styles.authorImage}
            />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>Your name</span>
              <div className={styles.dateTime}>
                <span className={styles.date}>Date of publish</span>
                <span className={styles.dotSeparator} />
                <span className={styles.readingTime}>Minutes of read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
