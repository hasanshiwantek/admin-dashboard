"use client";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProductSearchInput from "../ProductSearchInput";
import ProductTable from "../ProductTable";
import { Label } from "@/components/ui/label";
import AddCustomProductModal from "../AddCustomProductModal";
import ProductSelectModal from "../ProductSelectModal";

export default function StepTwo({ step, setStep }: any) {
  const { register, setValue, handleSubmit, control } = useFormContext();

  const watchedProducts = useWatch({
    control,
    name: "selectedProducts",
    defaultValue: [],
  });

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedProducts(watchedProducts || []);
  }, []);

  useEffect(() => {
    setValue("selectedProducts", selectedProducts);
  }, [selectedProducts, setValue]);

  const handleAddProduct = (product: any) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev
        : [...prev, { ...product, quantity: 1 }],
    );
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };

  const handleProductSelect = (product: any) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddCustomProduct = (product: any) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleQtyChange = (id: number, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(quantity, 1) } : p,
      ),
    );
  };

  const handlePriceChange = (id: number | string, price: number) => {
    setSelectedProducts((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, price: Number(price) } : p,
      );
      setValue("selectedProducts", next, { shouldDirty: true });
      return next;
    });
  };

  const onSubmit = () => {
    if (!selectedProducts?.length) {
      toast.error("Please add atleast one product");
      return;
    }
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 p-10 pb-26">
        <h1 className="!text-4xl !font-bold">Add Products</h1>

        <div className="bg-white p-5 flex justify-between gap-10 items-center">
          <div className="flex items-center gap-2 ">
            <Label>Search</Label>
            <ProductSearchInput onSelect={handleAddProduct} />
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn-outline-primary !whitespace-nowrap"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Browse Categories
            </button>
          </div>
        </div>

        {selectedProducts?.length > 0 && (
          <ProductTable
            products={selectedProducts}
            onDelete={handleDeleteProduct}
            onQtyChange={handleQtyChange}
            onPriceChange={handlePriceChange}
          />
        )}

        <ProductSelectModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSelectProduct={handleProductSelect}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t p-6 bg-white flex justify-end gap-4">
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
