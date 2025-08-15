"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
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
  const value = watch("shippingMethod.provider") || "none";

  return (
    <div className="space-y-2 pt-4 border-t">
      <h2 className="!font-bold border-b py-4 ">Shipping method</h2>
      <div className="flex items-center gap-3 text-sm mb-2">
        <span className="text-muted-foreground">Choose a provider</span>
        <Link href="#" className="text-blue-600 hover:underline">
          Fetch shipping quotes
        </Link>
      </div>
      <div className="max-w-[200px]">
        <Select
          value={value}
          onValueChange={(val) =>
            setValue("shippingMethod.provider", val, { shouldDirty: true })
          }
        >
          <SelectTrigger id="provider">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
