import { SelectOption } from "@/components/ui/Select";
import {
  buildCopyNameSku,
  generateFormattedProductUrl,
  normalizeProductUrl,
} from "@/lib/productUtils";
import type { PreviewItem } from "@/types/types";
import {
  restrictDecimalInput,
  restrictDecimalPaste,
  restrictDecimalValue,
} from "@/validations/validations";
import type { Product, ProductCurrency, ProductImage } from "../type";
import { getDecimalPlaces, roundToCurrency } from "../utils";
import {
  BulkPricingTierFormNames,
  DiscountType,
  OpenGraphImageOption,
  productDefaults,
  ProductFormNames,
} from "./constant";
import type {
  BulkPricingTierValues,
  ProductFormValues,
  ProductPayload,
} from "./type";

type Flag = Product["isVisible"];

const toFlag = (value: Flag, fallback = false) =>
  value === null || value === undefined
    ? fallback
    : value === true || Number(value) === 1;

const toFlagNumber = (value?: boolean | null) => (value ? 1 : 0);

const toText = (value: unknown) =>
  value === null || value === undefined ? "" : String(value);

const toNumber = (value?: string | null) => Number(value) || 0;

const toOptionalNumber = (value?: string | null) =>
  value === "" || value === null || value === undefined ? null : Number(value);

const isVideoPath = (path: string) =>
  path.includes(".mp4") || path.includes("video");

const toMediaItem = (image: ProductImage): PreviewItem => ({
  file: null,
  path: image.path,
  description: image.altText || image.description || "",
  selected: false,
  isPrimary: toFlag(image.isPrimary ?? null),
  type: isVideoPath(image.path) ? "video" : "image",
});

// Weights and dimensions: up to 2 decimal places
export const measurementInputProps = {
  inputMode: "decimal" as const,
  placeholder: "0",
  onKeyDown: restrictDecimalInput,
  onPaste: restrictDecimalPaste,
  onInput: restrictDecimalValue,
};

export const getDiscountTypeOptions =(symbol: string): SelectOption[] => [
  { value: DiscountType.Percent, label: "% Discount" },
  { value: DiscountType.Fixed, label: `${symbol} Fixed Amount` },
  { value: DiscountType.OffUnit, label: `${symbol} Off/Unit` },
];

export const getDiscountLabel = (discountType: string, symbol: string) =>
  getDiscountTypeOptions(symbol).find(({ value }) => value === discountType)
    ?.label ?? "Discount";

// Price per unit once a tier applies; the sale price wins over the default
export const getTierUnitPrice = (
  tier: Pick<BulkPricingTierValues, BulkPricingTierFormNames.Price>,
  {
    basePrice,
    discountType,
    currency,
  }: { basePrice: number; discountType: string; currency: ProductCurrency },
) => {
  const discount = Math.max(Number(tier.price) || 0, 0);
  const unitPrice =
    discountType === DiscountType.Percent
      ? basePrice * (1 - Math.min(discount, 100) / 100)
      : discountType === DiscountType.Fixed
        ? discount
        : basePrice - discount;

  return roundToCurrency(Math.max(unitPrice, 0), currency);
};

export const getBasePrice = (
  values: Pick<ProductFormValues, ProductFormNames.Price | ProductFormNames.SalePrice>,
) => Number(values.salePrice) || Number(values.price) || 0;

export const buildProductUrl = ({
  urlSettings,
  name,
  sku,
  brand,
}: {
  urlSettings?: { format_type?: string; custom_format?: string } | null;
  name?: string;
  sku?: string;
  brand?: string;
}) => {
  const url = generateFormattedProductUrl({
    formatType: urlSettings?.format_type as Parameters<
      typeof generateFormattedProductUrl
    >[0]["formatType"],
    customFormat: urlSettings?.custom_format,
    name,
    sku,
    brand,
  });
  return url ? normalizeProductUrl(url) : "";
};

// Rows for a table of field-array inputs: current values keyed by field id
export const toFieldRows = <T extends object>(
  fields: { id: string }[],
  values: T[] | undefined,
) =>
  fields.map(
    (field, index) => ({ ...values?.[index], id: field.id }) as T & { id: string },
  );

