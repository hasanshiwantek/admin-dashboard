import { PaymentConfigSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  offlinePaymentMethods,
  paymentConfigDefaults,
  PaymentTab,
} from "./constant";
import usePaymentShellContainer from "./sharedContainer";
import { PaymentConfigFormValues } from "./type";

const usePaymentPageContainer = () => {
  const shell = usePaymentShellContainer(PaymentTab.Configuration);

  const form = useForm<PaymentConfigFormValues>({
    resolver: yupResolver(PaymentConfigSchema),
    defaultValues: paymentConfigDefaults,
  });

  const onSubmit = (values: PaymentConfigFormValues) => console.log(values);

  return {
    shell,
    form,
    offlineMethods: offlinePaymentMethods,
    onSubmit,
  };
};

export default usePaymentPageContainer;
