import type { ScriptFormValues } from "./types";

export enum ScriptFormNames {
  ScriptName = "scriptName",
  Description = "description",
  Placement = "placement",
  Location = "location",
  ScriptCategory = "scriptCategory",
  ScriptType = "scriptType",
  LoadMethod = "loadMethod",
  ScriptUrl = "scriptUrl",
  IntegrityHashes = "integrityHashes",
  CurrentIntegrityHash = "currentIntegrityHash",
  ScriptContents = "scriptContents",
}
export enum ScriptPlacement {
  FOOTER = "footer",
  HEADER = "header",
}
export enum ScriptType {
  URL = "url",
  SCRIPT = "script",
}

export enum ScriptLoadMethod {
  DEFER = "defer",
  ASYNC = "async",
  DEFAULT = "default",
}

export enum ScriptLocation {
  STOREFRONT = "storefront",
  CHECKOUT = "checkout",
  ORDER_CONFIRMATION = "orderConfirmation",
  ALL_PAGES = "allPages",
}
export enum ScriptCategory {
  ESSENTIAL = "essential",
  ANALYTICS = "analytics",
  FUNCTIONAL = "functional",
  TARGETING = "targeting",
}
export const SCRIPT_FORM_DEFAULT_VALUES: Partial<ScriptFormValues> = {
  [ScriptFormNames.ScriptName]: "",
  [ScriptFormNames.Description]: "",
  [ScriptFormNames.Placement]: ScriptPlacement.FOOTER,
  [ScriptFormNames.Location]: ScriptLocation.STOREFRONT,
  [ScriptFormNames.ScriptCategory]: ScriptCategory.ESSENTIAL,
  [ScriptFormNames.ScriptType]: ScriptType.URL,
  [ScriptFormNames.LoadMethod]: ScriptLoadMethod.DEFER,
  [ScriptFormNames.ScriptUrl]: "",
  [ScriptFormNames.IntegrityHashes]: [],
  [ScriptFormNames.CurrentIntegrityHash]: "",
  [ScriptFormNames.ScriptContents]: "",
};

export const SCRIPT_PLACEMENT_OPTIONS = [
  { value: ScriptPlacement.FOOTER, label: "Footer" },
  { value: ScriptPlacement.HEADER, label: "Header" },
] as const;

export const SCRIPT_LOCATION_OPTIONS = [
  { value: ScriptLocation.STOREFRONT, label: "Storefront pages" },
  { value: ScriptLocation.CHECKOUT, label: "Checkout" },
  { value: ScriptLocation.ORDER_CONFIRMATION, label: "Order confirmation" },
  { value: ScriptLocation.ALL_PAGES, label: "All pages" },
] as const;

export const SCRIPT_MANAGER_ROUTE = "/manage/storefront/script-manager";

export const SCRIPT_CATEGORY_OPTIONS = [
  {
    value: ScriptCategory.ESSENTIAL,
    label: "Essential",
    description:
      "Essential for the site and any requested services to work, but do not perform any additional or secondary function.",
  },
  {
    value: ScriptCategory.ANALYTICS,
    label: "Analytics",
    description:
      "Provide statistical information on site usage, e.g., web analytics so we can improve this website over time.",
  },
  {
    value: ScriptCategory.FUNCTIONAL,
    label: "Functional",
    description:
      "Enables enhanced functionality, such as videos and live chat. If you do not allow these, then some or all of these functions may not work properly.",
  },
  {
    value: ScriptCategory.TARGETING,
    label: "Targeting/Advertising",
    description:
      "Provides statistical information on site usage, such as web analytics, leading to website improvements over time.",
  },
] as const;

export const SCRIPT_TYPE_OPTIONS = [
  { value: ScriptType.URL, label: "URL" },
  { value: ScriptType.SCRIPT, label: "Script" },
] as const;

export const SCRIPT_LOAD_METHOD_OPTIONS = [
  { value: ScriptLoadMethod.DEFER, label: "Defer" },
  { value: ScriptLoadMethod.ASYNC, label: "Async" },
  { value: ScriptLoadMethod.DEFAULT, label: "Default" },
] as const;
