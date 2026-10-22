import { PaymentCurrencySchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  paymentTabRoute,
  paymentCurrencyDefaults,
  PaymentTab,
  paymentTabs,
} from "./constant";
import { PaymentCurrencyFormValues } from "./type";

// Header and tabs shared by every payment tab route
const usePaymentShellContainer = (activeTab: PaymentTab) => {
  const router = useRouter();

  const currencyForm = useForm<PaymentCurrencyFormValues>({
    resolver: yupResolver(PaymentCurrencySchema),
    defaultValues: paymentCurrencyDefaults,
  });

  const tabs = paymentTabs.filter(
    (tab) => tab.key === PaymentTab.Configuration || tab.key === activeTab,
  );

  const handleTabChange = (key: string) =>
    router.push(paymentTabRoute(key as PaymentTab));

  return {
    currencyForm,
    onCurrencySubmit: (values: PaymentCurrencyFormValues) => values,
    tabs,
    activeTab,
    handleTabChange,
  };
};

export default usePaymentShellContainer;
