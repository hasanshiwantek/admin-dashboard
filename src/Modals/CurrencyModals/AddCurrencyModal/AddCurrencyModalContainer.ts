import { currencyRoute } from "@/app/(protected)/manage/settings/(setup)/currencies/constant";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCurrencyOptions } from "@/redux/slices/currencySlice";
import { AddCurrencySchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addCurrencyDefaults } from "./constant";
import { AddCurrencyFormValues, AddCurrencyModalProps } from "./type";

const useAddCurrencyContainer = ({
  open,
  existingCodes,
}: Pick<AddCurrencyModalProps, "existingCodes"> & { open: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currencyOptions, currencyOptionsLoading } = useAppSelector(
    (state) => state.currency,
  );

  const form = useForm<AddCurrencyFormValues>({
    resolver: yupResolver(AddCurrencySchema),
    defaultValues: addCurrencyDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    if (open && !currencyOptions.length) dispatch(fetchCurrencyOptions());
  }, [open, currencyOptions.length, dispatch]);

  useEffect(() => {
    if (!open) reset(addCurrencyDefaults);
  }, [open, reset]);

  const onSubmit = ({ code }: AddCurrencyFormValues) =>
    router.push(currencyRoute(code));

  return {
    form,
    options: currencyOptions.filter(
      ({ code }) => !existingCodes.includes(code),
    ),
    loading: currencyOptionsLoading && !currencyOptions.length,
    onSubmit,
  };
};

export default useAddCurrencyContainer;
