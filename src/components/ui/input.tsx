import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "!text-xl !md:text-lg w-full max-w-md h-13 px-4 py-4 rounded-sm bg-white transition-colors",

        // Default border
        "border border-gray-400",

        // Hover
        "hover:border-blue-500",

        // Focus
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-500",

        // Dark mode & placeholder
        "dark:bg-input/30 placeholder:text-muted-foreground file:text-foreground",

        // Validation & accessibility
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:h-7",

        className
      )}
      {...props}
    />
  );
}

export { Input };
