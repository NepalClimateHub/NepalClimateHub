import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '../styles/components/News.module.css';

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
  newsData: NewsItem[];
}

const NewsFilter: React.FC<Props> = ({ newsData }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData);

  useEffect(() => {
    const filteredResults = newsData.filter((news) => {
      const matchesYear =
        selectedYear === 'All Years' ||
        String(new Date(news.publishedYear).getFullYear()) === selectedYear;
      const matchesType =
        selectedType === 'All' ||
        news.mode?.toLowerCase() === selectedType.toLowerCase();
      const matchesCategory =
        selectedCategory === 'All' ||
        news.category?.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        );

      return matchesYear && matchesType && matchesCategory;
    });

    setFilteredNews(filteredResults);
  }, [selectedYear, selectedType, selectedCategory, newsData]);

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.pageTitle}>News</h2>
      <p className={styles.pageTagline}>
        Stay updated with the latest climate-related news
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
          <span className={styles.menuDropdown}>
            <FaChevronDown />
          </span>
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
            {/* <option value="Regional">Regional</option> */}
            <option value="International">International</option>
            {/* <option value="Global">Global</option> */}
          </select>
          <span className={styles.menuDropdown}>
            <FaChevronDown />
          </span>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category-filter">News Category:</label>
          <select
            id="category-filter"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All</option>
            <option value="Climate Justice">Climate Justice</option>
            <option value="Social Equity">Social Equity</option>
            <option value="Gender and Climate">Gender and Climate</option>
            <option value="Youth Empowerment">Youth Empowerment</option>
            <option value="Climate Litigation & Legal Action">
              Climate Litigation & Legal Action
            </option>
            <option value="Climate Activism & Advocacy">
              Climate Activism & Advocacy
            </option>
            <option value="Research & Education">Research & Education</option>
            <option value="Science Communication">Science Communication</option>
            <option value="Media Communication">Media Communication</option>
            <option value="Indigenous Knowledge">Indigenous Knowledge</option>
            <option value="Climate and Mental Health">
              Climate and Mental Health
            </option>
            <option value="Ecosystem Conservation">
              Ecosystem Conservation
            </option>
            <option value="Wildlife & Biodiversity">
              Wildlife & Biodiversity
            </option>
            <option value="Renewable Energy">Renewable Energy</option>
            <option value="Environment">Environment</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Pollution & Waste Management">
              Pollution & Waste Management
            </option>
            <option value="Circular Economy">Circular Economy</option>
            <option value="Transportation & Mobility">
              Transportation & Mobility
            </option>
            <option value="Nature-Based Solutions">
              Nature-Based Solutions
            </option>
            <option value="Carbon Sequestration">Carbon Sequestration</option>
            <option value="Food, Water & Agriculture">
              Food, Water & Agriculture
            </option>
            <option value="Climate Adaptation & Mitigation">
              Climate Adaptation & Mitigation
            </option>
            <option value="Disaster Risk Management">
              Disaster Risk Management
            </option>
            <option value="Community Resilience">Community Resilience</option>
            <option value="Climate Finance">Climate Finance</option>
            <option value="Carbon Markets">Carbon Markets</option>
            <option value="Loss & Damage">Loss & Damage</option>
            <option value="Climate Technology">Climate Technology</option>
            <option value="Digital Solutions">Digital Solutions</option>
          </select>
          <span className={styles.menuDropdown}>
            <FaChevronDown />
          </span>
        </div>
      </div>

      <div className={styles.newsContainer}>
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <div key={news.id} className={styles.newsCard}>
              <a href={news.newsLink} target="_blank" rel="noreferrer">
                <div className={styles.content}>
                  <h3 className={styles.newsHeadline}>{news.title}</h3>
                  <div className={styles.newsImageWrapper}>
                    <img
                      src={news.imgSrc || 'default-image.jpg'}
                      alt={news.title}
                    />
                  </div>
                </div>
                <div className={styles.linkDateWrapper}>
                  <div className={styles.link}>
                    <span className={styles.linkIcon}>🔗</span>
                    <a href={news.newsLink} target="_blank" rel="noreferrer">
                      {news.source}
                    </a>
                  </div>
                  <div className={styles.date}>
                    <span className={styles.linkIcon}>📅</span>
                    <span>
                      {new Date(news.publishedDate).toISOString().split('T')[0]}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No news found!</p>
        )}
      </div>
    </div>
  );
};

export default NewsFilter;
