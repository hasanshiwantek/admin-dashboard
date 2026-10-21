"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { SelectOption } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import {
  KeyboardEvent,
  ReactNode,
  Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type SelectFieldProps<T> = {
  options: readonly T[];
  value?: string | number | null;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  valueKey?: string;
  labelKey?: string;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;
  renderOption?: (option: T) => ReactNode;
  emptyText?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
  ref?: Ref<HTMLInputElement>;
};

const readKey = <T,>(option: T, key: string) =>
  String((option as Record<string, unknown>)[key] ?? "");

export function SelectField<T = SelectOption>({
  options,
  value,
  onChange,
  onBlur,
  valueKey,
  labelKey,
  getOptionValue: getValueProp,
  getOptionLabel: getLabelProp,
  renderOption,
  emptyText = "No results found",
  placeholder,
  id,
  name,
  disabled,
  className,
  "aria-invalid": invalid,
  ref,
}: SelectFieldProps<T>) {
  const getOptionValue =
    getValueProp ?? ((option: T) => readKey(option, valueKey ?? "value"));
  const getOptionLabel =
    getLabelProp ?? ((option: T) => readKey(option, labelKey ?? "label"));

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const currentValue = value == null ? null : String(value);
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
    if (disabled || open) return;
    setOpen(true);
    setQuery(selectedLabel);
    setFiltering(false);
    setHighlighted(Math.max(0, options.indexOf(selected as T)));
  };

  const closeList = () => {
    setOpen(false);
    setFiltering(false);
    setQuery("");
    onBlur?.();
  };

  const handleSelect = (option: T) => {
    onChange?.(getOptionValue(option));
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
    }
  };

  return (
    <Popover open={open} onOpenChange={(next) => !next && closeList()}>
      <PopoverAnchor asChild>
        <div className={cn("relative w-full max-w-md", className)}>
          <Input
            ref={setInputRef}
            id={id}
            name={name}
            role="combobox"
            autoComplete="off"
            aria-expanded={open}
            aria-controls={listId}
            aria-invalid={invalid}
            disabled={disabled}
            value={open ? query : selectedLabel}
            placeholder={open && selectedLabel ? selectedLabel : placeholder}
            onFocus={openList}
            onClick={openList}
            onChange={(event) => {
              setQuery(event.target.value);
              setFiltering(true);
              setHighlighted(0);
              if (!open) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="max-w-full truncate pr-10"
          />
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-6 -translate-y-1/2 opacity-50" />
        </div>
      </PopoverAnchor>
      <PopoverContent
        id={listId}
        portal={false}
        align="start"
        className="w-(--radix-popover-trigger-width) p-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event) => {
          if (inputRef.current?.contains(event.target as Node))
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
            className="max-h-64 space-y-0! overflow-y-auto p-1!"
            renderItem={(option, index) => (
              <button
                type="button"
                data-index={index}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => handleSelect(option)}
                className={cn(
                  "w-full rounded-sm px-3 py-2 text-left text-[1.4rem]",
                  getOptionValue(option) === currentValue && "bg-blue-50",
                  index === highlighted && "bg-muted",
                )}
              >
                {renderOption ? renderOption(option) : getOptionLabel(option)}
              </button>
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SelectField;
