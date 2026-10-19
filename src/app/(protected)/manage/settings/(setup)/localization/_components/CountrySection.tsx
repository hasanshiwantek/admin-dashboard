
"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { HelpCircle } from "lucide-react";
import { Country } from "country-state-city";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/fields/SelectField";
import { CountryFormValues } from "./type";
import { countryDefaultValue, CountryFields } from "./constant";
import { Label } from "@/components/ui/label";
import PageTitle from "@/components/ui/PageTitle";



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
    defaultValues:countryDefaultValue
  });



  return (
 <div className="gap-0 rounded-md border border-[#E1E4ED] bg-white p-6 shadow-sm sm:p-8">
     <PageTitle
  title="Country"
  hideActionButton
  titleClassName="mb-6 text-[24px]! font-medium text-slate-500"
  containerClassName="mb-0"
  textContainerClassName="mb-0"
/>

      <div className="max-w-[520px]">
        <InputField
  name={CountryFields.COUNTRY}
  Component={SelectField}
  options={countries}
  layout="vertical"
  containerClassName="!gap-0"
  controlClassName="w-full"
  label={
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label
          htmlFor="country"
          className="text-[16px]! font-medium text-slate-500"
        >
          Default country
        </Label>

        <HelpCircle
          size={15}
          className="text-slate-400"
          aria-label="Country information"
        />
      </div>

      <p className="mb-2 text-[14px] text-slate-500">
        Determines available payment options.
      </p>
    </div>
  }
/>
      </div>
 </div>
  );
};

export default CountrySection
