// useSearchCustomerContainer.ts

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Country, State } from "country-state-city";

import { searchCustomerDefaultValues, LIST_PATH } from "./constant";
import type { SearchCustomerValues } from "./type";

export const useSearchCustomerContainer = () => {
  const router = useRouter();

  const form = useForm<SearchCustomerValues>({
    defaultValues: searchCustomerDefaultValues,
  });

  const { control, setValue } = form;

  const country = useWatch({
    control,
    name: "country",
  });

  const countryOptions = useMemo(
    () =>
      Country.getAllCountries().map((item) => ({
        value: item.isoCode,
        label: item.name,
      })),
    [],
  );

  const stateOptions = useMemo(
    () =>
      country
        ? State.getStatesOfCountry(country).map((item) => ({
            value: item.isoCode,
            label: item.name,
          }))
        : [],
    [country],
  );

  const handleCountryChange = ({ value }: { value: unknown }) => {
    setValue("country", String(value ?? ""), {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("stateProvince", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleSearch = (values: SearchCustomerValues) => {
    const queryParams = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        queryParams.set(key, String(value));
      }
    });

    const query = queryParams.toString();

    router.push(query ? `${LIST_PATH}?${query}` : LIST_PATH);
  };

  const handleCancel = () => {
    router.push(LIST_PATH);
  };

  return {
    form,
    control,
    country,
    countryOptions,
    stateOptions,
    handleCountryChange,
    handleSearch,
    handleCancel,
  };
};

