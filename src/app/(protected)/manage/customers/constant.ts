import * as yup from "yup";
import type { CustomerFormValues } from "./types";

export enum CustomerField {
  firstName = "firstName",
  lastName = "lastName",
  companyName = "companyName",
  email = "email",
  customerGroup = "customerGroup",
  phone = "phone",
  storeCredit = "storeCredit",
  acsEmail = "acsEmail",
  forceReset = "forceReset",
  taxCode = "taxCode",
  password = "password",
  confirmPassword = "confirmPassword",
  analytics = "analytics",
  functional = "functional",
  targeting = "targeting",
  address = "address",
  state = "state",
  country = "country",
}

export const customerDefaultValues: CustomerFormValues = {
  [CustomerField.firstName]: "",
  [CustomerField.lastName]: "",
  [CustomerField.companyName]: "",
  [CustomerField.email]: "",
  [CustomerField.customerGroup]: "",
  [CustomerField.phone]: "",
  [CustomerField.storeCredit]: "0.00",
  [CustomerField.acsEmail]: "true",
  [CustomerField.forceReset]: "false",
  [CustomerField.taxCode]: "",
  [CustomerField.password]: "",
  [CustomerField.confirmPassword]: "",
  [CustomerField.analytics]: "",
  [CustomerField.functional]: "",
  [CustomerField.targeting]: "",
  [CustomerField.address]: "",
  [CustomerField.state]: "",
  [CustomerField.country]: "",
};

export const yesNoOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];