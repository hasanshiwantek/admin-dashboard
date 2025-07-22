"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import BulkPricing from "./BulkPricing";

export default function Pricing() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { register, control } = useFormContext();

  return (
    <div className="bg-white shadow-lg p-10 space-y-8" id="pricing">
      <h1 className="text-xl font-semibold">Pricing</h1>

      {/* Default Price and Tax Class */}
      <div className="space-y-4">
        <Label>
          Default Price{" "}
          <span className="text-sm text-muted-foreground">(excluding tax)</span>
        </Label>
        <Input
          type="number"
          placeholder="$0"
          {...register("defaultPrice", { valueAsNumber: true })}
        />

        <div className="space-y-1">
          <Label>Tax Class</Label>
          <Controller
            name="taxClass"
            control={control}
            defaultValue="non-taxable"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a tax class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non-taxable">Non-taxable</SelectItem>
                  <SelectItem value="taxable">Taxable</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="gift-wrapping">Gift Wrapping</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Advanced Pricing Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 hover:underline !text-xl cursor-pointer flex items-center"
        >
          {showAdvanced ? (
            <ChevronUp className="mr-1 w-6 h-6" />
          ) : (
            <ChevronDown className="mr-1 w-6 h-6" />
          )}
          {showAdvanced ? "Hide Advanced Pricing" : "Show Advanced Pricing"}
        </button>

        {showAdvanced && (
          <div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <Label>Cost</Label>
                <Input
                  type="number"
                  placeholder="$0"
                  {...register("cost", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>MSRP</Label>
                <Input
                  type="number"
                  placeholder="$0"
                  {...register("msrp", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>Sale Price</Label>
                <Input
                  type="number"
                  placeholder="$0"
                  {...register("salePrice", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="my-8">
              <h1 className="my-6">Tax Configuration</h1>
              <p className="my-10">
                Map the tax codes defined by your external tax provider...
              </p>
              <div>
                <Label>
                  Tax Provider Tax Code
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HiQuestionMarkCircle />
                      </TooltipTrigger>
                      <TooltipContent>
                        A Tax Code is an identifier...
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter tax code"
                  {...register("taxCode")}
                />
              </div>
            </div>

            {/* Bulk Pricing */}
            <div className="space-y-4">
              <BulkPricing />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
