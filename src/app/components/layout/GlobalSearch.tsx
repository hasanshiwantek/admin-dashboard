"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { searchData, loading } = useAppSelector((state: any) => state.home);

  const updateMenuPos = () => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMenuPos({
      top: r.bottom + 8,
      left: r.left,
      width: r.width,
    });
  };

  useEffect(() => {
    if (!searchData?.data) {
      setResults([]);
      return;
    }

    const { products = [], orders = [], customers = [] } = searchData.data;

    const mappedResults: SearchResult[] = [
      ...products.map((item: any) => ({
        type: "product" as const,
        id: item.id,
        label: item.name,
        subtitle: item.sku,
        url: `/manage/products/edit/${item.id}`,
      })),
      ...orders.map((item: any) => ({
        type: "order" as const,
        id: item.id,
        label: `Order #${item.id}`,
        subtitle: item.customer_email || "",
        url: `/manage/orders/`,
      })),
      ...customers.map((item: any) => ({
        type: "customer" as const,
        id: item.id,
        label: item.name,
        subtitle: item.email || "",
        url: `/manage/customers/edit/${item.id}`,
      })),
    ];

    setResults(mappedResults);
  }, [searchData]);

  useEffect(() => {
    if (!showDropdown) return;
    updateMenuPos();
    window.addEventListener("resize", updateMenuPos);
    window.addEventListener("scroll", updateMenuPos, true);
    return () => {
      window.removeEventListener("resize", updateMenuPos);
      window.removeEventListener("scroll", updateMenuPos, true);
    };
  }, [showDropdown, results.length]);

  const handleSelect = (url: string) => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    router.push(url);
  };

  const runSearch = (value: string) => {
    if (!value.trim()) {
      setShowDropdown(false);
      return;
    }
    dispatch(globalSearch({ query: value }));
    setShowDropdown(true);
    requestAnimationFrame(updateMenuPos);
    inputRef.current?.focus();
  };

  const handleIconClick = () => {
    runSearch(query);
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim()) {
      debounceRef.current = setTimeout(() => runSearch(value), 500);
    } else {
      setShowDropdown(false);
      setResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const menu = document.getElementById("global-search-dropdown");
      if (
        containerRef.current?.contains(target) ||
        menu?.contains(target)
      ) {
        return;
      }
      setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full lg:w-[45rem]">
      <div
        className="flex justify-start items-center md:justify-self-end bg-[#1e2a3f] text-center !px-4 !py-3 rounded-md
        focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200
        border border-[#2c2c2c] transition hover:border-blue-200 w-[70%] lg:w-full"
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
          className="w-[40rem] !ml-3 bg-transparent text-white !text-xl !font-medium outline-none placeholder:text-gray-100 2xl:!text-2xl"
          value={query}
          onChange={handleOnchange}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleIconClick();
          }}
        />
      </div>

      {showDropdown &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="global-search-dropdown"
            className="fixed z-[9999] bg-[#1e2a3f] border border-blue-300 rounded-md shadow-lg max-h-80 overflow-y-auto"
            style={{
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width,
            }}
          >
            {loading && (
              <div className="text-white text-base p-3">Searching...</div>
            )}
            {!loading && results.length === 0 && (
              <div className="text-white text-base p-3">No results found.</div>
            )}
            {!loading &&
              results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="p-3 hover:bg-[#293b57] cursor-pointer text-white"
                  onMouseDown={(e) => e.preventDefault()}
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
          </div>,
          document.body
        )}
    </div>
  );
};

export default GlobalSearchBar;