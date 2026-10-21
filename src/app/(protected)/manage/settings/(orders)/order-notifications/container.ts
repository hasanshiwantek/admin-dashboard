import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchOrderNotificationSettings,
  testOrderNotification,
  updateOrderNotificationSettings,
} from "@/redux/slices/orderSettingsSlice";
import { OrderNotificationSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import {
  NotificationMethod,
  NotificationTab,
  orderNotificationDefaults,
  OrderNotificationFormNames,
} from "./constant";
import { SETTINGS_ROUTE } from "../constant";
import { OrderNotificationFormValues } from "./type";
import {
  getTabForErrors,
  getVisibleTabs,
  transformGetOrderNotifications,
  transformPostOrderNotifications,
} from "./utils";

const useOrderNotificationsContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    notificationSettings,
    notificationLoading,
    notificationSaving,
    notificationTesting,
  } = useAppSelector((state) => state.orderSettings);

  const [selectedTab, setSelectedTab] = useState<string>(
    NotificationTab.General,
  );
  // Address the last test email went to; opens the confirmation modal
  const [testSentTo, setTestSentTo] = useState<string | null>(null);

  const form = useForm<OrderNotificationFormValues>({
    resolver: yupResolver(OrderNotificationSchema),
    defaultValues: orderNotificationDefaults,
  });
  const { control, reset, trigger, getValues } = form;

  const methods = useWatch({
    control,
    name: OrderNotificationFormNames.Methods,
  });
  const tabs = getVisibleTabs(methods);

  // A method's tab disappears when it's unchecked; fall back to General
  const activeTab = tabs.some((tab) => tab.key === selectedTab)
    ? selectedTab
    : NotificationTab.General;

  useEffect(() => {
    dispatch(fetchOrderNotificationSettings());
  }, [dispatch]);

  useEffect(() => {
    if (notificationSettings)
      reset(transformGetOrderNotifications(notificationSettings));
  }, [notificationSettings, reset]);

  const onSubmit = async (values: OrderNotificationFormValues) => {
    const result = await dispatch(
      updateOrderNotificationSettings(transformPostOrderNotifications(values)),
    );
    if (updateOrderNotificationSettings.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    toast.success("Notification settings saved");
  };

  // Hidden tabs can't show their errors, so jump to the first one with errors
  const onInvalid = (errors: FieldErrors<OrderNotificationFormValues>) => {
    const errorTab = getTabForErrors(errors);
    if (errorTab) setSelectedTab(errorTab);
  };

  const handleTestNotification = async () => {
    const valid = await trigger(OrderNotificationFormNames.EmailAddress);
    if (!valid) return;

    const emailAddress = getValues(OrderNotificationFormNames.EmailAddress);
    const result = await dispatch(
      testOrderNotification({ method: NotificationMethod.Email, emailAddress }),
    );
    if (testOrderNotification.rejected.match(result)) {
      toast.error(result.payload as string);
      return;
    }
    setTestSentTo(emailAddress);
  };

  return {
    form,
    tabs,
    activeTab,
    setActiveTab: setSelectedTab,
    loading: notificationLoading,
    saving: notificationSaving,
    testing: notificationTesting,
    onSubmit,
    onInvalid,
    handleTestNotification,
    testSentTo,
    closeTestSentModal: () => setTestSentTo(null),
    handleCancel: () => router.push(SETTINGS_ROUTE),
  };
};

export default useOrderNotificationsContainer;
