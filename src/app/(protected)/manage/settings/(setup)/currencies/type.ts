import type { CurrencySchema } from "@/validations/formValidations";
import * as yup from "yup";
import type { SymbolLocation } from "./constant";

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  symbolLocation: SymbolLocation;
  decimalToken: string;
  thousandsToken: string;
  decimalPlaces: number;
  exchangeRate: number | string;
  isTransactional: boolean;
  autoUpdate: boolean;
  defaultForCountries: string[] | null;
  enabled: boolean;
  isDefault: boolean;
  paymentProvider?: string | null;
}

export type CurrencyPayload = Omit<
  Currency,
  "id" | "isDefault" | "paymentProvider"
> & { isDefault?: boolean };

export interface ListResponse<T> {
  status: boolean;
  data: T[];
}

export interface CurrenciesResponse {
  status: boolean;
  data: { default: Currency | null; additional: Currency[] };
}

export interface CurrencyResponse {
  status: boolean;
  data: Currency;
}

export type DefaultCurrency = Pick<
  Currency,
  | "code"
  | "name"
  | "symbol"
  | "symbolLocation"
  | "decimalToken"
  | "thousandsToken"
  | "decimalPlaces"
  | "exchangeRate"
  | "isDefault"
>;

export interface DefaultCurrencyResponse {
  status: boolean;
  data: DefaultCurrency | null;
}

export interface CurrencyOption {
  code: string;
  name: string;
  label: string;
}

export interface CountryOption {
  code: string;
  name: string;
}

export interface CurrentRateParams {
  from: string;
  to: string;
}

export interface CurrentRateResponse {
  status: boolean;
  from: string;
  to: string;
  rate: number;
  date: string;
}

export type CurrencyFormValues = yup.InferType<typeof CurrencySchema>;

export interface RelatedSetting {
  title: string;
  description: string;
  href: string;
}
