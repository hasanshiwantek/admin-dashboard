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
  const getVisiblePages = () => {
    if (totalPages <= 7) return [...Array(totalPages).keys()].map((i) => i + 1);

    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex items-center justify-start gap-5 px-2 text-lg ">
      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="text-gray-500 px-1">
              ...
            </span>
          ) : (
            <Button
              key={i}
              variant={currentPage === page ? "secondary" : "ghost"}
              size="lg"
              className={`h-7 w-7 p-2 text-blue-600 font-medium text-xl cursor-pointer hover:text-gray-400 hover:border ${
                currentPage === page && "bg-gray-400 text-white"
              }`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          )
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="text-blue-600 mx-4 text-xl"
          >
            Next
          </button>
        )}
      </div>

      {/* View per page */}
      <div className="flex items-center">
        <Select value={perPage} onValueChange={onPerPageChange}>
          <SelectTrigger className="">
            <SelectValue placeholder={`View ${perPage}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">View 20</SelectItem>
            <SelectItem value="10">View 10</SelectItem>
            <SelectItem value="30">View 30</SelectItem>
            <SelectItem value="50">View 50</SelectItem>
            <SelectItem value="100">View 100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
