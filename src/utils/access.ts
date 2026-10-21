import type { PermissionCheck } from "@/hooks/usePermissions";
import { getNestedValue } from "@/lib/utils";

export interface AccessCheck {
  key: string;
  value: any;
}

export interface AccessRule {
  checks?: AccessCheck[];
  permission?: PermissionCheck;
}

export interface AccessContext {
  data?: Record<string, any> | null;
  can?: (permission?: PermissionCheck) => boolean;
}

export function passesChecks(
  checks: AccessCheck[] | undefined,
  data: AccessContext["data"],
) {
  if (!checks?.length) return true;
  return checks.every(({ key, value }) => getNestedValue(data, key) === value);
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
