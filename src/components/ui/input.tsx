import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "!text-xl !md:text-lg w-full max-w-md h-13 px-6 py-4  rounded-sm !border !border-gray-400 bg-white  transition-colors ",
        "hover:border-blue-500",

        // Colors & dark mode
        "border-input dark:bg-input/30 placeholder:text-muted-foreground file:text-foreground",

        // Focus styles: Blue border & ring
        "focus-visible:outline-none  focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500",

        // Validation + accessibility
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:h-7",

        // ✅ Your custom border styles — placed at the end to override
        "border-2 border-gray-400",

        className
      )}
      {...props}
    />
  )
}

export { Input }
