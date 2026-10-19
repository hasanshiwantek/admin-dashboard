import {
  BannerDateType,
  BannerField,
  BannerLocation,
  BannerPlacement,
} from "@/app/(protected)/manage/marketing/banners/constant";
import { needsLocationId } from "@/app/(protected)/manage/marketing/banners/utils";
import { ShippingAddressField } from "@/Modals/ShippingModals/ConfigureShippingAddressModal/constant";
import { FedExField } from "@/Modals/ShippingModals/FedExConfigModal/constant";
import { ChargeShippingType } from "@/Modals/ShippingModals/constant";
import {
  RateSymbol,
  ShipByWeightField,
} from "@/Modals/ShippingModals/ShipByWeightModal/constant";
import { DisplayNameField } from "@/Modals/ShippingModals/ShippingQuotesDisplayNameModal/constant";
import { array, boolean, date, object, ref, string } from "yup";

export const bannerSchema = object({
  [BannerField.Title]: string().trim().required("Banner name is required"),
  [BannerField.Content]: string().nullable(),
  [BannerField.LocationType]: string()
    .oneOf(
      Object.values(BannerLocation),
      "Choose where this banner should appear",
    )
    .required("Choose where this banner should appear"),
  [BannerField.LocationId]: string()
    .nullable()
    .default(null)
    .when(BannerField.LocationType, ([type], schema) =>
      needsLocationId(type)
        ? schema.required(
            type === BannerLocation.Brand
              ? "Choose a brand"
              : "Choose a category",
          )
        : schema,
    ),
  [BannerField.DateType]: string()
    .oneOf(Object.values(BannerDateType))
    .required(),
  [BannerField.StartDate]: date()
    .nullable()
    .default(null)
    .when(BannerField.DateType, {
      is: BannerDateType.Range,
      then: (schema) => schema.required("Start date is required"),
    }),
  [BannerField.EndDate]: date()
    .nullable()
    .default(null)
    .when(BannerField.DateType, {
      is: BannerDateType.Range,
      then: (schema) =>
        schema
          .required("End date is required")
          .min(
            ref(BannerField.StartDate),
            "End date must be after the start date",
          ),
    }),
  [BannerField.Visible]: boolean().default(true).nullable(),
  [BannerField.Placement]: string()
    .oneOf(Object.values(BannerPlacement), "Choose a placement")
    .required("Choose a placement"),
});
export const storeProfileSchema = object({
  storeDisplayName: string().required("Store display name is required"),
  address: string().required("Address is required"),
  addressType: string().required("Address type is required"),
  email:
    string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone:string().default(""),
});

// ─── Shipping modals ──────────────────────────────────────────

// Optional numeric text input: empty is fine, otherwise must parse as a number
const optionalNumber = (label: string) =>
  string()
    .default("")
    .test(
      "is-number",
      `${label} must be a valid number.`,
      (value) => !value || !isNaN(Number(value)),
    );

export const shippingAddressSchema = object({
  [ShippingAddressField.AddressLine1]: string()
    .trim()
    .required("Address line 1 is required"),
  [ShippingAddressField.AddressLine2]: string().default(""),
  [ShippingAddressField.City]: string().trim().required("City is required"),
  [ShippingAddressField.PostalCode]: string()
    .trim()
    .required("Postal code is required"),
  [ShippingAddressField.Country]: string().default(""),
  [ShippingAddressField.State]: string().default(""),
  [ShippingAddressField.PhoneNumber]: string().default(""),
});

export const displayNameSchema = object({
  [DisplayNameField.DisplayName]: string()
    .trim()
    .required("Display name is required."),
});

export const shipByWeightSchema = object({
  [ShipByWeightField.DisplayName]: string()
    .trim()
    .required("Display name is required."),
  [ShipByWeightField.ChargeShipping]: string()
    .oneOf(Object.values(ChargeShippingType))
    .required(),
  [ShipByWeightField.DefaultShippingCost]: optionalNumber(
    "Default shipping cost",
  ),
  [ShipByWeightField.RateSymbol]: string()
    .oneOf(Object.values(RateSymbol))
    .required(),
  [ShipByWeightField.Ranges]: array()
    .of(
      object({
        from: optionalNumber("From"),
        upTo: optionalNumber("Up to"),
        cost: optionalNumber("Cost"),
      }),
    )
    .required(),
});

export const fedexConfigSchema = object({
  [FedExField.DisplayName]: string().trim().required("Display name is required"),
  [FedExField.DropOffType]: string().default(""),
  [FedExField.PackagingType]: string().default(""),
  [FedExField.PackingMethod]: string().default(""),
  [FedExField.RateType]: string().default(""),
  [FedExField.IncludePackageValue]: boolean().default(false),
  [FedExField.DestinationType]: string().default(""),
  [FedExField.DeliveryServices]: array().of(string().required()).default([]),
  [FedExField.Key]: string().trim().required("Key is required"),
  [FedExField.Password]: string().default(""),
  [FedExField.AccountNumber]: string()
    .trim()
    .required("Account number is required"),
  [FedExField.ApiBaseUrl]: string().trim().required("API base URL is required"),
  [FedExField.DestCountry]: string().default(""),
  [FedExField.DestState]: string().default(""),
  [FedExField.DestZip]: string().default(""),
  [FedExField.PkgWeight]: string().default(""),
  [FedExField.PkgValue]: string().default(""),
  [FedExField.PkgLength]: string().default(""),
  [FedExField.PkgWidth]: string().default(""),
  [FedExField.PkgHeight]: string().default(""),
});
