export enum AddressType {
  Residential = "Residential",
  Commercial = "Commercial",
}

export enum AddressField {
  firstName = "firstName",
  lastName = "lastName",
  companyName = "companyName",
  phoneNumber = "phoneNumber",
  addressLine1 = "addressLine1",
  addressLine2 = "addressLine2",
  city = "city",
  state = "state",
  country = "country",
  zip = "zip",
  type = "type",
  isDefault = "isDefault",
}

export const addressDefaultValues = {
  [AddressField.firstName]: "",
  [AddressField.lastName]: "",
  [AddressField.companyName]: "",
  [AddressField.phoneNumber]: "",
  [AddressField.addressLine1]: "",
  [AddressField.addressLine2]: "",
  [AddressField.city]: "",
  [AddressField.state]: "",
  [AddressField.country]: "",
  [AddressField.zip]: "",
  [AddressField.type]: AddressType.Residential,
  [AddressField.isDefault]: false,
};

export const addressTypeOptions = [
  { value: AddressType.Residential, label: AddressType.Residential },
  { value: AddressType.Commercial, label: AddressType.Commercial },
];
