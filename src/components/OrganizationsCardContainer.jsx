import "../styles/global.css";
import Card from "@layouts/Card.jsx";
import styles from "../styles/components/OrganizationsCardContainer.module.css";
import { useState, useEffect } from "react";

// Sample organization JSON data
import organizationJSON from "../data/organizations.json";

const OrganizationsCardContainer = () => {
	let [organizationCounter, setOrganizationCounter] = useState(12);
	let [isBtnVisible, setIsBtnVisible] = useState(true);

	function handleLoadMore() {
		setOrganizationCounter((prevCounter) => prevCounter + 4);
	}

	useEffect(() => {
		if (organizationCounter >= organizationJSON.length) {
			setIsBtnVisible(false);
		}
	}, [organizationCounter]);

	return (
		<div className={`${styles["section-container"]} section-container`}>
			<div className={styles["card-wrapper"]}>
				{organizationJSON
					.slice(0, organizationCounter)
					.map((organization, index) => (
						<Card key={index} data={organization} />
					))}
			</div>

			{isBtnVisible && (
				<button className={styles["load-more-btn"]} onClick={handleLoadMore}>
					Load More
				</button>
			)}
		</div>
	);
};

export default OrganizationsCardContainer;
