"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: string;
  onPerPageChange: (value: string) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
}: PaginationProps) => {
  const getVisiblePages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex items-center justify-start gap-5 px-2 text-lg">
      <div className="flex items-center space-x-3">
        {getVisiblePages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="text-gray-500 px-2">
              ...
            </span>
          ) : (
            <Button
              type="button"
              key={`page-${page}`}
              variant={currentPage === page ? "secondary" : "ghost"}
            
              size="lg"
              className={`h-7 w-7  px-6 py-2 text-blue-600 font-medium text-xl cursor-pointer hover:text-gray-400 hover:border ${currentPage === page && "bg-gray-400 text-white"
                }`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          )
        )}

        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className="text-blue-600 mx-4 text-xl"
          >
            Next
          </button>
        )}
      </div>

      {/* View per page */}
      <Select value={perPage} onValueChange={onPerPageChange}>
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder={`View ${perPage}`} />
        </SelectTrigger>
        <SelectContent>
          {["10", "20", "30", "50", "100"].map((val) => (
            <SelectItem key={val} value={val}>
              View {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Pagination;