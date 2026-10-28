import { ActionItem } from "@/components/ActionButton/type";
import { SelectOption } from "@/components/ui/Select";
import { ActionEnums, CheckTypeEnums } from "@/const/appConstants";
import { countriesList } from "@/const/location";
import type { Country } from "react-phone-number-input";
import type {
  ProductFormValues,
  ProductSectionConfig,
} from "./type";

export enum ProductFormNames {
  // Basic information
  IsVisible = "isVisible",
  Name = "name",
  Sku = "sku",
  ProductType = "productType",
  BrandId = "brandId",
  Price = "price",
  Weight = "weight",
  CategoryIds = "categoryIds",
  // Description
  Description = "description",
  Faq = "faq",
  // Images & videos
  Images = "images",
  // Identifiers
  Upc = "upc",
  Bpn = "bpn",
  Mpn = "mpn",
  Gtin = "gtin",
  // Pricing
  TaxClass = "taxClass",
  CostPrice = "costPrice",
  Msrp = "msrp",
  SalePrice = "salePrice",
  TaxCode = "taxCode",
  DiscountType = "discountType",
  BulkPricingTiers = "bulkPricingTiers",
  // Inventory
  TrackInventory = "trackInventory",
  InventoryLevel = "inventoryLevel",
  CurrentStock = "currentStock",
  LowStock = "lowStock",
  // Storefront
  IsFeatured = "isFeatured",
  SearchKeywords = "searchKeywords",
  SortOrder = "sortOrder",
  TemplateLayout = "templateLayout",
  Warranty = "warranty",
  AvailabilityText = "availabilityText",
  Condition = "condition",
  ShowCondition = "showCondition",
  // Custom fields
  CustomFields = "customFields",
  // Related products
  RelatedProducts = "relatedProducts",
  // Dimensions (weight is shared with basic information)
  Width = "width",
  Height = "height",
  Depth = "depth",
  // Shipping
  FixedShippingCost = "fixedShippingCost",
  FreeShipping = "freeShipping",
  // Purchasability
  PurchasabilityStatus = "purchasabilityStatus",
  CallForPricing = "callForPricing",
  CallForPricingLabel = "callForPricingLabel",
  CallForPricingPhone = "callForPricingPhone",
  MinPurchaseQuantity = "minPurchaseQuantity",
  MaxPurchaseQuantity = "maxPurchaseQuantity",
  // Customs
  ManageCustoms = "manageCustoms",
  CountryOfOrigin = "countryOfOrigin",
  CommodityDescription = "commodityDescription",
  HsCodes = "hsCodes",
  // SEO
  PageTitle = "pageTitle",
  ProductUrl = "productUrl",
  IsRedirect = "isRedirect",
  MetaDescription = "metaDescription",
  // Open graph
  ObjectType = "objectType",
  UseProductName = "useProductName",
  GraphDescription = "graphDescription",
  ImageOption = "imageOption",
}

export enum BulkPricingTierFormNames {
  MinQty = "minQty",
  Price = "price",
}

export enum CustomFieldFormNames {
  Name = "name",
  Value = "value",
}

export enum HsCodeFormNames {
  Country = "country",
  Code = "code",
}

export enum ProductType {
  Physical = "Physical",
  Digital = "Digital",
}

export enum TaxClass {
  Taxable = "taxable",
  NonTaxable = "non-taxable",
  Shipping = "shipping",
  GiftWrapping = "gift-wrapping",
}

export enum DiscountType {
  Percent = "percent",
  Fixed = "fixed",
  OffUnit = "off-unit",
}

export enum InventoryLevel {
  Product = "product",
}

export enum TemplateLayout {
  Default = "default",
}

export enum ProductCondition {
  New = "New",
  Used = "Used",
  Refurbished = "Refurbished",
}

export enum PurchasabilityStatus {
  Available = "available",
  NotAvailable = "notAvailable",
}

