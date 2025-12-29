"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";

interface CouponFormData {
  couponCode: string;
  couponName: string;
  discountType:
    | "dollarAmountOrder"
    | "dollarAmountItem"
    | "percentageItem"
    | "dollarAmountShipping"
    | "freeShipping";
  discountAmount: string;
  minimumPurchase: string;
  limitTotalUses: boolean;
  limitUsesPerCustomer: boolean;
  excludeCartDiscounts: boolean;
  enabled: boolean;
  expiration: string;
  appliesToCategories: boolean;
  appliesToProducts: boolean;
  selectedCategories: string[];
  limitByLocation: boolean;
  limitByShipping: boolean;
}

const AddCouponCode = () => {
  const methods = useForm<CouponFormData>({
    defaultValues: {
      couponCode: "",
      couponName: "",
      discountType: "dollarAmountOrder",
      discountAmount: "0.00",
      minimumPurchase: "0.00",
      limitTotalUses: false,
      limitUsesPerCustomer: false,
      excludeCartDiscounts: false,
      enabled: true,
      expiration: "",
      appliesToCategories: true,
      appliesToProducts: false,
      selectedCategories: [],
      limitByLocation: false,
      limitByShipping: false,
    },
  });
  const { register, watch, setValue } = methods;

  const [activeTab, setActiveTab] = useState("general");
  const discountType = watch("discountType");
  const appliesToCategories = watch("appliesToCategories");

  const onSubmit = (data: CouponFormData) => {
    console.log("Coupon Data:", data);
  };

  return (
    <div className="w-full ">
      {/* Header */}
      <div className=" p-10 border-b">
        <h1 className="!font-light 2xl:!text-5xl mb-2">Create a coupon code</h1>
        <p className=" text-gray-600">
          Coupon codes allow you to provide customers with discounts on products
          available for purchase from your store. Fill out the form below to
          create a unique coupon code.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-full">
          {/* Tabs */}
          <div className="p-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent  rounded-none w-full max-w-md justify-start p-0 h-auto">
                <TabsTrigger
                  value="general"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="mt-6">
                {/* Coupon Details */}
                <div className="bg-white border rounded-lg p-8 mb-6">
                  <h2 className=" !font-semibold text-gray-800 mb-6">
                    Coupon details
                  </h2>

                  {/* Coupon Code */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label
                      htmlFor="couponCode"
                      className="text-right  text-gray-700"
                    >
                      Coupon code
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="couponCode"
                        {...register("couponCode")}
                        placeholder="ZML08KZV57U"
                        className="max-w-md"
                      />
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Coupon Name */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label
                      htmlFor="couponName"
                      className="text-right  text-gray-700"
                    >
                      Coupon name
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="couponName"
                        {...register("couponName")}
                        className="max-w-md"
                      />
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Discount Type */}
                  <div className="grid grid-cols-[200px_1fr] items-start gap-4 mb-6">
                    <Label className="text-right  text-gray-700 pt-2">
                      Discount type
                    </Label>
                    <RadioGroup
                      value={discountType}
                      onValueChange={(value) =>
                        setValue("discountType", value as any)
                      }
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="dollarAmountOrder"
                          id="dollarAmountOrder"
                        />
                        <Label
                          htmlFor="dollarAmountOrder"
                          className="font-normal cursor-pointer flex items-center gap-2"
                        >
                          Dollar amount off the order total
                          <Info className="w-4 h-4 text-gray-400" />
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="dollarAmountItem"
                          id="dollarAmountItem"
                        />
                        <Label
                          htmlFor="dollarAmountItem"
                          className="font-normal cursor-pointer"
                        >
                          Dollar amount off each item in the order
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="percentageItem"
                          id="percentageItem"
                        />
                        <Label
                          htmlFor="percentageItem"
                          className="font-normal cursor-pointer"
                        >
                          Percentage off each item in the order
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="dollarAmountShipping"
                          id="dollarAmountShipping"
                        />
                        <Label
                          htmlFor="dollarAmountShipping"
                          className="font-normal cursor-pointer"
                        >
                          Dollar amount off the shipping total
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="freeShipping"
                          id="freeShipping"
                        />
                        <Label
                          htmlFor="freeShipping"
                          className="font-normal cursor-pointer"
                        >
                          Free shipping
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Discount Amount */}
                  {discountType !== "freeShipping" && (
                    <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                      <Label
                        htmlFor="discountAmount"
                        className="text-right  text-gray-700"
                      >
                        Discount amount
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">$</span>
                        <Input
                          id="discountAmount"
                          {...register("discountAmount")}
                          type="number"
                          step="0.01"
                          className="max-w-[150px]"
                        />
                        <span className=" text-gray-600">
                          off the order total
                        </span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* Minimum Purchase */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label className="text-right  text-gray-700">
                      Minimum purchase
                      <div className="text-xs text-gray-500">(optional)</div>
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">$</span>
                      <Input
                        {...register("minimumPurchase")}
                        type="number"
                        step="0.01"
                        className="max-w-[150px]"
                      />
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Number of Uses */}
                  <div className="grid grid-cols-[200px_1fr] items-start gap-4 mb-6">
                    <Label className="text-right  text-gray-700 pt-2">
                      Number of uses
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="limitTotalUses"
                          checked={watch("limitTotalUses")}
                          onCheckedChange={(checked) =>
                            setValue("limitTotalUses", !!checked)
                          }
                        />
                        <Label
                          htmlFor="limitTotalUses"
                          className="font-normal cursor-pointer"
                        >
                          Limit total number of uses
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="limitUsesPerCustomer"
                          checked={watch("limitUsesPerCustomer")}
                          onCheckedChange={(checked) =>
                            setValue("limitUsesPerCustomer", !!checked)
                          }
                        />
                        <Label
                          htmlFor="limitUsesPerCustomer"
                          className="font-normal cursor-pointer"
                        >
                          Limit number of uses per customer
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Exclude Cart Level Discounts */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label className="text-right  text-gray-700">
                      Exclude cart level discounts
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="excludeCartDiscounts"
                        checked={watch("excludeCartDiscounts")}
                        onCheckedChange={(checked) =>
                          setValue("excludeCartDiscounts", !!checked)
                        }
                      />
                      <Label
                        htmlFor="excludeCartDiscounts"
                        className="font-normal cursor-pointer"
                      >
                        This coupon does not apply on top of cart level
                        discounts
                      </Label>
                    </div>
                  </div>

                  {/* Enabled */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label className="text-right  text-gray-700">Enabled</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enabled"
                        checked={watch("enabled")}
                        onCheckedChange={(checked) =>
                          setValue("enabled", !!checked)
                        }
                      />
                      <Label
                        htmlFor="enabled"
                        className="font-normal cursor-pointer"
                      >
                        This coupon code is enabled and can be used.
                      </Label>
                    </div>
                  </div>

                  {/* Expiration */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                    <Label className="text-right  text-gray-700">
                      Expiration
                      <div className="text-xs text-gray-500">(optional)</div>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        {...register("expiration")}
                        placeholder="mm/dd/yyyy"
                        className="max-w-[200px]"
                      />
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Coupon Conditions */}
                <div className="bg-white border rounded-lg p-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Coupon conditions
                  </h2>

                  <div className="grid grid-cols-[200px_1fr] items-start gap-4">
                    <Label className="text-right  text-gray-700 pt-2">
                      Applies to
                    </Label>
                    <div>
                      <RadioGroup
                        value={appliesToCategories ? "categories" : "products"}
                        onValueChange={(value) =>
                          setValue(
                            "appliesToCategories",
                            value === "categories"
                          )
                        }
                      >
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <RadioGroupItem
                              value="categories"
                              id="categories"
                            />
                            <Label
                              htmlFor="categories"
                              className="font-normal cursor-pointer"
                            >
                              This coupon code can be used with these
                              categories:
                            </Label>
                          </div>
                          {appliesToCategories && (
                            <div className="ml-6 mt-3">
                              <CategoryTreeSm name="categoryIds" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="products" id="products" />
                          <Label
                            htmlFor="products"
                            className="font-normal cursor-pointer"
                          >
                            This coupon code will be applied if any of the
                            following products are added to the cart:
                          </Label>
                          <Info className="w-4 h-4 text-gray-400" />
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="mt-6">
                {/* Location Restriction Settings */}
                <div className="bg-white border rounded-lg p-8 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Location restriction settings
                  </h2>

                  <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                    <Label className="text-right  text-gray-700">
                      Limit by location
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="limitByLocation"
                        checked={watch("limitByLocation")}
                        onCheckedChange={(checked) =>
                          setValue("limitByLocation", !!checked)
                        }
                      />
                      <Label
                        htmlFor="limitByLocation"
                        className="font-normal cursor-pointer flex items-center gap-2"
                      >
                        Restrict coupon use based on location of shipping
                        address
                        <Info className="w-4 h-4 text-gray-400" />
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Shipping Method Restriction Settings */}
                <div className="bg-white border rounded-lg p-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Shipping method restriction settings
                  </h2>

                  <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                    <Label className="text-right  text-gray-700">
                      Limit By Shipping
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="limitByShipping"
                        checked={watch("limitByShipping")}
                        onCheckedChange={(checked) =>
                          setValue("limitByShipping", !!checked)
                        }
                      />
                      <Label
                        htmlFor="limitByShipping"
                        className="font-normal cursor-pointer flex items-center gap-2"
                      >
                        Restrict coupon use based on the selected shipping
                        method
                        <Info className="w-4 h-4 text-gray-400" />
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4 z-999 shadow-lg">
            <button type="button" className="btn-outline-primary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCouponCode;