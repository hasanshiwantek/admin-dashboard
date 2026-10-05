"use client";

import ChipList from "@/components/Chips/ChipList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

const TEXT = "text-xl! 2xl:text-[1.6rem]!";

export type PickerPage<T extends SelectOption> = {
  items: T[];
  total: number;
  totalPages: number;
};

export type PagedPickerDialogProps<T extends SelectOption> = {
  title: string;
  /** Current selection; kept across pages and searches until Apply. */
  value: SelectOption[];
  onApply: (value: SelectOption[]) => void;
  onClose: () => void;
  fetchPage: (args: {
    page: number;
    pageSize: number;
    keyword: string;
  }) => Promise<PickerPage<T>>;
  /** Singular / plural noun for the count, e.g. ["Brand", "Brands"]. */
  noun: [string, string];
  searchPlaceholder?: string;
  /** true: search as the user types; false: search on button / Enter. */
  searchOnType?: boolean;
  /** Show the current picks as removable chips above the search box. */
  showSelectedChips?: boolean;
  /** Allow one pick only; ticking an item replaces the current pick. */
  single?: boolean;
  pageSize?: number;
  /** Row content after the checkbox; defaults to the item's label. */
  renderItem?: (item: T) => ReactNode;
};

/**
 * Dialog with a searchable, paged list of checkboxes (e.g. "Select Brands",
 * "Select Products"). Picks are committed with Apply.
 */
export function PagedPickerDialog<T extends SelectOption>({
  title,
  value,
  onApply,
  onClose,
  fetchPage,
  noun,
  searchPlaceholder = "Search",
  searchOnType = false,
  showSelectedChips = false,
  single = false,
  pageSize = 10,
  renderItem = (item) => item.label,
}: PagedPickerDialogProps<T>) {
  const [picked, setPicked] = useState<SelectOption[]>(value);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PickerPage<T>>({
    items: [],
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  // Typing searches after a short pause when `searchOnType`.
  useEffect(() => {
    if (!searchOnType) return;
    const timer = setTimeout(() => {
      setPage(1);
      setKeyword(search.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search, searchOnType]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPage({ page, pageSize, keyword })
      .catch(() => ({ items: [], total: 0, totalPages: 1 }))
      .then((next) => {
        if (cancelled) return;
        setResult(next);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchPage, page, pageSize, keyword]);

  const runSearch = () => {
    setPage(1);
    setKeyword(search.trim());
  };

  // Back to the unfiltered first page, as when the dialog opened.
  const clearSearch = () => {
    setSearch("");
    setPage(1);
    setKeyword("");
  };

  const isPicked = (item: T) =>
    picked.some((other) => other.value === item.value);

  // Store plain { value, label } picks, not the whole fetched row.
  const toggle = (item: T, checked: boolean) =>
    setPicked((current) =>
      checked
        ? [
            ...(single ? [] : current),
            { value: item.value, label: item.label },
          ]
        : current.filter((other) => other.value !== item.value),
    );

  const first = result.total ? (page - 1) * pageSize + 1 : 0;
  const last = Math.min(page * pageSize, result.total);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[80rem] p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl! 2xl:text-[2.4rem]! font-normal!">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Title and footer stay put; chips, search, count and list scroll
            together as one area. */}
        <div className="flex flex-col h-[48rem] mt-4 overflow-y-auto pr-2">
          {showSelectedChips && (
            <ChipList
              className="mb-1"
              chips={picked.map((item) => ({
                id: item.value,
                label: item.label,
                onRemove: () =>
                  setPicked((current) =>
                    current.filter((other) => other.value !== item.value),
                  ),
              }))}
            />
          )}
          <div className="flex items-center gap-4 py-3 border-b border-gray-200">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-gray-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Don't submit a form behind the dialog.
                    e.preventDefault();
                    runSearch();
                  }
                }}
                placeholder={searchPlaceholder}
                className="max-w-none pl-12 pr-12"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              )}
            </div>
            {!searchOnType && (
              <Button
                type="button"
                variant="outline"
                size="xl"
                className={cn(TEXT, "my-0")}
                onClick={runSearch}
              >
                Search
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className={cn(TEXT, "text-gray-800")}>
              {result.total} {result.total === 1 ? noun[0] : noun[1]}
            </span>
            <div className="flex items-center gap-2">
              <span className={cn(TEXT, "text-gray-700")}>
                {first} - {last} of {result.total}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Previous page"
                disabled={page <= 1 || loading}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="size-6" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Next page"
                disabled={page >= result.totalPages || loading}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="size-6" />
              </Button>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="size-8 animate-spin text-blue-600" />
              </div>
            ) : result.items.length ? (
              result.items.map((item) => (
                <label
                  key={item.value}
                  className={cn(
                    TEXT,
                    "flex items-center gap-6 px-2 py-4 border-b border-gray-200 text-gray-800 cursor-pointer hover:bg-gray-50",
                  )}
                >
                  <Checkbox
                    checked={isPicked(item)}
                    onCheckedChange={(checked) => toggle(item, checked === true)}
                  />
                  {renderItem(item)}
                </label>
              ))
            ) : (
              <p className={cn(TEXT, "py-10 text-center text-gray-500")}>
                No {noun[1].toLowerCase()} found
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 gap-4">
          <Button
            type="button"
            variant="link"
            className={cn(TEXT, "h-auto p-0! text-blue-600!")}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="xl"
            className={cn("btn-primary", TEXT)}
            onClick={() => onApply(picked)}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PagedPickerDialog;
