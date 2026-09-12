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
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-blue-50 text-sm"
            >
              <button
                type="button"
                onClick={() => handleSelect(product)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                {product?.image?.[0]?.path || product?.image ? (
                  <img
                    src={product?.image?.[0]?.path || product?.image}
                    alt=""
                    className="h-9 w-9 rounded object-cover shrink-0 bg-gray-100"
                  />
                ) : (
                  <div className="h-9 w-9 rounded bg-gray-200 flex items-center justify-center shrink-0 text-gray-500">
                    ▢
                  </div>
                )}

                <span className="min-w-0">
                  <span className="block truncate font-medium text-gray-900">
                    {product?.name || "Unnamed Product"}
                  </span>
                  <span className="block truncate text-gray-500">
                    {product?.sku || "No SKU"} / ${Number(product?.price || 0).toFixed(2)}
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="text-blue-600 text-sm font-medium whitespace-nowrap shrink-0"
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

                  const raw =
                    product?.productUrl ||
                    product?.product_url ||
                    product?.url ||
                    "";
                  const path = raw.startsWith("/") ? raw.slice(1) : raw;

                  if (selectedStore?.baseUrl && path) {
                    window.open(`${selectedStore.baseUrl}${path}`, "_blank");
                  } else {
                    alert("Store URL or Product URL not found");
                  }
                }}
              >
                View product
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