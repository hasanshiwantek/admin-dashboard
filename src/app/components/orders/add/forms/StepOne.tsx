// app/components/Step1CustomerInfo.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";

export default function StepOne({ data, onNext }: any) {
  const { register, handleSubmit } = useForm({ defaultValues: data });

  const onSubmit = (formData: any) => {
    console.log("Step1 data:", formData);
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold">Customer Information</h2>

      <RadioGroup defaultValue="existing" className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing" />
          <Label htmlFor="existing">Existing customer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new">New customer</Label>
        </div>
      </RadioGroup>

      <Input {...register("search")} placeholder="Search by name or email" className="text-lg" />

      <h3 className="text-md font-semibold mt-4">Billing Information</h3>
      <Input {...register("firstName")} placeholder="First Name" className="text-lg" />
      <Input {...register("lastName")} placeholder="Last Name" className="text-lg" />
      <Input {...register("companyName")} placeholder="Company Name (optional)" className="text-lg" />
      <Input {...register("phoneNumber")} placeholder="Phone Number (optional)" className="text-lg" />
      <Input {...register("address1")} placeholder="Address Line 1" className="text-lg" />
      <Input {...register("address2")} placeholder="Address Line 2 (optional)" className="text-lg" />
      <Input {...register("city")} placeholder="City" className="text-lg" />
      <Input {...register("state")} placeholder="State / Province" className="text-lg" />
      <Input {...register("zip")} placeholder="Zip / Postal Code" className="text-lg" />
      <Input {...register("country")} placeholder="Country" className="text-lg" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
        Next
      </button>
    </form>
  );
}
