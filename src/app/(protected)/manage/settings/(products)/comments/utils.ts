import {
  CommentSettingsFormNames,
  commentSettingsDefaults,
  CommentSystem,
  CommentTab,
  commentTabs,
  SYSTEM_TAB,
} from "./constant";
import {
  CommentSettings,
  CommentSettingsFormValues,
  CommentSettingsPayload,
} from "./type";

// General Settings, plus the setup tab for the chosen system
export const getVisibleTabs = (system?: string) =>
  commentTabs.filter(
    (tab) =>
      tab.key === CommentTab.General ||
      tab.key === SYSTEM_TAB[system as CommentSystem],
  );

export const transformGetCommentSettings = (
  settings: CommentSettings | null,
): CommentSettingsFormValues => ({
  [CommentSettingsFormNames.CommentSystem]:
    settings?.commentSystem ??
    commentSettingsDefaults[CommentSettingsFormNames.CommentSystem],
  [CommentSettingsFormNames.EnabledFor]:
    settings?.enabledFor ??
    commentSettingsDefaults[CommentSettingsFormNames.EnabledFor],
  [CommentSettingsFormNames.OnlyPastCustomers]:
    settings?.onlyPastCustomers ??
    commentSettingsDefaults[CommentSettingsFormNames.OnlyPastCustomers],
});

export const transformPostCommentSettings = (
  values: CommentSettingsFormValues,
): CommentSettingsPayload => ({
  commentSystem: values[CommentSettingsFormNames.CommentSystem],
  enabledFor: values[CommentSettingsFormNames.EnabledFor],
  onlyPastCustomers: values[CommentSettingsFormNames.OnlyPastCustomers],
});
