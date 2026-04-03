import type React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../styles/components/Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      // Show ellipsis if there's a gap before current page area
      if (currentPage > 3) {
        pages.push('...');
      }

      // Calculate the range around current page (current-1, current, current+1)
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Add the pages in the current range
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          // Don't duplicate 1 or totalPages
          pages.push(i);
        }
      }

      // Show ellipsis if there's a gap after current page area
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page if it's not already included
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.paginationContainer}>
      {/* Previous arrow */}
      <button
        type="button"
        className={`${styles.pageButton} ${styles.arrowButton} ${
          currentPage === 1 ? styles.disabled : ''
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft className={styles.chevron} />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <div className={styles.ellipsis}>...</div>
          ) : (
            <button
              type="button"
              className={`${styles.pageButton} ${
                page === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      {/* Next arrow */}
      <button
        type="button"
        className={`${styles.pageButton} ${styles.arrowButton} ${
          currentPage === totalPages ? styles.disabled : ''
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight className={styles.chevron} />
      </button>
    </div>
  );
};

export default Pagination;
