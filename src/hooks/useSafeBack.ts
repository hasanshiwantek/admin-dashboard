"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

let hasInAppHistory = false;

const LAST_URL_KEY = "lastUrlByPath";

const readLastUrls = (): Record<string, string> => {
  try {
    return JSON.parse(sessionStorage.getItem(LAST_URL_KEY) || "{}");
  } catch {
    return {};
  }
};

export const getLastUrl = (pathname: string) =>
  readLastUrls()[pathname] ?? pathname;

export function NavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      hasInAppHistory = true;
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const query = searchParams.toString();
    try {
      sessionStorage.setItem(
        LAST_URL_KEY,
        JSON.stringify({
          ...readLastUrls(),
          [pathname]: query ? `${pathname}?${query}` : pathname,
        }),
      );
    } catch {
      // storage unavailable — fall back to the bare pathname
    }
  }, [pathname, searchParams]);

  return null;
}

export function useSafeBack(fallbackPath: string) {
  const router = useRouter();

  return useCallback(() => {
    if (hasInAppHistory) {
      router.back();
    } else {
      router.replace(getLastUrl(fallbackPath));
    }
  }, [router, fallbackPath]);
}
