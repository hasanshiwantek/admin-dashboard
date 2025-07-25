"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavigationLoader from "@/app/components/loader/NavigationLoader";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || !expiry) {
      router.replace("/login");
      setIsAuthenticated(false);
    } else {
      const timeLeft = Number(expiry) - Date.now();
      if (timeLeft > 0) {
        setIsAuthenticated(true);

        // Auto-logout after expiry
        const timer = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          router.replace("/login");
        }, timeLeft);

        return () => clearTimeout(timer);
      } else {
        // Token expired
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("storeId")
        router.replace("/login");
        setIsAuthenticated(false);
      }
    }
  }, [router]);

  if (isAuthenticated === null || isAuthenticated === false) {
  return <NavigationLoader />
}

  return <>{children}</>;
};

export default ProtectedLayout;