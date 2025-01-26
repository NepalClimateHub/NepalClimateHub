import '../styles/global.css';
import { Card } from '@layouts/Card.jsx';
import { type CSSProperties, useEffect, useState } from 'react';
import type { Organization } from 'src/interfaces/organizationInterface';
import styles from '../styles/components/CardContainer.module.css';

// cardsArray consists of JSON data of either organizations or climate activists
// this is a reuseable template in organization landing page card section and activists landing page card sections

interface CardContainerProps {
  cardsArray: Organization[];
  dataType: string;
  cardProfilePictureBgSize: CSSProperties['objectFit'];
  cardPadding: string;
  initialCardCount: string;
}

export const CardContainer = ({
  cardsArray,
  dataType,
  cardProfilePictureBgSize,
  cardPadding,
  initialCardCount,
}: CardContainerProps) => {
  const [cardCounter, setCardCounter] = useState(
    Number.parseInt(initialCardCount)
  );
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  function handleLoadMore() {
    setCardCounter((prevCounter) => prevCounter + 4);
  }

  useEffect(() => {
    if (cardCounter >= cardsArray.length) {
      setIsBtnVisible(false);
    }
  }, [cardCounter]);

  return (
    <div className={`${styles['section-container']} section-container`}>
      <div className={styles['card-wrapper']}>
        {cardsArray.slice(0, cardCounter).map((cardData) => (
          <Card
            key={cardData.id}
            data={cardData}
            dataType={dataType}
            cardProfilePictureBgSize={cardProfilePictureBgSize}
            cardPadding={cardPadding}
          />
        ))}
      </div>

      {isBtnVisible && (
        <button
          type="button"
          className={styles['load-more-btn']}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};
