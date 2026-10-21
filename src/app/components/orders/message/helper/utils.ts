import { MessageField } from "./constant";
import { MessageFormValues } from "./type";

export const transformGetMessagePayload = (data: any): MessageFormValues => ({
  [MessageField.Email]: data?.customer?.email || data?.email || "",
  [MessageField.Subject]: data?.subject ?? "",
  [MessageField.Message]: data?.message ?? "",
});

export const transformPostMessagePayload = (values: MessageFormValues) => ({
  subject: values[MessageField.Subject],
  message: values[MessageField.Message],
});
