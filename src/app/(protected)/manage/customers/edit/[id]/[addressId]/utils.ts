import { AddressField, addressDefaultValues } from "./constant";
import type { AddressFormValues, AddressMode } from "./types";

type AddressRecord = Record<string, unknown>;
const getString = (record: AddressRecord, ...keys: string[]): string => {
  const value = keys
    .map((key) => record[key])
    .find((item) => item != null && item !== "");

  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : "";
};

export function normalizeAddress(data: unknown): AddressFormValues {
  const response =
    data && typeof data === "object" ? (data as AddressRecord) : {};

  const record =
    response.data && typeof response.data === "object"
      ? (response.data as AddressRecord)
      : response;

  return {
    [AddressField.firstName]: getString(record, AddressField.firstName),
    [AddressField.lastName]: getString(record, AddressField.lastName),
    [AddressField.companyName]: getString(record, AddressField.companyName),
    [AddressField.phoneNumber]: getString(record, AddressField.phoneNumber),
    [AddressField.addressLine1]: getString(record, AddressField.addressLine1),
    [AddressField.addressLine2]: getString(record, AddressField.addressLine2),
    [AddressField.city]: getString(record, AddressField.city),
    [AddressField.state]: getString(record, AddressField.state),
    [AddressField.country]: getString(record, AddressField.country),
    [AddressField.zip]: getString(record, AddressField.zip),
    [AddressField.type]:
      getString(record, AddressField.type) ||
      addressDefaultValues[AddressField.type],
    [AddressField.isDefault]: Boolean(record[AddressField.isDefault]),
  };
}
export function buildAddressPayload(
  form: AddressFormValues,
  customerId: number,
  mode: AddressMode,
): Record<string, number | string | boolean> {
  const sharedFields = {
    customerId: customerId,
    [AddressField.city]: form[AddressField.city],
    [AddressField.state]: form[AddressField.state],
    [AddressField.zip]: form[AddressField.zip],
    [AddressField.country]: form[AddressField.country],
    [AddressField.type]: form[AddressField.type],
    [AddressField.isDefault]: form[AddressField.isDefault],
    [AddressField.addressLine2]: form[AddressField.addressLine2],
  };

  return {
    ...sharedFields,
    [AddressField.firstName]: form[AddressField.firstName],
    [AddressField.lastName]: form[AddressField.lastName],
    [AddressField.companyName]: form[AddressField.companyName],
    [AddressField.phoneNumber]: form[AddressField.phoneNumber],
    [AddressField.addressLine1]: form[AddressField.addressLine1],
  };
}
