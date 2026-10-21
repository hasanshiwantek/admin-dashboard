import { ReturnSettingsFormNames, returnSettingsDefaults } from "./constant";
import {
  ReturnSettings,
  ReturnSettingsFormValues,
  ReturnSettingsPayload,
} from "./type";

export const transformGetReturnSettings = (
  settings: ReturnSettings | null,
): ReturnSettingsFormValues => ({
  [ReturnSettingsFormNames.EnableReturns]:
    settings?.enableReturns ??
    returnSettingsDefaults[ReturnSettingsFormNames.EnableReturns],
});

export const transformPostReturnSettings = (
  values: ReturnSettingsFormValues,
): ReturnSettingsPayload => ({
  enableReturns: values[ReturnSettingsFormNames.EnableReturns],
});
