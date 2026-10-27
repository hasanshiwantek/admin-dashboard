import { RadioGroupField } from "@/components/form/fields/RadioGroupField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";
import SettingsCard from "../../../_components/SettingsCard";
import {
  CurrencyFormNames,
  EXCHANGE_RATE_LEARN_MORE_URL,
  exchangeRateTypeOptions,
  LABEL_CLASS,
  TransactingCurrency,
} from "../constant";
import {
  CurrencyTransactionsSectionProps,
  DynamicRateProps,
  StaticRateFieldsProps,
  TransactingOptionLabelProps,
} from "./type";

const OptionLabel = ({ title, hint }: TransactingOptionLabelProps) => (
  <span className="flex flex-col gap-1">
    <span className="text-text-heading">{title}</span>
    <span className="text-[1.3rem] text-gray-500">{hint}</span>
  </span>
);

const StaticRateFields = ({
  code,
  defaultCode,
  rateLoading,
  onGetCurrentRate,
}: StaticRateFieldsProps) => (
  <div className="flex flex-col items-start gap-1">
    <h4 className="mb-3 text-[1.4rem] font-semibold text-gray-500">
      Set static conversion rate
    </h4>
    <InputField
      name={CurrencyFormNames.ExchangeRate}
      label={`1 ${defaultCode} equals`}
      layout="vertical"
      type="number"
      min={0}
      step="any"
      controlClassName="max-w-[30rem]"
      labelClassName={LABEL_CLASS}
      afterFieldComponent={
        <span className="text-[1.4rem] text-text-heading">{code}</span>
      }
    />
    <Button
      type="button"
      variant="link"
      className="h-auto p-0 text-[1.4rem]"
      disabled={rateLoading || !defaultCode}
      onClick={onGetCurrentRate}
    >
      {rateLoading ? "Getting rate..." : "Get current rate"}
    </Button>
  </div>
);

const DynamicRate = ({
  code,
  defaultCode,
  exchangeRate,
  rateLoading,
}: DynamicRateProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-[1.4rem] text-gray-500">1 {defaultCode} equals</span>
    <span className="text-[2.8rem] font-light text-gray-500">
      {rateLoading ? "Getting rate..." : `${exchangeRate || "-"} ${code}`}
    </span>
    <span className="text-[1.4rem] text-text-heading">
      The exchange rate updates every four hours.
    </span>
  </div>
);

const CurrencyTransactionsSection = ({
  code,
  name,
  defaultCode,
  defaultName,
  showRateType,
  isDynamicRate,
  exchangeRate,
  rateLoading,
  onGetCurrentRate,
  onRateModeChange,
}: CurrencyTransactionsSectionProps) => {
  const staticFields = (
    <StaticRateFields
      code={code}
      defaultCode={defaultCode}
      rateLoading={rateLoading}
      onGetCurrentRate={onGetCurrentRate}
    />
  );

  return (
    <SettingsCard title="Transactions" className="border-0 shadow-sm">
      <InputField
        name={CurrencyFormNames.TransactingCurrency}
        label="Transacting currency"
        layout="vertical"
        Component={RadioGroupField}
        options={[
          {
            value: TransactingCurrency.Own,
            label: (
              <OptionLabel
                title={`${code} - ${name}`}
                hint={`Customers will be charged in ${code}. Must set up payment provider that supports this currency.`}
              />
            ),
          },
          {
            value: TransactingCurrency.Default,
            label: (
              <OptionLabel
                title={`${defaultCode} - ${defaultName} (Default currency)`}
                hint={`Customers will see prices in ${code} but will be charged in ${defaultCode}.`}
              />
            ),
          },
        ]}
        className="gap-5"
        optionClassName="items-start"
        labelClassName={LABEL_CLASS}
        containerClassName="border-b border-gray-200 pb-8"
        getValueOnChange={onRateModeChange}
        runAfterOnChange
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-[1.5rem] font-bold text-text-heading">
          Exchange rate
        </h3>
        <p className="text-[1.4rem]! text-text-heading!">
          Set the exchange rate to autoconvert your prices and shipping quotes
          for this currency. Use price lists to set fixed prices by currency.{" "}
          <a
            href={EXCHANGE_RATE_LEARN_MORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary-blue hover:underline"
          >
            Learn more
            <ExternalLink className="size-5" />
          </a>
        </p>
      </div>

      {showRateType ? (
        <div className="grid grid-cols-[auto_1fr] gap-x-12">
          <InputField
            name={CurrencyFormNames.ExchangeRateType}
            layout="vertical"
            Component={RadioGroupField}
            options={exchangeRateTypeOptions}
            className="gap-5"
            getValueOnChange={onRateModeChange}
            runAfterOnChange
          />
          {isDynamicRate ? (
            <DynamicRate
              code={code}
              defaultCode={defaultCode}
              exchangeRate={exchangeRate}
              rateLoading={rateLoading}
            />
          ) : (
            staticFields
          )}
        </div>
      ) : (
        staticFields
      )}
    </SettingsCard>
  );
};

export default CurrencyTransactionsSection;
