"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function EditStockSheet({ trigger, product }: any) {
//   console.log("Product to edit: ", product);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    adjustBy: product?.adjustBy || 0,
    stock: product?.stock || 0,
    lowStock: product?.lowCost || 0,
    bpn: product?.bpn || 0,
    safetyStock: product?.safetyStock || 0,
    availability: product?.availability || 0,
  });

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = () => {
    console.log("Edited Values:", values);
    // TODO: add API call or state sync here
  };

  const handleSaveAndExit = () => {
    handleSubmit();
    setOpen(false); // close the Sheet
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Edit Inventory</SheetTitle>
        </SheetHeader>

        {/* Scrollable Editable Table */}
        <div className="overflow-x-auto h-[calc(100vh-180px)] p-10">
          <Table className="min-w-[900px] min-h-[150px] text-left border">
            <TableHeader className=" font-semibold border-b">
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Adjust by</TableHead>
                <TableHead>Current stock</TableHead>
                <TableHead>Low stock</TableHead>
                <TableHead>BPN</TableHead>
                <TableHead>Safety stock</TableHead>
                <TableHead>Availabilty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b ">
                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    readOnly
                  />
                </TableCell>
                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.sku}
                    onChange={(e) => handleChange("sku", e.target.value)}
                    readOnly
                  />
                </TableCell>

                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.adjustBy}
                    onChange={(e) => handleChange("adjustBy", e.target.value)}
                  />
                </TableCell>
                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                  />
                </TableCell>

                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.lowStock}
                    onChange={(e) => handleChange("lowStock", e.target.value)}
                  />
                </TableCell>

                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.bpn}
                    onChange={(e) => handleChange("bpn", e.target.value)}
                  />
                </TableCell>

                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.safetyStock}
                    onChange={(e) =>
                      handleChange("safetyStock", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell className=" align-top">
                  <Input
                    className=" border border-gray-300"
                    value={values.availability}
                    onChange={(e) =>
                      handleChange("availability", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Sticky Buttons */}
        <div className="flex justify-between w-full sticky border-t bottom-0 gap-3 p-6 bg-white">
          <button
            className="btn-outline-primary w-[50%]"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button className="btn-primary w-[50%]" onClick={handleSaveAndExit}>
            Save and exit
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
