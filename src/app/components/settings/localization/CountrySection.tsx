
"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { HelpCircle } from "lucide-react";
import { Country } from "country-state-city";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";

type CountryFormValues = {
  country: string;
};

const CountrySection = () => {
  const countries = useMemo(
    () =>
      Country.getAllCountries()
        .map((country) => ({
          label: country.name,
          value: country.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    []
  );

  const form = useForm<CountryFormValues>({
    defaultValues: {
      country: "United States",
    },
  });

  const onSubmit = (values: CountryFormValues) => {
    console.log("Selected country:", values.country);
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      footer={false}
      className="pb-0"
      bodyClassName="gap-0 rounded-md border border-[#E1E4ED] p-6 shadow-sm sm:p-8"
    >
      <h2 className="mb-6 text-[24px]! font-medium text-slate-500">
        Country
      </h2>

      <div className="max-w-[520px]">
        <div className="mb-2 flex items-center gap-3">
          <label
            htmlFor="country"
            className="text-[16px]! font-medium text-slate-500"
          >
            Default country
          </label>

          <HelpCircle
            size={15}
            className="text-slate-400"
            aria-label="Country information"
          />
        </div>

        <p className="mb-2 text-[14px] text-slate-500">
          Determines available payment options.
        </p>

        <InputField
          name="country"
          control={form.control}
          Component={SelectField}
          options={countries}
          layout="vertical"
          containerClassName="!gap-0"
          controlClassName="w-full"
        />
      </div>
    </Form>
  );
};

export default CountrySection
