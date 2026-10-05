import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type AdornedInputProps = Omit<ComponentProps<"input">, "prefix"> & {
  /** Shown before the value, e.g. "$". */
  prefix?: ReactNode;
  /** Shown after the value, e.g. "%". */
  suffix?: ReactNode;
  "aria-invalid"?: boolean;
  /** Classes for the bordered wrapper; `className` styles the input. */
  wrapperClassName?: string;
};

const TEXT = "text-xl! 2xl:text-[1.6rem]!";

/** Input with inline prefix / suffix adornments inside its border. */
export function AdornedInput({
  prefix,
  suffix,
  "aria-invalid": invalid,
  wrapperClassName,
  className,
  type = "text",
  ...props
}: AdornedInputProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center h-13 gap-2 rounded-sm bg-white px-4 w-[18rem]",
        "border border-[#d1d0d4] hover:border-[#86848c] focus-within:border-blue-500",
        invalid && "border-destructive",
        wrapperClassName,
      )}
    >
      {prefix && <span className={cn(TEXT, "text-gray-500")}>{prefix}</span>}
      <input
        type={type}
        aria-invalid={invalid}
        onWheel={(e) => e.currentTarget.blur()}
        className={cn(
          TEXT,
          "flex-1 min-w-0 outline-none bg-transparent text-gray-700 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none",
          className,
        )}
        {...props}
      />
      {suffix && <span className={cn(TEXT, "text-gray-500")}>{suffix}</span>}
    </div>
  );
}

export default AdornedInput;
