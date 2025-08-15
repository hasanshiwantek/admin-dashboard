import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function ProductSearchInput({ allProducts, onSelect, register }: any) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    if (!search) return setFiltered([]);
    const searchLower = search.toLowerCase();
    const matches = allProducts.filter(
      (p: any) =>
        p.name?.toLowerCase().includes(searchLower) ||
        p.sku?.toLowerCase().includes(searchLower)
    );
    setFiltered(matches.slice(0, 10));
  }, [search, allProducts]);

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search by product name, SKU etc."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=""
      />
      
      {filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-auto shadow">
          {filtered.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                onSelect(product);
                setSearch("");
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {product.name} – {product.sku}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
