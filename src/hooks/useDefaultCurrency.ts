import { FALLBACK_CURRENCY } from "@/app/(protected)/manage/products/constant";
import { getPriceInputProps } from "@/app/(protected)/manage/products/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchDefaultCurrency } from "@/redux/slices/currencySlice";
import { useEffect } from "react";

const useDefaultCurrency = () => {
  const dispatch = useAppDispatch();
  const defaultCurrency = useAppSelector(
    (state) => state.currency.defaultCurrency,
  );
  const defaultCurrencyLoaded = useAppSelector(
    (state) => state.currency.defaultCurrencyLoaded,
  );

  useEffect(() => {
    if (!defaultCurrencyLoaded) dispatch(fetchDefaultCurrency());
  }, [dispatch, defaultCurrencyLoaded]);

  const currency = defaultCurrency ?? FALLBACK_CURRENCY;
  return { currency, priceInputProps: getPriceInputProps(currency) };
};

export default useDefaultCurrency;
