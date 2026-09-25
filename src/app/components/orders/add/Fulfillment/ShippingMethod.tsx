"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchShippingRates } from "@/redux/slices/orderSlice";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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

  return {
    total_weight: totalWeight, // fallback if data missing
    weight_unit: "LB",
    order_total: orderTotal,
    item_count: itemCount,
    package_value: orderTotal,
  };
}

const hasFreeShipping = (p: any) => Boolean(p?.freeShipping);
const hasFixedShipping = (p: any) => Number(p?.fixedShippingCost) > 0;

export function getProductShippingRate(products: any[]) {
  if (!products?.length) return null;
  if (!products.every((p) => hasFreeShipping(p) || hasFixedShipping(p))) {
    return null;
  }

  const fixedProducts = products.filter(hasFixedShipping);
  if (fixedProducts.length > 0) {
    const total = fixedProducts.reduce(
      (sum, p) => sum + Number(p.fixedShippingCost) * (Number(p.quantity) || 1),
      0,
    );
    return {
      method_id: null,
      method_type: "fixed_shipping",
      service_type: "fixed_shipping",
      display_name: "Fixed Shipping",
      total_charge: Number(total.toFixed(2)),
      currency: "USD",
      transit_days: null,
      delivery_date: null,
      is_fedex: false,
    };
  }

  return {
    method_id: null,
    method_type: "free_shipping",
    service_type: "free_shipping",
    display_name: "Free Shipping",
    total_charge: 0,
    currency: "USD",
    transit_days: null,
    delivery_date: null,
    is_fedex: false,
  };
}
export default function ShippingMethod() {
  const { setValue, watch, getValues } = useFormContext();
  const dispatch = useAppDispatch();
  const values = getValues();

  const selectedMethod = watch("shippingMethod") || {};
  const provider =
    selectedMethod.service_type ||
    (selectedMethod.method_id ? String(selectedMethod.method_id) : "none");
  const method = watch("shippingMethod.method");
  // const cost = watch("shippingMethod.cost")
  const cost =
    selectedMethod.method_type === "custom" &&
    (selectedMethod.cost === 0 || selectedMethod.cost === "0")
      ? ""
      : String(selectedMethod.cost ?? "");
  const cart = watch("selectedProducts") || [];
  const { shippingRates } = useAppSelector((state) => state.order);
  const productShippingRate = getProductShippingRate(cart);
  const rates = productShippingRate
    ? [productShippingRate]
    : Array.isArray(shippingRates)
      ? shippingRates
      : [];

  // Keep a previously selected fixed/free method in sync with the current cart
  useEffect(() => {
    const isProductMethod =
      selectedMethod.service_type === "fixed_shipping" ||
      selectedMethod.service_type === "free_shipping";
    if (!isProductMethod) return;

    if (!productShippingRate) {
      setValue("shippingMethod", {}, { shouldDirty: true });
      return;
    }
    if (
      selectedMethod.service_type !== productShippingRate.service_type ||
      Number(selectedMethod.total_charge) !== productShippingRate.total_charge
    ) {
      setValue(
        "shippingMethod",
        {
          ...productShippingRate,
          cost: String(productShippingRate.total_charge),
        },
        { shouldDirty: true },
      );
    }
  }, [productShippingRate?.service_type, productShippingRate?.total_charge]);

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      "shippingMethod",
      {
        ...selectedMethod,
        method_type: "custom",
        service_type: "custom",
        display_name: e.target.value,
      },
      { shouldDirty: true },
    );
  };
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = e.target.value
      .replace(/[^\d.]/g, "")
      .replace(/^(\d*\.)(.*)$/, (_m, p1, p2) => p1 + p2.replace(/\./g, ""));

    setValue(
      "shippingMethod",
      {
        ...selectedMethod,
        method_type: "custom",
        service_type: "custom",
        total_charge: formatted,
        cost: formatted,
      },
      { shouldDirty: true },
    );
  };
  useEffect(() => {
    // Product-level fixed/free shipping replaces carrier quotes
    if (productShippingRate) return;

    const payload = {
      country: values?.shipping?.country || values?.billingCountry,
      state: values?.shipping?.state || values?.billingState,
      city: values?.shipping?.city || values?.billingCity,
      zip: values?.shipping?.zip || values?.billingZip,
    };

    if (
      payload?.country &&
      payload?.state &&
      payload?.zip &&
      cart?.length > 0
    ) {
      dispatch(
        fetchShippingRates({
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
        }),
      );
    }
  }, [
    values?.shipping?.country,
    values?.shipping?.state,
    values?.shipping?.city,
    values?.shipping?.zip,
  ]);

  const handleProviderChange = (val: string) => {
    if (val === "none") {
      setValue(
        "shippingMethod",
        {
          method_id: null,
          method_type: "none",
          display_name: "None",
          total_charge: 0,
          cost: "0.00",
          currency: "USD",
          transit_days: null,
          delivery_date: null,
          service_type: "none",
          is_fedex: false,
        },
        { shouldDirty: true },
      );
      return;
    }

    if (val === "custom") {
      setValue(
        "shippingMethod",
        {
          method_id: null,
          method_type: "custom",
          display_name: selectedMethod.display_name || "Custom",
          total_charge: Number(selectedMethod.total_charge || 0),
          cost: selectedMethod.cost || String(selectedMethod.total_charge || 0),
          currency: "USD",
          transit_days: null,
          delivery_date: null,
          service_type: "custom",
          is_fedex: false,
        },
        { shouldDirty: true },
      );
      return;
    }

    const rate = rates.find((r: any) => String(r.service_type) === String(val));
    if (!rate) return;

    setValue(
      "shippingMethod",
      {
        method_id: rate.method_id,
        method_type: rate.method_type,
        display_name: rate.display_name || rate.service_name,
        total_charge: Number(rate.total_charge ?? 0),
        cost: String(rate.total_charge ?? 0),
        currency: rate.currency || "USD",
        transit_days: rate.transit_days ?? null,
        delivery_date: rate.delivery_date ?? null,
        service_type: rate.service_type,
        is_fedex: !!rate.is_fedex,
      },
      { shouldDirty: true },
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

        <div className="w-full max-w-2xl">
          <Select value={provider} onValueChange={handleProviderChange}>
            <SelectTrigger className="h-auto min-h-10 w-full py-2 text-left">
              <span className="line-clamp-2 whitespace-normal break-words text-left">
                {selectedMethod?.display_name
                  ? `${selectedMethod.display_name} — ${
                      Number(selectedMethod.total_charge) === 0
                        ? "Free"
                        : `$${Number(selectedMethod.total_charge).toFixed(2)}`
                    }`
                  : "Select Shipping Provider"}
              </span>
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              className="w-[var(--radix-select-trigger-width)]"
            >
              {rates.map((rate: any) => {
                const label = rate.is_fedex
                  ? `FedEx (${rate.service_name})`
                  : rate.display_name;
                const price =
                  Number(rate.total_charge) === 0
                    ? "Free"
                    : `$${Number(rate.total_charge).toFixed(2)}`;

                return (
                  <SelectItem
                    key={rate.service_type}
                    value={String(rate.service_type)}
                  >
                    <span className="block truncate">
                      {label} — {price}
                    </span>
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
              value={method || selectedMethod.display_name}
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
