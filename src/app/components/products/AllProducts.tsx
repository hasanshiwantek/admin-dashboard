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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
          <Input placeholder="Search products" className="max-w-[80%] !p-7 " />
          <span className="!text-xl !text-blue-600 cursor-pointer">
            Add filters
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
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
                  <span className="!text-blue-600 !underline cursor-pointer">
                    {product.name}
                  </span>
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.channels}</TableCell>
                <TableCell>
                  <Badge className="!bg-green-700 !text-white  border-none">
                    {product.visibility}
                  </Badge>
                </TableCell>
                <TableCell>
                  <MoreHorizontal className="w-4 h-4 text-gray-600 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-gray-500">275215 Products</div>
    </div>
  );
}
