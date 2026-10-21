import { SettingGroup, SettingRoute } from "./types";

const SetupSettingRoutes: SettingRoute[] = [
  {
    id: "store-profile",
    title: "Store profile",
    description: "Basic information about your business",
  },
  {
    id: "localization",
    title: "Localization",
    description: "Languages and regional settings for your storefronts",
  },
  // {
  //   id: "currencies",
  //   title: "Currencies",
  //   description:
  //     "Currencies customers will see and be charged in at your store",
  // },
  // {
  //   id: "payments",
  //   title: "Payments",
  //   description: "Payment methods for the currencies you support in your store",
  // },
  // {
  //   id: "locations",
  //   title: "Locations",
  //   description:
  //     "Locations represent the physical places where you stock inventory",
  // },
  // {
  //   id: "pickup",
  //   title: "Pick up methods",
  //   description: "Create and edit in-person pick up methods for online orders.",
  // },
  {
    id: "shipping",
    title: "Shipping",
    description:
      "Store's origin address, shipping zones, and shipping services",
  },
  // {
  //   id: "tax",
  //   title: "Tax",
  //   description: "Your own tax rules and recommended services",
  // },
];
const GeneralSettingRoutes: SettingRoute[] = [
  {
    id: "website",
    title: "Website",
    description:
      "Physical dimension settings, search engine optimization, HTTPS, search engine robots",
  },
  {
    id: "display",
    title: "Display",
    description:
      "Settings related to displaying products, categories, control panel etc.",
  },
  {
    id: "share",
    title: "Share",
    description: "Social sharing settings on product pages and blog posts",
  },
  {
    id: "url-structure",
    title: "URL structure",
    description: "Product, category and web pages URL settings",
  },
  {
    id: "search",
    title: "Search",
    description: "Default product sort, default content sort, search logic",
    isNew: true,
  },
  {
    id: "security",
    title: "Security & Privacy",
    description: "Security & privacy settings for storefront and control panel",
  },
  {
    id: "misc",
    title: "Miscellaneous",
    description:
      "Email settings, advanced store settings, order settings, throttler",
  },
];

const AdvancedSettingRoutes: SettingRoute[] = [
  // {
  //   id: "accounting",
  //   title: "Accounting",
  //   description: "Connecting accounting software",
  // },
  // {
  //   id: "data-solutions",
  //   title: "Data solutions",
  //   description:
  //     "Web analytics, data warehouses, business intelligence platforms, customer data platform",
  // },
  // {
  //   id: "checkout",
  //   title: "Checkout",
  //   description:
  //     "Features that minimize friction and smooth process of checkout",
  // },
  // {
  //   id: "account-signup-form",
  //   title: "Account sign up form",
  //   description: "List of form fields for signup, addresses on checkout etc.",
  // },
  // {
  //   id: "export-templates",
  //   title: "Export templates",
  //   description: "Orders, customers and products export settings",
  // },
  {
    id: "logs",
    title: "Store logs",
    description: "System logs and staff action logs rules",
  },
  // {
  //   id: "file-access",
  //   title: "File access (WebDAV)",
  //   description: "Application that allows uploading files to store's server",
  // },
  {
    id: "users",
    title: "Users",
    description: "Providing access to the administration area of your store",
  },
  // {
  //   id: "early-access",
  //   title: "Early access",
  //   description: "Try new tools, beta functionality, and upcoming features",
  // },
];

const OrderSettingRoutes: SettingRoute[] = [
  {
    id: "order-notifications",
    title: "Order notifications",
    description:
      "Brief messages informing you that an order has been placed, etc.",
  },
  {
    id: "return-settings",
    title: "Returns",
    description: "Products return rules",
  },
  {
    id: "order-statuses",
    title: "Statuses",
    description: "Order statuses and order status descriptions",
  },
];

const ProductSettingRoutes: SettingRoute[] = [
  {
    id: "inventory",
    title: "Inventory",
    description: "What shoppers will see when a product is out of stock, etc.",
  },
  // {
  //   id: "gift-wrapping",
  //   title: "Gift wrapping",
  //   description: "Name your gift wrapping option, set a price, etc.",
  // },
  // {
  //   id: "comments",
  //   title: "Comments",
  //   description: "Shoppers comments about products",
  // },
];

export const SettingsRoutesList: SettingGroup[] = [
  {
    group: "Setup",
    routes: SetupSettingRoutes,
  },
  {
    group: "General",
    routes: GeneralSettingRoutes,
  },
  {
    group: "Orders",
    routes: OrderSettingRoutes,
  },
  {
    group: "Products",
    routes: ProductSettingRoutes,
  },
  {
    group: "Advanced",
    routes: AdvancedSettingRoutes,
    checks: [
      {
        key: "isOwner",
        value: true,
      },
    ],
  },
];
