"use client";
import { useFormContext, useWatch } from "react-hook-form";
import BillingAddressForm from "./BillingAddressForm";
import SingleAddressForm from "./SingleAddressForm";
import MultipleAddressForm from "./MultipleAddressForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function FulfillmentOptions() {
  const { setValue, control, getValues } = useFormContext();

  // ✅ Always watch the current destination type
  const destinationType = useWatch({
    control,
    name: "destinationType",
    defaultValue: "billing",
  });

  // ✅ Handles switching logic safely
  const handleChangeDestination = (val: string) => {
    const currentType = getValues("destinationType");
    const allValues = getValues();

    // Preserve data using new keys
    if (currentType === "multiple" && allValues.shippingDestinations) {
      setValue("shippingDestinations", allValues.shippingDestinations, {
        shouldDirty: true,
      });
    }

    if (currentType === "single" && allValues.destinationForm) {
      setValue("destinationForm", allValues.destinationForm, {
        shouldDirty: true,
      });
    }

    // Now switch type
    setValue("destinationType", val, { shouldDirty: true });
  };

  return (
    <div className="space-y-10 bg-white shadow-sm rounded-sm p-10">
      <div className="space-y-5">
        <h2 className="!font-bold text-xl border-b py-2">Destination</h2>

        <RadioGroup
          value={destinationType}
          onValueChange={handleChangeDestination}
          className="flex items-center gap-8"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="billing" id="dest-billing" />
            <Label htmlFor="dest-billing">Billing address specified</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="dest-single" />
            <Label htmlFor="dest-single">New single address</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiple" id="dest-multiple" />
            <Label htmlFor="dest-multiple">New multiple address</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 👇 Conditionally render the right form */}
      {destinationType === "billing" && <BillingAddressForm />}
      {destinationType === "single" && <SingleAddressForm />}
      {destinationType === "multiple" && <MultipleAddressForm />}
    </div>
  );
}
