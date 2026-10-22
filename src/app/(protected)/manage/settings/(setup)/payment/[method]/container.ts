import { OfflinePaymentSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { notFound, useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { offlinePaymentMethods, PAYMENT_ROUTE } from "../constant";
import usePaymentShellContainer from "../sharedContainer";
import { OfflinePaymentFormValues } from "../type";

const useOfflinePaymentPageContainer = () => {
  const router = useRouter();
  const { method: methodParam } = useParams<{ method: string }>();

  const method = offlinePaymentMethods.find(({ tab }) => tab === methodParam);
  if (!method) notFound();

  const shell = usePaymentShellContainer(method.tab);

  const form = useForm<OfflinePaymentFormValues>({
    resolver: yupResolver(OfflinePaymentSchema(method.instructionsLabel)),
    defaultValues: method.defaults,
  });

  const onSubmit = (values: OfflinePaymentFormValues) => values;

  return {
    shell,
    method,
    form,
    onSubmit,
    handleCancel: () => router.push(PAYMENT_ROUTE),
  };
};

export default useOfflinePaymentPageContainer;
