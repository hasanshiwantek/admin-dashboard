"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import FulfillmentOptions from "../Fulfillment/FulfillmentOptions";
export default function StepThree({ data, onNext, step, setStep }: any) {
  // const methods = useForm({
  //   defaultValues: {
  //     ...data,
  //     destinationType: "billing", // default view
  //     shippingMethod: {
  //       provider: "none",
  //     },
  //     shipping: {
  //       firstName: data?.firstName || "",
  //       lastName: data?.lastName || "",
  //       companyName: data?.companyName || "",
  //       phoneNumber: data?.phoneNumber || "",
  //       address1: data?.address1 || "",
  //       address2: data?.address2 || "",
  //       city: data?.city || "",
  //       country: data?.country || "",
  //       state: data?.state || "",
  //       zip: data?.zip || "",
  //       saveToAddressBook: true,
  //     },
  //   },
  // });
  const { register, handleSubmit, setValue, watch } = useFormContext();
 const {  getValues } = useFormContext();


  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const onSubmit = (formData: any) => {
    const allValues = getValues();
    console.log("🚚 StepThree Submitted:");
    console.log("Shipping Info:", allValues.shipping);
    console.log("Shipping Method:", allValues.shippingMethod);
    console.log("Destination Type:", allValues.destinationType);
    console.log("Full Form Snapshot at Step 3:", allValues);
    // onNext(finalStep3Data);
      onNext(allValues);
    setStep(step + 1);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="p-10">
          <h1 className="!text-4xl !font-bold">Fulfillment</h1>
          <FulfillmentOptions />

          {/* This renders the correct form based on radio selection */}
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
  );
}



