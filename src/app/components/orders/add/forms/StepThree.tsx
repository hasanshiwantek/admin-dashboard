"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import FulfillmentOptions from "../Fulfillment/FulfillmentOptions";

export default function StepThree({ step, setStep }: any) {
  const { handleSubmit, setValue, watch, getValues, resetField } =
    useFormContext();
  const router = useRouter();

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
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };

  const onSubmit = () => {
    const values = getValues();

    console.log("🧾 Step 3 Submitted Values:", values);

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

    console.log("🚀 Final Step3 Payload to Submit:", payload);

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
