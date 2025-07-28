"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { useFormContext, Controller } from "react-hook-form";

export default function ShippingDetails() {
  const { register, control, watch } = useFormContext();

  return (
    <div className="bg-white shadow p-6 space-y-4 scroll-mt-20" id="shippingDetails">
      <h1>Shipping Details</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Fixed Shipping Price */}
        <div className="flex flex-col space-y-1 w-full max-w-md">
          <Label
            htmlFor="fixedShippingPrice"
            className="flex items-center gap-1"
          >
            Fixed Shipping Price
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-gray-400 cursor-pointer">
                    <HiQuestionMarkCircle className="w-6 h-6" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  The price the shopper will pay to ship one unit of this
                  product. If left blank, the default shipping calculator will
                  be used during checkout. If Free Shipping is checked, the
                  value in Fixed Shipping Price will not be used.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="fixedShippingPrice"
            type="number"
            step="0.01"
            placeholder="$ 0"
            disabled={watch("freeShipping")}
            {...register("fixedShippingCost", { valueAsNumber: true })}
          />
        </div>

        {/* Free Shipping */}
        <Controller
          control={control}
          name="freeShipping"
          defaultValue={false}
          render={({ field }) => (
            <div className="flex items-center space-x-2 mt-6 md:mt-8">
              <Checkbox
                id="freeShipping"
                checked={field.value}
                onCheckedChange={(val) => field.onChange(val === true)}
              />
              <Label htmlFor="freeShipping">Free Shipping</Label>
            </div>
          )}
        />

      </div>
    </div>
  );
}
