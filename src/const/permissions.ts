import type { PermissionGroup } from "@/redux/slices/userPermission";

export const PERMISSION_SLUGS = [
  // orders
  "/manage/orders",
  "/manage/orders/add",
  "/manage/orders/search",
  "/manage/orders/export",
  "/manage/orders/draft",
  "/manage/orders/shipments",
  "/manage/orders/returns",
  // products
  "/manage/products",
  "/manage/products/add",
  "/manage/products/search",
  "/manage/products/import",
  "/manage/products/export",
  "/manage/products/categories",
  "/manage/products/reviews",
  "/manage/products/brands",
  // customers
  "/manage/customers",
  "/manage/customers/add",
  "/manage/customers/search",
  "/manage/customers/import",
  "/manage/customers/export",
  // storefront
  "/manage/storefront/logo",
  "/manage/storefront/carousel",
  "/manage/storefront/script-manager",
  "/manage/storefront/web-pages",
  "/manage/storefront/blog",
  // marketing
  "/manage/marketing/coupon-codes",
  "/manage/marketing/email-marketing",
  // settings
  "/manage/settings",
];

const ROUTE_ALIASES: Record<string, string> = {
  "/manage/orders/view-returns": "/manage/orders/returns",
  "/manage/marketing/transactional-emails": "/manage/marketing/email-marketing",
};

const PUBLIC_ROUTES = ["/manage/dashboard", "/manage/user-settings"];

const matches = (path: string, prefix: string) =>
  path === prefix || path.startsWith(`${prefix}/`);

const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

export function getRequiredSlug(pathname: string): string | null {
  const path = normalize(pathname);

  if (!matches(path, "/manage")) return null;
  if (PUBLIC_ROUTES.some((r) => matches(path, r))) return null;

  const alias = Object.keys(ROUTE_ALIASES).find((r) => matches(path, r));
  if (alias) return ROUTE_ALIASES[alias];

  const slug = PERMISSION_SLUGS.filter((s) => matches(path, s)).sort(
    (a, b) => b.length - a.length,
  )[0];

  return slug ?? "";
}

// Flat set of every permission name and slug the user holds
export function buildPermissionSet(groups: PermissionGroup[] | undefined) {
  const set = new Set<string>();
  (Array.isArray(groups) ? groups : []).forEach((g) =>
    (g?.permissions || []).forEach((p) => {
      if (p?.name) set.add(p.name);
      if (p?.slug) set.add(p.slug);
    }),
  );
  return set;
}

export function canAccessRoute(pathname: string, permissions: Set<string>) {
  const required = getRequiredSlug(pathname);
  if (required === null) return true;
  return !!required && permissions.has(required);
}