// `duplicate` turns the record into a new "Copy of …" product
export const transformGetProduct = (
  product: Product,
  {
    currency,
    duplicate = false,
  }: { currency: ProductCurrency; duplicate?: boolean },
): ProductFormValues => {
  // Saved amounts can carry extra places (e.g. 78.760000)
  const toAmountText = (value: unknown) =>
    value === null || value === undefined || value === ""
      ? ""
      : roundToCurrency(Number(value), currency).toFixed(
          getDecimalPlaces(currency),
        );

  const copy = duplicate
    ? buildCopyNameSku({
        name: product.name,
        sku: product.sku,
        hasDuplicate: toFlag(product.hasDuplicate ?? null),
      })
    : null;

  return {
    ...productDefaults,
    [ProductFormNames.IsVisible]: toFlag(product.isVisible ?? null, true),
    [ProductFormNames.Name]: copy?.name ?? product.name ?? "",
    [ProductFormNames.Sku]: copy?.sku ?? product.sku ?? "",
    [ProductFormNames.ProductType]:
      product.productType || productDefaults.productType,
    [ProductFormNames.BrandId]: toText(product.brandId),
    [ProductFormNames.Price]: toAmountText(product.price),
    [ProductFormNames.Weight]: toText(product.dimensions?.weight),
    [ProductFormNames.CategoryIds]: (product.categoryIds ?? []).map(Number),
    [ProductFormNames.Description]: product.description ?? "",
    [ProductFormNames.Faq]: product.faq ?? "",
    [ProductFormNames.Images]: (product.image ?? []).map(toMediaItem),
    [ProductFormNames.Upc]: product.upc ?? "",
    [ProductFormNames.Bpn]: product.bpn ?? "",
    [ProductFormNames.Mpn]: product.mpn ?? "",
    [ProductFormNames.Gtin]: product.gtin ?? "",
    [ProductFormNames.TaxClass]: product.taxClass || productDefaults.taxClass,
    [ProductFormNames.CostPrice]: toAmountText(product.costPrice),
    [ProductFormNames.Msrp]: toAmountText(product.msrp),
    [ProductFormNames.SalePrice]: toAmountText(product.salePrice),
    [ProductFormNames.TaxCode]: product.taxCode ?? "",
    [ProductFormNames.DiscountType]:
      product.discountType || productDefaults.discountType,
    [ProductFormNames.BulkPricingTiers]: (product.bulkPricingTiers ?? []).map(
      (tier) => ({ minQty: toText(tier.minQty), price: toAmountText(tier.price) }),
    ),
    [ProductFormNames.TrackInventory]: toFlag(product.trackInventory ?? null),
    [ProductFormNames.InventoryLevel]:
      product.inventoryLevel || productDefaults.inventoryLevel,
    [ProductFormNames.CurrentStock]: toText(product.currentStock),
    [ProductFormNames.LowStock]: toText(product.lowStock),
    [ProductFormNames.IsFeatured]: toFlag(product.isFeatured ?? null),
    [ProductFormNames.SearchKeywords]: product.searchKeywords ?? "",
    [ProductFormNames.SortOrder]: toText(product.sortOrder ?? 0),
    [ProductFormNames.TemplateLayout]:
      product.templateLayout || productDefaults.templateLayout,
    [ProductFormNames.Warranty]: product.warranty ?? "",
    [ProductFormNames.AvailabilityText]: product.availabilityText ?? "",
    [ProductFormNames.Condition]: product.condition || productDefaults.condition,
    [ProductFormNames.ShowCondition]: toFlag(product.showCondition ?? null),
    [ProductFormNames.CustomFields]: product.customFields ?? [],
    [ProductFormNames.RelatedProducts]: toFlag(
      product.relatedProductsEnabled ?? null,
    ),
    [ProductFormNames.Width]: toText(product.dimensions?.width),
    [ProductFormNames.Height]: toText(product.dimensions?.height),
    [ProductFormNames.Depth]: toText(product.dimensions?.depth),
    [ProductFormNames.FixedShippingCost]: toAmountText(product.fixedShippingCost),
    [ProductFormNames.FreeShipping]: toFlag(product.freeShipping ?? null),
    [ProductFormNames.PurchasabilityStatus]:
      product.purchasabilityStatus || productDefaults.purchasabilityStatus,
    [ProductFormNames.CallForPricing]: toFlag(product.callPricing ?? null),
    [ProductFormNames.CallForPricingLabel]: product.callForPricingLabel ?? "",
    [ProductFormNames.CallForPricingPhone]: product.callForPricingPhone ?? "",
    [ProductFormNames.MinPurchaseQuantity]: toText(product.minPurchaseQuantity),
    [ProductFormNames.MaxPurchaseQuantity]: toText(product.maxPurchaseQuantity),
    [ProductFormNames.ManageCustoms]: toFlag(product.manageCustoms ?? null),
    [ProductFormNames.CountryOfOrigin]: product.countryOfOrigin ?? "",
    [ProductFormNames.CommodityDescription]: product.commodityDescription ?? "",
    [ProductFormNames.HsCodes]: product.hsCodes ?? [],
    [ProductFormNames.PageTitle]: copy?.name ?? product.pageTitle ?? "",
    [ProductFormNames.ProductUrl]: copy?.productUrl ?? product.productUrl ?? "",
    [ProductFormNames.IsRedirect]: toFlag(product.isRedirect ?? null),
    [ProductFormNames.MetaDescription]: product.metaDescription ?? "",
    [ProductFormNames.ObjectType]: product.objectType ?? "",
    [ProductFormNames.UseProductName]: toFlag(product.useProductName ?? null),
    [ProductFormNames.GraphDescription]: toFlag(
      product.graphDescription ?? null,
    ),
    [ProductFormNames.ImageOption]: toFlag(product.dontUse ?? null)
      ? OpenGraphImageOption.DontUse
      : OpenGraphImageOption.UseThumbnail,
  };
};

