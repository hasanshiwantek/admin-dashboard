import RadioGroupField from "@/components/form/fields/RadioGroupField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import PhoneField from "@/components/form/fields/PhoneField";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { Switch } from "@/components/ui/Switch";
import {
  CALL_FOR_PRICING_DEFAULT_COUNTRY,
  MAX_PURCHASE_QUANTITY,
  ProductFormNames,
  ProductSection,
  PurchasabilityStatusOptions,
} from "../[id]/constant";
import { wholeNumberInputProps } from "../utils";
import { ProductPurchasabilitySectionProps } from "./type";

const QUANTITY_HELP =
  "A positive whole number here enforces this limit when customers order this product.";

const ProductPurchasabilitySection = ({
  showCallForPricing,
  showCallForPricingFields,
}: ProductPurchasabilitySectionProps) => (
  <SettingsCard
    id={ProductSection.Purchasability}
    title="Purchasability"
    className="scroll-mt-24"
  >
    <InputField
      name={ProductFormNames.PurchasabilityStatus}
      Component={RadioGroupField}
      options={PurchasabilityStatusOptions}
      layout="vertical"
    />

    {/* Kept outside the radio group so typing doesn't reach its key handling */}
    {showCallForPricing && (
      <div className="flex flex-col gap-5 pl-10">
        <InputField
          name={ProductFormNames.CallForPricing}
          Component={Switch}
          valuePropName="checked"
          changePropName="onCheckedChange"
          label="Show a “Call for pricing” message instead of the price"
          layout="vertical"
        />
        {showCallForPricingFields && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
            <InputField
              name={ProductFormNames.CallForPricingLabel}
              label="Call for pricing label"
              layout="vertical"
              placeholder="Contact us"
              className="max-w-none"
            />
            <InputField
              name={ProductFormNames.CallForPricingPhone}
              label="Call for pricing phone"
              required
              layout="vertical"
              Component={PhoneField}
              defaultCountry={CALL_FOR_PRICING_DEFAULT_COUNTRY}
              className="max-w-none"
            />
          </div>
        )}
      </div>
    )}

    <div className="grid grid-cols-1 gap-x-8 gap-y-5 xl:grid-cols-2">
      <InputField
        name={ProductFormNames.MinPurchaseQuantity}
        label="Minimum purchase quantity"
        layout="vertical"
        max={MAX_PURCHASE_QUANTITY}
        className="max-w-none"
        labelEndComponent={<HelpTooltip content={QUANTITY_HELP} />}
        {...wholeNumberInputProps}
      />
      <InputField
        name={ProductFormNames.MaxPurchaseQuantity}
        label="Maximum purchase quantity"
        layout="vertical"
        max={MAX_PURCHASE_QUANTITY}
        className="max-w-none"
        labelEndComponent={<HelpTooltip content={QUANTITY_HELP} />}
        {...wholeNumberInputProps}
      />
    </div>
  </SettingsCard>
);

export default ProductPurchasabilitySection;
