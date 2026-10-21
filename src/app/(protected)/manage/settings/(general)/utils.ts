import { UrlSettingEnums } from "@/const/appConstants";
import { FieldErrors } from "react-hook-form";
import {
  GeneralSection,
  GeneralTab,
  generalSettingsDefaults,
  SECTION_TAB,
  UrlFormat,
  urlStructureSections,
} from "./constant";
import {
  GeneralSettingsFormValues,
  UrlSettingPayload,
  UrlSettingSection,
} from "./type";

export const isGeneralTab = (value: string): value is GeneralTab =>
  (Object.values(GeneralTab) as string[]).includes(value);

// The tab holding the first invalid field (errors are nested by section)
export const getTabForErrors = (
  errors: FieldErrors<GeneralSettingsFormValues>,
): GeneralTab | undefined => {
  const section = Object.keys(errors)[0] as GeneralSection | undefined;
  return section && SECTION_TAB[section];
};

// Stored settings (API) → form values. Each section is merged over its
// defaults, so missing or null fields fall back instead of breaking inputs.
export const transformGetGeneralSettings = (
  apiSettings: any,
): GeneralSettingsFormValues => {
  const settings = Array.isArray(apiSettings) ? apiSettings[0] : apiSettings;

  return Object.fromEntries(
    Object.entries(generalSettingsDefaults).map(([section, defaults]) => {
      const saved = settings?.[section] ?? {};
      const merged = Object.fromEntries(
        Object.entries(defaults).map(([field, fallback]) => [
          field,
          saved[field] ?? fallback,
        ]),
      );
      return [section, merged];
    }),
  ) as GeneralSettingsFormValues;
};

// Form values → store-settings payload. Share settings aren't accepted by the
// API yet, so they stay client-side for now.
export const transformPostGeneralSettings = (
  values: GeneralSettingsFormValues,
) => ({
  [GeneralSection.Website]: values.website,
  [GeneralSection.Display]: values.display,
  [GeneralSection.UrlStructure]: values.urlStructure,
  [GeneralSection.Search]: values.search,
  [GeneralSection.SecurityPrivacy]: values.securityPrivacy,
  [GeneralSection.Miscellaneous]: values.miscellaneous,
});

const toUrlSettingPayload = (
  format: string,
  customFormat: string,
  fallbackCustom: string,
): UrlSettingPayload => {
  if (format === UrlFormat.Custom) {
    return {
      format_type: UrlSettingEnums.CUSTOM,
      custom_format: customFormat.trim() || fallbackCustom,
    };
  }
  return {
    format_type:
      format === UrlFormat.SeoOptimizedLong
        ? UrlSettingEnums.SEO_OPTIMIZED_LONG
        : UrlSettingEnums.SEO_OPTIMIZED_SHORT,
  };
};

// One url-settings payload per section (product / category / web page)
export const transformPostUrlSettings = (
  values: GeneralSettingsFormValues,
): { section: UrlSettingSection; data: UrlSettingPayload }[] =>
  urlStructureSections.map((section) => ({
    section: section.apiSection,
    data: toUrlSettingPayload(
      values.urlStructure[section.formatField],
      values.urlStructure[section.customUrlField],
      section.customPlaceholder,
    ),
  }));

// Full form path for a field, e.g. fieldPath("website", "homePageTitle")
// → "website.homePageTitle"
export const fieldPath = <S extends GeneralSection, F extends string>(
  section: S,
  field: F,
) => `${section}.${field}` as const;
