import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { CategorySearchProps } from "./type";

// Finds a category in the tree; the list expands down to it
const CategorySearch = ({
  categoryTree,
  value,
  onChange,
  onClear,
}: CategorySearchProps) => (
  <div className="relative w-full">
    <CategoryDropdown
      categoryData={categoryTree}
      value={value}
      onChange={onChange}
      className="max-w-full! [&_input]:pr-20"
    />
    {value.id !== null && (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Clear search"
        onClick={onClear}
        className="absolute top-1/2 right-10 -translate-y-1/2 text-gray-400 hover:bg-transparent hover:text-gray-600"
      >
        <X className="size-5!" />
      </Button>
    )}
  </div>
);

export default CategorySearch;
