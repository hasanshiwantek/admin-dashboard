"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import FulfillmentOptions from "../Fulfillment/FulfillmentOptions";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { Button } from "@/components/ui/Button";

export default function StepThree({ step, setStep }: any) {
  const { handleSubmit, setValue, watch, getValues, resetField } =
    useFormContext();
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const destinationType = watch("destinationType");

  // ✅ Ensure default structure exists
  useEffect(() => {
    const allValues = getValues();
    if (!allValues.shippingDestinations) {
      setValue("shippingDestinations", []);
    }
    if (!allValues.destinationForm) {
      setValue("destinationForm", {});
    }
  }, [setValue, getValues]);

  // ✅ Automatically populate "destinationForm" if single is chosen
  useEffect(() => {
    if (destinationType === "single") {
      const {
        firstName,
        lastName,
        companyName,
        phoneNumber,
        address1,
        address2,
        city,
        country,
        state,
        zip,
      } = getValues();

      setValue("destinationForm", {
        firstName,
        lastName,
        companyName,
        phoneNumber,
        address1,
        address2,
        city,
        country,
        state,
        zip,
        saveToAddressBook: true,
      });
    }

    // If user switches from single → multiple, keep previous multipleDestinations
    if (destinationType === "multiple") {
      const allValues = getValues();
      if (!Array.isArray(allValues.shippingDestinations)) {
        setValue("shippingDestinations", []);
      }
    }
  }, [destinationType, getValues, setValue]);

 const handleCancel = () => {
  setShowCancelModal(true);
};

  const onSubmit = () => {
    const values = getValues();


    if (values.destinationType === "multiple") {
      console.log("📦 Multiple Destinations:", values.shippingDestinations);
    } else {
      console.log("🏠 Single Destination Form:", values.destinationForm);
    }

    // ✅ Prepare clean payload for next step / backend
    const payload = {
      destinationType: values.destinationType,
      customer: values.selectedCustomer || null,
      destinations:
        values.destinationType === "multiple"
          ? values.shippingDestinations
          : [values.destinationForm],
    };

    setStep(step + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="p-10">
        <h1 className="!text-4xl !font-bold">Fulfillment</h1>
        {/* ✅ FulfillmentOptions handles radio + address forms */}
        <FulfillmentOptions />
      </div>

      {/* Footer buttons */}
      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <Button
          variant="outline"
          size="md"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          variant="outline"
          size="md"
          type="button"
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>

        <Button variant="primary" size="md" type="submit">
          Next
        </Button>
      </div>
      <ConfirmationModal
  open={showCancelModal}
  onOpenChange={setShowCancelModal}
  variant="warning"
  title="Cancel order?"
  description="Are you sure you want to cancel this order?"
  onConfirm={() => {
    setShowCancelModal(false);
    router.push("/manage/orders/");
  }}
/>
    </form>
  );
}
