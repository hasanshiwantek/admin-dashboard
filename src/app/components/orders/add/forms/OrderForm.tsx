"use client";
import { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepTracker from "./StepTracker";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { fetchOrderById } from "@/redux/slices/orderSlice"; // ← create this thunk
import { useForm, FormProvider } from "react-hook-form";
export default function OrderForm({ orderId }: { orderId: string }) {
  const methods = useForm(); // ⬅️ this controls ALL steps
  const { reset } = methods;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (orderId) {
      setIsEditMode(true);
      dispatch(fetchOrderById({ orderId })).then((res) => {
        if (res.payload) {
          const order = res.payload.data;
          console.log("Selected Order Details: ", order);

          // Transform API response to match your form structure
          const transformed = {
            selectedCustomer: order.customer,
            email: order.customer.email,
            firstName: order.billingInformation?.firstName || "",
            lastName: order.billingInformation?.lastName || "",
            companyName: order.billingInformation?.companyName || "",
            phoneNumber: order.billingInformation?.phone || "",
            address1: order.billingInformation?.addressLine1 || "",
            address2: order.billingInformation?.addressLine2 || "",
            city: order.billingInformation?.city || "",
            state: order.billingInformation?.state || "",
            zip: order.billingInformation?.zip || "",
            country: order.billingInformation?.country || "",
            selectedProducts: order.products.map((p: any) => ({
              id: p.id,
              quantity: p.qty || p.quantity,
              name: p.name,
              sku: p.sku,
              price: p.price,
              image: p.image,
            })),
            shippingMethod: {
              provider: order.billingInformation?.shippingMethod || "none",
            },
            paymentMethod: order.billingInformation?.paymentMethod || "",
            customerComments: order.comments || "",
            staffNotes: order.staffNotes || "",
          };

          reset(transformed); // ⬅️ populate form for all steps
        }
      });
    }
  }, [orderId]);

  return (
    <div>
      <FormProvider {...methods}>
        <StepTracker currentStep={step} />
        {step === 1 && (
          <StepOne step={step} setStep={setStep} isEditMode={isEditMode} />
        )}
        {step === 2 && <StepTwo step={step} setStep={setStep} />}
        {step === 3 && <StepThree step={step} setStep={setStep} />}
        {step === 4 && (
          <StepFour
            step={step}
            setStep={setStep}
            isEditMode={isEditMode}
            orderId={orderId}
          />
        )}
      </FormProvider>
    </div>
  );
}
