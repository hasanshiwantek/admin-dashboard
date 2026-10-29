import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import { CategorySearchProps } from "./type";

// Finds a category in the tree; the list expands down to it. The field's own
// clear (x) resets the search
const CategorySearch = ({
  categoryTree,
  value,
  onChange,
  onClear,
}: CategorySearchProps) => (
  <CategoryDropdown
    categoryData={categoryTree}
    value={value}
    onChange={({ id, path }) =>
      id === null ? onClear() : onChange({ id, path })
    }
    className="max-w-full!"
  />
);

export default CategorySearch;
