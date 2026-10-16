
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import { Button } from "@/components/ui/button";
import { dateFormatOptions, extendedDateFormatOptions, TimedefaultValues, timezoneOptions ,DateTimezoneFields} from "./constant";
import { DateTimezoneValues } from "./type";
import PageTitle from "@/components/ui/PageTitle";



const DateTimezoneSection = () => {
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<DateTimezoneValues>({
    defaultValues: TimedefaultValues
  });
const handleSetStandardFormats = () => {
  form.reset({
    [DateTimezoneFields.TIMEZONE]: "America/New_York",
    [DateTimezoneFields.DAYLIGHT_SAVING]: false,
    [DateTimezoneFields.DATE_FORMAT]: "mmm-dd-yyyy",
    [DateTimezoneFields.EXTENDED_DATE_FORMAT]: "long",
  });
};
  const onSubmit = (values: DateTimezoneValues) => {
    console.log("Date and timezone settings:", values);
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      footer={false}
      className="pb-0"
      bodyClassName="gap-0 rounded-md border border-[#E1E4ED] bg-white p-6 shadow-sm sm:p-8"
    >
     <PageTitle
  title="Date and timezone"
  description="Jul 24th 2020 @ 3:49 AM, (GMT -05:00)"
  hideActionButton
  titleClassName="mb-5 text-[24px]! font-medium! text-slate-500"
  descriptionClassName="mb-12 text-[32px]! font-light leading-tight text-slate-500"
  containerClassName="mb-0"
  textContainerClassName="mb-0"
/>

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

        <button
          type="button"
          className="text-blue-600 text-[16px]! hover:underline"
           onClick={handleSetStandardFormats}
 
        >
          Set standard formats for United States
        </button>
      </div>

      {showSettings && (
        <div className="mt-10 max-w-[520px] space-y-6">
          <InputField
            name={DateTimezoneFields.TIMEZONE}
            label="Store local timezone"
            required
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={timezoneOptions}
          />

        <InputField
  name={DateTimezoneFields.DAYLIGHT_SAVING}
  Component={CheckboxField}
  control={form.control}
  layout="vertical"
  containerClassName="flex flex-col !gap-2"
  controlClassName="w-full"
  text={
    <span className="inline-flex font-normal! items-center gap-3">
      Enable daylight savings time correction
      <HelpCircle size={18} className="shrink-0 text-slate-400" />
    </span>
  }
/>

          <InputField
            name={DateTimezoneFields.DATE_FORMAT}
            label="Date format"
            required
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col gap-2"
            controlClassName="w-full"
            options={dateFormatOptions}
          />

          <InputField
            name={DateTimezoneFields.EXTENDED_DATE_FORMAT}
            label="Extended date and time format"
            required
            Component={SelectField}
            control={form.control}
            layout="vertical"
            containerClassName="flex flex-col !gap-2"
            controlClassName="w-full"
            options={extendedDateFormatOptions}
          />
        </div>
      )}
    </Form>
  );
};

export default DateTimezoneSection;
