import type { ReturnSettingsFormValues } from "./type";

export enum ReturnSettingsFormNames {
  EnableReturns = "enableReturns",
}

export const returnSettingsDefaults: ReturnSettingsFormValues = {
  [ReturnSettingsFormNames.EnableReturns]: false,
};
