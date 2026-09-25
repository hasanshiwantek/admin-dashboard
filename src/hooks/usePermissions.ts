"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchMyPermissions } from "@/redux/slices/userPermission";
import { buildPermissionSet, canAccessRoute } from "@/const/permissions";

export type PermissionCheck = string | string[];

export function usePermissions() {
  const dispatch = useAppDispatch();
  const { myPermissions, myPermissionsStatus } = useAppSelector(
    (state: any) => state.userPermission,
  );

  useEffect(() => {
    if (myPermissionsStatus === "idle") dispatch(fetchMyPermissions());
  }, [myPermissionsStatus]);

  const permissionSet = useMemo(
    () => buildPermissionSet(myPermissions),
    [myPermissions],
  );
  console.log({ permissionSet });
  // Accepts a permission name ("add_order") or slug ("/manage/orders/add").
  // An array passes if the user has any one of them.
  const can = useCallback(
    (permission?: PermissionCheck) => {
      if (!permission || (Array.isArray(permission) && !permission.length)) {
        return true;
      }
      const list = Array.isArray(permission) ? permission : [permission];
      return list.some((p) => permissionSet.has(p));
    },
    [permissionSet],
  );

  const canRoute = useCallback(
    (pathname: string) => canAccessRoute(pathname, permissionSet),
    [permissionSet],
  );

  return {
    permissions: myPermissions,
    loaded:
      myPermissionsStatus === "succeeded" || myPermissionsStatus === "failed",
    can,
    canRoute,
  };
}
