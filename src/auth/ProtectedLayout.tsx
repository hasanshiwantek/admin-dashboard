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

    if (!token) {
      router.replace("/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null || isAuthenticated === false) {
  return <NavigationLoader />
}

  return <>{children}</>;
};

export default ProtectedLayout;
