import { AddMediaFromUrlSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { addMediaFromUrlDefaults, AddMediaFromUrlFormNames } from "./constant";
import { AddMediaFromUrlFormValues, AddMediaFromUrlModalProps } from "./type";

const useAddMediaFromUrlContainer = ({
  open,
  onAdd,
}: Pick<AddMediaFromUrlModalProps, "onAdd"> & { open: boolean }) => {
  const form = useForm<AddMediaFromUrlFormValues>({
    resolver: yupResolver(AddMediaFromUrlSchema),
    defaultValues: addMediaFromUrlDefaults,
  });
  const { control, reset } = form;
  const url = useWatch({ control, name: AddMediaFromUrlFormNames.Url });

  useEffect(() => {
    if (!open) reset(addMediaFromUrlDefaults);
  }, [open, reset]);

  const onSubmit = (values: AddMediaFromUrlFormValues) => onAdd(values.url);

  return { form, previewUrl: url?.trim(), onSubmit };
};

export default useAddMediaFromUrlContainer;
