import { parseAsInteger, useQueryStates } from 'nuqs';
import { useCallback, useMemo } from 'react';

type DefaultPagination = {
  limit: number;
  offset: number;
};

export const usePagination = (params?: DefaultPagination) => {
  const { limit = 10, offset = 0 } = params || {};
  const [pagination, setPagination] = useQueryStates(
    {
      limit: parseAsInteger.withDefault(limit),
      offset: parseAsInteger.withDefault(offset),
    },
    {
      history: 'replace',
    }
  );

  const setPrevPage = () => {
    setPagination((prev) => ({
      ...prev,
      offset: Math.max(prev.offset - prev.limit, 0),
    }));
  };

  const setNextPage = useCallback(
    () =>
      setPagination((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      })),
    []
  );

  const setLimit = useCallback(
    (limit: number | string) =>
      setPagination((prev) => ({
        ...prev,
        limit: Number(limit),
        // reset offset when changing limit
        offset: 0,
      })),
    []
  );

  const setPage = useCallback((page: number | string) => {
    setPagination((prev) => {
      return {
        ...prev,
        // calculate new offset
        offset: (Number(page) - 1) * prev.limit,
      };
    });
  }, []);

  const resetPagination = useCallback(
    () => setPagination({ limit: limit, offset: offset }),
    []
  );

  const currentPage = useMemo(() => {
    const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
    return currentPage;
  }, [pagination]);

  return {
    pagination,
    currentPage,
    setPagination,
    setNextPage,
    setPrevPage,
    setPage,
    setLimit,
    resetPagination,
  };
};
