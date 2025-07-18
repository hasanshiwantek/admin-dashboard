"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import VisibilityToggle from "../dropdowns/VisibilityToggle";
import FeaturedToggle from "../dropdowns/FeaturedToggle";
const filterTabs = [
  "All",
  "Featured",
  "Free shipping",
  "Out of stock",
  "Inventory low",
  "Last imported",
  "Visible",
  "Not visible",
];

const products = [
  {
    id: 1,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289268/images/565878/L014-205__08023.1739214863.1280.1280__69310.1752524990.220.290.jpg?c=1",
    name: "KV-S4065CW - Panasonic - Sheetfed Scanner",
    sku: "KV-S4065CW",
    category: "Scanners",
    stock: "-",
    price: "$994.00",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 2,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289267/images/565876/059k58953__89273.1751896771.220.290.jpg?c=1",
    name: "059K059K58958 - Xerox - Fuser Roller",
    sku: "059K059K58958",
    category: "Rollers",
    stock: "1000",
    price: "$404.93",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 3,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289266/images/565875/TRD106R1371__23073.1751896543.220.290.jpg?c=1",
    name: "TRD106R1371 - Xerox - Black High Yield Toner Cartridge",
    sku: "TRD106R1371",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$134.40",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 4,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289265/images/565874/TRD106R1294__65464.1751896372.220.290.jpg?c=1",
    name: "TRD106R1294 - Xerox - Toner Phaser 5500",
    sku: "TRD106R1294",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$126.00",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 5,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289264/images/565873/L016-2014-00__72638.1751896150.220.290.jpg?c=1",
    name: "016-2014-00 - Xerox - Fuser Unit Assembly 110 Volt",
    sku: "016-2014-00",
    category: "Fuser",
    stock: "1000",
    price: "$168.75",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 6,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289268/images/565878/L014-205__08023.1739214863.1280.1280__69310.1752524990.220.290.jpg?c=1",
    name: "016-2008-00 - Xerox - Phaser 6200 Black Toner Cartridge 8K Yield",
    sku: "016-2008-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$135.00",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 7,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289267/images/565876/059k58953__89273.1751896771.220.290.jpg?c=1",
    name: "016-2007-00 - Xerox - Phaser 6200 Yellow Toner Cartridge 8K Yield",
    sku: "016-2007-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$155.25",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 8,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289267/images/565876/059k58953__89273.1751896771.220.290.jpg?c=1",
    name: "016-2006-00 - Xerox - Phaser 6200 Magenta Toner Cartridge 8K Yield",
    sku: "016-2006-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$155.25",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 9,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289267/images/565876/059k58953__89273.1751896771.220.290.jpg?c=1",
    name: "016-2005-00 - Xerox - Phaser 6200 Cyan Toner Cartridge 8K Yield",
    sku: "016-2005-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$155.25",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 10,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289265/images/565874/TRD106R1294__65464.1751896372.220.290.jpg?c=1",
    name: "016-2004-00 - Xerox - Black Toner Cartridge",
    sku: "016-2004-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$93.80",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 11,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289265/images/565874/TRD106R1294__65464.1751896372.220.290.jpg?c=1",
    name: "016-2003-00 - Xerox - Yellow Toner Cartridge",
    sku: "016-2003-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$133.00",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 12,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289257/images/565866/L016-2002-00__88558.1751894754.220.290.jpg?c=1",
    name: "016-2002-00 - Xerox - Magenta Toner Cartridge",
    sku: "016-2002-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$133.00",
    channels: 1,
    visibility: "ENABLED",
  },
  {
    id: 13,
    image:
      "https://cdn11.bigcommerce.com/s-wb5rkphzy3/products/289265/images/565874/TRD106R1294__65464.1751896372.220.290.jpg?c=1",
    name: "016-2001-00 - Xerox - Cyan Toner Cartridge",
    sku: "016-2001-00",
    category: "Toner Cartridges",
    stock: "1000",
    price: "$133.00",
    channels: 1,
    visibility: "ENABLED",
  },
];

