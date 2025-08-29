"use client";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import OrderReview from "../OrderReview.tsx/OrderReview";
import { useRouter } from "next/navigation";
import { addOrder } from "@/redux/slices/orderSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { updateOrder } from "@/redux/slices/orderSlice";
import { useFormContext } from "react-hook-form";
export default function StepFour({
  data,
  onNext,
  step,
  setStep,
  isEditMode,
  orderId,
}: any) {
  const methods = useForm({
    defaultValues: {
      ...data,
      paymentMethod: "",
      customerComments: "",
      staffNotes: "",
    },
  });
  const dispatch = useAppDispatch();
const { handleSubmit, getValues } = useFormContext();
  const { reset } = methods;
  // ⚠️ This effect ensures that the form updates when data changes
  useEffect(() => {
    if (data) {
      reset({
        ...data,
        paymentMethod: data.paymentMethod || "",
        customerComments: data.customerComments || "",
        staffNotes: data.staffNotes || "",
      });
    }
  }, [data, reset]);
  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };

  const onSubmit = async () => {
      const values = getValues(); // ✅ collect all step data
    console.log("Final submitted data:", values);
    const finalPayload = {
      customerId: values.selectedCustomer?.id,
      billingInformation: {
        firstName: values.shipping?.firstName || "",
        lastName: values.shipping?.lastName || "",
        email: values?.selectedCustomer?.email || "",
        phone: values.shipping?.phoneNumber || "",
        companyName: values.shipping?.companyName || "",
        addressLine1: values.shipping?.address1 || "",
        addressLine2: values.shipping?.address2 || "",
        city: values.shipping?.city || "",
        state: values.shipping?.state || "",
        zip: values.shipping?.zip || "",
        country: values.shipping?.country || "",
        paymentMethod: values.paymentMethod || "",
        shippingMethod: values.shippingMethod?.provider || "none",
      },

      customerGroup: values.selectedCustomer?.customerGroup || "",
      receiveOffers: values.selectedCustomer?.receiveMarketingEmails || false,
      comments: values.customerComments || "",
      staffNotes: values.staffNotes || "",

      products:
        values.selectedProducts?.map((product: any) => ({
          productId: product.id,
          quantity: product.quantity || 1,
        })) || [],
    };

    try {
      let resultAction;
      if (isEditMode && orderId) {
        resultAction = await dispatch(
          updateOrder({ id: orderId, data: finalPayload })
        );
      } else {
        resultAction = await dispatch(addOrder({ data: finalPayload }));
      }

      if (
        addOrder.fulfilled.match(resultAction) ||
        updateOrder.fulfilled.match(resultAction)
      ) {
        router.push("/manage/orders/");
      } else {
        alert(resultAction.payload || "Order failed");
      }
    } catch (error) {
      alert("Unexpected error. Please try again.");
    }
  };

  return (
    // <FormProvider {...methods}>
      <form  onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {isEditMode ? "Update Order" : "Save"}
            </button>
          </div>
        </div>
      </form>
    // </FormProvider>
  );
}
