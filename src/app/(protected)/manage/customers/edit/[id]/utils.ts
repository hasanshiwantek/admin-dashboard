import { REGEX } from "@/const/regex";
import { CustomerFormField, customerDefaultValues } from "./constant";
import type { CustomerFormValues } from "./type";

export const mapCustomerToForm = (c: any): CustomerFormValues => ({
  [CustomerFormField.FirstName]: c.firstName || "",
  [CustomerFormField.LastName]: c.lastName || "",
  [CustomerFormField.CompanyName]: c.companyName,
  [CustomerFormField.Email]: c.email || "",
  [CustomerFormField.Phone]: c.phone,
  [CustomerFormField.StoreCredit]: c.storeCredit || "0.00",
  [CustomerFormField.CustomerGroup]: c.customerGroup,
  [CustomerFormField.TaxCode]: c.taxExemptCode,
  [CustomerFormField.Password]: "",
  [CustomerFormField.ConfirmPassword]: "",
  [CustomerFormField.ForceReset]: !!c.forcePasswordReset,
  [CustomerFormField.AcsEmail]: c.receiveReviewEmails ?? true,
  [CustomerFormField.Address]: c.address,
  [CustomerFormField.State]: c.state,
  [CustomerFormField.Country]: c.country,
  [CustomerFormField.Notes]: c.notes,
});

export const mapFormToPayload = (values: CustomerFormValues) => ({
  firstName: values[CustomerFormField.FirstName],
  lastName: values[CustomerFormField.LastName],
  companyName: values[CustomerFormField.CompanyName],
  email: values[CustomerFormField.Email],
  customerGroup: values[CustomerFormField.CustomerGroup],
  phone: values[CustomerFormField.Phone],
  country: values[CustomerFormField.Country],
  state: values[CustomerFormField.State],
  address: values[CustomerFormField.Address],
  storeCredit: values[CustomerFormField.StoreCredit],
  receiveReviewEmails: values[CustomerFormField.AcsEmail],
  forcePasswordReset: values[CustomerFormField.ForceReset],
  taxExemptCode: values[CustomerFormField.TaxCode],
  password: values[CustomerFormField.Password],
  password_confirmation: values[CustomerFormField.ConfirmPassword],
  notes: values[CustomerFormField.Notes],
});

export const validatePassword = (password: string): string | null => {
  if (!password) return null;
  if (password.length < 7) {
    return "Password must be at least 7 characters";
  }
  if (!REGEX.HAS_LETTER.test(password) || !REGEX.HAS_NUMBER.test(password)) {
    return "Password must contain both letters and numbers";
  }
  return null;
};

export const getEmptyCustomerForm = (): CustomerFormValues => ({
  ...customerDefaultValues,
});
