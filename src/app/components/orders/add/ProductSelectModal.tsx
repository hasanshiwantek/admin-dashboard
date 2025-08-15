"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchAllProducts } from "@/redux/slices/productSlice";
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
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedcategories, setSelectedcategories] = useState<number[]>([]);

  const Products = useAppSelector((state: any) => state.product.products);
  const Categories = useAppSelector(
    (state: any) => state.category.categories || []
  );

  const products = Products?.data;

  const allCategories = Categories?.data;

  const methods = useForm<{ categories: string[] }>({
    defaultValues: { categories: [] },
  });
  const selectedCategories = useWatch({
    control: methods.control,
    name: "categories",
  });
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllProducts({ page: 1, pageSize: 1000 }));
  }, [dispatch]);

  // Filter products by category and name
  const filteredProducts = products?.filter((product: any) => {
    const inCategory =
      selectedCategories.length === 0 ||
      product.categories?.some((c: any) =>
        selectedCategories.includes(String(c.id))
      );

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return inCategory && matchesSearch;
  });

  const handleApplyCategory = (ids: number[]) => {
    setSelectedCategoryIds(ids);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-3xl !max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Products</DialogTitle>
        </DialogHeader>
        {/* Search and Category Tree */}
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
                {filteredProducts?.length ? (
                  filteredProducts?.map((product: any) => (
                    <div
                      key={product.id}
                      className="p-1 hover:bg-muted cursor-pointer rounded-sm text-lg border-b"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    >
                      {product.sku} - {product.name}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No matching products found.
                  </p>
                )}
              </div>
              {/* Nested category modal */}
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

        {/* Footer */}
        <div className="flex justify-end mt-4 gap-4">
          <Button variant="outline" onClick={onClose} className="!text-lg p-4">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
