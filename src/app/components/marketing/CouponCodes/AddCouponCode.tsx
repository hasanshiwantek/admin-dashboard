
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
  createCoupon,
  getCouponById,
  updateCouponCode,
} from "@/redux/slices/marketingSlice";

import { generateUniqueCode } from "@/lib/utils";
import { DefaultCouponCodeFormValues, values } from "./constant";
import { CouponCodeForm } from "./types";
import { CouponCodeSchema } from "@/validations/formValidations";

import AppTabs from "@/components/ui/AppTabs/AppTabs";
import Form from "@/components/form/Form";

import GeneralCouponTab from "./GeneralCouponTab";
import AdvancedCouponTab from "./AdvancedCouponTab";
import PageTitle from "@/components/ui/PageTitle";
import { mapCouponDataToForm } from "./utils";

const AddCouponCode = () => {
  const params = useParams();
  const couponId = params?.id;
  const isEditMode = !!couponId;


  const random = values[Math.floor(Math.random() * values.length)];

  const methods = useForm<CouponCodeForm>({
    resolver: yupResolver(CouponCodeSchema),
    defaultValues: {
      ...DefaultCouponCodeFormValues,
      couponCode: generateUniqueCode(random),
    },
  });

  const { watch, setValue, reset, control } = methods;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch coupon data when editing
  useEffect(() => {
    if (isEditMode && couponId) {
      fetchCouponData();
    }
  }, [couponId, isEditMode]);

  const fetchCouponData = async () => {
    setIsLoading(true);

    try {
      const result = await dispatch(
        getCouponById({ id: couponId }),
      ).unwrap();

      const couponData = result?.couponcode || result?.data;

      if (couponData) {
          reset(mapCouponDataToForm(couponData));
      }
    } catch (error: any) {
      console.error("Error fetching coupon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create or update coupon
  const onSubmit = async (data: CouponCodeForm) => {
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        const result = await dispatch(
          updateCouponCode({
            id: couponId,
            data,
          }),
        ).unwrap();

        console.log("Coupon updated successfully:", result);
      } else {
        const result = await dispatch(
          createCoupon({ data }),
        ).unwrap();

        console.log("Coupon created successfully:", result);
      }

      setTimeout(() => {
        router.push("/manage/marketing/coupon-codes");
      }, 2000);
    } catch (error: any) {
      console.error(
        `Error ${
          isEditMode ? "updating" : "creating"
        } coupon:`,
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keep both tab components in the AppTabs configuration
  const tabs = [
    {
      key: "general",
      label: "General",
      content: (
        <GeneralCouponTab
          control={control}
          watch={watch}
        />
      ),
    },
    // {
    //   key: "advanced",
    //   label: "Advanced",
    //   content: (
    //     <AdvancedCouponTab
    //       watch={watch}
    //       setValue={setValue}
    //     />
    //   ),
    // },
  ];

  const handleCancel = () => {
    if (isSubmitting || isLoading) return;

    router.push("/manage/marketing/coupon-codes");
  };

  // Loading state for edit mode
  if (isEditMode && isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">
            Loading coupon data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="p-10 border-b">
        <PageTitle
  title={isEditMode ? "Edit coupon code" : "Create a coupon code"}
  description={
    isEditMode
      ? "Update the coupon code details below."
      : "Coupon codes allow you to provide customers with discounts on products available for purchase from your store. Fill out the form below to create a unique coupon code."
  }
  hideActionButton
  containerClassName="mb-6"
  textContainerClassName="mb-0 gap-2"
  titleClassName="font-light! text-3xl! 2xl:text-5xl! text-gray-800!"
/>
      </div>

      <Form
        form={methods}
        onSubmit={onSubmit}
        footer={{
          submitText: isEditMode
            ? "Update Coupon Code"
            : "Create Coupon Code",
          onCancel: handleCancel,
          loading:
            isSubmitting || methods.formState.isSubmitting,
          disabled: isLoading || isSubmitting,
        }}
        className="max-w-full"
        bodyClassName="p-10"
      >
        <div className="p-10">
          <AppTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="underline"
            maxVisibleTabs={2}
            className="w-full"
            tabClassName="px-6 py-3 text-[16px]!"
            activeTabClassName="border-b-2 border-blue-600"
            contentClassName="mt-6"
          />
        </div>
      </Form>
    </div>
  );
};

export default AddCouponCode;
