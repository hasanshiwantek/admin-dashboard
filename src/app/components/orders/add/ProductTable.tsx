"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function ProductTable({
  products,
  onQtyChange,
  onDelete,
}: {
  products: any[];
  onQtyChange: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
}) {
  const getTotal = (p: any) => parseFloat(p.price || "0") * (p.quantity || 1);

  const subtotal = products.reduce((sum, p) => sum + getTotal(p), 0);

  console.log("Selected Product", products);

  return (
    <div>

    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[100px]">Products</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[80px]">Qty</TableHead>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead className="w-[100px]">Total</TableHead>
            <TableHead className="w-[50px]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="!bg-white p-4 h-30">
          {products.map((product) => (
            <TableRow key={product.id}>
              {/* Product Image */}
              <TableCell>
                {(product.image?.[1]?.path || product.image?.[0]?.path) && (
                  <Image
                    src={product.image?.[1]?.path || product.image?.[0]?.path}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded !border object-contain !border-gray-300 p-2 shrink-0 w-28 h-24"
                  />
                )}
              </TableCell>

              {/* Description */}
              <TableCell>
                <div className="font-semibold !text-xl">{product.name}</div>
                <div className="text-lg  font-semibold text-gray-800">
                  {product.sku}
                </div>
              </TableCell>

              {/* Quantity */}
              <TableCell>
                <Input
                  type="number"
                  min={1}
                  value={product.quantity}
                  onChange={(e) =>
                    onQtyChange(product.id, parseInt(e.target.value) || 1)
                  }
                />
              </TableCell>

              {/* Price */}
              <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>

              {/* Total */}
              <TableCell className="font-medium">
                ${getTotal(product).toFixed(2)}
              </TableCell>
              {/* Dropdown Action */}
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onDelete(product.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </div>
          {/* Subtotal */}
      <div className="flex justify-end font-semibold my-5 items-center bg-gray-700 text-white p-4 text-xl w-fit rounded-md">
        Subtotal:
        <span className="ml-2 !text-xl font-semibold !text-white">${subtotal.toFixed(2)}</span>
      </div>
    </div>

  );
}
