import type { CSSProperties } from "react";
import { BiMap } from "react-icons/bi";
import styles from "../styles/components/Card.module.css";
import { createSlug } from "../utils/slug";
import documentaryThumbnail from "../assets/documentary.png";
import podcastThumbnail from "../assets/podcast.png";
import coursesThumbnail from "../assets/courses.png";
import planPoliciesThumbnail from "../assets/plan-policies.png";
import dataThumbnail from "../assets/data.png";
import researchArticleThumbnail from "../assets/research-article.png";
import thesisThumbnail from "../assets/thesis.png";
import toolkitsGuidesThumbnail from "../assets/toolkits-guides.png";
import defaultThumbnail from "../assets/documentary.png";
import youtubePlayButton from "../assets/youtube-play-button.png";
import youtubeLogo from "../assets/youtubeLogo.png";

interface CardProps<T = any> {
  data: T;
  dataType: string;
}

export const Card = <T,>({ data, dataType }: CardProps<T>) => {
  const isEvent = dataType === "events";
  const isOpportunity = dataType === "opportunities";
  const isOrganization = dataType === "organization";
  const isResource = dataType === "resources";

  // Get thumbnail based on resource type
  const getResourceThumbnail = (type: string) => {
    switch (type) {
      case "Documentary":
        return documentaryThumbnail.src;
      case "Podcasts & Television":
        return podcastThumbnail.src;
      case "Courses":
        return coursesThumbnail.src;
      case "Plans & Policies":
        return planPoliciesThumbnail.src;
      case "Data Resources":
        return dataThumbnail.src;
      case "Research Articles":
        return researchArticleThumbnail.src;
      case "Theses & Dissertations":
        return thesisThumbnail.src;
      case "Toolkits & Guides":
        return toolkitsGuidesThumbnail.src;
      case "Reports":
        return researchArticleThumbnail.src;
      case "Case Studies":
      case "Platforms":
        return coursesThumbnail.src;
      default:
        return defaultThumbnail.src;
    }
  };

  // Check if resource should show YouTube elements
  const shouldShowYouTubeElements = (type: string) => {
    return type === "Documentary" || type === "Podcasts & Television";
  };

  // Handle different property names based on data type
  const title = (data as any).title || (data as any).name || "";
  const location =
    (data as any).location ||
    (data as any).locationType ||
    (data as any).address ||
    (data as any).level ||
    "";
  const description = (data as any).description || (data as any).about || "";
  const categories = (data as any).category || (data as any).tags || [];

  // Handle different image property names based on data type
  let image = "";
  if (isEvent || isOpportunity) {
    image = (data as any).bannerImage;
  } else if (isOrganization) {
    image = (data as any).logoUrl || (data as any).logo;
  } else if (isResource) {
    // Use bannerImageUrl from API if available, otherwise use type-based thumbnail
    image = (data as any).bannerImageUrl || "/placeholder.svg";
  } else {
    image =
      (data as any).image || (data as any).profilePicture || "/placeholder.svg";
  }

  let url = "";
  if (isOrganization) {
    url = `/organizations/${(data as any).slug}`;
  } else if (dataType === "activist") {
    url = `/climate-champions/${(data as any).slug}`;
  } else if (isEvent) {
    // Generate a slug from the title for events
    const slug = createSlug(title);
    url = `/events/${slug}`;
  } else if (isOpportunity) {
    // Generate a slug from the title for opportunities
    const slug = createSlug(title);
    url = `/opportunities/${slug}`;
  } else if (isResource) {
    url = (data as any).href;
  }

  if (isResource) {
    const resourceType = (data as any).type;
    const bannerImageUrl = (data as any).bannerImageUrl;
    const showYouTubeElements = shouldShowYouTubeElements(resourceType);

    // Use bannerImageUrl if available, otherwise fall back to type-based thumbnail
    const thumbnailSrc =
      bannerImageUrl && bannerImageUrl.trim() !== ""
        ? bannerImageUrl
        : getResourceThumbnail(resourceType);

    const normalizedTag = (tag: string) => tag.toLowerCase().replace(/_/g, " ");

    return (
      <a className={styles["resource-card"]} href={url} target="_blank">
        <div className={styles["resource-thumbnail-container"]}>
          <img
            src={thumbnailSrc}
            alt={`${resourceType} thumbnail`}
            className={styles["resource-thumbnail"]}
            style={
              bannerImageUrl
                ? {
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }
                : undefined
            }
          />
          {showYouTubeElements && !bannerImageUrl && (
            <>
              <img
                src={youtubePlayButton.src}
                alt="Play button"
                className={styles["play-button"]}
              />
              <div className={styles["youtube-badge"]}>
                <span className={styles["youtube-text"]}>Watch on</span>
                <img
                  src={youtubeLogo.src}
                  alt="YouTube"
                  className={styles["youtube-logo"]}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles["resource-content"]}>
          <h3 className={styles["resource-title"]}>{title}</h3>
          <p className={styles["resource-description"]}>
            {description.length > 150
              ? `${description.substring(0, 150)}...`
              : description}
          </p>
          <div className={styles["resource-tags"]}>
            <span className={styles["resource-tag"]}>
              {normalizedTag(resourceType)}
            </span>
            <span className={styles["resource-tag"]}>
              {normalizedTag(location)}
            </span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a className={styles["organization-card"]} href={url}>
      <div className={styles["logo-wrapper"]}>
        <img
          src={image}
          alt={`${title} Logo`}
          style={
            isOrganization ? { objectFit: "contain", padding: "20px" } : {}
          }
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles["organization-name"]}>{title}</h3>
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
    </a>
  );
};
