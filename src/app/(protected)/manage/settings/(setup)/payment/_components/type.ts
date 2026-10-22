import { ReactNode } from "react";
import type usePaymentShellContainer from "../sharedContainer";
import { OfflinePaymentMethodConfig } from "../type";

export type PaymentShellProps = ReturnType<typeof usePaymentShellContainer> & {
  children: ReactNode;
};

export interface OfflinePaymentMethodsSectionProps {
  methods: OfflinePaymentMethodConfig[];
}

export interface OfflinePaymentMethodRowProps {
  method: OfflinePaymentMethodConfig;
}

export interface OfflinePaymentFormFieldsProps {
  method: OfflinePaymentMethodConfig;
}
