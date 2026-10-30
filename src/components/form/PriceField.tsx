"use client";

import type { ProductCurrency } from "@/app/(protected)/manage/products/type";
import { getPriceInputProps } from "@/app/(protected)/manage/products/utils";
import { Input as BasicInput } from "@/components/ui/input";
import useDefaultCurrency from "@/hooks/useDefaultCurrency";
import { FieldValues } from "react-hook-form";
import InputField, { InputFieldProps } from "./InputField";

type PriceFieldProps<T extends FieldValues> = Omit<
  InputFieldProps<T, typeof BasicInput>,
  "Component"
> & {
  currency?: ProductCurrency;
};

const PriceField = <T extends FieldValues>({
  currency,
  ...props
}: PriceFieldProps<T>) => {
  const { currency: defaultCurrency } = useDefaultCurrency();

  return (
    <InputField<T, typeof BasicInput>
      {...getPriceInputProps(currency ?? defaultCurrency)}
      {...props}
    />
  );
};

export default PriceField;
