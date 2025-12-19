import { useEffect, useState } from 'react';
import IconChevronDown from '../assets/icons/IconChevronDown.png';
import IconCalendar from '../assets/icons/IconCalendar.png';
import IconNewsSource from '../assets/icons/IconNewsSource.png';
import styles from '../styles/components/News.module.css';
import { BiTargetLock } from 'react-icons/bi';

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
  const [visibleCount, setVisibleCount] = useState<number>(9);

  function sliceTitle(title: string) {
    const sliceLength = 120;
    const slicedTitle =
      title.length > sliceLength ? `${title.slice(0, sliceLength)}...` : title;
    return slicedTitle;
  }

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
    setVisibleCount(9);
  }, [selectedYear, selectedType, selectedCategory, newsData]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleNews = filteredNews.slice(0, visibleCount);

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.pageTitle}>News</h2>
      <p className={styles.pageTagline}>
        Stay updated with the latest climate-related news
      </p>

      {/* Filter UI */}
      <div className={styles.filterContainer}>
        {/* Year Filter */}
        <div className={styles.filterGroup}>
          <div className={styles.selectWrapper}>
            <select
              id="year-filter"
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear}
            >
              <option value="All Years">All Published Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <span className={styles.menuDropdown}>
              <img alt="icon" src={IconChevronDown.src} />
            </span>
          </div>
        </div>

        {/* Type Filter */}
        <div className={styles.filterGroup}>
          <select
            id="type-filter"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="All">All News Types</option>
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
          <span className={styles.menuDropdown}>
            <img alt="icon" src={IconChevronDown.src} />
          </span>
        </div>

        {/* Category Filter */}
        <div className={styles.filterGroup}>
          <select
            id="category-filter"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All News Categories</option>
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
            <img alt="icon" src={IconChevronDown.src} />
          </span>
        </div>
      </div>

      {visibleNews.length > 0 ? (
        <div className={styles.newsContainer}>
          {visibleNews.map((news) => (
            <div key={news.id} className={styles.newsCard}>
              <a
                href={news.newsLink}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                <div className={styles.wrapper}>
                  <div className={styles.details}>
                    <div className={styles.address}>
                      <BiTargetLock className={styles.addressIcon} />
                      <span className={styles.addressText}>{news.mode}</span>
                    </div>
                    <div className={styles.date}>
                      <img src={IconCalendar.src} alt="calendar" />
                      {new Date(news.publishedDate).toISOString().split('T')[0]}
                    </div>
                  </div>
                  <h3 className={styles.headline}>{sliceTitle(news.title)}</h3>
                  <div className={styles.source}>
                    <img src={IconNewsSource.src} alt="source" />
                    {news.source}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No news found!</p>
      )}

      {/* Load More Button */}
      {visibleCount < filteredNews.length && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFilter;
