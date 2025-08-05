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
import { useState } from "react";
import { updateProduct } from "@/redux/slices/productSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { refetchProducts } from "@/lib/productUtils";
export default function EditPriceSheet({ trigger, product }: any) {
  // console.log("Product to edit: ", product);

  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    id: product?.id || "",
    name: product?.name || "",
    sku: product?.sku || "",
    price: product?.price || "",
    salePrice: product?.salePrice || "",
    costPrice: product?.costPrice || "",
    msrp: product?.msrp || "",
  });

  const handleChange = (key: string, val: string) => {
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
                  price: values?.price,
                  salePrice: values?.salePrice,
                  costPrice: values?.costPrice,
                  msrp: values?.msrp,
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
          <SheetTitle>Edit prices</SheetTitle>
        </SheetHeader>

        {/* Scrollable Editable Table */}
        <div className="overflow-x-auto h-[calc(100vh-180px)] p-10">
          <Table className="min-w-[900px] min-h-[150px] text-left border">
            <TableHeader className=" font-semibold border-b">
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sale price</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>MSRP</TableHead>
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
                    type="number"
                    className="border border-gray-300"
                    value={values.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </TableCell>
                <TableCell className="align-top">
                  <Input
                    type="number"
                    className="border border-gray-300"
                    value={values.salePrice}
                    onChange={(e) => handleChange("salePrice", e.target.value)}
                  />
                </TableCell>
                <TableCell className="align-top">
                  <Input
                    type="number"
                    className=" border border-gray-300"
                    value={values.costPrice}
                    onChange={(e) => handleChange("costPrice", e.target.value)}
                  />
                </TableCell>
                <TableCell className="align-top">
                  <Input
                    type="number"
                    className="border border-gray-300"
                    value={values.msrp}
                    onChange={(e) => handleChange("msrp", e.target.value)}
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
