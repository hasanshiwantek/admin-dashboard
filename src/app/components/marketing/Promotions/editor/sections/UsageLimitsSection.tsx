"use client";

import { useFormContext } from "@/components/form/Form";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NumberStepper from "@/components/ui/NumberStepper";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { COMBINE_OPTIONS, PromotionField } from "../constant";
import { BulletRow, Tag } from "../SentenceParts";
import { CARD, CARD_HEADER, CARD_TITLE, LABEL, SELECT, TEXT } from "../styles";
import { PromotionFormValues } from "../types";

const LimitGroup = ({
  heading,
  limitLabel,
  limitDescription,
  modeName,
  countName,
  disabled,
}: {
  heading: string;
  limitLabel: string;
  limitDescription: string;
  modeName:
    | PromotionField.MaxRedemptionsMode
    | PromotionField.PerCustomerLimitMode;
  countName: PromotionField.MaxRedemptions | PromotionField.PerCustomerLimit;
  disabled?: boolean;
}) => {
  const { watch } = useFormContext<PromotionFormValues>();
  const mode = watch(modeName);

  return (
    <div className="flex flex-col gap-4">
      <span className={LABEL}>{heading}</span>
      <InputField
        name={modeName}
        layout="vertical"
        Component={RadioGroupField}
        options={[
          { value: "none", label: "No limit" },
          {
            value: "limited",
            label: limitLabel,
            description: limitDescription,
            disabled,
          },
        ]}
        className="gap-4"
        optionClassName={cn(TEXT, "text-gray-800")}
      />
      {mode === "limited" && (
        <InputField
          name={countName}
          layout="vertical"
          Component={NumberStepper}
          containerClassName="items-start"
        />
      )}
    </div>
  );
};

const UsageLimitsSection = ({ isCoupon }: { isCoupon: boolean }) => {
  const { setValue, watch } = useFormContext<PromotionFormValues>();
  const isFeatured = watch(PromotionField.IsFeatured);

  // Featured promotions can't have a limited number of uses. Only reacts to
  // the user ticking "Feature promotion", so loaded values are left intact.
  useEffect(() => {
    const { unsubscribe } = watch((values, { name, type }) => {
      if (
        name === PromotionField.IsFeatured &&
        type === "change" &&
        values[PromotionField.IsFeatured]
      )
        setValue(PromotionField.MaxRedemptionsMode, "none");
    });
    return unsubscribe;
  }, [watch, setValue]);

  return (
    <Card className={CARD}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>Usage limits</CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-8">
        <LimitGroup
          heading="Promotion level - How many times this promotion can be applied across all channels"
          limitLabel="Limit total uses"
          limitDescription="Great for controlling promotion budget, and creating urgency, e.g., first 100 redemptions get 20% off."
          modeName={PromotionField.MaxRedemptionsMode}
          countName={PromotionField.MaxRedemptions}
          disabled={!isCoupon && isFeatured}
        />

        {isCoupon && (
          <LimitGroup
            heading="Customer level - How many times each customer can redeem codes in this promotion"
            limitLabel="Limit per customer uses"
            limitDescription="Ideal for high-value discounts or one-time gifts, e.g., Enjoy $20 off on your birthday."
            modeName={PromotionField.PerCustomerLimitMode}
            countName={PromotionField.PerCustomerLimit}
          />
        )}

        <div className="flex flex-col gap-4">
          <span className={LABEL}>Allow usage with other promotions</span>
          <BulletRow>
            <Tag>This promotion</Tag>
            <InputField
              name={PromotionField.CombineMode}
              layout="vertical"
              Component={SelectField}
              options={COMBINE_OPTIONS}
              className={cn(SELECT, "min-w-[16rem]")}
            />
            <Tag>be used in conjunction with other promotions</Tag>
          </BulletRow>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageLimitsSection;
