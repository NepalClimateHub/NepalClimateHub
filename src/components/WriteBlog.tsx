import styles from "../styles/components/Blogs.module.css";

export default function WriteBlog() {
  return (
    <div className={styles.writeBlogBannerContainer}>
      <div className={styles.writeBlogBannerLeft}>
        <h3 className={styles.writeBlogBannerTitle}>
          Have something to say about climate or the environment?
        </h3>
        <div className={styles.writeBlogDescriptionContainer}>
          <div className={styles.blueDot} />
          <p className={styles.writeBlogBannerDescription}>
            Share it with Nepal's climate-conscious community through our
            platform, socials, and 780-subscriber newsletter.
          </p>
        </div>
      </div>
      <a
        href="https://docs.google.com/document/d/1o_yJzqtwYdLaXGFZQBXqQxjhG9N5csgGI9CykxQk7l8/edit?tab=t.0"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.writeBlogButton}
      >
        Write a blog
      </a>
    </div>
  );
}
