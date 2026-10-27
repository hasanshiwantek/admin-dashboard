import { ActionEnums } from "@/const/appConstants";
import type { AccessRule } from "@/utils/access";
import { ReactNode } from "react";
import { ButtonProps } from "../ui/Button";

// `permission` hides the action when the user lacks it; `checks` run against
// the button's `data` (e.g. { key: "isDefault", value: false })
export interface ActionItem<TAction extends ActionEnums = ActionEnums>
  extends AccessRule {
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
