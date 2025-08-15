"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import ProductSearchInput from "../ProductSearchInput";
import ProductTable from "../ProductTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddCustomProductModal from "../AddCustomProductModal";
import ProductSelectModal from "../ProductSelectModal";
import { useRouter } from "next/navigation";

export default function StepTwo({ data, onNext, step, setStep }: any) {
  const dispatch = useAppDispatch();
  const Products = useAppSelector((state: any) => state.product.products);
  const allProducts = Products?.data;
  const { register, handleSubmit, watch } = useForm({ defaultValues: data });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchAllProducts({ page: 1, pageSize: 100 }));
  }, [dispatch]);

  const handleAddProduct = (product: any) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev
        : [...prev, { ...product, qty: 1 }]
    );
  };
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const handleProductSelect = (product: any) => {
    // Prevent duplicates
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };
  const handleDeleteProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };
  const handleAddCustomProduct = (product: any) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  useEffect(() => {
    if (data?.selectedProducts?.length) {
      setSelectedProducts(data.selectedProducts);
    }
  }, [data?.selectedProducts]);

  const onSubmit = (formData: any) => {
    const finalData = {
      ...formData,
      selectedProducts, // should reference latest state if onSubmit is re-declared each render
    };
    console.log("Step2 data:", finalData);
    onNext(finalData);
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 p-10 pb-26">
        <h1 className="!text-4xl !font-bold">Add Products</h1>

        <div className="bg-white p-5 flex justify-between gap-10 items-center">
          <div className="flex items-center gap-2 w-full">
            <Label>Search</Label>

            <ProductSearchInput
              allProducts={allProducts}
              onSelect={handleAddProduct}
              register={register}
            />

            <AddCustomProductModal onAdd={handleAddCustomProduct} />
          </div>

          <div className="flex items-center gap-2 ">
            <span>or</span>
            <button
              className="btn-outline-primary !whitespace-nowrap"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Browse Categories
            </button>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <ProductTable
            products={selectedProducts}
            onDelete={handleDeleteProduct}
            onQtyChange={(id, qty) => {
              setSelectedProducts((prev) =>
                prev.map((p) => (p.id === id ? { ...p, qty } : p))
              );
            }}
          />
        )}
        {/* Modal */}
        <ProductSelectModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSelectProduct={handleProductSelect}
        />
      </div>

      <div className="fixed  bottom-0 left-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="btn-outline-primary"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-outline-primary"
          onClick={() => setStep(step - 1)}
        >
          Back
        </button>
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
}
