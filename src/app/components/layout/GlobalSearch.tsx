"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
    IoSearchOutline,
    IoCloseOutline,
} from "react-icons/io5";
import {
    FiUsers,
    FiClipboard,
} from "react-icons/fi";

import { globalSearch } from "@/redux/slices/homeSlice";
import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/useReduxHooks";

type SearchResult = {
    type: "product" | "order" | "customer";
    id: number;
    label: string;
    subtitle?: string;
    url: string;
    ordersCount?: number;
};

const GlobalSearchBar = () => {
    const [query, setQuery] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [results, setResults] = useState<SearchResult[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [menuPos, setMenuPos] = useState({
        top: 0,
        left: 0,
        width: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { searchData, loading } = useAppSelector(
        (state: any) => state.home
    );

    /* -----------------------------------------
       Update Dropdown Position
    ----------------------------------------- */

    const updateMenuPos = () => {
        const el = containerRef.current;

        if (!el) return;

        const r = el.getBoundingClientRect();

        setMenuPos({
            top: r.bottom,
            left: r.left,
            width: r.width,
        });
    };

    /* -----------------------------------------
       Convert API Response
    ----------------------------------------- */

    useEffect(() => {
        if (!searchData?.data) {
            setResults([]);
            return;
        }

        const {
            products = [],
            orders = [],
            customers = [],
        } = searchData.data;

        const mappedResults: SearchResult[] = [
            ...products.map((item: any) => ({
                type: "product" as const,
                id: item.id,
                label: item.name,
                subtitle: item.sku || "",
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
                ordersCount:
                    item.orders_count ??
                    item.ordersCount ??
                    item.order_count ??
                    0,
                url: `/manage/customers/edit/${item.id}`,
            })),
        ];

        setResults(mappedResults);
    }, [searchData]);

    /* -----------------------------------------
       Dropdown Position Events
    ----------------------------------------- */

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

    /* -----------------------------------------
       Select Result
    ----------------------------------------- */

    const handleSelect = (url: string) => {
        setQuery("");
        setResults([]);
        setShowDropdown(false);

        router.push(url);
    };

    /* -----------------------------------------
       Search
    ----------------------------------------- */

    const runSearch = (value: string) => {
        if (!value.trim()) {
            setShowDropdown(false);
            setResults([]);
            return;
        }

        dispatch(globalSearch({ query: value }));

        setShowDropdown(true);

        requestAnimationFrame(() => {
            updateMenuPos();
        });

        inputRef.current?.focus();
    };

    const handleIconClick = () => {
        runSearch(query);
    };

    /* -----------------------------------------
       Input Change
    ----------------------------------------- */

    const handleOnchange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.trim()) {
            debounceRef.current = setTimeout(() => {
                runSearch(value);
            }, 500);
        } else {
            setShowDropdown(false);
            setResults([]);
        }
    };

    /* -----------------------------------------
       Close Search
    ----------------------------------------- */

    const handleClose = () => {
        setQuery("");
        setResults([]);
        setShowDropdown(false);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        inputRef.current?.focus();
    };

    /* -----------------------------------------
       Click Outside
    ----------------------------------------- */

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            const menu = document.getElementById(
                "global-search-dropdown"
            );

            if (
                containerRef.current?.contains(target) ||
                menu?.contains(target)
            ) {
                return;
            }

            setShowDropdown(false);
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* -----------------------------------------
       Group Results
    ----------------------------------------- */

    const customers = results.filter(
        (item) => item.type === "customer"
    );

    const orders = results.filter(
        (item) => item.type === "order"
    );

    const products = results.filter(
        (item) => item.type === "product"
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full lg:w-[45rem]"
        >

            {/* =====================================
                SEARCH BAR
            ===================================== */}

            <div
                className="
                    flex
                    items-center
                    bg-[#1e2a3f]
                    border
                    border-[#2c2c2c]
                    rounded-md
                    px-4
                    py-3

                    focus-within:ring-3
                    focus-within:ring-blue-200
                    focus-within:border-blue-200

                    transition
                    hover:border-blue-200

                    w-[70%]
                    lg:w-full
                "
            >

                {/* Search Icon */}

                <button
                    type="button"
                    onClick={handleIconClick}
                    className="flex-shrink-0"
                    aria-label="Search"
                >
                    <IoSearchOutline
                        size={21}
                        color="lightgray"
                        className="cursor-pointer"
                    />
                </button>

                {/* Input */}

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products, orders, customers, or navigate to"
                    className="
                        flex-1
                        min-w-0
                        ml-3

                        bg-transparent
                        text-white
                        text-xl
                        font-medium

                        outline-none

                        placeholder:text-gray-100

                        2xl:text-2xl
                    "
                    value={query}
                    onChange={handleOnchange}
                    onFocus={() => {
                        if (results.length > 0) {
                            setShowDropdown(true);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleIconClick();
                        }

                        if (e.key === "Escape") {
                            handleClose();
                        }
                    }}
                />

                {/* Close */}

                {query && (
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-shrink-0 ml-2"
                        aria-label="Clear search"
                    >
                        <IoCloseOutline
                            size={25}
                            color="#d1d5db"
                            className="cursor-pointer"
                        />
                    </button>
                )}

            </div>

            {/* =====================================
                DROPDOWN
            ===================================== */}

            {showDropdown &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        id="global-search-dropdown"
                        className="
                            fixed
                            z-[9999]

                            bg-white
                            border
                            border-[#d9dce3]

                            shadow-[0_8px_25px_rgba(0,0,0,0.15)]

                            overflow-y-auto

                            max-h-[calc(100vh-70px)]

                            text-[#172033]
                        "
                        style={{
                            top: menuPos.top,
                            left: menuPos.left,
                            width: menuPos.width,
                        }}
                    >

                        {/* =================================
                            LOADING
                        ================================= */}

                        {loading && (
                            <div className="px-5 py-5 text-[15px] text-gray-600">
                                Searching...
                            </div>
                        )}

                        {/* =================================
                            NO RESULTS
                        ================================= */}

                        {!loading &&
                            results.length === 0 && (
                                <div className="px-5 py-5 text-[15px] text-gray-600">
                                    No results found.
                                </div>
                            )}

                        {/* =================================
                            CUSTOMERS
                        ================================= */}

                        {!loading && customers.length > 0 && (
                            <div>

                                {/* Section Heading */}

                                <div className="px-5 pt-5 pb-3">
                                    <h3 className="text-[17px] font-semibold text-[#172033]">
                                        Customers{" "}
                                        <span className="font-normal text-[#4d5d78]">
                                            ({customers.length})
                                        </span>
                                    </h3>
                                </div>

                                {/* Customer List */}

                                <div>
                                    {customers.slice(0, 5).map(
                                        (item, index) => (
                                            <div
                                                key={`customer-${item.id}`}
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() =>
                                                    handleSelect(
                                                        item.url
                                                    )
                                                }
                                                className="
                                                    group
                                                    flex
                                                    items-center
                                                    gap-3

                                                    px-5
                                                    py-2

                                                    cursor-pointer

                                                    hover:bg-[#f1f4ff]

                                                    transition
                                                "
                                            >

                                                {/* Icon */}

                                                <div
                                                    className={`
                                                        w-[45px]
                                                        h-[45px]

                                                        flex
                                                        items-center
                                                        justify-center

                                                        rounded-md

                                                        flex-shrink-0

                                                        ${
                                                            index === 0
                                                                ? "bg-[#e2e8ff]"
                                                                : "bg-[#f5f6fa]"
                                                        }
                                                    `}
                                                >
                                                    <FiUsers
                                                        size={25}
                                                        className="text-[#5c6680]"
                                                    />
                                                </div>

                                                {/* Details */}

                                                <div className="min-w-0">

                                                    <div className="
                                                        text-[17px]
                                                        leading-[22px]
                                                        text-[#172033]
                                                        font-normal
                                                    ">
                                                        {item.label}
                                                    </div>

                                                    <div className="
                                                        text-[15px]
                                                        leading-[23px]
                                                        text-[#4c6085]
                                                        truncate
                                                    ">
                                                        {item.subtitle}

                                                        {item.ordersCount
                                                            ? ` - ${item.ordersCount} ${
                                                                  item.ordersCount ===
                                                                  1
                                                                      ? "order"
                                                                      : "orders"
                                                              }`
                                                            : ""}
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}
                                </div>

                                {/* View All */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            "/manage/customers"
                                        )
                                    }
                                    className="
                                        px-5
                                        py-4

                                        text-[16px]
                                        text-[#315cff]

                                        hover:underline
                                    "
                                >
                                    View all customers →
                                </button>

                            </div>
                        )}

                        {/* =================================
                            DIVIDER
                        ================================= */}

                        {!loading &&
                            customers.length > 0 &&
                            orders.length > 0 && (
                                <div className="border-t border-[#d9dce3]" />
                            )}

                        {/* =================================
                            ORDERS
                        ================================= */}

                        {!loading && orders.length > 0 && (
                            <div>

                                {/* Section Heading */}

                                <div className="px-5 pt-5 pb-3">
                                    <h3 className="text-[17px] font-semibold text-[#172033]">
                                        Orders{" "}
                                        <span className="font-normal text-[#4d5d78]">
                                            ({orders.length})
                                        </span>
                                    </h3>
                                </div>

                                {/* Orders */}

                                <div>
                                    {orders.slice(0, 5).map(
                                        (item) => (
                                            <div
                                                key={`order-${item.id}`}
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() =>
                                                    handleSelect(
                                                        item.url
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3

                                                    px-5
                                                    py-2

                                                    cursor-pointer

                                                    hover:bg-[#f1f4ff]

                                                    transition
                                                "
                                            >

                                                {/* Order Icon */}

                                                <div
                                                    className="
                                                        w-[45px]
                                                        h-[45px]

                                                        flex
                                                        items-center
                                                        justify-center

                                                        rounded-md

                                                        bg-[#f5f6fa]

                                                        flex-shrink-0
                                                    "
                                                >
                                                    <FiClipboard
                                                        size={25}
                                                        className="text-[#5c6680]"
                                                    />
                                                </div>

                                                {/* Order Details */}

                                                <div className="min-w-0">

                                                    <div className="
                                                        text-[17px]
                                                        leading-[22px]
                                                        text-[#172033]
                                                    ">
                                                        {item.id}
                                                    </div>

                                                    <div className="
                                                        text-[15px]
                                                        leading-[23px]
                                                        text-[#4c6085]
                                                        truncate
                                                    ">
                                                        {item.subtitle}
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}
                                </div>

                                {/* View All */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push(
                                            "/manage/orders"
                                        )
                                    }
                                    className="
                                        px-5
                                        py-4

                                        text-[16px]
                                        text-[#315cff]

                                        hover:underline
                                    "
                                >
                                    View all orders →
                                </button>

                            </div>
                        )}

                        {/* =================================
                            PRODUCTS
                        ================================= */}

                        {!loading && products.length > 0 && (
                            <div>

                                <div className="border-t border-[#d9dce3]" />

                                <div className="px-5 pt-5 pb-3">
                                    <h3 className="text-[17px] font-semibold">
                                        Products{" "}
                                        <span className="font-normal text-[#4d5d78]">
                                            ({products.length})
                                        </span>
                                    </h3>
                                </div>

                                {products.slice(0, 5).map(
                                    (item) => (
                                        <div
                                            key={`product-${item.id}`}
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={() =>
                                                handleSelect(
                                                    item.url
                                                )
                                            }
                                            className="
                                                px-5
                                                py-3
                                                cursor-pointer
                                                hover:bg-[#f1f4ff]
                                            "
                                        >
                                            <div className="text-[16px]">
                                                {item.label}
                                            </div>

                                            {item.subtitle && (
                                                <div className="text-[14px] text-[#4c6085]">
                                                    {item.subtitle}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>,
                    document.body
                )}
        </div>
    );
};

export default GlobalSearchBar;