import type { CSSProperties } from "react";
import { BiTargetLock } from "react-icons/bi";
import type { Organization } from "src/interfaces/organizationInterface";
import styles from "../styles/components/Card.module.css";

interface CardProps {
  data: Organization;
  dataType: string;
  cardProfilePictureBgSize: CSSProperties["objectFit"];
  cardPadding: string;
}

export const Card = ({
  data,
  dataType,
  cardProfilePictureBgSize,
  cardPadding,
}: CardProps) => {
  let url = "";
  if (dataType === "organization") {
    url = `/organizations/${data.slug}`;
  } else if (dataType === "activist") {
    url = `/climate-champions/${data.slug}`;
  } else if (dataType === "events") {
    url = `/events/${data.slug}`;
  } else if (dataType === "opportunities") {
    url = `/opportunities/${data.slug}`;
  }

  return (
    <a className={styles["organization-card"]} href={url}>
      <div className={styles["logo-wrapper"]} style={{ padding: cardPadding }}>
        <img
          src={data.logoUrl}
          alt={data.name}
          style={{ objectFit: cardProfilePictureBgSize }}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles["organization-name"]}>{data.name}</h3>
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
            <span key={`${tag}-${index}`} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};
