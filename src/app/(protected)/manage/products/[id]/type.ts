import type { SectionConfig } from "@/components/SectionNav/type";
import type { ProductSchema } from "@/validations/formValidations";
import * as yup from "yup";
import type { ProductFormNames, ProductSection } from "./constant";

export type ProductFormValues = yup.InferType<typeof ProductSchema>;

export type BulkPricingTierValues =
  ProductFormValues[ProductFormNames.BulkPricingTiers][number];
export type CustomFieldValues =
  ProductFormValues[ProductFormNames.CustomFields][number];
export type HsCodeValues = ProductFormValues[ProductFormNames.HsCodes][number];

export type ProductSectionConfig = SectionConfig<
  ProductFormNames,
  ProductSection
>;

export interface ProductMediaPayload {
  file: File | null;
  url: string;
  description: string;
  isPrimary: number;
}

// What add-product / update-single-product expect, before it becomes FormData
export interface ProductPayload {
  name: string;
  sku: string;
  productType: string;
  brandId: number | null;
  price: number;
  categoryIds: number[];
  isVisible: number;
  description: string;
  faq: string;
  image: ProductMediaPayload[];
  upc: string;
  bpn: string;
  mpn: string;
  gtin: string;
  taxClass: string;
  costPrice: number | null;
  msrp: number | null;
  salePrice: number | null;
  taxCode: string;
  discountType: string;
  bulkPricingTiers: { minQty: number; price: number; unitPrice: number }[];
  trackInventory: number;
  inventoryLevel: string;
  currentStock: number | null;
  lowStock: number | null;
  isFeatured: number;
  searchKeywords: string;
  sortOrder: number;
  templateLayout: string;
  warranty: string;
  availabilityText: string;
  condition: string;
  showCondition: number;
  customFields: CustomFieldValues[];
  relatedProducts: number;
  dimensions: { weight: number; width: number; height: number; depth: number };
  freeShipping: number;
  fixedShippingCost?: number;
  purchasabilityStatus: string;
  callForPricing: number;
  callForPricingLabel: string;
  callForPricingPhone: string;
  minPurchaseQuantity: number;
  maxPurchaseQuantity: number;
  manageCustoms: number;
  countryOfOrigin: string;
  commodityDescription: string;
  hsCodes: HsCodeValues[];
  pageTitle: string;
  productUrl: string;
  isRedirect: number;
  metaDescription: string;
  objectType: string;
  useProductName: number;
  graphDescription: number;
  useThumbnail: number;
  dontUse: number;
  parentId?: number;
}
