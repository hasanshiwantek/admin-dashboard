import { CustomerField, YesNo } from "./constant";
import type { CustomerFormValues } from "./types";

// API response → form values (for reset)
export const transformGetCustomerPayload = (data: any): CustomerFormValues => ({
  [CustomerField.firstName]: data?.firstName || "",
  [CustomerField.lastName]: data?.lastName || "",
  [CustomerField.companyName]: data?.companyName || "",
  [CustomerField.email]: data?.email || "",
  [CustomerField.customerGroup]: data?.customerGroup || "",
  [CustomerField.phone]: data?.phone || "",
  [CustomerField.storeCredit]: data?.storeCredit || "0.00",
  [CustomerField.acsEmail]: data?.receiveReviewEmails ? YesNo.Yes : YesNo.No,
  [CustomerField.forceReset]: data?.forcePasswordReset ? YesNo.Yes : YesNo.No,
  [CustomerField.taxCode]: data?.taxExemptCode || "",
  [CustomerField.password]: "",
  [CustomerField.confirmPassword]: "",
  [CustomerField.analytics]: data?.analytics || "",
  [CustomerField.functional]: data?.functional || "",
  [CustomerField.targeting]: data?.targeting || "",
  [CustomerField.address]: data?.address || "",
  [CustomerField.state]: data?.state || "",
  [CustomerField.country]: data?.country || "",
});

// Form values → API payload
export const transformPostCustomerPayload = (
  values: CustomerFormValues,
  isEdit: boolean,
) => {
  const payload: any = {
    firstName: values[CustomerField.firstName],
    lastName: values[CustomerField.lastName],
    companyName: values[CustomerField.companyName],
    email: values[CustomerField.email],
    customerGroup: values[CustomerField.customerGroup],
    phone: values[CustomerField.phone],
    country: values[CustomerField.country],
    state: values[CustomerField.state],
    address: values[CustomerField.address],
    storeCredit: values[CustomerField.storeCredit],
    receiveReviewEmails: values[CustomerField.acsEmail] === YesNo.Yes,
    forcePasswordReset: values[CustomerField.forceReset] === YesNo.Yes,
    taxExemptCode: values[CustomerField.taxCode],
    analytics: values[CustomerField.analytics],
    functional: values[CustomerField.functional],
    targeting: values[CustomerField.targeting],
  };

  // Only include password on create
  if (!isEdit && values[CustomerField.password]) {
    payload.password = values[CustomerField.password];
    payload.password_confirmation = values[CustomerField.confirmPassword];
  }

  return payload;
};
