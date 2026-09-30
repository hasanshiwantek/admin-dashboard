"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

const ELLIPSIS = "...";
const DEFAULT_PER_PAGE_OPTIONS = ["10", "20", "30", "50", "100"];

type PageItem = number | typeof ELLIPSIS;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: string;
  onPerPageChange: (value: string) => void;
  siblingCount?: number;
  boundaryCount?: number;
  perPageOptions?: string[];
  showPerPage?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  className?: string;
};

const range = (start: number, end: number) =>
  end < start
    ? []
    : Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const getPageItems = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
  boundaryCount = 1,
): PageItem[] => {
  if (totalPages < 1) return [];
  const page = Math.min(Math.max(currentPage, 1), totalPages);

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length ? endPages[0] - 2 : totalPages - 1,
  );

  // Where a gap is a single page, show that page instead of an ellipsis.
  const leftGap: PageItem[] =
    siblingsStart > boundaryCount + 2
      ? [ELLIPSIS]
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : [];
  const rightGap: PageItem[] =
    siblingsEnd < totalPages - boundaryCount - 1
      ? [ELLIPSIS]
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : [];

  return [
    ...startPages,
    ...leftGap,
    ...range(siblingsStart, siblingsEnd),
    ...rightGap,
    ...endPages,
  ];
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
  showPerPage = true,
  showPrevious = false,
  showNext = true,
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
}: PaginationProps) => {
  const pages = useMemo(
    () => getPageItems(currentPage, totalPages, siblingCount, boundaryCount),
    [currentPage, totalPages, siblingCount, boundaryCount],
  );

  // Keep a custom page size selectable even when it isn't a preset.
  const sizeOptions = useMemo(
    () =>
      perPageOptions.includes(perPage)
        ? perPageOptions
        : [...perPageOptions, perPage].sort((a, b) => Number(a) - Number(b)),
    [perPageOptions, perPage],
  );

  const goTo = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage)
      onPageChange(page);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-start gap-5 px-2 text-lg",
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        {showPrevious && currentPage > 1 && (
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            className="text-blue-600 mx-4 text-xl cursor-pointer"
          >
            {previousLabel}
          </button>
        )}

        {pages.map((page, i) =>
          page === ELLIPSIS ? (
            <span key={`ellipsis-${i}`} className="text-gray-500 px-2">
              {ELLIPSIS}
            </span>
          ) : (
            <Button
              type="button"
              key={`page-${page}`}
              variant={currentPage === page ? "secondary" : "ghost"}
              size="lg"
              aria-current={currentPage === page ? "page" : undefined}
              className={cn(
                "h-7 w-7 px-6 py-2 text-blue-600 font-medium text-xl cursor-pointer hover:text-gray-400 hover:border",
                currentPage === page && "bg-gray-400 text-white",
              )}
              onClick={() => goTo(page)}
            >
              {page}
            </Button>
          ),
        )}

        {showNext && currentPage < totalPages && (
          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            className="text-blue-600 mx-4 text-xl cursor-pointer"
          >
            {nextLabel}
          </button>
        )}
      </div>

      {showPerPage && (
        <Select value={perPage} onValueChange={onPerPageChange}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder={`View ${perPage}`} />
          </SelectTrigger>
          <SelectContent>
            {sizeOptions.map((val) => (
              <SelectItem key={val} value={val}>
                View {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default Pagination;
