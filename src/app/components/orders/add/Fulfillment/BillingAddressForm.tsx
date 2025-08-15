"use client";

import { useFormContext } from "react-hook-form";
import ShippingMethod from "./ShippingMethod";
export default function BillingAddressForm() {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <div className="space-y-8">
      <div className="border rounded-md p-5 space-y-2 text-[15px]">
        <h2 className="!font-semibold">
            Billing Address
        </h2>
        <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Name</div>
          <div>{`${data.firstName || "-"} ${data.lastName || ""}`}</div>
        </div>
        <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Address</div>
          <div>{data.address1 || "-"}</div>
        </div>
        <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Suburb/City</div>
          <div>{data.city || "-"}</div>
        </div>
        <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Country</div>
          <div>{data.country || "-"}</div>
        </div>
        <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">ZIP/Postcode</div>
          <div>{data.zip || "-"}</div>
        </div>
      </div>

      <ShippingMethod />
    </div>
  );
}
