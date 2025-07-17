// app/components/Step2AddProducts.tsx
"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function StepTwo({ data, onNext }: any) {
  const { register, handleSubmit } = useForm({ defaultValues: data });

  const onSubmit = (formData: any) => {
    console.log("Step2 data:", formData);
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold">Add Products</h2>
      <Input {...register("searchProduct")} placeholder="Search by product name, SKU etc." className="text-lg" />
      <Input {...register("customProduct")} placeholder="Add custom product (optional)" className="text-lg" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
        Next
      </button>
    </form>
  );
}
