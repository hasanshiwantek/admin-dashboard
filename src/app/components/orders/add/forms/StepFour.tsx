"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import OrderReview from "../OrderReview.tsx/OrderReview";
import { useRouter } from "next/navigation";
import { addOrder } from "@/redux/slices/orderSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
export default function StepFour({ data, onNext, step, setStep }: any) {
  const methods = useForm({
    defaultValues: {
      ...data,
      paymentMethod: "",
      customerComments: "",
      staffNotes: "",
    },
  });
  const dispatch = useAppDispatch();

  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  // const handleSave = () => {
  //   const draft = methods.getValues();
  //   console.log("Saving draft:", draft);
  //   alert("Order Submitted Navigating to All Orders");
  //   setTimeout(() => {
  //      router.push("/manage/orders/");
  //   }, 700);
  // };
  const onSubmit = async (values: any) => {
    console.log("Final submitted data:", values);

    try {
      const resultAction = await dispatch(addOrder({ data: values }));

      if (addOrder.fulfilled.match(resultAction)) {
        console.log("Order placed successfully:", resultAction.payload);
        alert("Order Submitted. Navigating to All Orders");

        setTimeout(() => {
          router.push("/manage/orders/");
        }, 700);
      } else {
        // handle rejected case
        const errorMessage = resultAction.payload || "Order placement failed";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-10">
          <OrderReview />
        </div>
        <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
          <button
            type="button"
            className="btn-outline-primary"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="btn-outline-primary"
          >
            Cancel
          </button>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
