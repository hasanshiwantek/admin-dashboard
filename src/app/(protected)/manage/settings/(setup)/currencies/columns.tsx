import ActionButton from "@/components/ActionButton/ActionButton";
import { ActionItem } from "@/components/ActionButton/type";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import Link from "next/link";
import { PAYMENT_ROUTE } from "../payment/constant";
import { currencyRoute } from "./constant";
import { Currency } from "./type";
import { formatCurrencyLabel } from "./utils";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";
const LINK_TEXT = "text-[1.5rem]! text-primary-blue hover:underline";

export const currencyActions: ActionItem[] = [
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.SET_DEFAULT, label: "Set as default" },
  { type: ActionEnums.DELETE, label: "Delete" },
];

const paymentProviderColumn: ColumnDef<Currency> = {
  key: "paymentProvider",
  header: "Payment provider",
  render: (currency) => (
    <Link href={PAYMENT_ROUTE} className={LINK_TEXT}>
      {currency.paymentProvider || "Set up"}
    </Link>
  ),
};

export const defaultCurrencyColumns: ColumnDef<Currency>[] = [
  {
    key: "name",
    header: "Currency name",
    render: (currency) => (
      <span className={CELL_TEXT}>{formatCurrencyLabel(currency)}</span>
    ),
  },
  paymentProviderColumn,
  {
    key: "edit",
    className: "text-right",
    render: (currency) => (
      <Link href={currencyRoute(currency.code)} className={LINK_TEXT}>
        Edit
      </Link>
    ),
  },
];

export const getAdditionalCurrencyColumns = ({
  defaultCode,
  onToggleEnabled,
  onAction,
}: {
  defaultCode: string;
  onToggleEnabled: (currency: Currency) => (enabled: boolean) => void;
  onAction: (currency: Currency) => (action: ActionEnums) => void;
}): ColumnDef<Currency>[] => [
  {
    key: "name",
    header: "Currency name",
    render: (currency) => (
      <Link href={currencyRoute(currency.code)} className={LINK_TEXT}>
        {formatCurrencyLabel(currency)}
      </Link>
    ),
  },
  {
    key: "exchangeRate",
    header: "Conversion rate",
    render: (currency) => (
      <span className={CELL_TEXT}>{Number(currency.exchangeRate)}</span>
    ),
  },
  {
    key: "isTransactional",
    header: "Transacting currency",
    render: (currency) => (
      <span className={CELL_TEXT}>
        {currency.isTransactional
          ? `This currency (${currency.code})`
          : `Default currency (${defaultCode})`}
      </span>
    ),
  },
  paymentProviderColumn,
  {
    key: "enabled",
    header: "Visible?",
    render: (currency) => (
      <Switch
        checked={currency.enabled}
        onCheckedChange={onToggleEnabled(currency)}
        aria-label={`Show ${currency.name} to customers`}
      />
    ),
  },
  {
    key: "actions",
    render: (currency) => (
      <ActionButton
        data={currency}
        actions={currencyActions}
        onAction={onAction}
        label={`Actions for ${currency.name}`}
      />
    ),
  },
];
