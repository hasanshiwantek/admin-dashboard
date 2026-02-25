"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function InventorySection({ isEdit = false }: { isEdit?: boolean }) {
  const { control, watch, register } = useFormContext();

  // Watch form values
  const trackInventory = watch("trackInventory");
  const inventoryLevel = watch("inventoryLevel");

  return (
    <div className="p-10 border rounded-md bg-white space-y-4 scroll-mt-20" id="inventory">
      <h1 className="2xl:!text-[2.4rem]">Inventory</h1>

      {/* Track Inventory Switch */}
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name="trackInventory"
          defaultValue={isEdit ? undefined : true} // ✅ checked by default only for new product
          render={({ field }) => (
            <Checkbox
              id="trackInventory"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label className="2xl:!text-2xl" htmlFor="trackInventory">
          Track inventory
        </Label>
      </div>

      {/* Show inventory level fields only if tracking is enabled */}
      {trackInventory && (
        <>
          {/* Inventory Level Radio */}
          <Controller
            control={control}
            name="inventoryLevel"
            defaultValue="product"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product" id="product" />
                  <Label className="2xl:!text-2xl" htmlFor="product">
                    On the product level
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="variant" id="variant" />
                  <Label className="2xl:!text-2xl" htmlFor="variant">
                    On the variant level
                  </Label>
                </div>
              </RadioGroup>
            )}
          />

          {/* Conditional Inputs */}
          {inventoryLevel === "product" ? (
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 pt-4">
              <div>
                <Label className="2xl:!text-2xl" htmlFor="currentStock">
                  Current Stock
                </Label>
                <Input
                  id="currentStock"
                  type="number"
                  placeholder="0"
                  className="!max-w-[100%] 2xl:!max-w-[90%] w-full"
                  {...register("currentStock")}
                />
              </div>
              <div>
                <Label className="2xl:!text-2xl" htmlFor="lowStock">
                  Low Stock
                </Label>
                <Input
                  id="lowStock"
                  type="number"
                  placeholder="0"
                  className="!max-w-[100%] 2xl:!max-w-[90%] w-full"
                  {...register("lowStock")}
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground pt-2 2xl:!text-2xl">
              Add variant options to create variants and manage inventory{" "}
              <span className="!text-blue-600 cursor-pointer">below</span>.
            </p>
          )}
        </>
      )}
    </div>
  );
}