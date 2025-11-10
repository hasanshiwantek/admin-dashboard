"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DestinationDialog from "./DestinationDialog";
import OrderActionsDropdown from "../../OrderActionsDropdown";
import { Button } from "@/components/ui/button";
export default function MultipleAddressForm() {
  const { getValues, setValue, watch } = useFormContext();
  const products = getValues("selectedProducts") || [];

  const shippingDestinations = watch("shippingDestinations") || [];
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Filter unallocated products
  const unallocatedProducts = products.filter(
    (p: any) =>
      !shippingDestinations.some((d: any) =>
        d.products.some((ap: any) => ap.sku === p.sku)
      )
  );

  const handleCheck = (sku: string) => {
    setSelected((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  };

  const selectedProducts = unallocatedProducts.filter((p: any) =>
    selected.includes(p.sku)
  );

  const handleAllocate = (destinationFormData: any) => {
    if (selectedProducts.length === 0) return;

    const newDestination = {
      address: destinationFormData,
      products: selectedProducts,
    };

    const updated = [...shippingDestinations, newDestination];
    setValue("shippingDestinations", updated);
    setSelected([]);
    setOpen(false);
  };

  const getDropdownActions = (product: any) => [
    {
      label: "Select Destination",
      onClick: () => {
        setSelected([product.sku]);
        setOpen(true);
      },
    },
  ];

  const getDestinationDropdownActions = (dest: any, index: number) => [
    {
      label: "Delete",
      onClick: () => {
        const updated = shippingDestinations.filter((_: any, i: number) => i !== index);
        setValue("shippingDestinations", updated);
      },
    },
    {
      label: "Edit",
      onClick: () => {
        // Select the products from this destination so the dialog opens with them checked
        const skus = (dest.products || []).map((p: any) => p.sku);
        setSelected(skus);

        // Open the DestinationDialog to allow re-assigning/editing
        setOpen(true);
      },
    },
  ];

  return (
    <div className="space-y-10 border rounded-md p-5">
      <h2 className="!font-semibold !text-2xl mb-2 border-b p-2">
        Select products to allocate to shipping destinations
      </h2>

      {/* Top Table - Unallocated Products */}
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
            {unallocatedProducts.map((product: any) => (
              <TableRow key={product.sku} className="h-20">
                <TableCell className="w-10">
                  <Checkbox
                    checked={selected.includes(product.sku)}
                    onCheckedChange={() => handleCheck(product.sku)}
                  />
                </TableCell>
                <TableCell>
                  {product.sku ? `${product.sku} - ` : ""}
                  {product.name || "Product"}
                </TableCell>
                <TableCell>{product.quantity ?? 1}</TableCell>
                <TableCell>
                  <OrderActionsDropdown
                    actions={getDropdownActions(product)}
                    trigger={
                      <button
                       type="button"
                        className="text-xl cursor-pointer"
                      >
                        •••
                      </button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <button
        type="button"
        className="btn-outline-primary"
        onClick={() => setOpen(true)}
        disabled={selected.length === 0}
      >
        Select destination for products
      </button>

      {/* Destination Dialog */}
      <DestinationDialog
        open={open}
        setOpen={setOpen}
        selectedProducts={selectedProducts}
        onAllocate={handleAllocate} // pass allocate handler
      />

      {/* Allocated Destinations Table */}
      {shippingDestinations.length > 0 && (
        <div className="mt-10">
          <h2 className="!font-semibold !text-2xl mb-2 border-b p-2">
            Shipping Destinations
          </h2>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-muted h-12">
                <TableRow>
                  <TableHead>Destination and items</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Shipping Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingDestinations.map((dest:any, idx:number) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {dest.address.address1}, {dest.address.city} <br />
                      <span>
                        {dest.products.map((p: any) => p.name).join(", ")}
                      </span>
                    </TableCell>
                    <TableCell>Fedex</TableCell>
                    <TableCell>
                      {dest.products.map((p: any) => p.price)}
                    </TableCell>
                    <TableCell>
                      <OrderActionsDropdown
                        actions={getDestinationDropdownActions(dest, idx)}
                        trigger={
                          <button
                           type="button"
                            className="text-xl cursor-pointer"
                          >
                            •••
                          </button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
