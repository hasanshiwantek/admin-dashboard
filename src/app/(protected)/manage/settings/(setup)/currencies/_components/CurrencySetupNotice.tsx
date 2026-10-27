import SettingsNotice from "../../../_components/SettingsNotice";
import { formatCurrencyLabel } from "../utils";
import { CurrencySetupNoticeProps } from "./type";

const CurrencySetupNotice = ({
  currencies,
  onDismiss,
}: CurrencySetupNoticeProps) => (
  <SettingsNotice tone="warning" showIcon onDismiss={onDismiss}>
    <strong className="block text-text-heading">
      Currency set up may be incomplete
    </strong>
    You won&apos;t be able to display or transact in the following currency
    until you set up a payment provider.{" "}
    {currencies.map((currency) => `"${formatCurrencyLabel(currency)}"`).join(", ")}
  </SettingsNotice>
);

export default CurrencySetupNotice;
