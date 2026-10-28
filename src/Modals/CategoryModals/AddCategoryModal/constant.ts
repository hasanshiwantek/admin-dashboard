import type { AddCategoryFormValues } from "./type";

export enum AddCategoryFormNames {
  Name = "name",
  Channel = "channel",
  Parent = "parent",
  IsVisible = "isVisible",
}

export const addCategoryDefaults: AddCategoryFormValues = {
  [AddCategoryFormNames.Name]: "",
  [AddCategoryFormNames.Channel]: "",
  [AddCategoryFormNames.Parent]: { id: null, path: "" },
  [AddCategoryFormNames.IsVisible]: false,
};
