"use client";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import FulfillmentOptions from "../Fulfillment/FulfillmentOptions";
export default function StepThree({  step, setStep }: any) {
  const { register, handleSubmit, setValue, watch } = useFormContext();
  const { getValues } = useFormContext();
  const destinationType = watch("destinationType");




  useEffect(() => {
    if (destinationType === "single") {
      const {
        firstName, lastName, companyName, phoneNumber, address1,
        address2, city, country, state, zip
      } = getValues();

      setValue("shipping", {
        firstName, lastName, companyName, phoneNumber,
        address1, address2, city, country, state, zip,
        saveToAddressBook: true,
      });
    }
  }, [destinationType]);

  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const onSubmit = () => {
    console.log("Step 3 Submitted", getValues());
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
