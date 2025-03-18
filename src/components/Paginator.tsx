import { type FC, useMemo } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import type { usePagination } from 'src/hooks/use-pagination';

type PaginatorProps = {
  totalCount: number;
  paginationOptions: ReturnType<typeof usePagination>;
};

const edgePageCount = 2;
const middlePagesSiblingCount = 2;

export const Paginator: FC<PaginatorProps> = ({
  totalCount,
  paginationOptions,
}) => {
  const { pagination, currentPage, setNextPage, setPage, setPrevPage } =
    paginationOptions;

  const { totalPages, isFirstPage, isLastPage } = useMemo(() => {
    const { limit, offset } = pagination;
    const totalPages = Math.floor(totalCount / limit);
    const isFirstPage = offset === 0;
    const isLastPage = offset === (totalPages - 1) * limit;

    return {
      limit,
      offset,
      totalPages,
      isFirstPage,
      isLastPage,
    };
  }, [pagination]);

  const pageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    const startPages = [...Array(edgePageCount)].map((_, i) => i + 1);
    const endPages = [...Array(edgePageCount)].map(
      (_, i) => totalPages - edgePageCount + 1 + i
    );
    const middleStart = Math.max(
      edgePageCount + 1,
      currentPage - middlePagesSiblingCount
    );
    const middleEnd = Math.min(
      totalPages - edgePageCount,
      currentPage + middlePagesSiblingCount
    );

    if (middleStart > edgePageCount + 1) pages.push('...');
    for (let i = middleStart; i <= middleEnd; i++) pages.push(i);
    if (middleEnd < totalPages - edgePageCount) pages.push('...');

    return [
      ...startPages,
      ...pages,
      ...endPages.filter((page) => page > edgePageCount),
    ];
  }, [currentPage, totalPages, edgePageCount, middlePagesSiblingCount]);

  // version three
  return (
    <div className="py-8 flex items-center justify-center gap-3 w-full h-12 text-sm select-none">
      {/* Previous Page Button */}
      <button
        type="button"
        className={`h-8 w-8 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform 
                    ${isFirstPage ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-700 hover:bg-blue-100'} 
                    font-sans text-base disabled:opacity-50 hover:scale-105`}
        disabled={isFirstPage}
        onClick={() => setPrevPage()}
      >
        <IoMdArrowDropleft
          size={20}
          className="transition-transform duration-300 ease-in-out"
        />
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            type="button"
            className={`h-8 w-8 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform 
                    ${page === currentPage ? 'bg-blue-900 text-white font-semibold text-base shadow-sm shadow-gray-700/45 scale-125 !mx-2' : 'bg-gray-50 text-gray-600 hover:bg-blue-100 hover:scale-115'} 
                    font-sans text-sm font-medium disabled:bg-transparent`}
            onClick={() => typeof page === 'number' && setPage(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        type="button"
        className={`h-8 w-8 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform 
                    ${isLastPage ? 'bg-gray-200 text-gray-400' : 'bg-gray-50 text-gray-700 hover:bg-blue-100'} 
                    font-sans text-base disabled:opacity-50`}
        disabled={isLastPage}
        onClick={() => setNextPage()}
      >
        <IoMdArrowDropright
          size={20}
          className="transition-transform duration-300 ease-in-out"
        />
      </button>
    </div>
  );
};
