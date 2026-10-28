import { ReactNode } from "react";
import { ColumnDef } from "@/components/ui/Table/types";
import type { PreviewItem } from "@/types/types";
import type {
  BulkPricingTierValues,
  CustomFieldValues,
  HsCodeValues,
} from "../[id]/type";
import type { getPriceInputProps } from "../utils";
import type { ApiCategory, CategoryTreeItem } from "../type";

export type PriceInputProps = ReturnType<typeof getPriceInputProps>;

export type FieldChangeHandler = (change: {
  name: string;
  value: unknown;
}) => void;

export interface ProductBrandOption {
  id: number;
  name: string;
}

export type BulkPricingTierRow = BulkPricingTierValues & { id: string };
export type CustomFieldRow = CustomFieldValues & { id: string };
export type HsCodeRow = HsCodeValues & { id: string };

export interface CategoryTreeFieldProps {
  categories: ApiCategory[];
  value?: number[] | null;
  onChange?: (value: number[]) => void;
  className?: string;
}

export interface CategoryNodeProps {
  category: CategoryTreeItem;
  level: number;
  selected: number[];
  expanded: Set<number>;
  onToggleSelected: (id: number) => void;
  onToggleExpanded: (id: number) => void;
}

export interface ProductMediaFieldProps {
  value?: PreviewItem[] | null;
  onChange?: (value: PreviewItem[]) => void;
  accept?: string;
}

export interface ProductMediaRowProps {
  item: PreviewItem;
  src: string;
  onChange: (patch: Partial<PreviewItem>) => void;
  onMakePrimary: () => void;
  onRemove: () => void;
}

export interface ProductBasicInfoSectionProps {
  priceInputProps: PriceInputProps;
  brands: ProductBrandOption[];
  categories: ApiCategory[];
  onIdentityChange: FieldChangeHandler;
}

export interface ProductIdentifiersSectionProps {
  onIdentityChange: FieldChangeHandler;
}

export interface ProductPricingSectionProps {
  priceInputProps: PriceInputProps;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  discountTypeOptions: { value: string; label: string }[];
  bulkPricingTiers: BulkPricingTierRow[];
  bulkPricingColumns: ColumnDef<BulkPricingTierRow>[];
  onAddTier: () => void;
}

export interface ProductInventorySectionProps {
  trackInventory: boolean;
}

export interface ProductCustomFieldsSectionProps {
  customFields: CustomFieldRow[];
  customFieldColumns: ColumnDef<CustomFieldRow>[];
  onAddCustomField: () => void;
}

export interface ProductShippingSectionProps {
  priceInputProps: PriceInputProps;
  freeShipping: boolean;
}

export interface ProductPurchasabilitySectionProps {
  showCallForPricing: boolean;
  showCallForPricingFields: boolean;
}

export interface ProductCustomsSectionProps {
  manageCustoms: boolean;
  hsCodes: HsCodeRow[];
  hsCodeColumns: ColumnDef<HsCodeRow>[];
  onAddHsCode: () => void;
}

export interface ProductSectionGroupHeadingProps {
  title: string;
  description: string;
}

export interface ProductStorefrontLinkProps {
  href: string;
  /** Icon only, for the compact header */
  compact?: boolean;
}

export interface ProductPageHeaderProps {
  compact: boolean;
  headerRef: (node: HTMLElement | null) => void;
  title: string;
  storefrontUrl: string | null;
  /** Hidden while compact, e.g. the actions menu */
  action?: ReactNode;
  onBack: () => void;
}

export interface HeaderRevealProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export interface ProductSeoSectionProps {
  showRedirect: boolean;
  onProductUrlChange: FieldChangeHandler;
  onResetProductUrl: () => void;
}
