import { createFormData } from "@/lib/utils";
import { GiftWrappingFormNames, giftWrappingDefaults } from "./constant";
import { GiftWrapping, GiftWrappingFormValues } from "./type";

export const formatGiftWrappingPrice = (price: number | string) =>
  `$${Number(price || 0).toFixed(2)}`;

export const transformGetGiftWrapping = (
  giftWrapping: GiftWrapping,
): GiftWrappingFormValues => ({
  [GiftWrappingFormNames.Name]: giftWrapping.name ?? "",
  [GiftWrappingFormNames.PreviewImage]: giftWrapping.previewImage ?? null,
  [GiftWrappingFormNames.Price]: String(giftWrapping.price ?? ""),
  [GiftWrappingFormNames.AllowGiftMessages]:
    giftWrapping.allowGiftMessages ??
    giftWrappingDefaults[GiftWrappingFormNames.AllowGiftMessages],
  [GiftWrappingFormNames.IsVisible]:
    giftWrapping.isVisible ??
    giftWrappingDefaults[GiftWrappingFormNames.IsVisible],
});

export const transformPostGiftWrapping = (values: GiftWrappingFormValues) => {
  const image = values[GiftWrappingFormNames.PreviewImage];
  return createFormData(
    {
      ...values,
      [GiftWrappingFormNames.PreviewImage]:
        image instanceof File ? [image] : null,
    },
    [GiftWrappingFormNames.PreviewImage],
  );
};
