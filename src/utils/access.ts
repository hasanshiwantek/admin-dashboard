import { CheckTypeEnums } from "@/const/appConstants";
import type { PermissionCheck } from "@/hooks/usePermissions";
import { getNestedValue } from "@/lib/utils";

export interface AccessCheck {
  key: string;
  value?: any;
  type?: CheckTypeEnums;
}

export interface AccessRule {
  checks?: AccessCheck[];
  permission?: PermissionCheck;
}

export interface AccessContext {
  data?: Record<string, any> | null;
  can?: (permission?: PermissionCheck) => boolean;
}

const isSet = (value: unknown) =>
  value !== null && value !== undefined && value !== "";

const includes = (actual: unknown, value: unknown) =>
  Array.isArray(actual)
    ? actual.includes(value)
    : Array.isArray(value) && value.includes(actual);

export function passesCheck(
  { key, value, type = CheckTypeEnums.EQUAL }: AccessCheck,
  data: AccessContext["data"],
) {
  const actual = getNestedValue(data, key);
  switch (type) {
    case CheckTypeEnums.EQUAL:
      return actual === value;
    case CheckTypeEnums.NOT_EQUAL:
      return actual !== value;
    case CheckTypeEnums.INCLUDES:
      return includes(actual, value);
    case CheckTypeEnums.NOT_INCLUDES:
      return !includes(actual, value);
    case CheckTypeEnums.EXISTS:
      return isSet(actual);
    case CheckTypeEnums.NOT_EXISTS:
      return !isSet(actual);
    case CheckTypeEnums.GREATER_THAN:
      return Number(actual) > Number(value);
    case CheckTypeEnums.LESS_THAN:
      return Number(actual) < Number(value);
  }
}

export function passesChecks(
  checks: AccessCheck[] | undefined,
  data: AccessContext["data"],
) {
  if (!checks?.length) return true;
  return checks.every((check) => passesCheck(check, data));
}

export function hasAccess(rule: AccessRule, { data, can }: AccessContext) {
  if (!passesChecks(rule.checks, data)) return false;
  if (rule.permission && can) return can(rule.permission);
  return !rule.permission;
}

export function filterByAccess<T extends AccessRule>(
  items: T[],
  context: AccessContext,
): T[] {
  return (items || []).filter((item) => hasAccess(item, context));
}
