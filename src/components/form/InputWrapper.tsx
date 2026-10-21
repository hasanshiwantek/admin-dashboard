import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type InputWrapperProps = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  startIconClassName?: string;
  endIconClassName?: string;
  invalid?: boolean;
  className?: string;
  children: ReactNode;
};

const ADORNMENT_CLASS =
  "flex shrink-0 items-center text-[1.4rem] text-gray-500";

const InputWrapper = ({
  startIcon,
  endIcon,
  startIconClassName,
  endIconClassName,
  invalid,
  className,
  children,
}: InputWrapperProps) => {
  if (!startIcon && !endIcon) return <>{children}</>;

  return (
    <div
      className={cn(
        "flex items-stretch overflow-hidden rounded-sm border border-gray-300 bg-white",
        "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-300",
        invalid && "border-red-500",
        className,
      )}
    >
      {startIcon && (
        <span className={cn(ADORNMENT_CLASS, "pl-4", startIconClassName)}>
          {startIcon}
        </span>
      )}
      {/* The control drops its own border; the group draws it instead */}
      <div className="min-w-0 flex-1 [&_input]:max-w-full [&_input]:rounded-none [&_input]:border-0 [&_input]:focus-visible:ring-0">
        {children}
      </div>
      {endIcon && (
        <span className={cn(ADORNMENT_CLASS, "pr-4", endIconClassName)}>
          {endIcon}
        </span>
      )}
    </div>
  );
};

export default InputWrapper;
