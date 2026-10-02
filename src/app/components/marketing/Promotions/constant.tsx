import { SelectOption } from "@/components/ui/select";
import { TableTab } from "@/components/ui/Table/types";
import {
  Archive,
  Gift,
  LucideIcon,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";

export const PROMOTIONS_BASE_PATH = "/manage/marketing/promotion-manager";

export enum PromotionDisplay {
  Automatic = "automatic",
  Coupon = "coupon",
}

export enum PromotionStatus {
  Active = "active",
  Inactive = "inactive",
  Archived = "archived",
}

export enum PromotionType {
  Order = "order",
  Product = "product",
  Shipping = "shipping",
  Gift = "gift",
  Cart = "cart",
}

export const DISPLAY_TABS = [
  { key: PromotionDisplay.Automatic, label: "Automatic" },
  { key: PromotionDisplay.Coupon, label: "Coupon" },
];

export const DISPLAY_CONFIG: Record<
  PromotionDisplay,
  {
    title: string;
    description: string;
    searchPlaceholder: string;
    usesHeader: string;
    showManagePriority: boolean;
  }
> = {
  [PromotionDisplay.Automatic]: {
    title: "Automatic promotions",
    description:
      "Automatic promotions apply when your customer enters the cart or checkout and the conditions of the promotion are satisfied.",
    searchPlaceholder: "Search by promotion name",
    usesHeader: "Uses",
    showManagePriority: true,
  },
  [PromotionDisplay.Coupon]: {
    title: "Coupon promotions",
    description:
      "Coupon promotions apply when your customer enters in a valid coupon code in the cart or checkout and the conditions of the promotion are satisfied.",
    searchPlaceholder: "Search by promotion name or code",
    usesHeader: "Redemptions",
    showManagePriority: false,
  },
};

export const PromotionStatusTabs: TableTab[] = [
  { key: "All", label: "All", filters: {} },
  {
    key: "Active",
    label: "Active",
    filters: { status: PromotionStatus.Active },
  },
  {
    key: "Inactive",
    label: "Inactive",
    filters: { status: PromotionStatus.Inactive },
  },
  {
    key: "Archived",
    label: (
      <span className="flex items-center gap-2 text-inherit! text-2xl! 2xl:text-[1.6rem]! font-normal!">
        <Archive className="w-6 h-6 text-link" />
        Archived
      </span>
    ) as any,
    filters: { status: "archived" },
  },
];

export const PROMOTION_TYPE_META: Record<
  string,
  { label: string; icon: LucideIcon }
> = {
  [PromotionType.Order]: { label: "Order discount", icon: ShoppingCart },
  [PromotionType.Product]: { label: "Product discount", icon: Tag },
  [PromotionType.Shipping]: { label: "Shipping discount", icon: Truck },
  [PromotionType.Gift]: { label: "Free gift", icon: Gift },
};

// export const PROMOTION_TYPE_OPTIONS: SelectOption[] = Object.entries(
//   PROMOTION_TYPE_META,
// ).map(([value, { label }]) => ({ value, label }));

export const PROMOTION_TYPE_OPTIONS: SelectOption[] = [
  { label: "Cart", value: PromotionType.Cart },
  { label: "Shipping", value: PromotionType.Shipping },
];

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: "USD", label: "USD" },
];

export const CREATE_OPTIONS = [
  { label: "With standard editor", path: "/automatic/new" },
  { label: "With legacy editor", path: "/discounts/create" },
];
