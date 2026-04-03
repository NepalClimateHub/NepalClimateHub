import '../styles/global.css';
import { Card } from '@layouts/Card';
import { useEffect, useState } from 'react';
import styles from '../styles/components/CardContainer.module.css';
import Pagination from './Pagination';

// Generic props for card container
interface CardContainerProps<T> {
  cardsArray: T[];
  dataType: string;
  initialCardCount: number | string;
}

export const CardContainer = <T extends { id: string | number }>({
  cardsArray,
  dataType,
  initialCardCount,
}: CardContainerProps<T>) => {
  // Handle the case where initialCardCount might be a string like "12/"
  const parsedInitialCount =
    typeof initialCardCount === 'string'
      ? Number.parseInt(initialCardCount.replace('/', ''), 10)
      : Number.parseInt(initialCardCount.toString());

  const itemsPerPage = parsedInitialCount || 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(cardsArray.length / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cardsArray.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when cardsArray changes (e.g., when filters change)
  useEffect(() => {
    setCurrentPage(1);
  }, [cardsArray.length]);

  return (
    <div className={`${styles['section-container']} section-container`}>
      <div className={styles['card-wrapper']}>
        {currentItems.map((cardData) => (
          <Card key={cardData.id} data={cardData} dataType={dataType} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
