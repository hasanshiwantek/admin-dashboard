"use client";

import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ValidationError } from "@/components/ui/validation-error";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  createCoupon,
  getCouponById,
  updateCouponCode,
} from "@/redux/slices/marketingSlice";
import { Info, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generateUniqueCode } from "@/lib/utils";
import { DefaultCouponCodeFormValues } from "./constant";
import { CouponCodeForm } from "./types";

const AddCouponCode = () => {
  const params = useParams();
  const couponId = params?.id; // Get ID from URL params
  const isEditMode = !!couponId;

  const methods = useForm<CouponCodeForm>({
    defaultValues: {
      ...DefaultCouponCodeFormValues,
      couponCode: generateUniqueCode(10),
    },
  });

  const { register, watch, setValue, reset } = methods;
  const { errors } = methods.formState;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const discountType = watch("discountType");
  const appliesToCategories = watch("appliesToCategories");

  // Fetch coupon data if in edit mode
  useEffect(() => {
    if (isEditMode && couponId) {
      fetchCouponData();
    }
  }, [couponId, isEditMode]);

  const fetchCouponData = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(getCouponById({ id: couponId })).unwrap();

      // Populate form with fetched data
      const couponData = result?.couponcode || result?.data;
      if (couponData) {
        // Helper function to convert string "0"/"1" or "true"/"false" to boolean
        const toBoolean = (value: any): boolean => {
          if (
            value === "1" ||
            value === 1 ||
            value === "true" ||
            value === true
          ) {
            return true;
          }
          return false;
        };

        reset({
          couponCode: couponData.couponCode || "",
          couponName: couponData.couponName || "",
          discountType: couponData.discountType || "per_total_discount",
          discountAmount: couponData.discountAmount || "0.00",
          minimumPurchase: couponData.minimumPurchase || "0.00",
          limitTotalUses: toBoolean(couponData.limitTotalUses),
          limitUsesPerCustomer: toBoolean(couponData.limitUsesPerCustomer),
          excludeCartDiscounts: toBoolean(couponData.excludeCartDiscounts),
          enabled: toBoolean(couponData.enabled),
          expiration: couponData.expiration || "",
          appliesToCategories: toBoolean(couponData.appliesToCategories),
          appliesToProducts: toBoolean(couponData.appliesToProducts),
          categoryIds: couponData.categoryIds || [],
          productIds: couponData.productIds || null,
          limitByLocation: toBoolean(couponData.limitByLocation),
          limitByShipping: toBoolean(couponData.limitByShipping),
        });
      }
    } catch (error: any) {
      console.error("Error fetching coupon:", error);
      // Optionally redirect back to list
      // router.push("/manage/marketing/coupon-codes");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CouponCodeForm) => {
    setIsSubmitting(true);

    try {
      let result;

      if (isEditMode) {
        // Update existing coupon
        result = await dispatch(
          updateCouponCode({ id: couponId, data }),
        ).unwrap();
        console.log("Coupon updated successfully:", result);
      } else {
        // Create new coupon
        result = await dispatch(createCoupon({ data })).unwrap();
        console.log("Coupon created successfully:", result);
      }

      // Redirect after success
      setTimeout(() => {
        router.push("/manage/marketing/coupon-codes");
      }, 2000);
    } catch (error: any) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} coupon:`,
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting || isLoading) return;
    router.push("/manage/marketing/coupon-codes");
  };

  // Show loading state while fetching data in edit mode
  if (isEditMode && isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading coupon data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="p-10 border-b">
        <h1 className="!font-light 2xl:!text-5xl mb-2">
          {isEditMode ? "Edit coupon code" : "Create a coupon code"}
        </h1>
        <p className="text-gray-600">
          {isEditMode
            ? "Update the coupon code details below."
            : "Coupon codes allow you to provide customers with discounts on products available for purchase from your store. Fill out the form below to create a unique coupon code."}
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-full">
          {/* Tabs */}
          <div className="p-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent rounded-none w-full max-w-md justify-start p-0 h-auto">
                <TabsTrigger
                  value="general"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  General
                </TabsTrigger>
                {/* <TabsTrigger
                  value="advanced"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  Advanced
                </TabsTrigger> */}
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="mt-6">
                {/* Coupon Details */}
                <div className="bg-white border rounded-lg p-8 mb-6">
                  <h2 className="!font-semibold text-gray-800 mb-6">
                    Coupon details
                  </h2>

                  {/* Coupon Code */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label
                      htmlFor="couponCode"
                      className="text-right text-gray-700"
                    >
                      Coupon code
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="couponCode"
                        {...register("couponCode", {
                          required: "Coupon code is required",
                          validate: (value) =>
                            (value ?? "").trim().length > 0 ||
                            "Coupon code is required",
                        })}
                        placeholder="ZML08KZV57U"
                        aria-invalid={!!errors.couponCode}
                        className="max-w-md"
                      />
                      <Info className="w-4 h-4 text-gray-400" />
                      <ValidationError message={errors.couponCode?.message} />
                    </div>
                  </div>

                  {/* Coupon Name */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label
                      htmlFor="couponName"
                      className="text-right text-gray-700"
                    >
                      Coupon name
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="couponName"
                        {...register("couponName", {
                          required: "Coupon name is required",
                          validate: (value) =>
                            value.trim().length > 0 ||
                            "Coupon name is required",
                        })}
                        aria-invalid={!!errors.couponName}
                        className="max-w-md"
                      />
                      <Info className="w-4 h-4 text-gray-400" />
                      <ValidationError message={errors.couponName?.message} />
                    </div>
                  </div>

                  {/* Discount Type */}
                  <div className="grid grid-cols-[200px_1fr] items-start gap-4 mb-6">
                    <Label className="text-right text-gray-700 pt-2">
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
                          value="per_total_discount"
                          id="per_total_discount"
                        />
                        <Label
                          htmlFor="per_total_discount"
                          className="font-normal cursor-pointer flex items-center gap-2"
                        >
                          Dollar amount off the order total
                          <Info className="w-4 h-4 text-gray-400" />
                        </Label>
                      </div>
                      {/* <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="per_item_discount"
                          id="per_item_discount"
                        />
                        <Label
                          htmlFor="per_item_discount"
                          className="font-normal cursor-pointer"
                        >
                          Dollar amount off each item in the order
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="percentage_discount"
                          id="percentage_discount"
                        />
                        <Label
                          htmlFor="percentage_discount"
                          className="font-normal cursor-pointer"
                        >
                          Percentage off each item in the order
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value="shipping_discount"
                          id="shipping_discount"
                        />
                        <Label
                          htmlFor="shipping_discount"
                          className="font-normal cursor-pointer"
                        >
                          Dollar amount off the shipping total
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="free_shipping"
                          id="free_shipping"
                        />
                        <Label
                          htmlFor="free_shipping"
                          className="font-normal cursor-pointer"
                        >
                          Free shipping
                        </Label>
                      </div> */}
                    </RadioGroup>
                  </div>

                  {/* Discount Amount */}
                  {discountType !== "free_shipping" && (
                    <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                      <Label
                        htmlFor="discountAmount"
                        className="text-right text-gray-700"
                      >
                        Discount amount
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">$</span>
                        <Input
                          id="discountAmount"
                          {...register("discountAmount", {
                            required: "Discount amount is required",
                            validate: (value) =>
                              Number(value) > 0 ||
                              "Discount amount must be greater than 0",
                          })}
                          type="number"
                          step="0.01"
                          aria-invalid={!!errors.discountAmount}
                          className="max-w-[150px]"
                        />
                        <span className="text-gray-600">
                          off the order total
                        </span>
                        <Info className="w-4 h-4 text-gray-400" />
                        <ValidationError
                          message={errors.discountAmount?.message}
                        />
                      </div>
                    </div>
                  )}

                  {/* Minimum Purchase */}
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-6">
                    <Label className="text-right text-gray-700">
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
                    <Label className="text-right text-gray-700 pt-2">
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
                    <Label className="text-right text-gray-700">
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
                    <Label className="text-right text-gray-700">Enabled</Label>
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
                    <Label className="text-right text-gray-700">
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
                    <Label className="text-right text-gray-700 pt-2">
                      Applies to
                    </Label>
                    <div>
                      <RadioGroup
                        value={appliesToCategories ? "categories" : "products"}
                        onValueChange={(value) =>
                          setValue(
                            "appliesToCategories",
                            value === "categories",
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
                              <CategoryTreeSm
                                name="categoryIds"
                                showSelectAll
                                rules={{
                                  validate: (value) =>
                                    value?.length > 0 ||
                                    "Select at least one category",
                                }}
                              />
                              <ValidationError
                                message={errors.categoryIds?.message}
                                className="mt-1"
                              />
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
                    <Label className="text-right text-gray-700">
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
                    <Label className="text-right text-gray-700">
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
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting || isLoading}
              className="btn-outline-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn-primary flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditMode ? "Update Coupon Code" : "Create Coupon Code"}</>
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddCouponCode;
