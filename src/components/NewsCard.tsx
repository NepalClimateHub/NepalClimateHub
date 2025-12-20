import { BiTargetLock } from 'react-icons/bi';
import calendarIcon from '../assets/icons/IconCalendar.png';
import newsSourceIcon from '../assets/icons/IconNewsSource.png';
import styles from '../styles/components/News.module.css';

interface Props {
  title: string;
  source: string;
  mode: string;
  publishedDate: string;
  newsLink: string;
}

function sliceTitle(title: string) {
  const sliceLength = 120;
  const slicedTitle =
    title.length > sliceLength ? `${title.slice(0, sliceLength)}...` : title;
  return slicedTitle;
}

export default function News({
  title,
  source,
  mode,
  publishedDate,
  newsLink,
}: Props) {
  return (
    <div className={styles.newsCard}>
      <a
        href={newsLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <div className={styles.wrapper}>
          <div className={styles.details}>
            <div className={styles.address}>
              <BiTargetLock className={styles.addressIcon} />
              <span className={styles.addressText}>{mode}</span>
            </div>
            <div className={styles.date}>
              <img src={calendarIcon.src} alt="calendar" />
              <span>{new Date(publishedDate).toISOString().split('T')[0]}</span>
            </div>
          </div>
          <h3 className={styles.headline}>{sliceTitle(title)}</h3>
          <div className={styles.source}>
            <img src={newsSourceIcon.src} alt="source" />
            {source}
          </div>
        </div>
      </a>
    </div>
  );
}
