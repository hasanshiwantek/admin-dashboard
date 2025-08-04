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
import Link from "next/link";
type Product = {
  id: number;
  name: string;
  brand: string;
  categories: string;
  sku: string;
  "upc/ean": string;
  defaultPrice: string;
  price: string;
  trackInventory: string;
  currentStock: string;
  isVisible: boolean;
  isFeatured: boolean;
  freeShipping: any;
};

export default function BulkEdit() {
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
          brand: p.brand,
          categories: p.categories,
          sku: p.sku,
          "upc/ean": p["upc/ean"],
          defaultPrice: p.defaultPrice,
          trackInventory: p.trackInventory,
          isVisible: p.isVisible,
          isFeatured: p.isFeatured,
          freeShipping: p.freeShipping,
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
        <h1 className="mb-6">
          <Link href={"/manage/products"}>
            <span>View Products</span>
          </Link>
          Bulk Edit
        </h1>

        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="min-w-[1000px]">
            <TableHeader className="h-20">
              <TableRow>
                <TableHead>Product name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>UPC/EAN</TableHead>
                <TableHead>Default Price</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Track Inventory</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Free Shipping</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="  !max-w-[500px]">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product.brand}
                      onChange={(e) =>
                        handleChange(product.id, "brand", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product.categories}
                      onChange={(e) =>
                        handleChange(product.id, "categories", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product.sku}
                      onChange={(e) =>
                        handleChange(product.id, "sku", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product["upc/ean"]}
                      onChange={(e) =>
                        handleChange(product.id, "upc/ean", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.defaultPrice || ""}
                      onChange={(e) =>
                        handleChange(product.id, "defaultPrice", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(product.id, "price", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product.trackInventory}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "trackInventory",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="text"
                      className="w-50"
                      value={product.currentStock}
                      onChange={(e) =>
                        handleChange(product.id, "currentStock", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={product.isFeatured}
                      onCheckedChange={(checked) =>
                        handleChange(product.id, "isVisible", checked)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={product.isFeatured}
                      onCheckedChange={(checked) =>
                        handleChange(product.id, "isFeatured", checked)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={product.freeShipping}
                      onCheckedChange={(checked) =>
                        handleChange(product.id, "freeShipping", checked)
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
