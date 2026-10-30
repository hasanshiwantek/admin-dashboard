export enum CustomerFormField {
  FirstName = "firstName",
  LastName = "lastName",
  CompanyName = "companyName",
  Email = "email",
  Phone = "phone",
  StoreCredit = "storeCredit",
  CustomerGroup = "customerGroup",
  TaxCode = "taxCode",
  Password = "password",
  ConfirmPassword = "confirmPassword",
  ForceReset = "forceReset",
  AcsEmail = "acsEmail",
  Address = "address",
  State = "state",
  Country = "country",
  Notes = "notes",
}

export const customerDefaultValues = {
  [CustomerFormField.FirstName]: "",
  [CustomerFormField.LastName]: "",
  [CustomerFormField.CompanyName]: "",
  [CustomerFormField.Email]: "",
  [CustomerFormField.Phone]: "",
  [CustomerFormField.StoreCredit]: "0.00",
  [CustomerFormField.CustomerGroup]: "",
  [CustomerFormField.TaxCode]: "",
  [CustomerFormField.Password]: "",
  [CustomerFormField.ConfirmPassword]: "",
  [CustomerFormField.ForceReset]: false,
  [CustomerFormField.AcsEmail]: true,
  [CustomerFormField.Address]: "",
  [CustomerFormField.State]: "",
  [CustomerFormField.Country]: "",
  [CustomerFormField.Notes]: "",
};
export const CUSTOMER_ROUTES = {
  LIST: "/manage/customers",
  ADD: "/manage/customers/add",
  EDIT: "/manage/customers/edit",
  EDIT_BY_ID: (id: string | number) => `/manage/customers/edit/${id}`,
  ADD_ADDRESS: (customerId: string | number) =>
    `/manage/customers/edit/${customerId}/add`,
  EDIT_ADDRESS: (customerId: string | number, addressId: string | number) =>
    `/manage/customers/edit/${customerId}/${addressId}`,
} as const;
