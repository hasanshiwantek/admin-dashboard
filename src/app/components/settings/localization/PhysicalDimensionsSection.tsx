
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import { decimalPlacesOptions, defaultValues, factoringDimensionOptions, lengthOptions,  weightOptions } from "./constant";
import { PhysicalDimensionsValues } from "./type";
import { Button } from "@/components/ui/button";
import { PhysicalDimensionFields } from "./constant"; 
import { Label } from "@/components/ui/label";



const PhysicalDimensionsSection = () => {
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<PhysicalDimensionsValues>({
    defaultValues:defaultValues
  });
 const handleSetStandardFormats = () => {
  form.reset({
    [PhysicalDimensionFields.WEIGHT_MEASUREMENT]: "ounces",
    [PhysicalDimensionFields.LENGTH_MEASUREMENT]: "inches",
    [PhysicalDimensionFields.THOUSANDS_TOKEN]: ",",
    [PhysicalDimensionFields.DECIMAL_TOKEN]: ".",
    [PhysicalDimensionFields.DECIMAL_PLACES]: "2",
    [PhysicalDimensionFields.FACTORING_DIMENSION]: "product_depth",
  });
};

  const onSubmit = (values: PhysicalDimensionsValues) => {
    console.log("Physical dimensions:", values);
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      footer={false}
      className="pb-0"
      bodyClassName="gap-0 rounded-md border border-[#E1E4ED] bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="mb-5 text-[24px]! font-medium text-slate-900">
        Physical dimensions
      </h2>

      <p className="mb-6 text-[32px]! font-normal! leading-tight text-text-secondary!">
        1,234.00 Ounces/Inches
      </p>

      <p className="mb-8 leading-6 text-[14px] text-slate-600">
        Physical dimension format presented to shoppers. Length and
        weight entered for a product will be autoconverted into this
        format.
      </p>

      <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
    <Button
  type="button"
  variant="ghost"
  onClick={() => setShowSettings((current) => !current)}
  aria-expanded={showSettings}
  className="inline-flex items-center gap-2 text-[16px]! text-blue-600 hover:underline"
>
  {showSettings ? "Hide format settings" : "Show format settings"}

  <ChevronDown
    size={18}
    className={`transition-transform ${
      showSettings ? "rotate-180" : ""
    }`}
  />
</Button>
<Button
  type="button"
  variant="link"
  onClick={handleSetStandardFormats}
  className="h-auto p-0 text-[16px]! text-blue-600"
>
  Set standard formats for United States
</Button>
       
      </div>

      {showSettings && (
        <div className="mt-10 max-w-[520px] space-y-6">
          <InputField
           name = {PhysicalDimensionFields.WEIGHT_MEASUREMENT}
            label="Weight measurement"
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={weightOptions}
          />

          <InputField
            name = {PhysicalDimensionFields.LENGTH_MEASUREMENT}
            label="Length measurement"
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={lengthOptions}
          />

          <InputField
            name= {PhysicalDimensionFields.THOUSANDS_TOKEN}
            label="Thousands token"
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
          />

          <InputField
            name={PhysicalDimensionFields.DECIMAL_TOKEN}
            label="Decimal token"
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
          />

          <InputField
            name={PhysicalDimensionFields.DECIMAL_PLACES}
            label="Decimal places"
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={decimalPlacesOptions}
          />

          <div className="flex items-center gap-3">
            <Label className="font-medium text-[#172033]">
              Factoring dimension
            </Label>

            <HelpCircle
              size={18}
              className="text-slate-400"
            />
          </div>

          <InputField
            name={PhysicalDimensionFields.FACTORING_DIMENSION}
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={factoringDimensionOptions}
          />
        </div>
      )}
    </Form>
  );
};

export default PhysicalDimensionsSection;
