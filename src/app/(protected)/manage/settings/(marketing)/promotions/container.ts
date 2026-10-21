import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchPromotionSettings,
  updatePromotionSettings,
} from "@/redux/slices/marketingSettingsSlice";
import { PromotionSettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { promotionSettingsDefaults } from "./constant";
import { PromotionSettingsFormValues } from "./type";
import {
  transformGetPromotionSettings,
  transformPostPromotionSettings,
} from "./utils";

const usePromotionSettingsContainer = () => {
  const dispatch = useAppDispatch();

  const { promotionSettings, promotionLoading, promotionSaving } =
    useAppSelector((state) => state.marketingSettings);

  const form = useForm<PromotionSettingsFormValues>({
    resolver: yupResolver(PromotionSettingsSchema),
    defaultValues: promotionSettingsDefaults,
  });
  const { reset } = form;

  useEffect(() => {
    dispatch(fetchPromotionSettings());
  }, [dispatch]);

  useEffect(() => {
    if (promotionSettings)
      reset(transformGetPromotionSettings(promotionSettings));
  }, [promotionSettings, reset]);

  const onSubmit = async (values: PromotionSettingsFormValues) => {
    const result = await dispatch(
      updatePromotionSettings(transformPostPromotionSettings(values)),
    );
    if (updatePromotionSettings.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    toast.success("Promotion settings saved");
  };

  return {
    form,
    loading: promotionLoading,
    saving: promotionSaving,
    onSubmit,
  };
};

export default usePromotionSettingsContainer;
