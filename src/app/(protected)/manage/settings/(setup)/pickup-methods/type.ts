import type { PickupMethodSchema } from "@/validations/formValidations";
import * as yup from "yup";

export interface PickupMethod {
  id: number;
  name: string;
  locationId: number;
  estimatedReadyTime: string;
  instructions: string;
}

export type PickupMethodRow = PickupMethod & { locationName: string };

export type PickupMethodPayload = Omit<PickupMethod, "id">;

export type PickupMethodFormValues = yup.InferType<typeof PickupMethodSchema>;
