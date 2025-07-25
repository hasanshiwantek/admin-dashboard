"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; // or show a loader
  }

  return <>{children}</>;
};

export default ProtectedLayout;
