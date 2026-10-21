import { ReviewSchema } from "@/validations/formValidations";
import * as yup from "yup";
export interface ReviewFormData {
  name: string;
  userName: string;
  comment: string;
  email: string;
  approved: string;
  rating: string;
}
export type ReviewFormValues = yup.InferType<typeof ReviewSchema>;
