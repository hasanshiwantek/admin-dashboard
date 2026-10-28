import { countriesListIconsRaw } from "@/const/location";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { OrderProduct, OrderTotalRow } from "./types";

countries?.registerLocale(enLocale);

/** Normalise a country code to ISO-2 (AFG → AF, AF → AF). */
export const getISO2 = (code: string) => {
  if (!code) return "";
  const upper = code.toUpperCase();
  if (upper.length === 2) return upper;
  return countries.alpha3ToAlpha2(upper) || upper;
};

/** Country list enriched with iso2 + flag url. */
export const countriesListIcons = countriesListIconsRaw?.map((country) => {
  const iso2 = getISO2(country?.value);
  return {
    ...country,
    iso2,
    flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso2}.svg`,
  };
});

/** Find the enriched country entry for a raw country code. */
export const findCountry = (code?: string) =>
  countriesListIcons?.find(
    (c) => c.iso2 === getISO2(code || "") || c.value === code,
  );

export const getAddressCopyText = (info: any) =>
  [
    info?.name || `${info?.firstName || ""} ${info?.lastName || ""}`.trim(),
    [info?.addressLine1, info?.addressLine2].filter(Boolean).join(" "),
    [info?.city, info?.state, info?.zip].filter(Boolean).join(", "),
    info?.country || "",
  ]
    .filter(Boolean)
    .join("\n");

export const formatMoney = (value: unknown) =>
  `$${(Number(value) || 0).toFixed(2)}`;

export const getLineTotal = (item: OrderProduct) => item.price * item.quantity;

export const getOrderTotalRows = (order: any): OrderTotalRow[] => {
  const subtotal = (order?.products ?? []).reduce(
    (sum: number, item: OrderProduct) => sum + getLineTotal(item),
    0,
  );

  return [
    { label: "Subtotal", value: formatMoney(subtotal) },
    ...(Number(order?.manualDiscount) > 0
      ? [{ label: "Discount", value: `-${formatMoney(order.manualDiscount)}` }]
      : []),
    ...(order?.couponCode
      ? [
          {
            label: `Coupon Code (${order.couponCode})`,
            value: `-${formatMoney(order.discountAmount)}`,
          },
        ]
      : []),
    { label: "Shipping", value: formatMoney(order?.shippingCost) },
    { label: "Tax", value: formatMoney(order?.tax) },
  ];
};

/** Storefront URL of a product in the currently selected store, or null. */
export const getStorefrontProductUrl = (productUrl?: string) => {
  try {
    const stores = JSON.parse(localStorage.getItem("availableStores") || "[]");
    const storeId = Number(localStorage.getItem("storeId"));
    const store = stores.find((s: { id: number }) => s.id === storeId);
    if (!store?.baseUrl) return null;
    const path = productUrl === "/" ? "" : (productUrl ?? "");
    return `${store.baseUrl.replace(/\/$/, "")}${path}`;
  } catch {
    return null;
  }
};
