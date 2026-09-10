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
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchShippingRates } from "@/redux/slices/orderSlice";
export function calculatePackage(products: any[]) {
  const totalWeight = products.reduce((sum, p) => {
    const weight = parseFloat(p.dimensions?.weight) || 1;
    const qty = p.quantity || 1;
    return sum + weight * qty;
  }, 0);

  const orderTotal = products.reduce((sum, p) => {
    const price = parseFloat(p.price) || 1;
    const qty = p.quantity || 1;
    return sum + price * qty;
  }, 0);

  const itemCount = products.reduce((sum, p) => sum + (p.quantity || 1), 0);

  const maxLength = Math.max(
    ...products.map((p) => parseFloat(p.dimensions?.depth) || 1),
  );
  const maxWidth = Math.max(
    ...products.map((p) => parseFloat(p.dimensions?.width) || 1),
  );
  const maxHeight = Math.max(
    ...products.map((p) => parseFloat(p.dimensions?.height) || 1),
  );

  return {
    total_weight: totalWeight, // fallback if data missing
    weight_unit: "LB",
    order_total: orderTotal,
    item_count: itemCount,
    package_value: orderTotal,
  };
}
export default function ShippingMethod() {
  const { setValue, watch, getValues } = useFormContext();
  const dispatch = useAppDispatch()
  const values = getValues()

  const selectedMethod = watch("shippingMethod");
  const provider = selectedMethod?.method_id
    ? String(selectedMethod.method_id)
    : selectedMethod?.service_type || "none";
  const method = watch("shippingMethod.method")
  const cost = watch("shippingMethod.cost")
  const cart = values?.selectedProducts
  const { shippingRates, } = useAppSelector(
    (state) => state.order,
  );
  const rates = Array.isArray(shippingRates) ? shippingRates : [];


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
  useEffect(() => {
    const payload = {
      country: values?.shipping?.country || values?.billingCountry,
      state: values?.shipping?.state || values?.billingState,
      city: values?.shipping?.city || values?.billingCity,
      zip: values?.shipping?.zip || values?.billingZip,
    }

    if (payload?.country && payload?.state && payload?.zip && cart?.length > 0) {
      dispatch(
        fetchShippingRates(
          {
            data: {
              destination: {
                country_code: payload?.country,
                state: payload?.state,
                postal_code: payload?.zip,
                ...(payload?.city?.trim() && { city: payload?.city?.trim() }),
              },
              package: calculatePackage(cart),
              // "package": {
              //   "total_weight": 12,
              //   "weight_unit": "LB",
              //   "order_total": 22,
              //   "item_count": 1,
              //   "package_value": 22
              // }
            },
          }
        )
      );
    }
  }, [values?.shipping?.country, values?.shipping?.state, values?.shipping?.city, values?.shipping?.zip])
  // const handleProviderChange = (val: string) => {
  //   setValue("shippingMethod.provider", val, { shouldDirty: true });

  //   if (val === "none" || val === "custom") {
  //     setValue("shippingMethod.method", val === "custom" ? method : "", {
  //       shouldDirty: true,
  //     });
  //     setValue("shippingMethod.cost", val === "none" ? "0.00" : cost, {
  //       shouldDirty: true,
  //     });
  //     return;
  //   }

  //   const rate = rates.find((r: any) => r.service_type === val);
  //   if (!rate) return;

  //   setValue(
  //     "shippingMethod.method",
  //     rate.is_fedex ? rate.service_name : rate.display_name,
  //     { shouldDirty: true }
  //   );
  //   setValue("shippingMethod.cost", String(rate.total_charge ?? 0), {
  //     shouldDirty: true,
  //   });
  //   setValue("shippingMethod.rate", rate, { shouldDirty: true });
  // };



  const handleProviderChange = (val: string) => {
    if (val === "none") {
      setValue(
        "shippingMethod",
        {
          method_id: null,
          method_type: "none",
          display_name: "None",
          total_charge: 0,
          currency: "USD",
          transit_days: null,
          delivery_date: null,
          service_type: "none",
          is_fedex: false,
        },
        { shouldDirty: true }
      );
      return;
    }

    if (val === "custom") {
      setValue(
        "shippingMethod",
        {
          method_id: null,
          method_type: "custom",
          display_name: "Custom",
          total_charge: Number(watch("shippingMethod.total_charge") || 0),
          currency: "USD",
          transit_days: null,
          delivery_date: null,
          service_type: "custom",
          is_fedex: false,
        },
        { shouldDirty: true }
      );
      return;
    }

    const rate = rates.find((r: any) => String(r.method_id) === String(val));
    if (!rate) return;

    setValue(
      "shippingMethod",
      {
        method_id: rate.method_id,
        method_type: rate.method_type,
        display_name: rate.display_name || rate.service_name,
        total_charge: Number(rate.total_charge ?? 0),
        currency: rate.currency || "USD",
        transit_days: rate.transit_days ?? null,
        delivery_date: rate.delivery_date ?? null,
        service_type: rate.service_type,
        is_fedex: !!rate.is_fedex,
      },
      { shouldDirty: true }
    );
  };
  return (
    <div className="space-y-4 pt-4 border-t">
      <h2 className="!font-bold border-b py-4">Shipping method</h2>

      {/* --- Provider selection --- */}
      <div className="space-y-3">
        {/* <div className="flex items-center gap-3 ">
          <span className="text-muted-foreground">Choose a provider</span>
          <Link href="#" className="text-blue-600 hover:underline">
            Fetch shipping quotes
          </Link>
        </div> */}

        <div className="w-full max-w-xl">
          <Select value={provider} onValueChange={handleProviderChange}>
            <SelectTrigger id="provider" className="h-auto min-h-10 py-2 text-left">
              <SelectValue placeholder="Select Shipping Provider">
                {selectedMethod?.display_name
                  ? `${selectedMethod.display_name} — ${Number(selectedMethod.total_charge) === 0
                    ? "Free"
                    : `$${Number(selectedMethod.total_charge).toFixed(2)}`
                  }`
                  : "Select Shipping Provider"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent className="min-w-[520px]">
              {rates.map((rate: any) => {
                const label = rate.is_fedex
                  ? `FedEx (${rate.service_name})`
                  : rate.display_name;
                const price =
                  Number(rate.total_charge) === 0
                    ? "Free"
                    : `$${Number(rate.total_charge).toFixed(2)}`;

                return (
                  <SelectItem key={rate.method_id} value={String(rate.method_id)}>
                    {label} — {price}
                  </SelectItem>
                );
              })}
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
