import CheckboxField from "@/components/form/fields/CheckboxField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import SettingsCard from "../../../_components/SettingsCard";
import {
  FIELD_CONTROL_CLASS,
  FIELD_LABEL_CLASS,
  SELECT_CLASS,
  InventoryFormNames,
  stockLevelDisplayOptions,
} from "../constant";
import { StockLevelSectionProps } from "./type";
import { CircleHelp } from "lucide-react";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";

const StockLevelSection = ({
  showPreOrderInventory,
}: StockLevelSectionProps) => (
  <SettingsCard title="Stock level">
    <InputField
      name={InventoryFormNames.StockLevelDisplay}
      label="Stock level display"
      layout="vertical"
      Component={SelectField}
      className={SELECT_CLASS}
      options={stockLevelDisplayOptions}
      labelClassName={FIELD_LABEL_CLASS}
      controlClassName={FIELD_CONTROL_CLASS}
      labelEndComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <p>
                Showing shoppers that stock is running low encourages them to
                buy sooner rather than later.
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
    />
    {showPreOrderInventory && (
      <InputField
        name={InventoryFormNames.ShowPreOrderInventory}
        layout="vertical"
        Component={CheckboxField}
        text="Show pre-order inventory"
      />
    )}
    <InputField
      name={InventoryFormNames.OutOfStockMessage}
      label="Out of stock message"
      layout="vertical"
      labelClassName={FIELD_LABEL_CLASS}
      controlClassName={FIELD_CONTROL_CLASS}
      labelEndComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <p>
                This is the message shoppers will see when a product is out of
                stock.
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
    />
    <InputField
      name={InventoryFormNames.ShowOutOfStockOnListing}
      layout="vertical"
      Component={CheckboxField}
      text="Show out of stock message on product listing pages"
    />
  </SettingsCard>
);

export default StockLevelSection;
