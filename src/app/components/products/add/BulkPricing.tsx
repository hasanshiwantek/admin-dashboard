"use client";

import { useFieldArray, useFormContext, Controller } from "react-hook-form";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BulkPricing() {
  const { control, register, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bulkPricingTiers",
  });

  const discountType = watch("discountType") || "fixed";

  const discountLabel =
    discountType === "fixed"
      ? "$ Fixed Amount"
      : discountType === "percent"
      ? "% Discount"
      : "% Off/Unit";

  return (
    <div className="space-y-4">
      <h1>Bulk Pricing</h1>
      <p className=" text-muted-foreground">
        Create bulk pricing rules to offer price discounts based on quantity
        breaks.
      </p>

      <div>
        <Label>Discount Type</Label>
        <Controller
          control={control}
          name="discountType"
          defaultValue="fixed"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Discount Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">$ Fixed Amount</SelectItem>
                <SelectItem value="%discount">% Discount</SelectItem>
                <SelectItem value="%off-unit">%Off/Unit</SelectItem>
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
                    {...register(`bulkPricingTiers.${index}.minQty`, {
                      valueAsNumber: true,
                    })}
                  />
                </TableCell>
                <TableCell className="border-r">
                  <Input
                    type="number"
                    {...register(`bulkPricingTiers.${index}.price`, {
                      valueAsNumber: true,
                    })}
                  />
                </TableCell>
                <TableCell className="border-r">
                  <Input
                    type="number"
                    {...register(`bulkPricingTiers.${index}.unitPrice`, {
                      valueAsNumber: true,
                    })}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <button
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
        onClick={() =>
          append({ minQty: 1, price: 0, unitPrice: 0 })
        }
      >
        + Add Tier
      </Button>
    </div>
  );
}
