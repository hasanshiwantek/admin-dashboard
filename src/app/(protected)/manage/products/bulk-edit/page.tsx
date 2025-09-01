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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/redux/slices/productSlice";
import CategoryModal from "@/app/components/products/categories/CategoryModal";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { setSelectedProducts } from "@/redux/slices/productSlice";

import { fetchBrands } from "@/redux/slices/productSlice";
import Link from "next/link";
type Product = {
  id: number;
  name: string;
  brand: any;
  categories: any;
  sku: string;
  upc: string;
  price: string;
  salePrice: string;
  trackInventory: boolean;
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
  const [categoryModal, setCategoryModal] = useState<{
    open: boolean;
    productId: number | null;
  }>({ open: false, productId: null });

  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("bulkEditProducts");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProducts(parsed);
        dispatch(setSelectedProducts(parsed)); // optional if you want to use redux too
      } catch (err) {
        console.error("Error parsing bulkEditProducts:", err);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  const handleChange = (id: number, field: keyof Product, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const { brands } = useAppSelector((state: any) => state.product);
  const categories = useAppSelector((state: any) => state.category.categories);
  const allCategories = categories?.data;
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const prepareUpdatePayload = (products: Product[]) => {
    return {
      products: products.map((p) => ({
        id: [p.id],
        fields: {
          name: p.name,
          price: Number(p.price),
          currentStock: Number(p.currentStock),
          brandId: p.brand?.id,
          categoryIds: Array.isArray(p.categories)
            ? p.categories.map((cat: any) => Number(cat.id))
            : [],
          sku: p.sku,
          upc: p.upc,
          salePrice: p.salePrice,
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
      await dispatch(updateProduct({ body: payload })).unwrap();
      localStorage.removeItem("bulkEditProducts"); // ✅ clean up
      console.log("✅ Updated successfully");
    } catch (err) {
      console.error("❌ Failed to update:", err);
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
        <h1 className="mb-6 !font-light p-6">
          <Link href={"/manage/products"}>
            <span className="!mx-5 !text-3xl">View Products /</span>
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
                    <Input
                      type="text"
                      className="w-96"
                      value={product.name}
                      onChange={(e) =>
                        handleChange(product.id, "name", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={String(product.brand?.id || "")}
                      onValueChange={(value) => {
                        const selectedBrand = brands?.data.find(
                          (b: any) => String(b.brand?.id) === value
                        );
                        handleChange(product.id, "brand", selectedBrand?.brand);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands?.data?.map((b: any) => (
                          <SelectItem
                            key={b.brand.id}
                            value={String(b.brand.id)}
                          >
                            {b.brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[150px]">
                        {Array.isArray(product.categories)
                          ? product.categories
                              .map((c: any) => c.name)
                              .join(", ")
                          : ""}
                      </span>
                      <button
                        className="text-blue-600 !text-xl underline"
                        onClick={() =>
                          setCategoryModal({
                            open: true,
                            productId: product.id,
                          })
                        }
                      >
                        Edit
                      </button>
                    </div>
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
                      value={product.upc}
                      onChange={(e) =>
                        handleChange(product.id, "upc", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.price || ""}
                      onChange={(e) =>
                        handleChange(product.id, "price", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="number"
                      className="w-50"
                      value={product.salePrice}
                      onChange={(e) =>
                        handleChange(product.id, "salePrice", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={product.trackInventory}
                      onCheckedChange={(checked) =>
                        handleChange(product.id, "trackInventory", checked)
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
                      checked={product.isVisible}
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
      {categoryModal.open && (
        <CategoryModal
          open={categoryModal.open}
          onClose={() => setCategoryModal({ open: false, productId: null })}
          defaultSelectedIds={
            products
              .find((p) => p.id === categoryModal.productId)
              ?.categories?.map((c: any) => c.id.toString()) || []
          }
          onApply={(selectedIds) => {
            const selectedCats = selectedIds.map((id) => {
              const match = allCategories.find(
                (cat: any) => cat.id.toString() === id
              );
              return {
                id: Number(id),
                name: match?.name || `Category ${id}`, // fallback just in case
              };
            });

            handleChange(categoryModal.productId!, "categories", selectedCats);
          }}
        />
      )}
    </>
  );
}
