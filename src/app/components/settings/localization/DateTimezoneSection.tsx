
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import CheckboxField from "@/components/form/fields/CheckboxField";

type DateTimezoneValues = {
  timezone: string;
  daylightSaving: boolean;
  dateFormat: string;
  extendedDateFormat: string;
};

const timezoneOptions = [
  {
    value: "Europe/London",
    label: "Western Europe Time, Casablanca (GMT)",
  },
  {
    value: "America/New_York",
    label: "Eastern Time, New York (GMT-05:00)",
  },
  {
    value: "Asia/Karachi",
    label: "Pakistan Standard Time (GMT+05:00)",
  },
];

const dateFormatOptions = [
  { value: "mmm-dd-yyyy", label: "Jul 24th 2020" },
  { value: "mm-dd-yyyy", label: "07/24/2020" },
  { value: "dd-mm-yyyy", label: "24/07/2020" },
];

const extendedDateFormatOptions = [
  {
    value: "long",
    label: "Jul 24th 2020 @ 3:49 AM",
  },
  {
    value: "short",
    label: "07/24/2020 3:49 AM",
  },
  {
    value: "24-hour",
    label: "24/07/2020 03:49",
  },
];

const DateTimezoneSection = () => {
  const [showSettings, setShowSettings] = useState(false);

  const form = useForm<DateTimezoneValues>({
    defaultValues: {
      timezone: "Europe/London",
      daylightSaving: false,
      dateFormat: "mmm-dd-yyyy",
      extendedDateFormat: "long",
    },
  });

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
      <h2 className="mb-5 text-[24px]! font-medium! text-slate-500">
        Date and timezone
      </h2>

      <p className="mb-12 text-[32px]! font-light leading-tight text-slate-500">
        Jul 24th 2020 @ 3:49 AM, (GMT -05:00)
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
              timezone: "America/New_York",
              daylightSaving: false,
              dateFormat: "mmm-dd-yyyy",
              extendedDateFormat: "long",
            });
          }}
        >
          Set standard formats for United States
        </button>
      </div>

      {showSettings && (
        <div className="mt-10 max-w-[520px] space-y-6">
          <InputField
            name="timezone"
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
  name="daylightSaving"
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
            name="dateFormat"
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
            name="extendedDateFormat"
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
