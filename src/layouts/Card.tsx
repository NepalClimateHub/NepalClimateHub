import type { CSSProperties } from 'react';
import { BiMap } from 'react-icons/bi';
import styles from '../styles/components/Card.module.css';
import { createSlug } from '../utils/slug';

interface CardProps<T = any> {
  data: T;
  dataType: string;
  cardProfilePictureBgSize: CSSProperties['objectFit'];
  cardPadding: string;
}

export const Card = <T,>({
  data,
  dataType,
  cardProfilePictureBgSize,
  cardPadding,
}: CardProps<T>) => {
  const isEvent = dataType === 'events';
  const isOpportunity = dataType === 'opportunities';
  const isOrganization = dataType === 'organization';

  // Handle different property names based on data type
  const title = (data as any).title || (data as any).name || '';
  const location =
    (data as any).location ||
    (data as any).locationType ||
    (data as any).address ||
    '';
  const description = (data as any).description || (data as any).about || '';
  const categories = (data as any).category || (data as any).tags || [];

  // Handle different image property names based on data type
  let image = '';
  if (isEvent || isOpportunity) {
    image = (data as any).bannerImage || '/images/event-placeholder.jpg';
  } else if (isOrganization) {
    image =
      (data as any).logoUrl ||
      (data as any).logo ||
      '/images/organization-placeholder.jpg';
  } else {
    image =
      (data as any).image || (data as any).profilePicture || '/placeholder.svg';
  }

  let url = '';
  if (isOrganization) {
    url = `/organizations/${(data as any).slug}`;
  } else if (dataType === 'activist') {
    url = `/climate-champions/${(data as any).slug}`;
  } else if (isEvent) {
    // Generate a slug from the title for events
    const slug = createSlug(title);
    url = `/events/${slug}`;
  } else if (isOpportunity) {
    // Generate a slug from the title for opportunities
    const slug = createSlug(title);
    url = `/opportunities/${slug}`;
  }

  return (
    <a className={styles['organization-card']} href={url}>
      {isOrganization ? (
        // Organization card layout
        <>
          <div
            className={styles['logo-wrapper']}
            style={{
              padding: cardPadding,
              height: '160px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={image || '/placeholder.svg'}
              alt={`${title} Logo`}
              style={{
                objectFit: cardProfilePictureBgSize,
                maxWidth: '90%',
                maxHeight: '90%',
                borderRadius: '4px',
              }}
            />
          </div>
          <div className={styles.details}>
            <h3 className={styles['organization-name']}>{title}</h3>
            <p className={styles.location}>
              <span className={styles.icon}>
                <BiMap />
              </span>
              <span className={styles.address}>{location}</span>
            </p>
            <p className={styles.description}>
              {description.length > 110
                ? `${description.substring(0, 110)}...`
                : description}
            </p>
            <div className={styles.tags}>
              {categories.slice(0, 3).map((tag: string, index: number) => (
                <span key={`${tag}-${index}`} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Event/Opportunity card layout
        <>
          <div
            className={styles['logo-wrapper']}
            style={{
              padding: cardPadding,
              height: '160px',
              overflow: 'hidden',
            }}
          >
            <img
              src={image || '/placeholder.svg'}
              alt={`${title} Banner`}
              style={{
                objectFit: cardProfilePictureBgSize,
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
            />
          </div>
          <div className={styles.details}>
            <h3 className={styles['organization-name']}>{title}</h3>
            <p className={styles.location}>
              <span className={styles.icon}>
                <BiMap />
              </span>
              <span className={styles.address}>{location}</span>
            </p>
            <p className={styles.description}>
              {description.length > 110
                ? `${description.substring(0, 110)}...`
                : description}
            </p>
            <div className={styles.tags}>
              {categories.slice(0, 3).map((tag: string, index: number) => (
                <span key={`${tag}-${index}`} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </a>
  );
};
