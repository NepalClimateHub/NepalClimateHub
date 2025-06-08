import '../styles/global.css';
import { Card } from '@layouts/Card';
import { type CSSProperties, useEffect, useState } from 'react';
import styles from '../styles/components/CardContainer.module.css';

// Generic props for card container
interface CardContainerProps<T> {
  cardsArray: T[];
  dataType: string;
  cardProfilePictureBgSize: CSSProperties['objectFit'];
  cardPadding: string;
  initialCardCount: number | string;
}

export const CardContainer = <T extends { id: string | number }>({
  cardsArray,
  dataType,
  cardProfilePictureBgSize,
  cardPadding,
  initialCardCount,
}: CardContainerProps<T>) => {
  // Handle the case where initialCardCount might be a string like "12/"
  const parsedInitialCount =
    typeof initialCardCount === 'string'
      ? Number.parseInt(initialCardCount.replace('/', ''), 10)
      : Number.parseInt(initialCardCount.toString());

  const [cardCounter, setCardCounter] = useState(parsedInitialCount || 8);
  const [isBtnVisible, setIsBtnVisible] = useState(true);

  function handleLoadMore() {
    setCardCounter((prevCounter) => prevCounter + 4);
  }

  useEffect(() => {
    if (cardCounter >= cardsArray.length) {
      setIsBtnVisible(false);
    } else {
      setIsBtnVisible(true);
    }
  }, [cardCounter, cardsArray.length]);

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
