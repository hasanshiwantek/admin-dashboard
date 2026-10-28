import { formatCurrencyPreview } from "@/app/(protected)/manage/settings/(setup)/currencies/utils";
import { useAppSelector } from "@/hooks/useReduxHooks";
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

  const toOrderCurrency = (amount: number | string) =>
    Number(((Number(amount) || 0) * rate).toFixed(decimals));

  const fromOrderCurrency = (amount: number) => amount / rate;

  const formatPrice = (amount: number | string) => {
    if (!currency) return `$${(Number(amount) || 0).toFixed(2)}`;
    return formatCurrencyPreview(toOrderCurrency(amount), {
      ...currency,
      decimalPlaces: String(decimals),
    });
  };

  return {
    currency,
    priceStep,
    formatPrice,
    toOrderCurrency,
    fromOrderCurrency,
  };
};

export default useOrderCurrency;
