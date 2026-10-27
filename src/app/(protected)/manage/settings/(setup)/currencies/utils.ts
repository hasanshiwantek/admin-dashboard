import { REGEX } from "@/const/regex";
import {
  CurrencyFormNames,
  ExchangeRateType,
  SymbolLocation,
  TransactingCurrency,
} from "./constant";
import type {
  Currency,
  CurrencyFormValues,
  CurrencyOption,
  CurrencyPayload,
} from "./type";

export const getCurrencyName = (options: CurrencyOption[], code: string) =>
  options.find((option) => option.code === code)?.name ?? code;

export const formatCurrencyLabel = (currency: Pick<Currency, "code" | "name">) =>
  `${currency.name} - ${currency.code}`;

// Currencies that charge in their own code can't be used until a provider is set up
export const getIncompleteCurrencies = (currencies: Currency[]) =>
  currencies.filter(
    (currency) =>
      !currency.isDefault &&
      !currency.paymentProvider &&
      currency.isTransactional,
  );

export const formatCurrencyPreview = (
  amount: number,
  {
    symbol,
    symbolLocation,
    decimalToken,
    thousandsToken,
    decimalPlaces,
  }: Pick<
    CurrencyFormValues,
    | CurrencyFormNames.Symbol
    | CurrencyFormNames.SymbolLocation
    | CurrencyFormNames.DecimalToken
    | CurrencyFormNames.ThousandsToken
    | CurrencyFormNames.DecimalPlaces
  >,
) => {
  const [whole, fraction] = amount.toFixed(Number(decimalPlaces) || 0).split(".");
  const grouped = whole.replace(REGEX.THOUSANDS_GROUP, thousandsToken);
  const number = fraction ? `${grouped}${decimalToken}${fraction}` : grouped;
  return symbolLocation === SymbolLocation.Right
    ? `${number}${symbol}`
    : `${symbol}${number}`;
};

export const transformGetCurrency = (
  currency: Currency,
): CurrencyFormValues => ({
  [CurrencyFormNames.Name]: currency.name ?? "",
  [CurrencyFormNames.DefaultForCountries]: currency.defaultForCountries ?? [],
  [CurrencyFormNames.TransactingCurrency]: currency.isTransactional
    ? TransactingCurrency.Own
    : TransactingCurrency.Default,
  [CurrencyFormNames.ExchangeRateType]: currency.autoUpdate
    ? ExchangeRateType.Dynamic
    : ExchangeRateType.Static,
  [CurrencyFormNames.ExchangeRate]: String(Number(currency.exchangeRate) || ""),
  [CurrencyFormNames.Symbol]: currency.symbol ?? "",
  [CurrencyFormNames.SymbolLocation]:
    currency.symbolLocation ?? SymbolLocation.Left,
  [CurrencyFormNames.DecimalToken]: currency.decimalToken ?? "",
  [CurrencyFormNames.ThousandsToken]: currency.thousandsToken ?? "",
  [CurrencyFormNames.DecimalPlaces]: String(currency.decimalPlaces ?? 2),
});

// Dynamic rates exist only when charging in the default currency
export const isDynamicRate = (
  values: Pick<
    CurrencyFormValues,
    CurrencyFormNames.TransactingCurrency | CurrencyFormNames.ExchangeRateType
  >,
) =>
  values.transactingCurrency === TransactingCurrency.Default &&
  values.exchangeRateType === ExchangeRateType.Dynamic;

// `record` keeps the field the form doesn't edit (enabled) on update
export const transformPostCurrency = (
  code: string,
  values: CurrencyFormValues,
  record?: Currency | null,
): CurrencyPayload => ({
  code,
  name: values.name,
  symbol: values.symbol,
  symbolLocation: values.symbolLocation as SymbolLocation,
  decimalToken: values.decimalToken,
  thousandsToken: values.thousandsToken,
  decimalPlaces: Number(values.decimalPlaces),
  exchangeRate: Number(values.exchangeRate),
  isTransactional: values.transactingCurrency === TransactingCurrency.Own,
  autoUpdate: isDynamicRate(values),
  defaultForCountries: values.defaultForCountries,
  enabled: record?.enabled ?? true,
  ...(record ? {} : { isDefault: false }),
});

export const toCurrencyPayload = (
  currency: Currency,
  changes: Partial<CurrencyPayload> = {},
): CurrencyPayload => ({
  code: currency.code,
  name: currency.name,
  symbol: currency.symbol,
  symbolLocation: currency.symbolLocation,
  decimalToken: currency.decimalToken,
  thousandsToken: currency.thousandsToken,
  decimalPlaces: Number(currency.decimalPlaces),
  exchangeRate: Number(currency.exchangeRate),
  isTransactional: currency.isTransactional,
  autoUpdate: currency.autoUpdate,
  defaultForCountries: currency.defaultForCountries ?? [],
  enabled: currency.enabled,
  ...changes,
});