export enum OpenGraphObjectType {
  Physical = "physical",
  Digital = "digital",
  Album = "album",
  Book = "book",
  Drink = "drink",
  Food = "food",
  Game = "game",
  Movie = "movie",
  Product = "product",
}

export enum OpenGraphImageOption {
  UseThumbnail = "useThumbnail",
  DontUse = "dontUse",
}

// Which save button submitted the form
export enum ProductSubmitAction {
  Save = "save",
  Duplicate = "duplicate",
  AddAnother = "addAnother",
  ViewProducts = "viewProducts",
}

export const ProductTypeOptions: SelectOption[] = [
  { value: ProductType.Physical, label: "Physical" },
  { value: ProductType.Digital, label: "Digital" },
];

export const TaxClassOptions: SelectOption[] = [
  { value: TaxClass.Taxable, label: "Default Tax Class" },
  { value: TaxClass.NonTaxable, label: "Non-taxable" },
  { value: TaxClass.Shipping, label: "Shipping" },
  { value: TaxClass.GiftWrapping, label: "Gift Wrapping" },
];

export const InventoryLevelOptions: SelectOption[] = [
  { value: InventoryLevel.Product, label: "On the product level" },
];

export const TemplateLayoutOptions: SelectOption[] = [
  { value: TemplateLayout.Default, label: "default" },
];

export const ProductConditionOptions: SelectOption[] = [
  { value: ProductCondition.New, label: "New" },
  { value: ProductCondition.Used, label: "Used" },
  { value: ProductCondition.Refurbished, label: "Refurbished" },
];

export const PurchasabilityStatusOptions: SelectOption[] = [
  {
    value: PurchasabilityStatus.Available,
    label: "This product can be purchased in my online store",
  },
  {
    value: PurchasabilityStatus.NotAvailable,
    label: "This product cannot be purchased in my online store",
  },
];

export const OpenGraphObjectTypeOptions: SelectOption[] = [
  { value: OpenGraphObjectType.Physical, label: "Physical" },
  { value: OpenGraphObjectType.Digital, label: "Digital" },
  { value: OpenGraphObjectType.Album, label: "Album" },
  { value: OpenGraphObjectType.Book, label: "Book" },
  { value: OpenGraphObjectType.Drink, label: "Drink" },
  { value: OpenGraphObjectType.Food, label: "Food" },
  { value: OpenGraphObjectType.Game, label: "Game" },
  { value: OpenGraphObjectType.Movie, label: "Movie" },
  { value: OpenGraphObjectType.Product, label: "Product" },
];

export const OpenGraphImageOptions: SelectOption[] = [
  { value: OpenGraphImageOption.UseThumbnail, label: "Use thumbnail image" },
  { value: OpenGraphImageOption.DontUse, label: "Don't use an image" },
];

export const CountryOptions: SelectOption[] = countriesList;

export const MAX_PURCHASE_QUANTITY = 999999999;

export const CALL_FOR_PRICING_DEFAULT_COUNTRY: Country = "PK";

export const MEDIA_ACCEPT = "image/*,video/*";

export const newBulkPricingTier = () => ({
  [BulkPricingTierFormNames.MinQty]: "1",
  [BulkPricingTierFormNames.Price]: "0",
});

export const newCustomField = () => ({
  [CustomFieldFormNames.Name]: "",
  [CustomFieldFormNames.Value]: "",
});

export const newHsCode = () => ({
  [HsCodeFormNames.Country]: "",
  [HsCodeFormNames.Code]: "",
});

