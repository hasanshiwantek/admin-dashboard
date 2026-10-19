import type { DisplayNameFormValues } from "./type";

/** Form field names; use these for `name`, watch/setValue and schema keys. */
export enum DisplayNameField {
  DisplayName = "displayName",
}

export const displayNameDefaults: DisplayNameFormValues = {
  [DisplayNameField.DisplayName]: "",
};
