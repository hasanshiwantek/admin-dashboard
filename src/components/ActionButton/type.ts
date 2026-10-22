import { ActionEnums } from "@/const/appConstants";
import { ReactNode } from "react";

export interface ActionItem<TAction extends ActionEnums = ActionEnums> {
  type: TAction;
  label: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface ActionButtonProps<
  TData,
  TAction extends ActionEnums = ActionEnums,
> {
  data: TData;
  actions: ActionItem<TAction>[];
  /** Curried: called with the data, then with the picked action's type */
  onAction: (data: TData) => (action: TAction) => void;
  /** Accessible name for the trigger */
  label?: string;
  icon?: ReactNode;
  align?: "start" | "center" | "end";
  triggerClassName?: string;
  contentClassName?: string;
}
