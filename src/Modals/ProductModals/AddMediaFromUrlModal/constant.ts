import type { AddMediaFromUrlFormValues } from "./type";

export enum AddMediaFromUrlFormNames {
  Url = "url",
}

export const addMediaFromUrlDefaults: AddMediaFromUrlFormValues = {
  [AddMediaFromUrlFormNames.Url]: "",
};
