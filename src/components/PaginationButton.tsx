"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface PaginationButtonsProps {
  pageIndex: number;
  totalCount?: number;
  perPage?: number;
  isLoading: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export function PaginationButtons({
  pageIndex,
  totalCount,
  perPage,
  isLoading,
  handleNextPage,
  handlePreviousPage,
}: PaginationButtonsProps) {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (totalCount && perPage) {
      setTotalPages(Math.ceil(totalCount / perPage));
    }
  }, [totalCount, perPage]);

  return (
    <div className="flex justify-end absolute bottom-2 right-8">
      <div className="flex items-center gap-2">
        <Button
          disabled={pageIndex <= 1 || isLoading}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <span>
          {pageIndex} ... {totalPages}
        </span>
        <Button disabled={isLoading || totalPages <= pageIndex} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
