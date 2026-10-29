import type { ReviewSchema } from "@/validations/formValidations";
import * as yup from "yup";

export type ReviewFormValues = yup.InferType<typeof ReviewSchema>;

export interface ReviewPayload {
  subject: string;
  comment: string;
  name: string;
  approved: boolean;
  rating: number;
}
