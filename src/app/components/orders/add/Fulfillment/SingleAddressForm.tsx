"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ShippingMethod from "./ShippingMethod";
export default function SingleAddressForm() {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="rounded-md space-y-5">
        <h2 className="!font-bold !text-2xl border-b py-2">Shipping address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input {...register("shipping.firstName")} placeholder="First Name" />
          <Input {...register("shipping.lastName")} placeholder="Last Name" />
          <Input {...register("shipping.companyName")} placeholder="Company Name (Optional)" />
          <Input {...register("shipping.phoneNumber")} placeholder="Phone Number (Optional)" />
          <Input {...register("shipping.address1")} placeholder="Address Line 1" />
          <Input {...register("shipping.address2")} placeholder="Address Line 2 (Optional)" />
          <Input {...register("shipping.city")} placeholder="Suburb/City" />

          <Controller
            name="shipping.country"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Country"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Input {...register("shipping.state")} placeholder="State/Province" />
          <Input {...register("shipping.zip")} placeholder="Zip/Postcode" />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Controller
            name="shipping.saveToAddressBook"
            control={control}
            render={({ field }) => (
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label >Save to customer's address book</Label>
        </div>
      </div>

      <ShippingMethod />
    </div>
  );
}
