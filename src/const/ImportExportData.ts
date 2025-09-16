import { MappingField } from "@/types/types";

export const mappingFields: MappingField[] = [
  {
    label: "Category",
    type: "radio-dropdown",
    options: [
      "My category information is in one column in my CSV file",
      "My category information is in more than one column in my CSV file",
    ],
  },
  ...[
    "Product Name",
    "Product Code/SKU",
    "Product Id",
    "Item Type",
    "Product Weight",
    "Product Description",
    "Price",
    "Retail Price",
    "Sale Price",
    "Cost Price",
    "Current Stock Level",
    "Track Inventory",
    "Low Stock Level",
    "Sort Order",
    "Product Visible",
    "Allow Purchases",
    "Availability",
    "Minimum Purchase Quantity",
    "Maximum Purchase Quantity",
    "Free Shipping",
    "Fixed Shipping Cost",
    "Product Width",
    "Product Height",
    "Product Depth",
    "Brand Name",
    "Product Warranty",
    "Search Keywords",
    "Page Title",
    "Meta Keywords",
    "Meta Description",
    "Product URL",
    "Redirect Old URL",
    "Option Set",
    "Option Set Align",
    "Stop Processing Rules",
    "Product Custom Fields",
    "Product Image",
    "Product Image Description",
    "Product Image Thumbnail",
    "Product Image Sort",
    "Product Type",
    "Product File",
    "Product File Description",
    "Product File Max Downloads",
    "Product File Expires After",
    "Product Metadata",
    "Shipping Groups",
    "Origin Locations",
    "Dimensional Rules",
    "Event Date Required",
    "Event Date Name",
    "Event Date is Limited",
    "Event Date Start Date",
    "Event Date End Date",
    "Global Trade Item",
    "Manufacturer Part Number",
  ].map((label) => ({
    label,
    type: "dropdown" as const,
  })),
];








export const CustomerMappingFields: MappingField[] = [
  {
    label: "Customer Group",
    type: "radio-dropdown",
    options: [
      "All customers in this file belong to the same group",
      "Each customer has their group specified in a column",
    ],
  },
  ...[
    "First Name",
    "Last Name",
    "Email",
    "Company",
    "Phone",
    "Street 1",
    "Street 2",
    "City",
    "State",
    "Zip",
    "Country",
    "Store Credit",
    "Tax Exempt Category",
    "Notes",
    "Accepts Marketing Emails",
    "Customer Group",
    "Form Field Data",
  ].map((label) => ({
    label,
    type: "dropdown" as const,
  })),
];