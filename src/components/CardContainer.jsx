import "../styles/global.css";
import Card from "@layouts/Card.jsx";
import styles from "../styles/components/CardContainer.module.css";
import { useState, useEffect } from "react";

// cardsArray consists of JSON data of either organizations or climate activists
// this is a reuseable template in organization landing page card section and activists landing page card sections

const CardContainer = ({cardsArray, dataType}) => {
	let [cardCounter, setCardCounter] = useState(12); // initially show 12 cards
	let [isBtnVisible, setIsBtnVisible] = useState(true);

	function handleLoadMore() {
		setCardCounter((prevCounter) => prevCounter + 4); // while clicked show more button, show four more cards
	}

	useEffect(() => {
		if (cardCounter >= cardsArray.length) {
			setIsBtnVisible(false); // hide the show more btn if all cards are shown
		}
	}, [cardCounter]);

	return (
		<div className={`${styles["section-container"]} section-container`}>
			<div className={styles["card-wrapper"]}>
				{cardsArray
					.slice(0, cardCounter)
					.map((cardData, index) => (
						<Card key={index} data={cardData} dataType = {dataType} />
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

export default CardContainer;
