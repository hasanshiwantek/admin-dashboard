"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

// Set once the user has navigated client-side inside the app, meaning the
// previous history entry is one of our pages. Resets on a full page load.
let hasInAppHistory = false;

// Mount once in the app layout to record in-app navigations.
export function useNavigationTracker() {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      hasInAppHistory = true;
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);
}

// Go back to the previous page (keeping its URL params) when it is part of the
// app, otherwise replace the current page with `fallbackUrl` (e.g. the page
// was opened directly in a new tab).
export function useSafeBack(fallbackUrl: string) {
  const router = useRouter();

  return useCallback(() => {
    if (hasInAppHistory) {
      router.back();
    } else {
      router.replace(fallbackUrl);
    }
  }, [router, fallbackUrl]);
}
