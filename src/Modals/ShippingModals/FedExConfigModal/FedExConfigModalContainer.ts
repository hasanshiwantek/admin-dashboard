import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  disconnectFedex,
  fetchFedexConfig,
  saveFedexConfig,
  saveQuoteFedexConfig,
} from "@/redux/slices/shippingSlice";
import { fedexConfigSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { fedexDefaultValues, FedExTab } from "./constant";
import { FedExFormValues } from "./type";
import {
  getTabForErrors,
  toFedExTab,
  toDeliveryServiceList,
  transformGetFedExConfig,
  transformGetFedExQuote,
  transformPostFedExConfig,
  transformPostFedExQuote,
} from "./utils";

const useFedExConfigModalContainer = ({
  open,
  methodId,
  onSaved,
}: {
  open: boolean;
  methodId?: number | string;
  onSaved?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const {
    fedexConfig,
    fedexLoader,
    saveConfigLoader,
    quoteFedexConfig,
    fedexServices,
  } = useAppSelector((state) => state.shippingZone);

  const [activeTab, setActiveTab] = useState<FedExTab>(FedExTab.Settings);

  const form = useForm<FedExFormValues>({
    resolver: yupResolver(fedexConfigSchema),
    defaultValues: fedexDefaultValues,
  });
  const { reset } = form;

  const refetchConfig = () =>
    dispatch(fetchFedexConfig({ method_id: Number(methodId) }));

  // Fetch the saved config when the modal opens; reset when it closes
  useEffect(() => {
    if (open && methodId) {
      dispatch(fetchFedexConfig({ method_id: Number(methodId) }));
    }
    if (!open) {
      reset(fedexDefaultValues);
      setActiveTab(FedExTab.Settings);
    }
  }, [open, methodId, dispatch, reset]);

  // Fill the form when saved data arrives
  useEffect(() => {
    if (!open) return;
    if (fedexConfig) {
      reset((prev) => ({ ...prev, ...transformGetFedExConfig(fedexConfig) }));
    }
    if (quoteFedexConfig) {
      reset((prev) => ({
        ...prev,
        ...transformGetFedExQuote(quoteFedexConfig),
      }));
    }
  }, [open, fedexConfig, quoteFedexConfig, reset]);

  // Returns false on failure so the modal stays open
  const onSubmit = async (values: FedExFormValues) => {
    if (activeTab === FedExTab.Quote) {
      const result = await dispatch(
        saveQuoteFedexConfig({
          method_id: Number(methodId),
          data: transformPostFedExQuote(values),
        }),
      );
      return saveQuoteFedexConfig.fulfilled.match(result);
    }

    const result = await dispatch(
      saveFedexConfig({
        method_id: Number(methodId),
        data: transformPostFedExConfig(values),
      }),
    );
    if (!saveFedexConfig.fulfilled.match(result)) return false;

    if (methodId) refetchConfig();
    onSaved?.();
    return true;
  };

  // Errors on a hidden tab can't be seen, so jump to the tab that has them
  const onInvalid = (errors: FieldErrors<FedExFormValues>) =>
    setActiveTab(getTabForErrors(errors));

  const handleDisconnect = () =>
    dispatch(disconnectFedex({ method_id: Number(methodId) })).then(
      refetchConfig,
    );

  return {
    form,
    activeTab,
    setActiveTab: (tab: string) => setActiveTab(toFedExTab(tab)),
    configLoading: fedexLoader,
    saving: saveConfigLoader,
    isConnected: !!fedexConfig?.is_connected,
    serviceList: toDeliveryServiceList(fedexServices),
    onSubmit,
    onInvalid,
    handleDisconnect,
  };
};

export default useFedExConfigModalContainer;
