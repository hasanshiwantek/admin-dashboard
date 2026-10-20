"use client";

import { useCallback, useEffect, useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { getFromStorage } from "@/utils/storage";
import {
  AccessContext,
  AccessRule,
  filterByAccess as filterItems,
  hasAccess as checkItem,
} from "@/utils/access";

type AccessData = AccessContext["data"];

// Binds permissions so callers only pass items.
// Checks run against `data` (any object, e.g. an API response);
// falls back to the logged-in user when no data is given.
// A per-call `data` overrides the hook-level one.
export function useAccess(data?: AccessData) {
  const { can, loaded } = usePermissions();
  const [user, setUser] = useState<AccessData>(null);

  useEffect(() => {
    if (data === undefined) {
      setUser(getFromStorage<Record<string, any>>("user"));
    }
  }, [data]);

  const defaultData = data === undefined ? user : data;

  const hasAccess = useCallback(
    (rule: AccessRule, overrideData?: AccessData) =>
      checkItem(rule, { data: overrideData ?? defaultData, can }),
    [defaultData, can],
  );

  const filterByAccess = useCallback(
    <T extends AccessRule>(items: T[], overrideData?: AccessData) =>
      filterItems(items, { data: overrideData ?? defaultData, can }),
    [defaultData, can],
  );

  return { data: defaultData, loaded, hasAccess, filterByAccess };
}
