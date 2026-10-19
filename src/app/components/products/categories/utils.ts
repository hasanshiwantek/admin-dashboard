import { CategoryField } from "./constant";
import { CategoryFormValues } from "./type";

export const getChannelPayload = (values:CategoryFormValues) => ({
  [CategoryField.NAME]: values.name,
  [CategoryField.CHANNEL]: values.channel,
  [CategoryField.PARENT_ID]: values.parentId,
  [CategoryField.IS_VISIBLE]: values.isVisible,
});
