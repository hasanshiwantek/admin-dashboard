
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import { decimalPlacesOptions, factoringDimensionOptions, lengthOptions, PhysicalDimensionsValues, weightOptions } from "./constant";




const PhysicalDimensionsSection = () => {
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<PhysicalDimensionsValues>({
    defaultValues: {
      weightMeasurement: "ounces",
      lengthMeasurement: "inches",
      thousandsToken: ",",
      decimalToken: ".",
      decimalPlaces: "2",
      factoringDimension: "product_depth",
    },
  });

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
        <button
          type="button"
          onClick={() => setShowSettings((current) => !current)}
          aria-expanded={showSettings}
          className="inline-flex items-center text-[16px]! gap-2 text-blue-600 hover:underline"
        >
          {showSettings ? "Hide format settings" : "Show format settings"}

          <ChevronDown
            size={18}
            className={`transition-transform ${
              showSettings ? "rotate-180" : ""
            }`}
          />
        </button>

        <button
          type="button"
          className="text-blue-600 text-[16px]! hover:underline"
          onClick={() => {
            form.reset({
              weightMeasurement: "ounces",
              lengthMeasurement: "inches",
              thousandsToken: ",",
              decimalToken: ".",
              decimalPlaces: "2",
              factoringDimension: "product_depth",
            });
          }}
        >
          Set standard formats for United States
        </button>
      </div>

      {showSettings && (
        <div className="mt-10 max-w-[520px] space-y-6">
          <InputField
            name="weightMeasurement"
            label="Weight measurement"
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={weightOptions}
          />

          <InputField
            name="lengthMeasurement"
            label="Length measurement"
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={lengthOptions}
          />

          <InputField
            name="thousandsToken"
            label="Thousands token"
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
          />

          <InputField
            name="decimalToken"
            label="Decimal token"
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
          />

          <InputField
            name="decimalPlaces"
            label="Decimal places"
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={decimalPlacesOptions}
          />

          <div className="flex items-center gap-3">
            <label className="font-medium text-[#172033]">
              Factoring dimension
            </label>

            <HelpCircle
              size={18}
              className="text-slate-400"
            />
          </div>

          <InputField
            name="factoringDimension"
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
