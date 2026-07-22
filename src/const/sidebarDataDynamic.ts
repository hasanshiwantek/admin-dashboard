"use client";

import { useEffect, useMemo } from "react";
import {
  Home,
  ShoppingCart,
  Users,
  Store,
  Gift,
  Settings,
  Megaphone,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchMyPermissions } from "@/redux/slices/userPermission";

// Group key -> sidebar meta (icon + display title + order)
const GROUP_META: Record<string, { title: string; icon: any; order: number }> = {
  orders: { title: "Orders", icon: ShoppingCart, order: 1 },
  products: { title: "Products", icon: Gift, order: 2 },
  customers: { title: "Customers", icon: Users, order: 3 },
  storefront: { title: "Storefront", icon: Store, order: 4 },
  marketing: { title: "Marketing", icon: Megaphone, order: 5 },
  settings: { title: "Settings", icon: Settings, order: 6 },
};

export function useSidebarData() {
  const dispatch = useAppDispatch();
  const { myPermissions } = useAppSelector((state: any) => state?.userPermission);

  useEffect(() => {
    dispatch(fetchMyPermissions());
  }, []);

  const sidebarData = useMemo(() => {
    const items: any[] = [
      { title: "Home", url: "/manage/dashboard", icon: Home },
    ];

    if (!Array.isArray(myPermissions)) return items;

    const dynamic = myPermissions
      .map((group: any) => {
        const meta = GROUP_META[group?.group];
        if (!meta) return null;

        const children = (group?.permissions || []).map((p: any) => ({
          title: p.label,
          url: p.slug,
        }));

        if (!children.length) return null;

        // Single-item groups (settings) render as a flat link
        if (children.length === 1) {
          return {
            title: meta.title,
            icon: meta.icon,
            url: children[0].url,
            order: meta.order,
          };
        }

        return {
          title: meta.title,
          icon: meta.icon,
          children,
          order: meta.order,
        };
      })
      .filter(Boolean)
      .sort((a: any, b: any) => a.order - b.order)
      .map(({ order, ...rest }: any) => rest);

    return [...items, ...dynamic];
  }, [myPermissions]);

  return sidebarData;
}