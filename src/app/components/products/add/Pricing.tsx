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
  const { register, control, watch, setValue } = useFormContext();

  const price = watch("price");

  return (
    <div
      className="bg-white shadow-lg p-10 space-y-8 scroll-mt-20"
      id="pricing"
    >
      <h1 className="text-xl font-semibold 2xl:!text-[2.4rem]">Pricing</h1>

      {/* Default Price and Tax Class */}
      <div className="space-y-4">
        <Label className="2xl:!text-2xl">
          Default Price
          <span className="text-sm text-muted-foreground">(excluding tax)</span>
        </Label>
        <Input
          className="!max-w-[100%] w-full"
          // type="number"
          placeholder="$0"
          value={price}
          onChange={(e) => setValue("price", e.target.value)}
        />
        <div className="space-y-1">
          <Label className="2xl:!text-2xl">Tax Class</Label>
          <Controller
            name="taxClass"
            control={control}
            defaultValue="non-taxable"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="!max-w-[100%] w-full">
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
          className="text-blue-600 hover:underline !text-xl cursor-pointer flex items-center 2xl:!text-2xl"
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
                <Label className="2xl:!text-2xl">Cost</Label>
                <Input
                              className="!max-w-[90%] w-full"
                  type="number"
                  step="any"
                  placeholder="$0"
                  {...register("costPrice", {
                    setValueAs: (v) => (v === "" ? 0 : parseFloat(v)),
                  })}
                />
              </div>
              <div>
                <Label className="2xl:!text-2xl">MSRP</Label>
                <Input
                              className="!max-w-[90%] w-full"
                  type="number"
                  step="any"
                  placeholder="$0"
                  {...register("msrp", {
                    setValueAs: (v) => (v === "" ? 0 : parseFloat(v)),
                  })}
                />
              </div>
              <div>
                <Label className="2xl:!text-2xl">Sale Price</Label>
                <Input
                              className="!max-w-[90%] w-full"
                  type="number"
                  step="any"
                  placeholder="$0"
                  {...register("salePrice", {
                    setValueAs: (v) => (v === "" ? 0 : parseFloat(v)),
                  })}
                />
              </div>
            </div>

            <div className="my-8">
              <h1 className="my-6 2xl:!text-[2rem]">Tax Configuration</h1>
              <p className="my-10 2xl:!text-2xl">
                Map the tax codes defined by your external tax provider...
              </p>
              <div>
                <Label className="2xl:!text-2xl">
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
                              className="!max-w-[90%] w-full"
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
