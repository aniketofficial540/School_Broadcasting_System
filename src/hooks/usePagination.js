import { useState, useEffect } from "react";

export function usePagination(items, itemsPerPage = 8) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage: setCurrentPage,
  };
}
