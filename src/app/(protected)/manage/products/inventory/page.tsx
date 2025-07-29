"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/redux/slices/productSlice";
import { refetchProducts } from "@/lib/productUtils";

type Product = {
  id: number;
  name: string;
  sku: string;
  price: string;
  adjustBy: string;
  currentStock: string;
  lowStock: string;
  bpn: string;
  safetyStock: string;
  allowPurchase: boolean;
};

export default function EditInventoryPage() {
  const selectedProducts = useAppSelector(
    (state) => state.product.selectedProducts
  );
  const dispatch = useAppDispatch();
  console.log("Edited Seledcted Products From Redux: ", selectedProducts);

  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setProducts(selectedProducts);
    }
  }, [selectedProducts]);

  const handleChange = (id: number, field: keyof Product, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const prepareUpdatePayload = (products: Product[]) => {
    return {
      products: products.map((p) => ({
        id: p.id,
        fields: {
          price: Number(p.price),
          currentStock: Number(p.currentStock),
          lowStock: Number(p.lowStock),
          safetyStock: Number(p.safetyStock),
          allowPurchase: p.allowPurchase,
          // bpn: p.bpn,
          // adjustBy: Number(p.adjustBy), // optional: only if needed by backend
        },
      })),
    };
  };

  const handleSave = async () => {
    try {
      const payload = prepareUpdatePayload(products);
      console.log("🔼 Sending payload:", payload);
      const res = await dispatch(updateProduct({ body: payload })).unwrap();
      console.log("✅ Updated successfully:", res);
    } catch (err) {
      console.error("❌ Failed to update products:", err);
    }
  };

  const handleSaveAndExit = () => {
    handleSave();
    // TODO: Navigate back or close modal
    router.push("/manage/products");
    console.log("✅ Save and exit clicked");
  };

  return (
    <>
      <div className="p-10 bg-muted min-h-screen">
        <h1 className="mb-6">Edit Inventory</h1>

        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="min-w-[1000px]">
            <TableHeader className="h-20">
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Adjust by</TableHead>
                <TableHead>Current stock</TableHead>
                <TableHead>Low stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>BPN</TableHead>
                <TableHead>Safety stock</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className=" whitespace-normal break-words leading-snug max-w-[300px]">
                    {product.name}
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.adjustBy}
                      onChange={(e) =>
                        handleChange(product.id, "adjustBy", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.currentStock}
                      onChange={(e) =>
                        handleChange(product.id, "currentStock", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.lowStock}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "lowStock",

                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "price",

                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product.bpn}
                      onChange={(e) =>
                        handleChange(product.id, "bpn", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.safetyStock}
                      onChange={(e) =>
                        handleChange(product.id, "safetyStock", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={product.allowPurchase}
                      onCheckedChange={(checked) =>
                        handleChange(product.id, "allowPurchase", checked)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <button className="btn-outline-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn-primary" onClick={handleSaveAndExit}>
          Save and exit
        </button>
      </div>
    </>
  );
}
