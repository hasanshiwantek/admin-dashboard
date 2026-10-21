"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

import { CouponCodeForm } from "./types";
import PageTitle from "@/components/ui/PageTitle";
import { useFormContext } from "@/components/form/Form";

const AdvancedCouponTab = () => {
      const { watch, setValue } = useFormContext<CouponCodeForm>();

  return (
    <div className="mt-6">
      {/* Location Restriction Settings */}
      <div className="bg-white border rounded-lg p-8 mb-6">
        <PageTitle
          title="Location restriction settings"
          hideActionButton
          containerClassName="mb-6"
          textContainerClassName="mb-0 gap-0"
          titleClassName="text-xl! font-semibold! text-gray-800!"
        />

        <div className="grid grid-cols-[200px_1fr] items-center gap-4">
          <Label className="text-right text-gray-700">Limit by location</Label>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitByLocation"
              checked={!!watch("limitByLocation")}
              onCheckedChange={(checked) =>
                setValue("limitByLocation", !!checked)
              }
            />

            <Label
              htmlFor="limitByLocation"
              className="font-normal cursor-pointer flex items-center gap-2"
            >
              Restrict coupon use based on location of shipping address
              <Info className="w-4 h-4 text-gray-400" />
            </Label>
          </div>
        </div>
      </div>

      {/* Shipping Method Restriction Settings */}
      <div className="bg-white border rounded-lg p-8">
        <PageTitle
          title="Shipping method restriction settings"
          hideActionButton
          containerClassName="mb-6"
          textContainerClassName="mb-0 gap-0"
          titleClassName="text-xl! font-semibold! text-gray-800!"
        />

        <div className="grid grid-cols-[200px_1fr] items-center gap-4">
          <Label className="text-right text-gray-700">Limit By Shipping</Label>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="limitByShipping"
              checked={!!watch("limitByShipping")}
              onCheckedChange={(checked) =>
                setValue("limitByShipping", !!checked)
              }
            />

            <Label
              htmlFor="limitByShipping"
              className="font-normal cursor-pointer flex items-center gap-2"
            >
              Restrict coupon use based on the selected shipping method
              <Info className="w-4 h-4 text-gray-400" />
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCouponTab;
