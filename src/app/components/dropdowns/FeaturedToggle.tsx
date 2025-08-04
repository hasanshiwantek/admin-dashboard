// components/FeaturedToggle.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
interface FeaturedToggleProps {
  productId: number;
  isFeatured: boolean;
  onChange: (id: number, value: boolean) => void;
}

const FeaturedToggle = ({ productId, isFeatured, onChange }: FeaturedToggleProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer  p-2 !border-none hover:bg-blue-100  transition-all">
          {isFeatured ? (
            <FaStar className="text-yellow-500 fill-yellow-500 stroke-yellow-500" size={15} />
          ) : (
            <FaRegStar className="stroke-gray-500" size={15} />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-50 w-50 cursor-pointer border shadow-sm bg-white">
        <DropdownMenuItem
          onClick={() => {onChange(productId, true)
            console.log("Product add to featured with productId: ",productId);
            
          }}
          disabled={isFeatured}
          className={`p-4 border-b transition-all ${
            !isFeatured ? "bg-blue-100 text-blue-600" : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Featured
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {onChange(productId, false)
            console.log("Product add to NoNfeatured with productId: ",productId);

          }}
          disabled={!isFeatured}
          className={`p-4 transition-all ${
            isFeatured ? "bg-blue-100 text-blue-600" : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Not Featured
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeaturedToggle;
