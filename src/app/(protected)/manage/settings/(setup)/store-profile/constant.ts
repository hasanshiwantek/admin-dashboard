const enum AddressType {
  HomeOffice = "home_office",
}

export const storeProfileDefault = {
  storeDisplayName: "New Ecom Store",
  address: "",
  addressType: AddressType.HomeOffice,
  email: "info@new-ecom-store.mybigcommerce.com",
  phone: "",
};

export const addressTypeOptions = [
  { value: AddressType.HomeOffice, label: "Home office" },
];