export const productDefaults: ProductFormValues = {
  [ProductFormNames.IsVisible]: true,
  [ProductFormNames.Name]: "",
  [ProductFormNames.Sku]: "",
  [ProductFormNames.ProductType]: ProductType.Physical,
  [ProductFormNames.BrandId]: "",
  [ProductFormNames.Price]: "",
  [ProductFormNames.Weight]: "",
  [ProductFormNames.CategoryIds]: [],
  [ProductFormNames.Description]: "",
  [ProductFormNames.Faq]: "",
  [ProductFormNames.Images]: [],
  [ProductFormNames.Upc]: "",
  [ProductFormNames.Bpn]: "",
  [ProductFormNames.Mpn]: "",
  [ProductFormNames.Gtin]: "",
  [ProductFormNames.TaxClass]: TaxClass.Taxable,
  [ProductFormNames.CostPrice]: "",
  [ProductFormNames.Msrp]: "",
  [ProductFormNames.SalePrice]: "",
  [ProductFormNames.TaxCode]: "",
  [ProductFormNames.DiscountType]: DiscountType.Fixed,
  [ProductFormNames.BulkPricingTiers]: [],
  [ProductFormNames.TrackInventory]: true,
  [ProductFormNames.InventoryLevel]: InventoryLevel.Product,
  [ProductFormNames.CurrentStock]: "",
  [ProductFormNames.LowStock]: "",
  [ProductFormNames.IsFeatured]: false,
  [ProductFormNames.SearchKeywords]: "",
  [ProductFormNames.SortOrder]: "0",
  [ProductFormNames.TemplateLayout]: TemplateLayout.Default,
  [ProductFormNames.Warranty]: "",
  [ProductFormNames.AvailabilityText]: "",
  [ProductFormNames.Condition]: ProductCondition.New,
  [ProductFormNames.ShowCondition]: false,
  [ProductFormNames.CustomFields]: [],
  [ProductFormNames.RelatedProducts]: true,
  [ProductFormNames.Width]: "",
  [ProductFormNames.Height]: "",
  [ProductFormNames.Depth]: "",
  [ProductFormNames.FixedShippingCost]: "",
  [ProductFormNames.FreeShipping]: false,
  [ProductFormNames.PurchasabilityStatus]: PurchasabilityStatus.Available,
  [ProductFormNames.CallForPricing]: false,
  [ProductFormNames.CallForPricingLabel]: "",
  [ProductFormNames.CallForPricingPhone]: "",
  [ProductFormNames.MinPurchaseQuantity]: "",
  [ProductFormNames.MaxPurchaseQuantity]: "",
  [ProductFormNames.ManageCustoms]: false,
  [ProductFormNames.CountryOfOrigin]: "",
  [ProductFormNames.CommodityDescription]: "",
  [ProductFormNames.HsCodes]: [],
  [ProductFormNames.PageTitle]: "",
  [ProductFormNames.ProductUrl]: "",
  [ProductFormNames.IsRedirect]: false,
  [ProductFormNames.MetaDescription]: "",
  [ProductFormNames.ObjectType]: "",
  [ProductFormNames.UseProductName]: true,
  [ProductFormNames.GraphDescription]: true,
  [ProductFormNames.ImageOption]: OpenGraphImageOption.UseThumbnail,
};

// Values are the ids of the page sections the side nav scrolls to
export enum ProductSection {
  Basic = "basic-information",
  Description = "description",
  Images = "images",
  Identifiers = "product-identifiers",
  Pricing = "pricing",
  Inventory = "inventory",
  Storefront = "storefront-details",
  CustomFields = "custom-fields",
  RelatedProducts = "related-products",
  Dimensions = "dimensions-weight",
  Shipping = "shipping-details",
  Purchasability = "purchasability",
  Customs = "customs-information",
  Seo = "seo",
  OpenGraph = "open-graph-sharing",
}

export const ADVANCED_PRICING_FIELDS = [
  ProductFormNames.CostPrice,
  ProductFormNames.Msrp,
  ProductFormNames.SalePrice,
  ProductFormNames.TaxCode,
  ProductFormNames.DiscountType,
  ProductFormNames.BulkPricingTiers,
];