export default function AllProducts() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [search, setSearch] = useState("");
  const [featuredMap, setFeaturedMap] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [visibilityMap, setVisibilityMap] = useState<{
    [key: number]: "ENABLED" | "DISABLED";
  }>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const dropdownActions = [
    { label: "Edit", onClick: () => console.log("Edit clicked") },
    { label: "Duplicate", onClick: () => console.log("Duplicate clicked") },
    {
      label: "View on storefront",
      onClick: () => console.log("View on storefront clicked"),
    },
    {
      label: "Disable visibility",
      onClick: () => console.log("Disable visibility clicked"),
    },
    {
      label: "Make featured",
      onClick: () => console.log("Make featured clicked"),
    },
    {
      label: "View in page builder",
      onClick: () => console.log("View in page builder clicked"),
    },
    { label: "View orders", onClick: () => console.log("View orders clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
  ];

  // Assuming you fetched totalPages from backend
  const totalPages = 21;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">
          Products
        </h1>
        <Button size="xl" className="!text-2xl btn-primary">
          <Plus className="w-6 h-12 mr-2 " /> Add new
        </Button>
      </div>

      <div className="bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-5 mb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`!text-2xl px-5 py-2 rounded  cursor-pointer transition  ${
                selectedTab === tab
                  ? "bg-blue-100 border-blue-600 text-blue-600"
                  : " text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-10 items-center mb-5">
          <div
            className="flex justify-start items-center bg-white text-center !px-4 !py-3 rounded-md
                         focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200 border border-blue-200  transition hover:border-blue-200 w-[80%]"
          >
            <i>
              <IoSearchOutline
                size={20}
                color="gray"
                className="cursor-pointer"
              />
            </i>
            <input
              type="text"
              placeholder=" Search products, orders, customers, or navigate to"
              className=" !ml-3 bg-transparent !text-xl !font-medium outline-none placeholder:text-gray-400 w-[80%]"
            />
          </div>

          {/* <Input placeholder="Search products" className="max-w-[80%] !p-7 " /> */}

          <span className="!text-xl !text-blue-600 cursor-pointer">
            Add filters
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-b border-gray-200 px-4 py-2 bg-white text-sm">
          {/* Left side: checkbox and product count */}
          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              className="w-6 h-6 border-gray-300 rounded"
            />
            <span className="text-gray-700 !text-xl">275215 Products</span>
          </div>

          {/* Right side: pagination and controls */}
          <div className="flex items-center space-x-10 text-gray-700">
            {/* Settings icon */}
            {/* <Settings className="w-8 h-8 text-gray-500" /> */}
            <div className="p-6">
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                perPage={perPage}
                onPerPageChange={setPerPage}
              />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader className="h-18">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead></TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Current stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Channels</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded !border !border-gray-300 p-2"
                  />
                  <span className="!text-blue-600  cursor-pointer ">
                    {product.name}
                  </span>
                </TableCell>
                <TableCell className="relative ">
                    <FeaturedToggle
                      productId={product.id}
                      isFeatured={featuredMap[product.id] || false}
                      onChange={(id, value) => {
                        setFeaturedMap((prev) => ({ ...prev, [id]: value }));
                        // Optional: call backend API here
                      }}
                    />
                </TableCell>

                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.channels}</TableCell>
                <TableCell className="relative hover:bg-blue-100 transition-all">
                  <VisibilityToggle
                    productId={product.id}
                    value={visibilityMap[product.id] || product.visibility}
                    onChange={(id, value) => {
                      setVisibilityMap((prev) => ({ ...prev, [id]: value }));
                      // Optional: call backend API here
                    }}
                  />
                </TableCell>

                <TableCell>
                  <OrderActionsDropdown
                    actions={dropdownActions}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-xl cursor-pointer"
                      >
                        •••
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end my-6">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>
    </div>
  );
}
