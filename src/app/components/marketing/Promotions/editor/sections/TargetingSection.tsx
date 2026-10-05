"use client";

import { useFormContext } from "@/components/form/Form";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { CURRENCY_OPTIONS } from "../../constant";
import { ANY, CUSTOMER_GROUP_OPTIONS, PromotionField } from "../constant";
import { BulletRow, Pill, Tag } from "../SentenceParts";
import {
  CARD,
  CARD_HEADER,
  CARD_TITLE,
  LINK_BUTTON,
  SELECT,
} from "../styles";
import { PromotionFormValues } from "../types";

const CURRENCY_TARGET_OPTIONS = [
  { value: ANY, label: "Any currency" },
  ...CURRENCY_OPTIONS,
];

// Customer group is the only targeting rule the backend supports, so the
// rule type and operator are fixed.
const TARGET_TYPE_OPTIONS = [
  { value: "customer_group", label: "Customer Group" },
];
const OPERATOR_OPTIONS = [{ value: "is", label: "Is" }];

const TargetingSection = () => {
  const { setValue, watch } = useFormContext<PromotionFormValues>();
  const customerGroup = watch(PromotionField.CustomerGroup);

  return (
    <Card className={CARD}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>Targeting</CardTitle>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-4">
        <div>
          <Pill>Target customers if</Pill>
        </div>
        <BulletRow>
          <Tag>Currency is</Tag>
          <InputField
            name={PromotionField.Currency}
            layout="vertical"
            Component={SelectField}
            options={CURRENCY_TARGET_OPTIONS}
            className={cn(SELECT, "min-w-[26rem]")}
          />
        </BulletRow>

        {customerGroup !== null ? (
          <BulletRow
            onRemove={() => setValue(PromotionField.CustomerGroup, null)}
          >
            <SelectField
              value="customer_group"
              options={TARGET_TYPE_OPTIONS}
              className={cn(SELECT, "min-w-[24rem]")}
            />
            <SelectField
              value="is"
              options={OPERATOR_OPTIONS}
              className={cn(SELECT, "min-w-[16rem]")}
            />
            <InputField
              name={PromotionField.CustomerGroup}
              layout="vertical"
              Component={SelectField}
              options={CUSTOMER_GROUP_OPTIONS}
              placeholder="Select a customer group"
              className={cn(SELECT, "min-w-[30rem]")}
            />
          </BulletRow>
        ) : (
          <Button
            type="button"
            variant="link"
            className={cn(LINK_BUTTON, "self-start ml-4")}
            onClick={() => setValue(PromotionField.CustomerGroup, "")}
          >
            <Plus />
            Add targeting rule
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TargetingSection;
