import type { AddCurrencyFormValues } from "./type";

export enum AddCurrencyFormNames {
  Code = "code",
}

export const addCurrencyDefaults: AddCurrencyFormValues = {
  [AddCurrencyFormNames.Code]: "",
};
