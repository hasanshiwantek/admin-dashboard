"use client";

import { Control, useWatch, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { UrlStructureField } from "./constant";

type SectionProps = {
  title: string;
  formatField: UrlStructureField;
  customUrlField: UrlStructureField;
  control: Control<any>;
  shortExample: string;
  longExample: string;
};

export const UrlSettingSection = ({
  title,
  formatField,
  customUrlField,
  control,
  shortExample,
  longExample,
}: SectionProps) => {
  const format = useWatch({
    control,
    name: `urlStructure.${formatField}`,
  });

  return (
    <div className="mb-8 bg-white border p-8">
      <h2 className="!font-semibold mb-6 2xl:!text-[2.4rem]">{title}</h2>

      <Controller
        name={`urlStructure.${formatField}`}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="space-y-4"
          >
            {/* SEO Optimized (Short) */}
            <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4">
              <div className="flex items-center w-full lg:w-72 lg:flex-row-reverse gap-3">
                <RadioGroupItem
                  value="seo-optimized-short"
                  id={`${formatField}-short`}
                />
                <Label
                  htmlFor={`${formatField}-short`}
                  className="font-normal 2xl:!text-2xl"
                >
                  SEO Optimized (Short)
                </Label>
              </div>
              <div className="flex-1 text-gray-500 text-lg 2xl:!text-2xl">
                {shortExample}
              </div>
            </div>

            {/* SEO Optimized (Long) */}
            <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4">
              <div className="flex items-center w-full lg:w-72 lg:flex-row-reverse gap-3">
                <RadioGroupItem
                  value="seo-optimized-long"
                  id={`${formatField}-long`}
                />
                <Label
                  htmlFor={`${formatField}-long`}
                  className="font-normal 2xl:!text-2xl"
                >
                  SEO Optimized (Long)
                </Label>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-gray-500 text-lg 2xl:!text-2xl">
                  {longExample}
                </span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Custom */}
            <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4">
              <div className="flex items-center w-full lg:w-72 lg:flex-row-reverse gap-3">
                <RadioGroupItem value="custom" id={`${formatField}-custom`} />
                <Label
                  htmlFor={`${formatField}-custom`}
                  className="font-normal 2xl:!text-2xl"
                >
                  Custom
                </Label>
              </div>
              <div className="flex-1">
                <Controller
                  name={`urlStructure.${customUrlField}`}
                  control={control}
                  render={({ field: customField }) => (
                    <Input
                      {...customField}
                      disabled={format !== "custom"}
                      placeholder="/custom/"
                      className="w-full max-w-lg"
                    />
                  )}
                />
              </div>
            </div>
          </RadioGroup>
        )}
      />
    </div>
  );
};