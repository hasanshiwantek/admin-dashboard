"use client";

import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import InputField from "@/components/form/InputField";
import RadioGroupField from "@/components/form/fields/RadioGroupField";
import CheckboxField from "@/components/form/fields/CheckboxField";
import { Info } from "lucide-react";

import { CouponCodeForm, } from "./types";
import { AppliesToOptions, CouponFormFields, DiscountType, DiscountTypeOptions } from "./constant";
import PageTitle from "@/components/ui/PageTitle";
import { useFormContext } from "@/components/form/Form";



const GeneralCouponTab = () => {
    const { control, watch } = useFormContext<CouponCodeForm>();
      const discountType = watch("discountType");

  return (
    <div className="mt-6 space-y-6">
      {/* Coupon Details */}
      <div className="bg-white border rounded-lg p-8 mb-6">
        <PageTitle
          title="Coupon details"
          hideActionButton
          containerClassName="mb-6"
          textContainerClassName="mb-0 gap-0"
          titleClassName="text-2xl! font-semibold! text-gray-800!"
        />

        <div className="mb-6">
          <InputField
            name={CouponFormFields.CouponCode}
            label="Coupon code"
            control={control}
            placeholder="ZML08KZV57U"
            containerClassName="grid grid-cols-[200px_1fr] items-center gap-4"
            labelClassName="text-right text-gray-700"
            controlClassName="max-w-md"
            rightElement={<Info className="w-4 h-4 text-gray-400 shrink-0" />}
          />
        </div>

        <div className="mb-6">
          <InputField
            name={CouponFormFields.CouponName}
            label="Coupon name"
            required
            control={control}
            containerClassName="grid grid-cols-[200px_1fr] items-center gap-4"
            labelClassName="text-right text-gray-700"
            controlClassName="max-w-md"
            rightElement={<Info className="w-4 h-4 text-gray-400 shrink-0" />}
          />
        </div>

        <div className="mb-6">
          <InputField
            name={CouponFormFields.DiscountType}
            label="Discount type"
            required
            Component={RadioGroupField}
            control={control}
            options={DiscountTypeOptions}
            containerClassName="grid grid-cols-[200px_1fr] items-center gap-4"
            labelClassName="text-right text-gray-700"
            controlClassName="max-w-md"
            rightElement={<Info className="w-4 h-4 text-gray-400" />}
          />
        </div>

        {discountType !== DiscountType.FreeShipping && (
          <InputField
            name={CouponFormFields.DiscountType}
            label="Discount amount"
            labelClassName="text-right text-gray-700"
            required
            control={control}
            type="number"
            step="0.01"
            containerClassName="grid grid-cols-[200px_1fr] items-center gap-4"
            controlClassName="max-w-md"
            leftElement={<span className="text-gray-600">$</span>}
            rightElement={
              <>
                <span className="text-gray-600">off the order total</span>
                <Info className="w-4 h-4 text-gray-400" />
              </>
            }
          />
        )}

        <div className="mb-6 mt-4">
          <InputField
            name={CouponFormFields.MinimumPurchase}
            label={
              <>
                Minimum purchase
                <div className="text-xs text-gray-500">(optional)</div>
              </>
            }
            labelClassName="text-right text-gray-700"
            control={control}
            type="number"
            step="0.01"
            className="w-full max-w-[190px]"
            containerClassName="mb-6"
            controlClassName="flex-row items-center gap-2"
            leftElement={<span className="text-gray-600">$</span>}
            rightElement={<Info className="w-4 h-4 text-gray-400 shrink-0" />}
          />
        </div>

        <div className="mb-6">
          <InputField
            name={CouponFormFields.LimitTotalUses}
            label="Number of uses"
            Component={CheckboxField}
            control={control}
            layout="horizontal"
            text="Limit total number of uses"
            containerClassName="mb-3"
          />

          <InputField
            name={CouponFormFields.LimitUsesPerCustomer}
            label=""
            Component={CheckboxField}
            control={control}
            layout="horizontal"
            text="Limit number of uses per customer"
          />
        </div>

        <div className="mt-3 mb-6">
          <InputField
            name={CouponFormFields.ExcludeCartDiscounts}
            label="Exclude cart level discounts"
            Component={CheckboxField}
            control={control}
            text="This coupon does not apply on top of cart level discounts"
            labelClassName="text-right text-gray-700"
            containerClassName="mb-6"
            controlClassName="flex-row items-center"
          />
        </div>

        <div className="mt-4 mb-6">
          <InputField
            name={CouponFormFields.Enabled}
            label="Enabled"
            Component={CheckboxField}
            control={control}
            text="This coupon code is enabled and can be used."
            labelClassName="text-right text-gray-700"
            containerClassName="mb-6"
            controlClassName="flex-row items-center"
          />
        </div>

        <div>
          <InputField
            name={CouponFormFields.Expiration}
            label={
              <>
                Expiration
                <div className="text-xs text-gray-500">(optional)</div>
              </>
            }
            control={control}
            type="date"
            className="max-w-[200px]"
            labelClassName="text-right text-gray-700"
            controlClassName="flex-row items-center gap-2"
            rightElement={<Info className="w-4 h-4 text-gray-400 shrink-0" />}
          />
        </div>
      </div>

      {/* Coupon Conditions */}
      <div className="bg-white border rounded-lg p-8 space-y-6">
        <PageTitle
          title="Coupon conditions"
          hideActionButton
          containerClassName="mb-6"
          textContainerClassName="mb-0 gap-0"
          titleClassName="text-xl! font-semibold! text-gray-800!"
        />

        <InputField
          name={CouponFormFields.AppliesTo}
          label="Applies to"
          Component={RadioGroupField}
          control={control}
          options={AppliesToOptions}
        />

        {watch("appliesTo") === "categories" && (
          <InputField
            name={CouponFormFields.CategoryIds}
            label="Categories"
            required
            Component={CategoryTreeSm}
            control={control}
            showSelectAll
            containerClassName="max-w-5xl"
            rules={{
              validate: (value: any) =>
                value?.length > 0 || "Select at least one category",
            }}
          />
        )}

       
      </div>
    </div>
  );
};

export default GeneralCouponTab;
