"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ShippingMethod() {
  const { setValue, watch } = useFormContext();

  const provider = watch("shippingMethod.provider") || "none";
  const method = watch("shippingMethod.method") || "";
  const cost = watch("shippingMethod.cost") || "0.00";

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("shippingMethod.method", e.target.value, { shouldDirty: true });
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Allow only numbers and one decimal
    const formatted = rawValue
      .replace(/[^\d.]/g, "")
      .replace(/^(\d*\.)(.*)$/, (m, p1, p2) => p1 + p2.replace(/\./g, ""));
    setValue("shippingMethod.cost", formatted, { shouldDirty: true });
  };

  return (
    <div className="space-y-4 pt-4 border-t">
      <h2 className="!font-bold border-b py-4">Shipping method</h2>

      {/* --- Provider selection --- */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 ">
          <span className="text-muted-foreground">Choose a provider</span>
          <Link href="#" className="text-blue-600 hover:underline">
            Fetch shipping quotes
          </Link>
        </div>

        <div className="max-w-[250px]">
          <Select
            value={provider}
            onValueChange={(val) => {
              setValue("shippingMethod.provider", val, { shouldDirty: true });

              // Reset custom fields when switching away
              if (val !== "custom") {
                setValue("shippingMethod.method", "", { shouldDirty: true });
                setValue("shippingMethod.cost", "0.00", { shouldDirty: true });
              }
            }}
          >
            <SelectTrigger id="provider">
              <SelectValue placeholder="Select Shipping Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fedex_priority">
                FedEx (International Priority)
              </SelectItem>
              <SelectItem value="fedex_economy">
                FedEx (International Economy)
              </SelectItem>
              <SelectItem value="label_provided">
                I will provide my own label
              </SelectItem>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* --- Custom fields --- */}
      {provider === "custom" && (
        <div className="space-y-5 pt-2">
          {/* Method input */}
          <div>
            <Label htmlFor="shipping-method-name">Shipping method</Label>
            <Input
              id="shipping-method-name"
              value={method}
              onChange={handleMethodChange}
              className="mt-1 w-full max-w-md"
              placeholder="Enter custom method"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Custom shipping method is not applicable to draft orders.
            </p>
          </div>

          {/* Cost input */}
          <div className="max-w-[150px]">
            <Label htmlFor="shipping-cost">Cost</Label>
            <Input
              id="shipping-cost"
              type="text"
              value={cost}
              onChange={handleCostChange}
              className="mt-1 text-right"
              placeholder="0.00"
            />
          </div>
        </div>
      )}
    </div>
  );
}
