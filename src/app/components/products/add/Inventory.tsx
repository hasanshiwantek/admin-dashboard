"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
export default function InventorySection() {
  const { control, watch, register, setValue } = useFormContext();

  const trackInventory = watch("trackInventory");
  const inventoryLevel = watch("inventoryLevel");

  return (
    <div className="p-10 border rounded-md bg-white space-y-4 scroll-mt-20" id="inventory">
      <h1>Inventory</h1>

      {/* Switch: Track Inventory */}
      <div className="flex items-center space-x-2">
        <Controller
          control={control}
          name="trackInventory"
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              id="track-inventory"
              checked={field.value}
              onCheckedChange={(val) => field.onChange(val)}
            />
          )}
        />
        <Label htmlFor="track-inventory">Track inventory</Label>
      </div>

      {trackInventory && (
        <>
          {/* RadioGroup: Inventory Level */}
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
                  <Label htmlFor="product">On the product level</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="variant" id="variant" />
                  <Label htmlFor="variant">On the variant level</Label>
                </div>
              </RadioGroup>
            )}
          />

          {/* Conditional Inputs */}
          {inventoryLevel === "product" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  id="currentStock"
                  type="number"
                  placeholder="0"
                  {...register("currentStock")}
                />
              </div>
              <div>
                <Label htmlFor="lowStock">Low Stock</Label>
                <Input
                  id="lowStock"
                  type="number"
                  placeholder="0"
                  {...register("lowStock")}
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground pt-2">
              Add variant options to create variants and manage inventory{" "}
              <span className="!text-blue-600 cursor-pointer">below</span>.
            </p>
          )}
        </>
      )}
    </div>
  );
}
