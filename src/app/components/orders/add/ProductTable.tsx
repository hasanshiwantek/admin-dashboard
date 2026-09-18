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
  onPriceChange
}: {
  products: any[];
  onQtyChange: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
  onPriceChange: (id: number | string, price: number) => void;
}) {
  const getTotal = (p: any) => parseFloat(p.price || "0") * (p.quantity || 1);

  const subtotal = products.reduce((sum, p) => sum + getTotal(p), 0);

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
                      width={192}
                      height={192}
                      className="rounded !border object-contain !border-gray-300 p-2 shrink-0 w-60 h-48"
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
                  {/* <Input
                    type="number"
                    min={product.minPurchaseQuantity || 1}
                    max={product.maxPurchaseQuantity || undefined}
                    value={product.quantity}
                    onChange={(e) =>
                      onQtyChange(product.id, parseInt(e.target.value) || 1)
                    }
                  /> */}
                  <Input
                    type="number"
                    min={product.minPurchaseQuantity || 1}
                    max={product.maxPurchaseQuantity || undefined}
                    value={product.quantity === "" || product.quantity == null ? "" : product.quantity}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        onQtyChange(product.id, "" as any);
                        return;
                      }
                      onQtyChange(product.id, Number(raw));
                    }}
                    onBlur={() => {
                      const minQty =
                        Number(product.minPurchaseQuantity) > 0
                          ? Number(product.minPurchaseQuantity)
                          : 1;
                      const maxQty =
                        Number(product.maxPurchaseQuantity) > 0
                          ? Number(product.maxPurchaseQuantity)
                          : Infinity;
                      const current = Number(product.quantity);
                      const next =
                        Number.isFinite(current) && current > 0
                          ? Math.min(Math.max(current, minQty), maxQty)
                          : minQty;
                      onQtyChange(product.id, next);
                    }}
                  />
                </TableCell>

                {/* Price */}
                {/* <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell> */}
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={product.price ?? 0}
                    onChange={(e) =>
                      onPriceChange(product.id, parseFloat(e.target.value) || 0)
                    }
                    className="w-28"
                  />
                </TableCell>
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
      <div className="flex justify-end w-full">
        <div className="flex justify-end font-semibold my-5 items-center bg-gray-700 text-white p-4 text-xl w-fit rounded-md">
          <span className="ml-2 !text-xl font-semibold !text-white"> Subtotal: ${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>

  );
}
