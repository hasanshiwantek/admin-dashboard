import type { SectionConfig } from "@/components/SectionNav/type";
import type { LocationSchema } from "@/validations/formValidations";
import * as yup from "yup";
import type { LocationSection, LocationFormNames } from "./constant";

export interface OpeningHour {
  day: string;
  open: boolean;
  opening: string;
  closing: string;
}

export interface SpecialHour {
  name: string;
  date: string;
  open: boolean;
  allDay: boolean;
  opening: string;
  closing: string;
  annual: boolean;
}

export interface Location {
  id: number;
  name: string;
  code?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  countryCode: string;
  postalCode: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
  phone?: string;
  email?: string;
  isShippingOrigin: boolean;
  isEnabled: boolean;
  showDetails?: boolean;
  description?: string;
  openingHours?: OpeningHour[];
  specialHours?: SpecialHour[];
}

export type LocationPayload = Omit<Location, "id" | "isShippingOrigin">;

export type LocationFormValues = yup.InferType<typeof LocationSchema>;

export type LocationSectionConfig = SectionConfig<
  LocationFormNames,
  LocationSection
>;