export const transformPostProduct = (
  values: ProductFormValues,
  { currency, parentId }: { currency: ProductCurrency; parentId?: number | null },
): ProductPayload => {
  const basePrice = getBasePrice(values);
  const toAmount = (value?: string | null) => {
    const amount = toOptionalNumber(value);
    return amount === null ? null : roundToCurrency(amount, currency);
  };

  return {
    name: values.name,
    sku: values.sku,
    productType: values.productType,
    brandId: toOptionalNumber(values.brandId),
    price: toAmount(values.price) ?? 0,
    categoryIds: values.categoryIds,
    isVisible: toFlagNumber(values.isVisible),
    description: values.description,
    faq: values.faq,
    image: values.images.map((item) => ({
      file: item.file || null,
      url: typeof item.path === "string" ? item.path : "",
      description: item.description || "",
      isPrimary: toFlagNumber(item.isPrimary),
    })),
    upc: values.upc,
    bpn: values.bpn,
    mpn: values.mpn,
    gtin: values.gtin,
    taxClass: values.taxClass,
    costPrice: toAmount(values.costPrice),
    msrp: toAmount(values.msrp),
    salePrice: toAmount(values.salePrice),
    taxCode: values.taxCode,
    discountType: values.discountType,
    bulkPricingTiers: values.bulkPricingTiers.map((tier) => ({
      minQty: toNumber(tier.minQty),
      price: toNumber(tier.price),
      unitPrice: getTierUnitPrice(tier, {
        basePrice,
        discountType: values.discountType,
        currency,
      }),
    })),
    trackInventory: toFlagNumber(values.trackInventory),
    inventoryLevel: values.inventoryLevel,
    currentStock: toOptionalNumber(values.currentStock),
    lowStock: toOptionalNumber(values.lowStock),
    isFeatured: toFlagNumber(values.isFeatured),
    searchKeywords: values.searchKeywords,
    sortOrder: toNumber(values.sortOrder),
    templateLayout: values.templateLayout,
    warranty: values.warranty,
    availabilityText: values.availabilityText,
    condition: values.condition,
    showCondition: toFlagNumber(values.showCondition),
    customFields: values.customFields,
    relatedProducts: toFlagNumber(values.relatedProducts),
    dimensions: {
      weight: toNumber(values.weight),
      width: toNumber(values.width),
      height: toNumber(values.height),
      depth: toNumber(values.depth),
    },
    freeShipping: toFlagNumber(values.freeShipping),
    ...(!values.freeShipping && {
      fixedShippingCost: toAmount(values.fixedShippingCost) ?? 0,
    }),
    purchasabilityStatus: values.purchasabilityStatus,
    callForPricing: toFlagNumber(values.callForPricing),
    callForPricingLabel: values.callForPricingLabel,
    callForPricingPhone: values.callForPricingPhone,
    minPurchaseQuantity: toNumber(values.minPurchaseQuantity),
    maxPurchaseQuantity: toNumber(values.maxPurchaseQuantity),
    manageCustoms: toFlagNumber(values.manageCustoms),
    countryOfOrigin: values.countryOfOrigin,
    commodityDescription: values.commodityDescription,
    hsCodes: values.hsCodes,
    pageTitle: values.pageTitle,
    productUrl: values.productUrl,
    isRedirect: toFlagNumber(values.isRedirect),
    metaDescription: values.metaDescription,
    objectType: values.objectType,
    useProductName: toFlagNumber(values.useProductName),
    graphDescription: toFlagNumber(values.graphDescription),
    useThumbnail: toFlagNumber(
      values.imageOption === OpenGraphImageOption.UseThumbnail,
    ),
    dontUse: toFlagNumber(values.imageOption === OpenGraphImageOption.DontUse),
    ...(parentId && { parentId }),
  };
};
