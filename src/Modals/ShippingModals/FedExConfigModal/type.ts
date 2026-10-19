import type { SelectOption } from "@/components/ui/select";
import type { fedexConfigSchema } from "@/validations/formValidations";
import * as yup from "yup";
import { ShippingMethodModalProps } from "../type";
import type { FedExField } from "./constant";

export type FedExFormValues = yup.InferType<typeof fedexConfigSchema>;

export type FedExConfigModalProps = ShippingMethodModalProps;

export interface FedExSelectFieldConfig {
  name: FedExField;
  label: string;
  options: SelectOption[];
}

// Quote-tab number inputs with a "$" prefix or "Inches" suffix
export interface FedExUnitFieldConfig {
  name: FedExField;
  label: string;
  unit: string;
  unitPosition: "prefix" | "suffix";
}

export interface FedExDeliveryService {
  key: string;
  label: string;
}

// ─── Components ──────────────────────────────────────────────

// Field component for InputField: value/onChange are the selected keys
export interface DeliveryServicesFieldProps {
  services: FedExDeliveryService[];
  value?: string[];
  onChange?: (value: string[]) => void;
  id?: string;
}

// Field component for InputField: a number input with a unit box
export interface UnitInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  unit: string;
  unitPosition: "prefix" | "suffix";
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
