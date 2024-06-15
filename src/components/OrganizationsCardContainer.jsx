import "../styles/global.css";
import Card from "@layouts/Card";  
import styles from "../styles/components/OrganizationsCardContainer.module.css";

// Sample organization JSON data
import organizationJSON from "../data/organizations.json";

const OrganizationsCardContainer = () => {
  return (
    <div className={`${styles["section-container"]} section-container`}>
      <div className={styles["card-wrapper"]}>
        {
          organizationJSON.map((organization, index) => (
            <Card key={index} data={organization} />
          ))
        }
      </div>

      <button className={styles["load-more-btn"]}>Load More</button>
    </div>
  );
};

export default OrganizationsCardContainer;
