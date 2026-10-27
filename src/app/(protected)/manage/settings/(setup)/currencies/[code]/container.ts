import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  createCurrency,
  fetchCurrencies,
  fetchCurrencyById,
  fetchCurrencyCountries,
  fetchCurrencyOptions,
  fetchCurrentRate,
  fetchDefaultCurrency,
  updateCurrency,
} from "@/redux/slices/currencySlice";
import { errorMessage } from "@/utils/message";
import { CurrencySchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  currencyDefaults,
  CURRENCIES_ROUTE,
  CurrencyFormNames,
  PREVIEW_AMOUNT,
  TransactingCurrency,
} from "../constant";
import { CurrencyFormValues } from "../type";
import {
  formatCurrencyPreview,
  getCurrencyName,
  isDynamicRate,
  transformGetCurrency,
  transformPostCurrency,
} from "../utils";

const useCurrencyFormPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { code: codeParam } = useParams<{ code: string }>();
  const code = decodeURIComponent(codeParam).toUpperCase();

  const {
    currencies,
    selectedCurrency,
    defaultCurrency,
    currencySaving,
    currencyOptions,
    currencyOptionsLoading,
    countries,
    currentRateLoading,
  } = useAppSelector((state) => state.currency);

  // The mode is only known once this visit's list is in (a stored list may be stale)
  const [listReady, setListReady] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrencies()).finally(() => setListReady(true));
    dispatch(fetchDefaultCurrency());
    dispatch(fetchCurrencyCountries());
  }, [dispatch]);

  useEffect(() => {
    if (!currencyOptions.length) dispatch(fetchCurrencyOptions());
  }, [dispatch, currencyOptions.length]);

  // The detail endpoint takes the id only, so the list maps the URL's code to it
  const listed = listReady
    ? (currencies.find((currency) => currency.code === code) ?? null)
    : null;
  const isEdit = !!listed;
  const listedId = listed?.id;

  useEffect(() => {
    if (!listedId) return;
    dispatch(fetchCurrencyById(listedId)).then((result) => {
      if (!fetchCurrencyById.rejected.match(result)) return;
      errorMessage(result.payload as string);
      router.push(CURRENCIES_ROUTE);
    });
  }, [dispatch, listedId, router]);

  // Ignore a record left in the store from a previously opened currency
  const record =
    listedId && selectedCurrency?.id === listedId ? selectedCurrency : null;

  const optionsLoaded = !currencyOptionsLoading && currencyOptions.length > 0;
  const isKnownCode = currencyOptions.some((option) => option.code === code);
  if (listReady && !listed && optionsLoaded && !isKnownCode) notFound();

  const defaultCode = defaultCurrency?.code ?? "";
  const name =
    record?.name ?? listed?.name ?? getCurrencyName(currencyOptions, code);

  const form = useForm<CurrencyFormValues>({
    resolver: yupResolver(CurrencySchema),
    defaultValues: currencyDefaults,
  });
  const { control, getValues, reset, setValue } = form;

  useEffect(() => {
    if (record) reset(transformGetCurrency(record));
  }, [record, reset]);

  useEffect(() => {
    if (listReady && !isEdit) setValue(CurrencyFormNames.Name, name);
  }, [listReady, isEdit, name, setValue]);

  const [symbol, symbolLocation, decimalToken, thousandsToken, decimalPlaces] =
    useWatch({
      control,
      name: [
        CurrencyFormNames.Symbol,
        CurrencyFormNames.SymbolLocation,
        CurrencyFormNames.DecimalToken,
        CurrencyFormNames.ThousandsToken,
        CurrencyFormNames.DecimalPlaces,
      ],
    });

  // Last rate fetched on this page, reused when switching back to Dynamic
  const [liveRate, setLiveRate] = useState<string | null>(null);

  const applyRate = useCallback(
    (rate: string) =>
      setValue(CurrencyFormNames.ExchangeRate, rate, {
        shouldValidate: true,
        shouldDirty: true,
      }),
    [setValue],
  );

  const handleGetCurrentRate = useCallback(async () => {
    const result = await dispatch(
      fetchCurrentRate({ from: defaultCode, to: code }),
    );
    if (fetchCurrentRate.rejected.match(result)) {
      errorMessage(result.payload as string);
      return;
    }
    const rate = String(result.payload);
    setLiveRate(rate);
    applyRate(rate);
  }, [dispatch, defaultCode, code, applyRate]);

  useEffect(() => {
    if (listReady && !isEdit && defaultCode) handleGetCurrentRate();
  }, [listReady, isEdit, defaultCode, handleGetCurrentRate]);

  const [transactingCurrency, exchangeRateType, exchangeRate] = useWatch({
    control,
    name: [
      CurrencyFormNames.TransactingCurrency,
      CurrencyFormNames.ExchangeRateType,
      CurrencyFormNames.ExchangeRate,
    ],
  });

  // A dynamic rate shows the live value: fetched once, then reused on later switches
  const handleRateModeChange = () => {
    if (!isDynamicRate(getValues())) return;
    if (liveRate) return applyRate(liveRate);
    if (!currentRateLoading) handleGetCurrentRate();
  };

  const onSubmit = async (values: CurrencyFormValues) => {
    const data = transformPostCurrency(code, values, record);
    const result = record
      ? await dispatch(updateCurrency({ id: record.id, data }))
      : await dispatch(createCurrency(data));

    if (
      updateCurrency.rejected.match(result) ||
      createCurrency.rejected.match(result)
    ) {
      errorMessage(result.payload as string);
      return;
    }
    router.push(CURRENCIES_ROUTE);
  };

  return {
    form,
    // Never for the default currency; also hidden until the mode and record are known
    showTransactions: listReady && (isEdit ? !!record && !record.isDefault : true),
    code,
    name,
    defaultCode,
    defaultName: defaultCurrency?.name ?? defaultCode,
    countries,
    title: `${code} - ${name}`,
    preview: formatCurrencyPreview(PREVIEW_AMOUNT, {
      symbol,
      symbolLocation,
      decimalToken,
      thousandsToken,
      decimalPlaces,
    }),
    loading: !listReady || (isEdit && !record),
    saving: currencySaving,
    showRateType: transactingCurrency === TransactingCurrency.Default,
    isDynamicRate: isDynamicRate({ transactingCurrency, exchangeRateType }),
    exchangeRate,
    rateLoading: currentRateLoading,
    handleGetCurrentRate,
    handleRateModeChange,
    onSubmit,
    handleCancel: () => router.push(CURRENCIES_ROUTE),
  };
};

export default useCurrencyFormPageContainer;
