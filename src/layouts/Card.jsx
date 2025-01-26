import { BiTargetLock } from 'react-icons/bi';
import styles from '../styles/components/Card.module.css';

const Card = ({ data, dataType, cardProfilePictureBgSize, cardPadding }) => {
  let url;
  if (dataType === 'organization') {
    url = `/organizations/${data.slug}`;
  } else if (dataType === 'activist') {
    url = `/climate-champions/${data.slug}`;
  } else {
    url = `/events/${data.slug}`;
  }

  return (
    <a className={styles['organization-card']} href={url}>
      <div className={styles['logo-wrapper']} style={{ padding: cardPadding }}>
        <img
          src={data.logoUrl}
          alt={data.name}
          style={{ objectFit: cardProfilePictureBgSize }}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles['organization-name']}>{data.name}</h3>
        <p className={styles.location}>
          <span className={styles.icon}>
            <BiTargetLock />
          </span>
          <span className={styles.address}>{data.address}</span>
        </p>
        <p className={styles.description}>
          {`${data.description.substring(0, 112)}...`}
        </p>
        <div className={styles.tags}>
          {data.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Card;
