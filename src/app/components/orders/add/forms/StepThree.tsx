// app/components/Step3Fulfillment.tsx
"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function StepThree({ data, onNext }: any) {
  const { register, handleSubmit } = useForm({ defaultValues: data });

  const onSubmit = (formData: any) => {
    console.log("Step3 data:", formData);
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold">Fulfillment Info</h2>
      <Input {...register("shippingMethod")} placeholder="Shipping Method" className="text-lg" />
      <Input {...register("deliveryDate")} placeholder="Expected Delivery Date" className="text-lg" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
        Next
      </button>
    </form>
  );
}
