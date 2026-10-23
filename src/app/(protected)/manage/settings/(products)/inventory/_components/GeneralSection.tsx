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
        Backordering functionality is not compatible with this option. To
        ensure accurate inventory tracking, please update stock levels when the
        order is placed.{" "}
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
