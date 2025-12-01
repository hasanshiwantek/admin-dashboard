import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";

export default function ProductSearchInput({
  allProducts = [],
  onSelect,
  register,
}: any) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null); // ref for outside click

  useEffect(() => {
    if (!search.trim()) {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const searchLower = search.toLowerCase();
    const matches = allProducts
      .filter(
        (p: any) =>
          p?.name?.toLowerCase().includes(searchLower) ||
          p?.sku?.toLowerCase().includes(searchLower)
      )
      .slice(0, 10);

    setFiltered(matches);
    setShowDropdown(matches.length > 0);
  }, [search, allProducts]);

  const handleSelect = (product: any) => {
    if (!product) return;
    onSelect(product);
    setSearch("");
    setFiltered([]);
    setShowDropdown(false);
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <Input
        placeholder="Search by product name, SKU etc."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        {...register}
      />

      {search.trim() && showDropdown && (
        <ul className="absolute z-10 w-full bg-white border max-h-60 overflow-auto shadow rounded-md">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <li
                key={product?.id || product?.sku || Math.random()}
                onClick={() => handleSelect(product)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm truncate"
              >
                {product?.name || "Unnamed Product"} –{" "}
                {product?.sku || "No SKU"}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 text-sm">
              No products found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
