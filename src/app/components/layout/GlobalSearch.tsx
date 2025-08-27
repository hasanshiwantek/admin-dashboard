"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { globalSearch } from "@/redux/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

type SearchResult = {
  type: "product" | "order" | "customer";
  id: number;
  label: string;
  subtitle?: string;
  url: string;
};

const GlobalSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { searchData, loading } = useAppSelector((state: any) => state.home);

  console.log("Main search data from frontend: ", searchData);

  // Only update local results when API responds
  useEffect(() => {
    if (!searchData?.data) {
      setResults([]);
      return;
    }

    const { products = [], orders = [], customers = [] } = searchData.data;

    const mappedResults: SearchResult[] = [
      ...products.map((item: any) => ({
        type: "product",
        id: item.id,
        label: item.name,
        subtitle: item.sku,
        url: `/manage/products/edit/${item.id}`,
      })),
      ...orders.map((item: any) => ({
        type: "order",
        id: item.id,
        label: `Order #${item.id}`,
        subtitle: item.customer_email || "",
        // url: `/manage/orders/edit/${item.id}`,
        url: `/manage/orders/`,

      })),
      ...customers.map((item: any) => ({
        type: "customer",
        id: item.id,
        label: item.name,
        subtitle: item.email || "",
        url: `/manage/customers/edit/${item.id}`,
      })),
    ];

    setResults(mappedResults);
  }, [searchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (url: string) => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    router.push(url);
  };

  const handleIconClick = () => {
    if (query.trim()) {
      dispatch(globalSearch({ query }));
      setShowDropdown(true);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-[42rem]">
      {/* Search Input Container */}
      <div
        className="flex justify-start items-center bg-[#1e2a3f] text-center !px-4 !py-3 rounded-md
        focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200
        border border-[#2c2c2c] transition hover:border-blue-200"
      >
        <i onClick={handleIconClick}>
          <IoSearchOutline
            size={20}
            color="lightgray"
            className="cursor-pointer"
          />
        </i>
        <input
          ref={inputRef}
          type="text"
          placeholder=" Search products, orders, customers, or navigate to"
          className="w-[40rem] !ml-3 bg-transparent text-white !text-xl !font-medium outline-none placeholder:text-gray-100"
          value={query}
          onChange={handleChange}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-[#1e2a3f] border border-blue-300 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {loading && (
            <div className="text-white text-sm p-3">Searching...</div>
          )}
          {!loading && results.length === 0 && (
            <div className="text-white text-sm p-3">No results found.</div>
          )}
          {!loading &&
            results.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="p-3 hover:bg-[#293b57] cursor-pointer text-white"
                onClick={() => handleSelect(item.url)}
              >
                <div className="text-lg font-semibold">{item.label}</div>
                {item.subtitle && (
                  <div className="text-base text-gray-300">{item.subtitle}</div>
                )}
                <div className="text-base text-blue-400 uppercase">
                  {item.type}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
