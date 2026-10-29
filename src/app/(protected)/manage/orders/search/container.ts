"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OrderSearchFormValues } from "./type";
import { defaultValues, ORDER_ROUTES } from "./constant";
import { buildQueryParams, removeEmptyValues } from "@/lib/utils";

export function useOrderSearchContainer() {
  const router = useRouter();

  const form = useForm<OrderSearchFormValues>({
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: OrderSearchFormValues) => {
    const filtered = removeEmptyValues(values) ?? {};
    const queryParams = buildQueryParams(filtered);
    router.push(`${ORDER_ROUTES.list}${queryParams.toString()}`);
  };

  return {
    form,
    control,
    handleSubmit,
    onSubmit,
    router,
  };
}
