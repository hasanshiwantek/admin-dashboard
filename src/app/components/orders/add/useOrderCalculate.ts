import { useAppSelector } from "@/hooks/useReduxHooks";
import axiosInstance from "@/lib/axiosInstance";
import { toMajor } from "@/lib/money";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

// Wait this long after the last change before asking for a new quote
const DEBOUNCE_MS = 300;

// The order priced by the backend (`web/orders/order-calculate`) in the
// order's currency, the same way the storefront checkout prices it. Amounts
// are exact, in major units of `currency`; the total is rounded once to the
// minor unit (`totalMinor`: what's charged and sent as `amount`).
export type OrderQuote = {
  currency: string;
  lines: Record<string, number>; // product id → line total
  subtotal: number;
  shipping: number;
  couponDiscount: number;
  manualDiscount: number;
  tax: number;
  totalMinor: number;
  total: number;
};

type CalculateResponse = {
  amount: number;
  currency: { code: string; exchangeRate: number | string };
  manualDiscount?: number;
  convertedCouponDiscount?: number;
  convertedShipping?: number;
  shippingCost?: number;
  convertedTax?: number;
  items?: { productId: number; lineTotal: number }[];
};

const toQuote = (data: CalculateResponse): OrderQuote => {
  const currency = data.currency.code.toUpperCase();
  const lines: Record<string, number> = {};
  for (const item of data.items ?? []) {
    lines[String(item.productId)] =
      (lines[String(item.productId)] ?? 0) + (Number(item.lineTotal) || 0);
  }
  const totalMinor = Math.round(Number(data.amount) || 0);
  return {
    currency,
    lines,
    subtotal: Object.values(lines).reduce((s, l) => s + l, 0),
    // convertedShipping is in the order's currency; older responses only
    // send shippingCost
    shipping: Number(data.convertedShipping ?? data.shippingCost) || 0,
    couponDiscount: Number(data.convertedCouponDiscount) || 0,
    // Already in the order's currency, as the form sends it
    manualDiscount: Number(data.manualDiscount) || 0,
    tax: Number(data.convertedTax) || 0,
    totalMinor,
    total: toMajor({ minor: totalMinor, currency }),
  };
};

// Why the backend can't price this order, or null when it can.
// order-calculate prices catalog products at their catalog price, for one
// address and a quoted shipping rate.
const unpricedReason = (values: any): string | null => {
  const products: any[] = values.selectedProducts ?? [];
  if (!products.length) return "No products";
  if (products.some((p) => p.isCustom)) return "Custom product";
  if (
    products.some(
      (p) =>
        p.actualPrice !== undefined &&
        Number(p.actualPrice) !== Number(p.price),
    )
  )
    return "Price changed";
  if (
    values.destinationType === "multiple" ||
    (values.shippingDestinations ?? []).length > 0
  )
    return "Multiple destinations";
  if (values.shippingMethod?.method_type === "custom")
    return "Custom shipping cost";
  return null;
};

// The fields order-calculate and order create share: currency, shipping
// method and destination, coupon, manual discount (USD) and products
export const buildOrderPricing = (
  values: any,
  currency: { id: number; exchangeRate: number | string },
  appliedCoupon: any,
) => {
  const address = values.shipping?.country ? values.shipping : null;
  return {
    selectedCurrency: {
      id: currency.id,
      exchangeRate: String(currency.exchangeRate),
    },
    method_id: values.shippingMethod?.method_id ?? undefined,
    service_type: values.shippingMethod?.service_type || undefined,
    destination: {
      country_code: (address?.country ?? values.billingCountry) || undefined,
      state: (address?.state ?? values.billingState) || undefined,
      city: (address?.city ?? values.billingCity)?.trim() || undefined,
      postal_code: (address?.zip ?? values.billingZip)?.trim() || undefined,
    },
    coupon: appliedCoupon?.couponCode
      ? { id: appliedCoupon.id, couponCode: appliedCoupon.couponCode }
      : null,
    manualDiscount: Number(values.manualDiscount) || 0,
    products: (values.selectedProducts ?? []).map((p: any) => ({
      product_id: Number(p.id),
      quantity: Number(p.quantity) || 1,
    })),
  };
};

// Prices the add-order form with order-calculate whenever its products,
// currency, address, shipping method, coupon or manual discount change.
// `applies` is false when the order can't be priced by the backend (see
// unpricedReason): then the frontend's totals are used. While it applies,
// the order must not be saved until `notReadyMessage` is null.
export function useOrderCalculate() {
  const { control } = useFormContext();
  const values = useWatch({ control });
  const { currencies } = useAppSelector((state) => state.currency);
  const { appliedCoupon } = useAppSelector((state: any) => state.order);

  const currency = currencies.find(
    ({ code }) => code === values.selectedCurrency?.code,
  );
  const reason = unpricedReason(values);
  const applies = !reason && !!currency;

  const request = applies
    ? {
        isMultiAddress: false,
        ...buildOrderPricing(values, currency, appliedCoupon),
      }
    : null;

  const [quote, setQuote] = useState<OrderQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Changes only when something that affects the price changes
  const key = request ? JSON.stringify(request) : null;
  const latest = useRef(request);
  latest.current = request;

  useEffect(() => {
    if (!key) {
      setQuote(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Loader on now, not after the debounce, so Save is blocked at once
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await axiosInstance.post(
          "web/orders/order-calculate",
          latest.current,
          // No success toast for every re-price
          { signal: controller.signal, silent: true } as any,
        );
        if (controller.signal.aborted) return;
        if (!res.data?.status || !res.data?.data) {
          throw new Error(res.data?.message || "Couldn't calculate the total.");
        }
        setQuote(toQuote(res.data.data));
        setLoading(false);
      } catch (err: any) {
        if (controller.signal.aborted) return;
        setQuote(null);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Couldn't calculate the total.",
        );
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [key]);

  // Why the order can't be saved yet; null when it can
  const notReadyMessage = !applies
    ? null
    : loading
      ? "Updating the order total…"
      : error
        ? `${error} Please try again.`
        : !quote
          ? "Calculating the order total…"
          : null;

  return { applies, quote, loading, error, notReadyMessage };
}
