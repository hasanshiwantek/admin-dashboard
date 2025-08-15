"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import FulfillmentOptions from "../Fulfillment/FulfillmentOptions";
export default function StepThree({ data, onNext, step, setStep }: any) {
  const methods = useForm({
    defaultValues: {
      ...data,
      destinationType: "billing", // default view
      shippingMethod: {
        provider: "none",
      },
      shipping: {
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        companyName: data?.companyName || "",
        phoneNumber: data?.phoneNumber || "",
        address1: data?.address1 || "",
        address2: data?.address2 || "",
        city: data?.city || "",
        country: data?.country || "",
        state: data?.state || "",
        zip: data?.zip || "",
        saveToAddressBook: true,
      },
    },
  });
  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const onSubmit = (formData: any) => {
    const finalStep3Data = {
      ...formData,
    };

    console.log("Step3 data:", finalStep3Data);
    onNext(finalStep3Data);
    setStep(step + 1);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
        <div className="p-10">
          <h1 className="!text-4xl !font-bold">Fulfillment</h1>

          {/* This renders the correct form based on radio selection */}
          <FulfillmentOptions />
        </div>

        <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-outline-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-outline-primary"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
          <button type="submit" className="btn-primary">
            Next
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
