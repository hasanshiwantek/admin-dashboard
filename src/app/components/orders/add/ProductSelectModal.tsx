"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchFilterProducts } from "@/redux/slices/productSlice";
import CategoryTreeSm from "../../products/add/CategoryTreeSm";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import CategoryModal from "../../products/categories/CategoryModal";

export default function ProductSelectModal({
  open,
  onClose,
  onSelectProduct,
}: {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: any) => void;
}) {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<any[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const Products = useAppSelector((state: any) => state.product.filterProducts);
  const loading = useAppSelector((state: any) => state.product.loading);

  const methods = useForm<{ categories: string[] }>({
    defaultValues: { categories: [] },
  });
  const selectedCategories = useWatch({
    control: methods.control,
    name: "categories",
  });

  useEffect(() => {
    if (open) {
      setSearchTerm("");
      setSelectedCategoryIds([]);
      setProductList([]);
      setSelectedProductId(null);
      methods.reset({ categories: [] });
    }
  }, [open]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (
      (!selectedCategories || selectedCategories.length === 0) &&
      !searchTerm.trim()
    ) {
      setProductList([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      dispatch(
        fetchFilterProducts({
          category: selectedCategories?.map((id: string) => id) || [],
          sku: searchTerm,
        })
      );
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedCategories, searchTerm, dispatch]);

  useEffect(() => {
    setProductList(Products?.data || []);
  }, [Products?.data]);

  const products = productList;

  const handleConfirm = () => {
    const product = products.find((p: any) => p.id === selectedProductId);
    if (product) onSelectProduct(product);
    onClose();
  };

  const handleApplyCategory = (ids: number[]) => {
    setSelectedCategoryIds(ids);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-3xl !max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Products</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold mb-2">Search by category</h3>
              <CategoryTreeSm name="categories" />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Search by product name</h3>
              <Input
                placeholder="Enter product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="mt-4 max-h-64 overflow-y-auto border rounded-md p-2">
                {loading ? (
                  <div className="flex items-center justify-center h-20">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : products?.length ? (
                  products.map((product: any) => {
                    const checked = selectedProductId === product.id;
                    return (
                      <label
                        key={product.id}
                        className={`flex items-start  gap-3  p-2 cursor-pointer rounded-sm border-b hover:bg-muted ${checked ? "bg-blue-50" : ""
                          }`}
                      >
                        <input
                          type="radio"
                          name="selectedProduct"
                          className="mt-1 h-4 w-4"
                          checked={checked}
                          onChange={() => setSelectedProductId(product.id)}
                        />
                        <span className="text-lg">
                          {product.sku} - {product.name}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No matching products found.
                  </p>
                )}
              </div>

              <CategoryModal
                open={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                defaultSelectedIds={[]}
                onApply={(ids: string[]) =>
                  handleApplyCategory(ids.map(Number))
                }
              />
            </div>
          </div>
        </FormProvider>

        <div className="flex justify-end mt-4 gap-4">
          <Button variant="outline" onClick={onClose} className="!text-lg p-4">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedProductId}
            className="!text-lg p-4"
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}