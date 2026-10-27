import type { SelectOption } from "@/components/ui/Select";
import { PAYMENT_ROUTE } from "../payment/constant";
import { SHIPPING_ROUTE } from "../shipping/constant";
import { TAX_ROUTE } from "../tax/constant";
import type { CurrencyFormValues, RelatedSetting } from "./type";

export const CURRENCIES_ROUTE = "/manage/settings/currencies";
// Edits the currency when the store has it, otherwise adds it
export const currencyRoute = (code: string) => `${CURRENCIES_ROUTE}/${code}`;

export const CURRENCIES_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Managing-Currencies";
export const EXCHANGE_RATE_LEARN_MORE_URL =
  "https://support.bigcommerce.com/s/article/Price-Lists";

export const PREVIEW_AMOUNT = 1234.56;

export const FIELD_WIDTH = "max-w-[65rem]";
export const LABEL_CLASS = "font-bold!";

export enum TransactingCurrency {
  Own = "own",
  Default = "default",
}

// Only offered when charging in the default currency; Dynamic = autoUpdate
export enum ExchangeRateType {
  Dynamic = "dynamic",
  Static = "static",
}

export const exchangeRateTypeOptions: SelectOption[] = [
  { value: ExchangeRateType.Dynamic, label: "Dynamic" },
  { value: ExchangeRateType.Static, label: "Static" },
];

export enum SymbolLocation {
  Left = "left",
  Right = "right",
}

export const symbolLocationOptions: SelectOption[] = [
  { value: SymbolLocation.Left, label: "Left" },
  { value: SymbolLocation.Right, label: "Right" },
];

export const decimalPlacesOptions: SelectOption[] = [0, 1, 2, 3, 4, 5, 6].map(
  (places) => ({ value: String(places), label: String(places) }),
);

export enum CurrencyFormNames {
  Name = "name",
  DefaultForCountries = "defaultForCountries",
  TransactingCurrency = "transactingCurrency",
  ExchangeRateType = "exchangeRateType",
  ExchangeRate = "exchangeRate",
  Symbol = "symbol",
  SymbolLocation = "symbolLocation",
  DecimalToken = "decimalToken",
  ThousandsToken = "thousandsToken",
  DecimalPlaces = "decimalPlaces",
}

export const currencyDefaults: CurrencyFormValues = {
  [CurrencyFormNames.Name]: "",
  [CurrencyFormNames.DefaultForCountries]: [],
  [CurrencyFormNames.TransactingCurrency]: TransactingCurrency.Own,
  [CurrencyFormNames.ExchangeRateType]: ExchangeRateType.Dynamic,
  [CurrencyFormNames.ExchangeRate]: "",
  [CurrencyFormNames.Symbol]: "$",
  [CurrencyFormNames.SymbolLocation]: SymbolLocation.Left,
  [CurrencyFormNames.DecimalToken]: ".",
  [CurrencyFormNames.ThousandsToken]: ",",
  [CurrencyFormNames.DecimalPlaces]: "2",
};

export const relatedSettings: RelatedSetting[] = [
  {
    title: "Payments",
    description:
      "Set up a payment provider to support transacting in multiple currencies.",
    href: PAYMENT_ROUTE,
  },
  {
    title: "Tax",
    description:
      "Taxes will be calculated based on the rate set for your default currency.",
    href: TAX_ROUTE,
  },
  {
    title: "Shipping",
    description:
      "Shipping costs will be autoconverted from rates set in your default currency.",
    href: SHIPPING_ROUTE,
  },
];
