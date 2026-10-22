import { ActionEnums } from "@/const/appConstants";
import { ReactNode } from "react";
import { ButtonProps } from "../ui/button";

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
  onAction: (data: TData) => (action: TAction) => void;
  label?: string;
  icon?: ReactNode;
  align?: "start" | "center" | "end";
  triggerProps?: ButtonProps;
  contentClassName?: string;
}
