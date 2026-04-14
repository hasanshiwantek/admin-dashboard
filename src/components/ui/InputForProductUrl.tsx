import * as React from "react";
import { cn } from "@/lib/utils";

const InputForProductUrl = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        step={type === "number" ? "any" : undefined}
        onWheel={(e) => {
          // Prevent scrolling on number inputs
          if (type === "number") {
            e.currentTarget.blur();
          }
        }}
        className={cn(
          // Base styles
          "w-full h-13 px-4 py-4 rounded-sm bg-white text-xl md:text-lg text-gray-600 transition-colors",

          // Border
          "border border-[#d1d0d4]",

          // Hover state
          "hover:border-[#86848c]",

          // Focus state
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-500",

          // Placeholder
          "placeholder:text-gray-400",

          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",

          // File input styling
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:h-7",

          // Hide number input arrows
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",

          // Dark mode support (if needed)
          "dark:bg-input/30 dark:text-foreground",

          // Validation styles
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",

          className
        )}
        {...props}
      />
    );
  }
);

InputForProductUrl.displayName = "Input";

export { InputForProductUrl };