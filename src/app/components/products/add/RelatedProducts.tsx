"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RelatedProductsProps {
  isEdit?: boolean;
}

export default function RelatedProducts({ isEdit = false }: RelatedProductsProps) {
  const { control, watch, setValue } = useFormContext();

  // ✅ Fallback logic for default checked
  const relatedProductsValue = watch("relatedProducts");
  const relatedProducts = relatedProductsValue ?? (!isEdit ? 1 : 0);

  return (
    <div id="relatedProducts" className="p-10 bg-white shadow-lg rounded-sm">
      <h1 className="2xl:!text-[2.4rem]">Related Products</h1>
      <Controller
        control={control}
        name="relatedProducts"
        defaultValue={0}
        render={() => (
          <div className="flex items-center space-x-2 mt-6">
            <Checkbox
              id="relatedProducts"
              checked={!!relatedProducts} // ✅ convert to boolean
              onCheckedChange={(val) => setValue("relatedProducts", val ? 1 : 0)} // ✅ store as 0/1
            />
            <Label className="2xl:!text-2xl flex items-center gap-2" htmlFor="relatedProducts">
              Automatically show related products on my storefront
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HiQuestionMarkCircle className="cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    When enabled, we'll find related products for you. Untick this to surface the ability to select specific products.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
        )}
      />
    </div>
  );
}