import type { TaxClassesSchema } from "@/validations/formValidations";
import * as yup from "yup";

export interface TaxClass {
  id: number;
  name: string;
  isDefault: boolean;
}

export interface TaxZone {
  id: number;
  name: string;
  isDefault: boolean;
  zoneType: string;
  pricesIncludeTax: boolean;
  isEnabled: boolean;
  // Zone settings form; see tax-zones/type.ts
  basedOn?: string;
  countries?: string[];
  subdivisionCountry?: string;
  subdivisions?: string[];
  postalCodeCountry?: string;
  postalCodes?: string[];
  appliesTo?: string;
  customerGroups?: string[];
  showBothOnListing?: boolean;
  showBothOnDetail?: boolean;
}

export type TaxClassesFormValues = yup.InferType<typeof TaxClassesSchema>;
export type TaxClassFormRow = TaxClassesFormValues["classes"][number];

export interface TaxClassPayload {
  id: number | null;
  name: string;
}
