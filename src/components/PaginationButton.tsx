import { Button } from "./ui/button";

interface PaginationButtonsProps {
  pageIndex: number;
  totalPages?: number;
  isLoading: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export function PaginationButtons({
  pageIndex,
  totalPages,
  isLoading,
  handleNextPage,
  handlePreviousPage,
}: PaginationButtonsProps) {
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
        <Button disabled={isLoading} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
