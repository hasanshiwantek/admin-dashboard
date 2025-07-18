// components/NavigationLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import styles from "@/styles/loader/Loader.module.css";
export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Delay to avoid flicker on fast routes
    const timeout = setTimeout(() => setLoading(false), 600);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 ">
      <div className={styles.loader} />
    </div>
  ) : null;
}
