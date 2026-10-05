"use client";

import { useFormContext } from "@/components/form/Form";
import CheckboxField from "@/components/form/fields/CheckboxField";
import SelectField from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import {
  CHANNEL_OPTIONS,
  FEATURED_MESSAGE_MAX,
  PromotionField,
} from "../constant";
import { Pill } from "../SentenceParts";
import {
  CARD,
  CARD_HEADER,
  CARD_TITLE,
  LABEL,
  SELECT,
  TEXT,
} from "../styles";
import { PromotionFormValues } from "../types";

const PreviewCard = ({
  message,
  layout,
}: {
  message: string;
  layout: "listing" | "detail";
}) => {
  const image = (
    <div className="flex items-center justify-center bg-gray-100 text-gray-400 text-base! rounded-sm">
      Product Image
    </div>
  );
  const details = (
    <div className="flex flex-col gap-1">
      <span className="text-lg! font-semibold text-gray-800">
        Sample Product
      </span>
      <span className="text-lg! font-semibold text-gray-800">$79.99</span>
      <span className="mt-2 px-3 py-2 text-base! bg-amber-50 border border-amber-200 text-gray-800 break-words">
        {message || "Your message"}
      </span>
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "border border-gray-300 rounded-sm p-4 bg-white",
          layout === "listing"
            ? "flex flex-col gap-4 w-[22rem] [&>div:first-child]:h-36"
            : "flex gap-4 w-[30rem] [&>div:first-child]:w-32 [&>div:first-child]:h-56",
        )}
      >
        {image}
        {details}
      </div>
      <span className="text-lg! text-gray-500">
        {layout === "listing" ? "Product listing page" : "Product detail page"}
      </span>
    </div>
  );
};

const SummarySection = ({ isCoupon }: { isCoupon: boolean }) => {
  const { watch } = useFormContext<PromotionFormValues>();
  // watch([...]) types enum-keyed fields as never, so the tuple is cast.
  const [isFeatured, featuredMessage] = watch([
    PromotionField.IsFeatured,
    PromotionField.FeaturedMessage,
  ]) as [
    PromotionFormValues[PromotionField.IsFeatured],
    PromotionFormValues[PromotionField.FeaturedMessage],
  ];

  return (
    <Card className={CARD}>
      <CardHeader className={CARD_HEADER}>
        <CardTitle className={CARD_TITLE}>Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-6">
          <InputField
            name={PromotionField.Name}
            label="Promotion name"
            layout="vertical"
            labelClassName={LABEL}
            className="max-w-[44rem]"
          />

          <InputField
            name={PromotionField.DisplayName}
            label={
              <>
                Display name
                <span className="font-normal text-gray-500">(optional)</span>
              </>
            }
            layout="vertical"
            labelClassName={LABEL}
            className="max-w-[44rem]"
          />

          <div className="flex items-start gap-3">
            <Pill>This promotion applies to</Pill>
            <InputField
              name={PromotionField.Channel}
              layout="vertical"
              Component={SelectField}
              options={CHANNEL_OPTIONS}
              className={cn(SELECT, "min-w-[29rem]")}
            />
          </div>
        </div>

        {!isCoupon && (
          <>
            <div className="border-t border-gray-200 my-8" />
            <div className="flex flex-col gap-4">
              <span className={LABEL}>Feature promotion</span>
              <InputField
                name={PromotionField.IsFeatured}
                layout="vertical"
                Component={CheckboxField}
                text="Show promotion messaging on the product detail and listing pages"
                className={cn(TEXT, "text-gray-700 pt-0")}
              />

              {isFeatured && (
                <>
                  <div className="border border-gray-200 rounded-sm">
                    <InputField
                      name={PromotionField.FeaturedMessage}
                      label={
                        <span className="flex w-full justify-between">
                          Message
                          <span className="font-normal text-lg! text-gray-500">
                            {featuredMessage.length}/{FEATURED_MESSAGE_MAX}
                          </span>
                        </span>
                      }
                      layout="vertical"
                      labelClassName={LABEL}
                      containerClassName="p-6"
                      className="max-w-none"
                      maxLength={FEATURED_MESSAGE_MAX}
                    />
                    <div className="border-t border-gray-200 p-6">
                      <span className={LABEL}>Preview</span>
                      <p className="text-lg! text-gray-500 mb-6">
                        Styling will follow your storefront&apos;s theme by
                        default
                      </p>
                      <div className="flex flex-wrap justify-center gap-6">
                        <PreviewCard
                          message={featuredMessage}
                          layout="listing"
                        />
                        <PreviewCard
                          message={featuredMessage}
                          layout="detail"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#eef1fb] rounded-sm p-5">
                    <Info className="size-6 text-blue-700 shrink-0 mt-0.5" />
                    <p className={cn(TEXT, "text-gray-800")}>
                      <strong>Featured promotions are evaluated first.</strong>{" "}
                      While featured, this promotion can&apos;t have a limited
                      number of uses or conditions based on product options or
                      custom fields.
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SummarySection;
