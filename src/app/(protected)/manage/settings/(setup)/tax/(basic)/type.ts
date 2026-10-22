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
  /** The zone for every customer no other zone matches */
  isDefault: boolean;
  zoneType: string;
  pricesIncludeTax: boolean;
  isEnabled: boolean;
}

export type TaxClassesFormValues = yup.InferType<typeof TaxClassesSchema>;
export type TaxClassFormRow = TaxClassesFormValues["classes"][number];

export interface TaxClassPayload {
  id: number | null;
  name: string;
}
