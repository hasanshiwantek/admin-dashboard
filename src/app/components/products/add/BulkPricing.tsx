"use client";

import { useEffect } from "react";
import {
  useFieldArray,
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  decimalValidation,
  restrictDecimalInput,
  restrictDecimalPaste,
  restrictDecimalValue,
  wholeNumberValidation,
} from "@/validations/validations";
import { ValidationError } from "@/components/ui/validation-error";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BulkPricing() {
  const { control, register, setValue, formState } = useFormContext();
  const errors = formState.errors as any;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bulkPricingTiers",
  });

  const discountType = useWatch({ control, name: "discountType" }) || "fixed";
  const basePrice = Number(useWatch({ control, name: "salePrice" })) || 0;
  const tiers = useWatch({ control, name: "bulkPricingTiers" }) || [];

  useEffect(() => {
    tiers.forEach((tier: any, index: number) => {
      const discount = Number(tier?.price) || 0;
      const calculatedUnitPrice =
        discountType === "percent" || discountType === "%discount"
          ? basePrice * (1 - Math.min(Math.max(discount, 0), 100) / 100)
          : basePrice - Math.max(discount, 0);
      const unitPrice = Math.max(
        0,
        Math.round(calculatedUnitPrice * 100) / 100,
      );

      if (Number(tier?.unitPrice) !== unitPrice) {
        setValue(`bulkPricingTiers.${index}.unitPrice`, unitPrice, {
          shouldDirty: true,
        });
      }
    });
  }, [basePrice, discountType, setValue, tiers]);

  const discountLabel =
    discountType === "fixed"
      ? "$ Fixed Amount"
      : discountType === "percent"
        ? "% Discount"
        : "$ Off/Unit";

  return (
    <div className="space-y-4">
      <h1 className="2xl:!text-[2rem]">Bulk Pricing</h1>
      <p className=" text-muted-foreground 2xl:!text-2xl">
        Create bulk pricing rules to offer price discounts based on quantity
        breaks.
      </p>

      <div>
        <Label className="2xl:!text-2xl">Discount Type</Label>
        <Controller
          control={control}
          name="discountType"
          defaultValue="fixed"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="!max-w-[90%] w-full">
                <SelectValue placeholder="Select Discount Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">% Discount</SelectItem>
                <SelectItem value="fixed">$ Fixed Amount</SelectItem>
                <SelectItem value="off-unit">$ Off/Unit</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="border border-gray-200 mt-4 rounded-sm">
          <TableHeader className="bg-gray-100 text-left">
            <TableRow>
              <TableHead className="border-r w-1/3">Min Quantity</TableHead>
              <TableHead className="border-r w-1/3">{discountLabel}</TableHead>
              <TableHead className="w-1/3">Unit Price</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="border-r">
                  <Input
                    type="number"
                    {...register(
                      `bulkPricingTiers.${index}.minQty`,
                      wholeNumberValidation("Minimum Quantity"),
                    )}
                  />
                  <ValidationError
                    message={errors.bulkPricingTiers?.[index]?.minQty?.message}
                  />
                </TableCell>
                <TableCell className="border-r">
                  <Input
                    type="number"
                    onKeyDown={restrictDecimalInput}
                    onPaste={restrictDecimalPaste}
                    onInput={restrictDecimalValue}
                    {...register(
                      `bulkPricingTiers.${index}.price`,
                      decimalValidation("Discount"),
                    )}
                  />
                  <ValidationError
                    message={errors.bulkPricingTiers?.[index]?.price?.message}
                  />
                </TableCell>
                <TableCell className="border-r">
                  <Input
                    type="number"
                    step="0.01"
                    onKeyDown={restrictDecimalInput}
                    onPaste={restrictDecimalPaste}
                    onInput={restrictDecimalValue}
                    readOnly
                    {...register(
                      `bulkPricingTiers.${index}.unitPrice`,
                      decimalValidation("Unit Price"),
                    )}
                  />
                  <ValidationError
                    message={
                      errors.bulkPricingTiers?.[index]?.unitPrice?.message
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        type="button"
        variant="link"
        className="text-blue-600 !text-xl cursor-pointer font-medium p-0"
        onClick={() => append({ minQty: 1, price: 0, unitPrice: 0 })}
      >
        + Add Tier
      </Button>
    </div>
  );
}
