"use client";
import { useWatch } from "react-hook-form";
import InputField from "@/components/form/InputField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import { Info } from "lucide-react";
import { SectionProps } from "./type";
import PageTitle from "@/components/ui/PageTitle";
import { useFormContext } from "@/components/form/Form";
import { UrlFormat } from "./constant";

export const UrlSettingSection = ({
  title,
  formatField,
  customUrlField,
  shortExample,
  longExample,
}: SectionProps) => {
  const { control, watch } = useFormContext();
  const format = watch(formatField);

  return (
    <div className="mb-8 bg-white border p-8">
      <PageTitle title={title} hideActionButton />

      <div className="space-y-2">
        {/* Short */}
        <div className="grid grid-cols-[14rem_1fr] 2xl:grid-cols-[18rem_1fr] items-center gap-x-8">
          <span className="text-right font-normal text-gray-600 2xl:text-2xl!">
            SEO Optimized (Short)
          </span>
          <div className="flex items-center gap-3">
            <InputField
              name={formatField}
              Component={RadioGroupField}
              control={control}
              options={[{ value: "seo-optimized-short", label: "" }]}
              label=""
              layout="vertical"
              containerClassName="!grid-cols-1"
              className="w-auto"
            />
            <span className="text-gray-500 text-lg 2xl:!text-2xl">
              {shortExample}
            </span>
          </div>
        </div>

        {/* Long */}
        <div className="grid grid-cols-[14rem_1fr] 2xl:grid-cols-[18rem_1fr] items-center gap-x-8">
          <span className="text-right font-normal text-gray-600 2xl:text-2xl!">
            SEO Optimized (Long)
          </span>
          <div className="flex items-center gap-3">
            <InputField
              name={formatField}
              Component={RadioGroupField}
              control={control}
              options={[{ value: "seo-optimized-long", label: "" }]}
              label=""
              layout="vertical"
              containerClassName="!grid-cols-1"
              className="w-auto"
            />
            <span className="text-gray-500 text-lg 2xl:!text-2xl">
              {longExample}
            </span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Custom */}
        <div className="grid grid-cols-[14rem_1fr] 2xl:grid-cols-[18rem_1fr] items-center gap-x-8">
          <span className="text-right font-normal text-gray-600 2xl:text-2xl!">
            Custom
          </span>
          <div className="flex items-center gap-3">
            <InputField
              name={formatField}
              Component={RadioGroupField}
              control={control}
              options={[{ value: UrlFormat.Custom, label: "" }]}
              label=""
              layout="vertical"
              containerClassName="!grid-cols-1"
              className="w-auto"
            />
            <InputField
              name={customUrlField}
              control={control}
              // disabled={format !== UrlFormat.Custom}
              placeholder="/%title%/"
              label=""
              layout="vertical"
              containerClassName="!grid-cols-1 max-w-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
