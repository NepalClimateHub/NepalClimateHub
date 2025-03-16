import { useState } from "react";
import styles from "../styles/components/News.module.css";

interface NewsItem {
  id: number;
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
  newsData: NewsItem[];
}

const NewsFilter: React.FC<Props> = ({ newsData }) => {
  const [selectedYear, setSelectedYear] = useState<string>("All Years");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData);

  const handleSearch = () => {
    const filteredResults = newsData.filter((news) => {
      const matchesYear =
        selectedYear === "All Years" || news.publishedYear === selectedYear;
      const matchesType =
        selectedType === "All" ||
        news.mode?.toLowerCase() === selectedType.toLowerCase();
      const matchesCategory =
        selectedCategory === "All" ||
        news.category?.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
        );

      return matchesYear && matchesType && matchesCategory;
    });

    setFilteredNews(filteredResults);
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.pageTitle}>News</h2>
      <p className={styles.pageTagline}>
        Read up on the latest climate-related Nepal news.
      </p>

      {/* ✅ Filter UI */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="year-filter">Published Year:</label>
          <select
            id="year-filter"
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
          >
            <option value="All Years">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="type-filter">News Type:</label>
          <select
            id="type-filter"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="All">All</option>
            <option value="National">National</option>
            <option value="Regional">Regional</option>
            <option value="International">International</option>
            <option value="Global">Global</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category-filter">News Category:</label>
          <select
            id="category-filter"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All</option>
            <option value="Climate Action">Climate Action</option>
            <option value="Climate Education">Climate Education</option>
          </select>
        </div>

        <div className={styles.searchButtonContainer}>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.newsContainer}>
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <div key={news.id} className={styles.newsCard}>
              <a href={news.newsLink} target="_blank">
                <div className={styles.content}>
                  <h3 className={styles.newsHeadline}>{news.title}</h3>
                  <div className={styles.newsImageWrapper}>
                    <img
                      src={news.imgSrc || "default-image.jpg"}
                      alt={news.title}
                    />
                  </div>
                </div>
                <div className={styles.linkDateWrapper}>
                  <div className={styles.link}>
                    <span className={styles.linkIcon}>🔗</span>
                    <a href={news.newsLink} target="_blank">
                      {news.source}
                    </a>
                  </div>
                  <div className={styles.date}>
                    <span className={styles.linkIcon}>📅</span>
                    <span>{news.publishedDate}</span>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>
            No news articles found for the selected filters. Try adjusting your
            search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsFilter;
