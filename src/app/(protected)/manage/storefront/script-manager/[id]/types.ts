import { ScriptSchema } from "@/validations/formValidations";
import type { InferType } from "yup";
export type ScriptFormValues = InferType<typeof ScriptSchema>;
