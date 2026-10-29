"use client";

import Chip from "@/components/Chips/Chips";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, Loader2Icon, XIcon } from "lucide-react";
import {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type SelectFieldBaseProps<T> = {
  options: readonly T[];
  onBlur?: () => void;
  valueKey?: string;
  labelKey?: string;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  // A heading is shown above the first option of each group
  getOptionGroup?: (option: T) => string | undefined;
  renderOption?: (option: T) => ReactNode;
  emptyText?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  /** Options are still loading: disables the field and shows a spinner */
  loading?: boolean;
  loadingText?: string;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
};

type SingleSelectProps = {
  multi?: false;
  value?: string | number | null;
  onChange?: (value: string) => void;
  /** Show an x that clears the picked value (default true) */
  clearable?: boolean;
};

// Pick several options: chips in the box, checkboxes in the list
type MultiSelectProps = {
  multi: true;
  clearable?: never;
  value?: readonly string[] | null;
  onChange?: (value: string[]) => void;
};

type SelectFieldProps<T> = SelectFieldBaseProps<T> &
  (SingleSelectProps | MultiSelectProps);

const readKey = <T,>(option: T, key: string) =>
  String((option as Record<string, unknown>)[key] ?? "");

export function SelectField<T = SelectOption>({
  options,
  value,
  onChange,
  onBlur,
  multi,
  clearable = true,
  valueKey,
  labelKey,
  getOptionValue: getValueProp,
  getOptionLabel: getLabelProp,
  getOptionGroup,
  renderOption,
  emptyText = "No results found",
  placeholder,
  id,
  name,
  disabled,
  loading,
  loadingText = "Loading...",
  className,
  "aria-invalid": invalid,
  ref,
}: SelectFieldProps<T>) {
  const isDisabled = disabled || loading;
  const shownPlaceholder = loading ? loadingText : placeholder;
  const getOptionValue =
    getValueProp ?? ((option: T) => readKey(option, valueKey ?? "value"));
  const getOptionLabel =
    getLabelProp ?? ((option: T) => readKey(option, labelKey ?? "label"));

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selectedValues: string[] = multi
    ? [...((value as readonly string[] | null | undefined) ?? [])]
    : [];
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(getOptionValue(option)),
  );

  const currentValue = multi || value == null ? null : String(value);
  const selected = options.find(
    (option) => getOptionValue(option) === currentValue,
  );
  const selectedLabel = selected ? getOptionLabel(selected) : "";

  // Typing filters; just opening shows every option
  const search = filtering ? query.trim().toLowerCase() : "";
  const filtered = search
    ? options.filter((option) =>
        getOptionLabel(option).toLowerCase().includes(search),
      )
    : options;

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${highlighted}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, highlighted]);

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const openList = () => {
    if (isDisabled || open) return;
    setOpen(true);
    setQuery(multi ? "" : selectedLabel);
    setFiltering(false);
    setHighlighted(multi ? 0 : Math.max(0, options.indexOf(selected as T)));
  };

  const closeList = () => {
    setOpen(false);
    setFiltering(false);
    setQuery("");
    onBlur?.();
  };

  const setMultiValue = (next: string[]) =>
    (onChange as MultiSelectProps["onChange"])?.(next);

  const toggleOption = (option: T) => {
    const optionValue = getOptionValue(option);
    setMultiValue(
      selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue],
    );
  };

  const handleSelect = (option: T) => {
    if (multi) return toggleOption(option);
    (onChange as SingleSelectProps["onChange"])?.(getOptionValue(option));
    closeList();
  };

  const showClear = !multi && clearable && !!selectedLabel && !isDisabled;

  const handleClear = () => {
    (onChange as SingleSelectProps["onChange"])?.("");
    closeList();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) return openList();
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      const option = filtered[highlighted];
      if (option) handleSelect(option);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      closeList();
    } else if (
      event.key === "Backspace" &&
      multi &&
      !query &&
      selectedValues.length
    ) {
      setMultiValue(selectedValues.slice(0, -1));
    }
  };

  const inputProps = {
    ref: setInputRef,
    id,
    name,
    role: "combobox",
    autoComplete: "off",
    "aria-expanded": open,
    "aria-controls": listId,
    "aria-invalid": invalid,
    disabled: isDisabled,
    // Not on focus: a dialog auto-focuses its first field and would pop the list open
    onClick: openList,
    onChange: (event: { target: { value: string } }) => {
      setQuery(event.target.value);
      setFiltering(true);
      setHighlighted(0);
      if (!open) setOpen(true);
    },
    onKeyDown: handleKeyDown,
  };

  // Clicking the box (not a chip's remove button) moves focus to the search input
  const focusInput = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    inputRef.current?.focus();
    openList();
  };

  return (
    <Popover open={open} onOpenChange={(next) => !next && closeList()}>
      <PopoverAnchor asChild>
        <div
          ref={anchorRef}
          className={cn("relative w-full max-w-md", className)}
        >
          {multi ? (
            <div
              onClick={focusInput}
              className={cn(
                "flex min-h-13 w-full cursor-text flex-wrap items-center gap-2 rounded-sm border border-pale-ash-gray bg-white py-2 pr-10 pl-2 transition-colors hover:border-smoky-gray",
                "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-300",
                invalid && "border-destructive",
                isDisabled && "pointer-events-none opacity-50",
              )}
            >
              <ListRenderer
                data={selectedOptions}
                keyExtractor={(option) => getOptionValue(option)}
                emptyComponent={<></>}
                className="contents! space-y-0!"
                renderItem={(option) => (
                  <Chip
                    label={getOptionLabel(option)}
                    onRemove={() => toggleOption(option)}
                    className="px-2 py-0.5 text-[1.4rem]!"
                  />
                )}
              />
              <input
                {...inputProps}
                value={query}
                placeholder={shownPlaceholder}
                className="min-w-40 flex-1 bg-transparent px-2 py-1 text-xl! text-gray-600 outline-none placeholder:text-gray-400"
              />
            </div>
          ) : (
            <Input
              {...inputProps}
              value={open ? query : selectedLabel}
              placeholder={
                open && selectedLabel ? selectedLabel : shownPlaceholder
              }
              className="max-w-full truncate pr-10"
            />
          )}

          {loading ? (
            <Loader2Icon className="pointer-events-none absolute right-3 top-1/2 size-6 -translate-y-1/2 animate-spin text-gray-400" />
          ) : showClear ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Clear selection"
              // Keep focus where it is, so clearing doesn't open the list
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
              className="absolute top-1/2 right-2.5 size-7 -translate-y-1/2 text-gray-400 hover:bg-transparent hover:text-gray-600"
            >
              <XIcon className="size-5!" />
            </Button>
          ) : (
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-6 -translate-y-1/2 opacity-50" />
          )}
        </div>
      </PopoverAnchor>
      <PopoverContent
        id={listId}
        portal={false}
        align="start"
        className="w-(--radix-popover-trigger-width) p-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event) => {
          if (anchorRef.current?.contains(event.target as Node))
            event.preventDefault();
        }}
      >
        <div ref={listRef}>
          <ListRenderer
            data={[...filtered]}
            keyExtractor={(option) => getOptionValue(option)}
            emptyComponent={
              <p className="px-4 py-3 text-[1.4rem] text-muted-foreground">
                {emptyText}
              </p>
            }
            className={cn(
              "no-scrollbar space-y-0! overflow-y-auto p-1!",
              multi ? "max-h-[32rem]" : "max-h-64",
            )}
            renderItem={(option, index) => {
              const optionValue = getOptionValue(option);
              const content = renderOption
                ? renderOption(option)
                : getOptionLabel(option);
              const itemProps = {
                "data-index": index,
                onMouseDown: (event: MouseEvent) => event.preventDefault(),
                onMouseEnter: () => setHighlighted(index),
                onClick: () => handleSelect(option),
              };
              const group = getOptionGroup?.(option);
              const groupHeading = group &&
                (index === 0 ||
                  getOptionGroup?.(filtered[index - 1]) !== group) && (
                  <p className="px-3 pt-3 pb-1 text-[1.3rem] font-semibold text-muted-foreground">
                    {group}
                  </p>
                );

              const item = multi ? (
                <div
                  {...itemProps}
                  role="option"
                  aria-selected={selectedValues.includes(optionValue)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-left text-[1.4rem]",
                    index === highlighted && "bg-muted",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-md border border-gray-400 bg-white",
                      selectedValues.includes(optionValue) &&
                        "border-blue-400 bg-blue-500 text-white",
                    )}
                  >
                    {selectedValues.includes(optionValue) && (
                      <CheckIcon className="size-5" />
                    )}
                  </span>
                  {content}
                </div>
              ) : (
                <button
                  {...itemProps}
                  type="button"
                  className={cn(
                    "w-full rounded-sm px-3 py-2 text-left text-[1.4rem]",
                    optionValue === currentValue && "bg-blue-50",
                    index === highlighted && "bg-muted",
                  )}
                >
                  {content}
                </button>
              );

              return (
                <>
                  {groupHeading}
                  {item}
                </>
              );
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SelectField;
