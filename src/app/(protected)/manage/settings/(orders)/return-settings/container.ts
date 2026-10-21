import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchReturnSettings,
  updateReturnSettings,
} from "@/redux/slices/orderSettingsSlice";
import { ReturnSettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SETTINGS_ROUTE } from "../constant";
import { returnSettingsDefaults } from "./constant";
import { ReturnSettingsFormValues } from "./type";
import {
  transformGetReturnSettings,
  transformPostReturnSettings,
} from "./utils";

const useReturnSettingsContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { returnSettings, returnLoading, returnSaving } = useAppSelector(
    (state) => state.orderSettings,
  );

  const form = useForm<ReturnSettingsFormValues>({
    resolver: yupResolver(ReturnSettingsSchema),
    defaultValues: returnSettingsDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    dispatch(fetchReturnSettings());
  }, [dispatch]);

  useEffect(() => {
    if (returnSettings) reset(transformGetReturnSettings(returnSettings));
  }, [returnSettings, reset]);

  const onSubmit = async (values: ReturnSettingsFormValues) => {
    const result = await dispatch(
      updateReturnSettings(transformPostReturnSettings(values)),
    );
    if (updateReturnSettings.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    toast.success("Return settings saved");
  };

  return {
    form,
    loading: returnLoading,
    saving: returnSaving,
    onSubmit,
    handleCancel: () => router.push(SETTINGS_ROUTE),
  };
};

export default useReturnSettingsContainer;
