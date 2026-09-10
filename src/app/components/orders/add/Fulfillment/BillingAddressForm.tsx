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
          <div>{`${data.billingFirstName || ""} ${data.billingLastName || ""}`}</div>
        </div>
        {data?.billingCompanyName && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Company</div>
          <div>{data?.billingCompanyName}</div>
        </div>}
        {data?.billingPhoneNumber && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Phone</div>
          <div>{data?.billingPhoneNumber}</div>
        </div>}
        {data.billingAddress1 && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Address</div>
          <div>{data.billingAddress1}</div>
        </div>}
        {data.billingCity && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Suburb/City</div>
          <div>{data.billingCity}</div>
        </div>}
        {data.billingState && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">State/Province</div>
          <div>{data.billingState}</div>
        </div>}
        {data.billingCountry && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">Country</div>
          <div>{data.billingCountry}</div>
        </div>}
        {data.billingZip && <div className="flex gap-6">
          <div className="w-40 text-muted-foreground font-medium">ZIP/Postcode</div>
          <div>{data.billingZip}</div>
        </div>}
      </div>

      <ShippingMethod />
    </div>
  );
}
