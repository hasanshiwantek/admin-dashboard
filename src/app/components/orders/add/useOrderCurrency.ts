import { formatCurrencyPreview } from "@/app/(protected)/manage/settings/(setup)/currencies/utils";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { money, roundTo, toMajor } from "@/lib/money";
import { useFormContext, useWatch } from "react-hook-form";

// Prices are stored in the default currency (USD); show them in the order's currency
const useOrderCurrency = () => {
  const { control } = useFormContext();
  const currencyCode = useWatch({ control, name: "selectedCurrency" })?.code;
  const { currencies } = useAppSelector((state) => state.currency);
  const currency = currencies.find(({ code }) => code === currencyCode);
  const rate = Number(currency?.exchangeRate) || 1;
  const decimals = currency?.decimalPlaces ?? 2;
  const priceStep = 1 / 10 ** decimals;

  // A USD price in the order's currency at its dashboard decimal places
  // (half up; `toFixed` alone rounds the binary float, e.g. 1.005 → 1.00)
  const toOrderCurrency = (amount: number | string) =>
    roundTo((Number(amount) || 0) * rate, Number(decimals));

  const fromOrderCurrency = (amount: number) => amount / rate;

  const format = (amount: number) =>
    currency
      ? formatCurrencyPreview(amount, {
          ...currency,
          decimalPlaces: String(decimals),
        })
      : `$${roundTo(amount, 2).toFixed(2)}`;

  // Prices, lines, discounts, shipping: the USD amount converted exactly,
  // shown at the dashboard's decimal places
  const formatPrice = (amount: number | string) =>
    format(currency ? toOrderCurrency(amount) : Number(amount) || 0);

  // The order total as charged: the exact USD amounts added up, then
  // converted and rounded once to the currency's minor unit (pence) — the
  // storefront and backend do the same
  const formatTotal = (amount: number | string) =>
    format(toMajor(money((Number(amount) || 0) * rate, currency?.code ?? "USD")));

  // An amount already in the order's currency (e.g. from order-calculate)
  const formatAmount = (amount: number) => format(amount);

  return {
    currency,
    priceStep,
    formatPrice,
    formatTotal,
    formatAmount,
    toOrderCurrency,
    fromOrderCurrency,
  };
};

export default useOrderCurrency;