export const productSections: ProductSectionConfig[] = [
  {
    id: ProductSection.Basic,
    label: "Basic information",
    fields: [
      ProductFormNames.IsVisible,
      ProductFormNames.Name,
      ProductFormNames.Sku,
      ProductFormNames.ProductType,
      ProductFormNames.BrandId,
      ProductFormNames.Price,
      ProductFormNames.Weight,
      ProductFormNames.CategoryIds,
    ],
  },
  {
    id: ProductSection.Description,
    label: "Description",
    fields: [ProductFormNames.Description, ProductFormNames.Faq],
  },
  {
    id: ProductSection.Images,
    label: "Images & videos",
    fields: [ProductFormNames.Images],
  },
  {
    id: ProductSection.Identifiers,
    label: "Product identifiers",
    fields: [
      ProductFormNames.Sku,
      ProductFormNames.Upc,
      ProductFormNames.Bpn,
      ProductFormNames.Mpn,
      ProductFormNames.Gtin,
    ],
  },
  {
    id: ProductSection.Pricing,
    label: "Pricing",
    fields: [
      ProductFormNames.Price,
      ProductFormNames.TaxClass,
      ...ADVANCED_PRICING_FIELDS,
    ],
  },
  {
    id: ProductSection.Inventory,
    label: "Inventory",
    fields: [
      ProductFormNames.TrackInventory,
      ProductFormNames.InventoryLevel,
      ProductFormNames.CurrentStock,
      ProductFormNames.LowStock,
    ],
  },
  {
    id: ProductSection.Storefront,
    separatorBefore: true,
    label: "Storefront details",
    fields: [
      ProductFormNames.IsFeatured,
      ProductFormNames.SearchKeywords,
      ProductFormNames.SortOrder,
      ProductFormNames.TemplateLayout,
      ProductFormNames.Warranty,
      ProductFormNames.AvailabilityText,
      ProductFormNames.Condition,
      ProductFormNames.ShowCondition,
    ],
  },
  {
    id: ProductSection.CustomFields,
    label: "Custom fields",
    fields: [ProductFormNames.CustomFields],
  },
  {
    id: ProductSection.RelatedProducts,
    label: "Related products",
    fields: [ProductFormNames.RelatedProducts],
  },
  {
    id: ProductSection.Dimensions,
    separatorBefore: true,
    label: "Dimensions & weight",
    fields: [
      ProductFormNames.Weight,
      ProductFormNames.Width,
      ProductFormNames.Height,
      ProductFormNames.Depth,
    ],
  },
  {
    id: ProductSection.Shipping,
    label: "Shipping details",
    fields: [ProductFormNames.FixedShippingCost, ProductFormNames.FreeShipping],
  },
  {
    id: ProductSection.Purchasability,
    label: "Purchasability",
    fields: [
      ProductFormNames.PurchasabilityStatus,
      ProductFormNames.CallForPricing,
      ProductFormNames.CallForPricingLabel,
      ProductFormNames.CallForPricingPhone,
      ProductFormNames.MinPurchaseQuantity,
      ProductFormNames.MaxPurchaseQuantity,
    ],
  },
  {
    id: ProductSection.Customs,
    label: "Customs information",
    fields: [
      ProductFormNames.ManageCustoms,
      ProductFormNames.CountryOfOrigin,
      ProductFormNames.CommodityDescription,
      ProductFormNames.HsCodes,
    ],
  },
  {
    id: ProductSection.Seo,
    separatorBefore: true,
    label: "SEO",
    fields: [
      ProductFormNames.PageTitle,
      ProductFormNames.ProductUrl,
      ProductFormNames.IsRedirect,
      ProductFormNames.MetaDescription,
    ],
  },
  {
    id: ProductSection.OpenGraph,
    label: "Open graph sharing",
    fields: [
      ProductFormNames.ObjectType,
      ProductFormNames.UseProductName,
      ProductFormNames.GraphDescription,
      ProductFormNames.ImageOption,
    ],
  },
];

export const productActions: ActionItem[] = [
  {
    type: ActionEnums.VIEW_STOREFRONT,
    label: "View on storefront",
    checks: [{ key: "productUrl", type: CheckTypeEnums.EXISTS }],
  },
  { type: ActionEnums.VIEW_ORDERS, label: "View orders" },
  { type: ActionEnums.DUPLICATE, label: "Duplicate" },
  { type: ActionEnums.DELETE, label: "Delete" },
];
