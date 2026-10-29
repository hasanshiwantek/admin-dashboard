import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import Link from "next/link";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  maxCouponsOptions,
  PROMOTION_PRIORITIZATION_URL,
  PromotionCalculation,
  PromotionSettingsFormNames,
} from "../constant";

const LABEL_CLASS = "font-semibold text-gray-800 2xl:text-[1.5rem]!";

const calculationOptions = [
  {
    value: PromotionCalculation.Independent,
    label:
      "Independently, each applied to the original price of the included products",
  },
  {
    value: PromotionCalculation.Cumulative,
    label: (
      <div className="flex items-center gap-1">
        Cumulatively, applied to the order subtotal based on your
        <Link
          href={PROMOTION_PRIORITIZATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline"
        >
          promotion prioritization
        </Link>
      </div>
    ),
  },
];

const GeneralSection = () => (
  <SectionCard title="General">
    <InputField
      name={PromotionSettingsFormNames.CalculationMethod}
      label="When multiple promotions are in a cart, calculate them"
      layout="vertical"
      labelClassName={LABEL_CLASS}
      Component={RadioGroupField}
      options={calculationOptions}
      className="gap-3"
      optionClassName="gap-4 text-[1.4rem]! text-gray-700"
    />
    <InputField
      name={PromotionSettingsFormNames.MaxCouponsPerOrder}
      label={
        <span className="flex flex-col gap-2">
          Number of coupons allowed at checkout on a single order
          <span className="text-[1.3rem] font-normal text-gray-500">
            Increasing this value is only available on Enterprise plans. Upgrade
            today to use this feature.
          </span>
        </span>
      }
      layout="vertical"
      labelClassName={LABEL_CLASS}
      Component={SelectField}
      options={maxCouponsOptions}
      disabled
      controlClassName="max-w-[42rem]"
      className="max-w-none"
    />
  </SectionCard>
);

export default GeneralSection;
