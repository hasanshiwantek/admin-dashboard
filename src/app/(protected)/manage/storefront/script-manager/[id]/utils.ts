import _ from "lodash";
import {
  ScriptCategory,
  ScriptFormNames,
  ScriptLoadMethod,
  ScriptLocation,
  ScriptPlacement,
  ScriptType,
} from "./constant";
import { ScriptFormValues } from "./types";

const toSnakeCaseValue = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(toSnakeCaseValue);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        _.snakeCase(key),
        toSnakeCaseValue(entry),
      ]),
    );
  }
  return value;
};

export function toSnakeCase(
  value: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      _.snakeCase(key),
      toSnakeCaseValue(entry),
    ]),
  );
}

export function toCamelCaseRecord(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [_.camelCase(key), entry]),
  );
}
export const getLoadedScriptFormValues = (
  scriptData: Record<string, unknown>,
  loadedScriptType: ScriptType,
): ScriptFormValues => {
  return {
    [ScriptFormNames.ScriptName]: String(
      scriptData[ScriptFormNames.ScriptName] || "",
    ),
    [ScriptFormNames.Description]: String(
      scriptData[ScriptFormNames.Description] || "",
    ),

    [ScriptFormNames.Placement]:
      scriptData[ScriptFormNames.Placement] === ScriptPlacement.HEADER
        ? ScriptPlacement.HEADER
        : ScriptPlacement.FOOTER,

    [ScriptFormNames.Location]:
      scriptData[ScriptFormNames.Location] === ScriptLocation.CHECKOUT
        ? ScriptLocation.CHECKOUT
        : scriptData[ScriptFormNames.Location] ===
            ScriptLocation.ORDER_CONFIRMATION
          ? ScriptLocation.ORDER_CONFIRMATION
          : scriptData[ScriptFormNames.Location] === ScriptLocation.ALL_PAGES
            ? ScriptLocation.ALL_PAGES
            : ScriptLocation.STOREFRONT,

    [ScriptFormNames.ScriptCategory]:
      scriptData[ScriptFormNames.ScriptCategory] === ScriptCategory.ANALYTICS
        ? ScriptCategory.ANALYTICS
        : scriptData[ScriptFormNames.ScriptCategory] ===
            ScriptCategory.FUNCTIONAL
          ? ScriptCategory.FUNCTIONAL
          : scriptData[ScriptFormNames.ScriptCategory] ===
              ScriptCategory.TARGETING
            ? ScriptCategory.TARGETING
            : ScriptCategory.ESSENTIAL,

    [ScriptFormNames.ScriptType]: loadedScriptType,

    [ScriptFormNames.LoadMethod]:
      scriptData[ScriptFormNames.LoadMethod] === ScriptLoadMethod.ASYNC
        ? ScriptLoadMethod.ASYNC
        : scriptData[ScriptFormNames.LoadMethod] === ScriptLoadMethod.DEFAULT
          ? ScriptLoadMethod.DEFAULT
          : ScriptLoadMethod.DEFER,

    [ScriptFormNames.ScriptUrl]:
      loadedScriptType === ScriptType.URL
        ? String(scriptData[ScriptFormNames.ScriptUrl] || "")
        : "",

    [ScriptFormNames.ScriptContents]:
      loadedScriptType === ScriptType.SCRIPT
        ? String(
            scriptData.scriptContent ||
              scriptData[ScriptFormNames.ScriptContents] ||
              "",
          )
        : "",

    [ScriptFormNames.IntegrityHashes]: Array.isArray(
      scriptData[ScriptFormNames.IntegrityHashes],
    )
      ? scriptData[ScriptFormNames.IntegrityHashes].filter(
          (hash): hash is string => typeof hash === "string",
        )
      : [],

    [ScriptFormNames.CurrentIntegrityHash]: "",
  };
};
