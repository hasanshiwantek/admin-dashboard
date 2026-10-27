import type { ColumnDef } from "@/components/ui/Table/types";
import type { CountryOption, Currency } from "../type";

export interface DefaultCurrencySectionProps {
  currency: Currency | null;
  loading: boolean;
}

export interface AdditionalCurrenciesSectionProps {
  currencies: Currency[];
  columns: ColumnDef<Currency>[];
  existingCodes: string[];
  loading: boolean;
  refreshing: boolean;
}

export interface CurrencySetupNoticeProps {
  currencies: Currency[];
  onDismiss: () => void;
}

export interface CurrencyDisplaySectionProps {
  code: string;
  countries: CountryOption[];
}

export interface CurrencyTransactionsSectionProps {
  code: string;
  name: string;
  defaultCode: string;
  defaultName: string;
  /** Dynamic/Static choice, offered when charging in the default currency */
  showRateType: boolean;
  isDynamicRate: boolean;
  exchangeRate: string;
  rateLoading: boolean;
  onGetCurrentRate: () => void;
  onRateModeChange: () => void;
}

export type StaticRateFieldsProps = Pick<
  CurrencyTransactionsSectionProps,
  "code" | "defaultCode" | "rateLoading" | "onGetCurrentRate"
>;

export type DynamicRateProps = Pick<
  CurrencyTransactionsSectionProps,
  "code" | "defaultCode" | "exchangeRate" | "rateLoading"
>;

export interface TransactingOptionLabelProps {
  title: string;
  hint: string;
}

export interface CurrencyDisplaySettingsSectionProps {
  preview: string;
}
