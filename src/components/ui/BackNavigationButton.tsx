"use client";

import { useSafeBack } from "@/hooks/useSafeBack";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { Button, ButtonProps } from "./button";

export interface BackNavigationButtonProps
  extends Omit<ButtonProps, "onClick" | "children"> {
  label?: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconClassName?: string;
  labelClassName?: string;
}

const BackNavigationButton = ({
  label = "Back",
  href = "/manage/dashboard",
  onClick,
  icon,
  className,
  iconClassName,
  labelClassName,
  ...buttonProps
}: BackNavigationButtonProps) => {
  const goBack = useSafeBack(href);

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick ?? goBack}
      className={cn(
        "flex w-fit items-center gap-3 px-0! text-[1.4rem]! text-slate-gray-blue transition-colors hover:bg-transparent hover:text-deep-royal-blue!",
        className,
      )}
      {...buttonProps}
    >
      {icon ?? <ArrowLeft size={16} className={iconClassName} />}
      {label && (
        // Inherit from the button: the global `span` rule in globals.css
        // would otherwise force its own size, weight and color
        <span
          className={cn(
            "text-inherit! [font:inherit]! tracking-[inherit]!",
            labelClassName,
          )}
        >
          {label}
        </span>
      )}
    </Button>
  );
};

export default BackNavigationButton;
