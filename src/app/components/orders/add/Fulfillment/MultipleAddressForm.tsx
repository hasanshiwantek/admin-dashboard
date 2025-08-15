"use client";

import { useFormContext } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function MultipleAddressForm() {
  const { getValues } = useFormContext();
  const products = getValues("selectedProducts") || [];

  return (
    <div className="space-y-10 border rounded-md p-5">
      <h2 className="!font-semibold !text-2xl mb-2 border-b p-2">
        Select products to allocate to shipping destinations
      </h2>

      <div className="border rounded-md overflow-hidden mt-5">
        <Table>
          <TableHeader className="bg-muted h-20">
            <TableRow>
              <TableHead className="w-10">
                <Checkbox disabled className="opacity-0" />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Unallocated quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product: any, idx: number) => (
              <TableRow key={`${product.sku}-${idx}`} className="h-20">
                <TableCell className="w-10">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {product?.sku ? `${product.sku} - ` : ""}
                  {product?.name || "Product"}
                </TableCell>
                <TableCell>{product?.quantity ?? 1}</TableCell>
                <TableCell>
                  <MoreHorizontal className="h-6 w-6 text-muted-foreground cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <button className="btn-outline-primary" type="button">
        Select destination for products
      </button>
    </div>
  );
}
