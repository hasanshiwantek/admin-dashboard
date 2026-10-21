import type { GiftWrappingFormValues } from "./type";

export const GIFT_WRAPPING_ROUTE = "/manage/settings/gift-wrapping";
export const NEW_GIFT_WRAPPING_ID = "add";
export const ADD_GIFT_WRAPPING_ROUTE = `${GIFT_WRAPPING_ROUTE}/${NEW_GIFT_WRAPPING_ID}`;
export const editGiftWrappingRoute = (id: number | string) =>
  `${GIFT_WRAPPING_ROUTE}/${id}`;

export const PREVIEW_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
export const PREVIEW_IMAGE_MAX_SIZE_MB = 2;

export enum GiftWrappingFormNames {
  Name = "name",
  PreviewImage = "previewImage",
  Price = "price",
  AllowGiftMessages = "allowGiftMessages",
  IsVisible = "isVisible",
}

export const giftWrappingDefaults: GiftWrappingFormValues = {
  [GiftWrappingFormNames.Name]: "",
  [GiftWrappingFormNames.PreviewImage]: null,
  [GiftWrappingFormNames.Price]: "",
  [GiftWrappingFormNames.AllowGiftMessages]: true,
  [GiftWrappingFormNames.IsVisible]: true,
};
