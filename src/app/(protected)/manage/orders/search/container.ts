"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OrderSearchFormValues } from "./type";
import { defaultValues, ORDER_ROUTES } from "./constant";

export function useOrderSearchContainer() {
  const router = useRouter();

  const form = useForm<OrderSearchFormValues>({
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: OrderSearchFormValues) => {
    const filtered = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    const queryParams = new URLSearchParams(filtered);
    router.push(`${ORDER_ROUTES.list}?${queryParams.toString()}`);
  };

  return {
    form,
    control,
    handleSubmit,
    onSubmit,
    router,
  };
}
