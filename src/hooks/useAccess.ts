"use client";

import { usePermissions } from "@/hooks/usePermissions";
import {
  AccessContext,
  AccessRule,
  hasAccess as checkItem,
  filterByAccess as filterItems,
} from "@/utils/access";
import { getFromStorage } from "@/utils/storage";
import { useCallback, useEffect, useState } from "react";

type AccessData = AccessContext["data"];

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
