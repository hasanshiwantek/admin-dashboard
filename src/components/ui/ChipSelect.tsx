"use client";

import Chip from "@/components/Chips/Chips";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

const TEXT = "text-xl! 2xl:text-[1.6rem]!";

export type ChipSelectProps = {
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  /** Static options; filtered as the user types when `searchable`. */
  options?: SelectOption[];
  /** Async search, debounced; used instead of `options` when provided. */
  loadOptions?: (query: string) => Promise<SelectOption[]>;
  /**
   * true (default): type to search, click a result to add it.
   * false: a dropdown of checkboxes over `options`, for short fixed lists.
   */
  searchable?: boolean;
  /** Allow one pick only; the search box hides once something is picked. */
  single?: boolean;
  placeholder?: string;
  "aria-invalid"?: boolean;
  className?: string;
};

/** Multi-select whose picks show as removable chips in the field. */
export function ChipSelect({
  value,
  onChange,
  options = [],
  loadOptions,
  searchable = true,
  single,
  placeholder = searchable ? "Search" : "Select",
  "aria-invalid": invalid,
  className,
}: ChipSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remote, setRemote] = useState<SelectOption[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const showInput = searchable && !(single && value.length);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!loadOptions || !open) return;
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await loadOptions(query.trim());
        if (!cancelled) setRemote(results);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadOptions, open, query]);

  const selected = useMemo(
    () => new Set(value.map((item) => item.value)),
    [value],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (loadOptions ? remote : options).filter(
      (option) =>
        !selected.has(option.value) &&
        (loadOptions || option.label.toLowerCase().includes(needle)),
    );
  }, [loadOptions, remote, options, query, selected]);

  // Values may carry only an id (e.g. loaded from an API); prefer the
  // matching option's label when there is one.
  const chipLabel = (item: SelectOption) =>
    options.find((option) => option.value === item.value)?.label ??
    item.label;

  const remove = (item: SelectOption) =>
    onChange(value.filter((other) => other.value !== item.value));

  const pick = (option: SelectOption) => {
    onChange(single ? [option] : [...value, option]);
    setQuery("");
    if (single) setOpen(false);
    else inputRef.current?.focus();
  };

  // Checkbox mode keeps picks in option order, whatever order they're ticked.
  const toggle = (option: SelectOption, checked: boolean) =>
    onChange(
      options.filter((item) =>
        item.value === option.value ? checked : selected.has(item.value),
      ),
    );

  const chips = value.map((item) => (
    <Chip key={item.value} label={chipLabel(item)} onRemove={() => remove(item)} />
  ));

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full max-w-[56rem]", className)}
    >
      {searchable ? (
        <div
          onClick={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}
          className={cn(
            "flex flex-wrap items-center gap-2 min-h-13 px-3 py-1.5 rounded-sm bg-white cursor-text",
            "border border-[#d1d0d4] hover:border-[#86848c]",
            invalid && "border-destructive",
          )}
        >
          <Search className="size-6 text-gray-500 shrink-0" />
          {chips}
          {showInput && (
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={value.length ? "" : placeholder}
              aria-invalid={invalid}
              className={cn(
                TEXT,
                "flex-1 min-w-[12rem] outline-none bg-transparent placeholder:text-gray-400",
              )}
            />
          )}
        </div>
      ) : (
        <div
          role="combobox"
          tabIndex={0}
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={invalid}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(!open);
            } else if (e.key === "Escape") setOpen(false);
          }}
          className={cn(
            "flex items-center gap-2 min-h-13 px-3 py-1.5 rounded-sm bg-white cursor-pointer outline-none",
            "border border-[#d1d0d4] hover:border-[#86848c]",
            open && "border-blue-500 ring-1 ring-blue-300",
            invalid && "border-destructive",
          )}
        >
          <div className="flex flex-1 flex-col gap-1.5 min-w-0">
            {value.length > 0 && (
              // Removing a chip shouldn't also toggle the dropdown.
              <div
                className="flex flex-wrap gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {chips}
              </div>
            )}
            <span className={cn(TEXT, "text-gray-400")}>{placeholder}</span>
          </div>
          <ChevronDown className="size-6 text-gray-600 shrink-0" />
        </div>
      )}

      {open && (searchable ? showInput : true) && (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable={!single}
          className={cn(
            "absolute left-0 top-full z-20 mt-1 max-h-80 overflow-auto rounded-md border bg-white shadow-lg",
            searchable ? "w-full" : "min-w-full w-max max-w-[40rem] p-1",
          )}
        >
          {!searchable ? (
            options.map((option) => (
              <li key={option.value}>
                <label
                  className={cn(
                    TEXT,
                    "flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-gray-50 cursor-pointer",
                  )}
                >
                  <Checkbox
                    checked={selected.has(option.value)}
                    onCheckedChange={(checked) =>
                      toggle(option, checked === true)
                    }
                  />
                  {option.label}
                </label>
              </li>
            ))
          ) : loading ? (
            <li className={cn(TEXT, "px-4 py-3 text-gray-500")}>
              Searching...
            </li>
          ) : results.length ? (
            results.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => pick(option)}
                  className={cn(
                    TEXT,
                    "w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer",
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))
          ) : (
            <li className={cn(TEXT, "px-4 py-3 text-gray-500")}>
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default ChipSelect;
