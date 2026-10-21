import * as yup from "yup";
import { MessageSchema } from "@/validations/formValidations";

export type MessageFormValues = yup.InferType<typeof MessageSchema>;
