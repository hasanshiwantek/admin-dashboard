import type { DefaultCurrency } from "@/app/(protected)/manage/settings/(setup)/currencies/type";

type Flag = number | boolean | string | null;
type Amount = number | string | null;

export interface ProductImage {
  path: string;
  altText?: string | null;
  description?: string | null;
  isPrimary?: Flag;
}

export interface ProductBulkPricingTier {
  minQty: Amount;
  price: Amount;
  unitPrice?: Amount;
}

export interface ProductCustomField {
  name: string;
  value: string;
}

export interface ProductHsCode {
  country: string;
  code: string;
}

export interface ProductDimensions {
  weight?: Amount;
  width?: Amount;
  height?: Amount;
  depth?: Amount;
}

// A product as the API returns it
export interface Product {
  id: number;
  name: string;
  sku: string;
  productType?: string | null;
  brandId?: number | string | null;
  price?: Amount;
  categoryIds?: (number | string)[] | null;
  isVisible?: Flag;
  description?: string | null;
  faq?: string | null;
  image?: ProductImage[] | null;
  upc?: string | null;
  bpn?: string | null;
  mpn?: string | null;
  gtin?: string | null;
  taxClass?: string | null;
  costPrice?: Amount;
  msrp?: Amount;
  salePrice?: Amount;
  taxCode?: string | null;
  discountType?: string | null;
  bulkPricingTiers?: ProductBulkPricingTier[] | null;
  trackInventory?: Flag;
  inventoryLevel?: string | null;
  currentStock?: Amount;
  lowStock?: Amount;
  isFeatured?: Flag;
  searchKeywords?: string | null;
  sortOrder?: Amount;
  templateLayout?: string | null;
  warranty?: string | null;
  availabilityText?: string | null;
  condition?: string | null;
  showCondition?: Flag;
  customFields?: ProductCustomField[] | null;
  relatedProductsEnabled?: Flag;
  dimensions?: ProductDimensions | null;
  fixedShippingCost?: Amount;
  freeShipping?: Flag;
  purchasabilityStatus?: string | null;
  callPricing?: Flag;
  callForPricingLabel?: string | null;
  callForPricingPhone?: string | null;
  minPurchaseQuantity?: Amount;
  maxPurchaseQuantity?: Amount;
  manageCustoms?: Flag;
  countryOfOrigin?: string | null;
  commodityDescription?: string | null;
  hsCodes?: ProductHsCode[] | null;
  pageTitle?: string | null;
  productUrl?: string | null;
  isRedirect?: Flag;
  metaDescription?: string | null;
  objectType?: string | null;
  useProductName?: Flag;
  graphDescription?: Flag;
  dontUse?: Flag;
  hasDuplicate?: Flag;
}

// A category as the categories API returns it
export interface ApiCategory {
  id: number | string;
  name: string;
  subcategories?: ApiCategory[] | null;
}

export interface CategoryTreeItem {
  id: number;
  name: string;
  children: CategoryTreeItem[];
}

export interface ProductResponse {
  status?: boolean;
  data: Product;
}

// A product as the products list returns it
export interface ProductListItem {
  id: number;
  name: string;
  sku: string;
  price?: Amount;
  salePrice?: Amount;
  costPrice?: Amount;
  msrp?: Amount;
  currentStock?: Amount;
  lowStock?: Amount;
  allowPurchase?: Flag;
  isFeatured?: Flag;
  isVisible?: Flag;
  productUrl?: string | null;
  image?: ProductImage[] | null;
  categoryIds?: { id: number | string; name: string }[] | null;
}

export interface ProductListResponse {
  data?: ProductListItem[];
  pagination?: { total?: number; lastPage?: number };
}

// The parts of the default currency that shape price fields
export type ProductCurrency = Pick<
  DefaultCurrency,
  | "code"
  | "symbol"
  | "symbolLocation"
  | "decimalToken"
  | "thousandsToken"
  | "decimalPlaces"
>;
