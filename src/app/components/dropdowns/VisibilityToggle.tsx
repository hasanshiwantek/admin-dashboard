// components/VisibilityToggle.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

interface VisibilityToggleProps {
  productId: number;
  value: "ENABLED" | "DISABLED";
  onChange: (id: number, value: "ENABLED" | "DISABLED") => void;
}

const VisibilityToggle = ({ productId, value, onChange }: VisibilityToggleProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`px-3 py-2 mt-2 rounded text-white text-lg font-semibold transition-all duration-300 ease-out
          ${value === "DISABLED" ? "bg-gray-600" : "bg-green-700"}`}
        >
          {value}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-50 w-40 cursor-pointer shadow-sm bg-white">
        <DropdownMenuItem
          onClick={() => {onChange(productId, "ENABLED")
            console.log("Product Enabled: ",productId);
            

          }}
          disabled={value === "ENABLED"}
          className={`p-4 border-b transition-all ${
            value === "ENABLED" ? "text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-600"
          }`}
        >
          Enabled
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>{ onChange(productId, "DISABLED")
            console.log("Product Disabled: ",productId);
            
          }}
          disabled={value === "DISABLED"}
          className={`p-4 transition-all ${
            value === "DISABLED" ? "text-gray-400 cursor-not-allowed" : "bg-blue-100 text-blue-600"
          }`}
        >
          Disabled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisibilityToggle;
