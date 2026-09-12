"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";

export default function ProductSearchInput({
  onSelect,
  register,
}: any) {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setShowDropdown(true);

      try {
        const resultAction = await dispatch(
          fetchAllProducts({
            page: 1,
            pageSize: 20,
            search: search.trim(),
          })
        );

        if (fetchAllProducts.fulfilled.match(resultAction)) {
          const payload = resultAction.payload as any;
          const list =
            payload?.data ??
            payload?.products ??
            payload?.products?.data ??
            [];
          setFiltered(Array.isArray(list) ? list.slice(0, 10) : []);
        } else {
          setFiltered([]);
        }
      } catch (err) {
        console.error("Product search failed", err);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const handleSelect = (product: any) => {
    if (!product) return;
    onSelect(product);
    setSearch("");
    setFiltered([]);
    setShowDropdown(false);
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <ul className="absolute left-0 top-full z-10 mt-1 w-full bg-white border max-h-60 overflow-auto shadow rounded-md">          {loading ? (
          <li className="px-4 py-2 text-gray-500 text-sm">Searching...</li>
        ) : filtered.length > 0 ? (
          filtered.map((product) => (
            <li
              key={product?.id || product?.sku}
              className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
            >
              <button
                type="button"
                onClick={() => handleSelect(product)}
                className="flex-1 text-left truncate cursor-pointer"
              >
                {product?.name || "Unnamed Product"} – {product?.sku || "No SKU"}
              </button>

              <button
                type="button"
                className="text-blue-600 text-sm underline whitespace-nowrap shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const availableStores = JSON.parse(
                    localStorage.getItem("availableStores") || "[]"
                  );
                  const selectedStoreId = Number(localStorage.getItem("storeId"));
                  const selectedStore = availableStores.find(
                    (s: any) => s.id === selectedStoreId
                  );

                  const path = product?.productUrl
                    ? product.productUrl.startsWith("/")
                      ? product.productUrl.slice(1)
                      : product.productUrl
                    : "";

                  if (selectedStore?.baseUrl && path) {
                    window.open(`${selectedStore.baseUrl}${path}`, "_blank");
                  } else {
                    alert("Store URL or Product URL not found");
                  }
                }}
              >
                View
              </button>
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