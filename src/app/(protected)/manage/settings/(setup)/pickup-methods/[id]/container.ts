import { PickupMethodSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { defaultLocations } from "../../locations/constant";
import {
  defaultPickupMethods,
  NEW_PICKUP_METHOD_ID,
  pickupMethodDefaults,
  PICKUP_METHODS_ROUTE,
} from "../constant";
import { PickupMethodFormValues } from "../type";
import { transformGetPickupMethod, transformPostPickupMethod } from "../utils";

const usePickupMethodFormPageContainer = () => {
  const router = useRouter();
  const { id: idParam } = useParams<{ id: string }>();

  const isEdit = idParam !== NEW_PICKUP_METHOD_ID;
  const id = isEdit ? Number(idParam) : null;

  // Placeholder lookup until the pickup methods API is available
  const record = id
    ? (defaultPickupMethods.find((method) => method.id === id) ?? null)
    : null;
  if (isEdit && !record) notFound();

  const form = useForm<PickupMethodFormValues>({
    resolver: yupResolver(PickupMethodSchema),
    defaultValues: pickupMethodDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    if (record) reset(transformGetPickupMethod(record));
  }, [record, reset]);

  const onSubmit = (values: PickupMethodFormValues) =>
    transformPostPickupMethod(values);

  return {
    form,
    isEdit,
    title: isEdit && record ? `Edit ${record.name}` : "Add new pickup method",
    locations: defaultLocations,
    onSubmit,
    handleCancel: () => router.push(PICKUP_METHODS_ROUTE),
  };
};

export default usePickupMethodFormPageContainer;
