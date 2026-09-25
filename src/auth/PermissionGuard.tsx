"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { getRequiredSlug } from "@/const/permissions";

export default function PermissionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const { loaded, canRoute } = usePermissions();

  // Unrestricted pages don't wait for the permissions request
  if (getRequiredSlug(pathname) === null) return <>{children}</>;

  if (!loaded) {
    return (
      <div className="flex h-full items-center justify-center p-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (!canRoute(pathname)) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
        <h1 className="!text-4xl !font-bold">Access denied</h1>
        <p className="text-muted-foreground">
          You don't have permission to view this page. Contact your store
          administrator if you need access.
        </p>
        <Link href="/manage/dashboard" className="btn-primary">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
