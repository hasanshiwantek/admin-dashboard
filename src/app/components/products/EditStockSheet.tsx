"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { updateProduct } from "@/redux/slices/productSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { refetchProducts } from "@/lib/productUtils";
export default function EditStockSheet({ trigger, product }: any) {
  // console.log("Product to edit: ", product);

  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    adjustBy: product?.adjustBy || "",
    currentStock: product?.currentStock || "",
    lowStock: product?.lowStock || "",
    bpn: product?.bpn || "",
    safetyStock: product?.safetyStock || "",
    allowPurchase: product?.allowPurchase,
  });

  const handleChange = (key: string, val: string | boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(
        updateProduct({
          body: {
            products: [
              {
                id: [product?.id],
                fields: {
                  name: values?.name,
                  sku: values?.sku,
                  // adjustBy: values?.adjustBy || "",
                  currentStock: values?.currentStock,
                  lowStock: values?.lowStock,
                  // bpn: values?.bpn || "",
                  // safetyStock: values?.safetyStock || "",
                  allowPurchase: values?.allowPurchase,
                },
              },
            ],
          },
        })
      ).unwrap(); // ✅ unwrap for error handling

      console.log("✅ Product updated:", response);

      // Refetch products after successful update
      await refetchProducts(dispatch);
    } catch (err) {
      console.error("❌ Error Updating:", err);
    }
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
                    value={values.currentStock}
                    onChange={(e) =>
                      handleChange("currentStock", e.target.value)
                    }
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

                <TableCell className="align-top  ">
                  <Checkbox
                    checked={values.allowPurchase}
                    onCheckedChange={(checked: boolean) =>
                      handleChange("availability", checked)
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
