import CheckboxField from "@/components/form/fields/CheckboxField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import Link from "next/link";
import SettingsCard from "../../../_components/SettingsCard";
import SettingsNotice from "../../../_components/SettingsNotice";
import {
  BACKORDERS_LEARN_MORE_URL,
  FIELD_CONTROL_CLASS,
  FIELD_LABEL_CLASS,
  SELECT_CLASS,
  InventoryFormNames,
  optionUnavailableOptions,
  productUnavailableOptions,
  updateStockLevelsOptions,
} from "../constant";
import { GeneralSectionProps } from "./type";
import { CircleHelp } from "lucide-react";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const GeneralSection = ({
  showHideInFiltering,
  showBackorderNotice,
}: GeneralSectionProps) => (
  <SettingsCard title="General">
    <InputField
      name={InventoryFormNames.ProductUnavailableAction}
      label="When a product can no longer be sold"
      layout="vertical"
      Component={SelectField}
      className={SELECT_CLASS}
      options={productUnavailableOptions}
      labelClassName={FIELD_LABEL_CLASS}
      controlClassName={FIELD_CONTROL_CLASS}
      labelEndComponent={
        <HelpTooltip
          side="right"
          content="The total amount of inventory available to sell is the sum of 'on hand' stock and the 'backorder limit', minus any 'safety stock' and 'qty backordered'."
          iconClassName="fill-muted-plum-gray"
        />
      }
    />
    <InputField
      name={InventoryFormNames.OptionUnavailableAction}
      label="When a product option can no longer be sold"
      layout="vertical"
      Component={SelectField}
      className={SELECT_CLASS}
      options={optionUnavailableOptions}
      labelClassName={FIELD_LABEL_CLASS}
      controlClassName={FIELD_CONTROL_CLASS}
      labelEndComponent={
        <HelpTooltip
          side="right"
          content="Available to Sell (ATS) is a calculated value that represents the quantity of inventory that can be currently sold to customers. It is calculated as: Quantity on Hand + (Sum of Additions) - (Sum of Deductions). ATS defaults to zero if the calculation results in less than zero."
          iconClassName="fill-muted-plum-gray"
        />
      }
    />
    {showHideInFiltering && (
      <InputField
        name={InventoryFormNames.HideOutOfStockInFiltering}
        layout="vertical"
        Component={CheckboxField}
        text="Also hide in product filtering results"
      />
    )}
    <InputField
      name={InventoryFormNames.UpdateStockLevels}
      label="Update stock levels"
      layout="vertical"
      Component={SelectField}
      className={SELECT_CLASS}
      options={updateStockLevelsOptions}
      labelClassName={FIELD_LABEL_CLASS}
      controlClassName={FIELD_CONTROL_CLASS}
    />
    {showBackorderNotice && (
      <SettingsNotice showIcon>
        Backordering functionality is not compatible with this option. To ensure
        accurate inventory tracking, please update stock levels when the order
        is placed.{" "}
        <Link
          href={BACKORDERS_LEARN_MORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[1.4rem]! text-link hover:underline"
        >
          Learn more
        </Link>
      </SettingsNotice>
    )}
    <InputField
      name={InventoryFormNames.AutoAdjustStockLevels}
      layout="vertical"
      Component={CheckboxField}
      text="Automatically adjust stock levels when the order status is updated to: “Refunded” or “Cancelled”"
    />
  </SettingsCard>
);

export default GeneralSection;
