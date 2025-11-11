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
export default function StepFour({ step, setStep, isEditMode, orderId }: any) {
  const dispatch = useAppDispatch();
  const { handleSubmit, getValues } = useFormContext();
  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };

  const onSubmit = async () => {
    const values = getValues(); // ✅ collect all step data
    console.log("Final submitted data:", values);
    // Build the paymentData object
    const paymentMethod = (() => {
      const baseData = { method: values.paymentMethod || null };
      if (!values.paymentMethod) return baseData;

      switch (values.paymentMethod) {
        case "stripe":
        case "card":
          return {
            ...baseData,
            cardType: values.cardType,
            cardholderName: values.cardholderName,
            creditCardNo: values.creditCardNo,
            ccv2Value: values.ccv2Value,
            expirationMonth: values.expirationMonth,
            expirationYear: values.expirationYear,
            emailInvoice: values.emailInvoice ?? true,
          };

        case "cash":
        case "bank":
          return {
            ...baseData,
            description: values.paymentDescription,
            emailInvoice: values.emailInvoiceManual ?? true,
          };

        case "draft":
        default:
          return baseData; // No extra fields
      }
    })();
    // const finalPayload = {
    //   customerId: values.selectedCustomer?.id || null,
    //   billingInformation: {
    //     firstName: values?.firstName || "",
    //     lastName: values?.lastName || "",
    //     email: values?.selectedCustomer?.email || "",
    //     phone: values?.phoneNumber || "",
    //     companyName: values?.companyName || "",
    //     addressLine1: values?.address1 || "",
    //     addressLine2: values?.address2 || "",
    //     city: values?.city || "",
    //     state: values?.state || "",
    //     zip: values?.zip || "",
    //     country: values?.country || "",
    //     paymentMethod: values.paymentMethod || "",
    //     shippingMethod: values.shippingMethod?.provider || "none",
    //   },
    //   paymentMethod,
    //   customerGroup: values.selectedCustomer?.customerGroup || "",
    //   receiveOffers: values.selectedCustomer?.receiveMarketingEmails || false,
    //   comments: values.customerComments || "",
    //   staffNotes: values.staffNotes || "",

    //   products:
    //     values.selectedProducts?.map((product: any) => ({
    //       productId: product.id,
    //       quantity: product.quantity || 1,
    //     })) || [],
    // };

    const finalPayload = (() => {
      const isNewCustomer = !values.selectedCustomer?.id;

      if (isNewCustomer) {
        // Payload for a new customer
        return {
          customerId: null,
          email: values.email || "",
          password: values.password || "",
          password_confirmation: values.password_confirmation || "",
          firstName: values.firstName || "",
          lastName: values.lastName || "",
          phone: values.phoneNumber || "",
          companyName: values.companyName || "",
          customerGroup: values.customerGroup || "",
          receiveOffers: values.exclusiveOffers === "on",

          billingInformation: {
            firstName: values.firstName || "",
            lastName: values.lastName || "",
            phone: values.phoneNumber || "",
            companyName: values.companyName || "",
            addressLine1: values.address1 || "",
            addressLine2: values.address2 || "",
            city: values.city || "",
            state: values.state || "",
            zip: values.zip || "",
            country: values.country || "",
            paymentMethod: values.paymentMethod || "",
            shippingMethod: values.shippingMethod?.provider || "none",
          },

          // Payment details (for card/stripe)
          paymentMethod: (() => {
            const baseData = { method: values.paymentMethod || null };
            if (!values.paymentMethod) return baseData;

            switch (values.paymentMethod) {
              case "stripe":
              case "card":
                return {
                  ...baseData,
                  cardType: values.cardType || "",
                  cardholderName: values.cardholderName || "",
                  creditCardNo: values.creditCardNo || "",
                  ccv2Value: values.ccv2Value || "",
                  expirationMonth: values.expirationMonth || "",
                  expirationYear: values.expirationYear || "",
                  emailInvoice: values.emailInvoice ?? true,
                };

              case "cash":
              case "bank":
                return {
                  ...baseData,
                  description: values.paymentDescription || "",
                  emailInvoice: values.emailInvoiceManual ?? true,
                };

              case "draft":
              default:
                return baseData;
            }
          })(),

          comments: values.customerComments || "",
          staffNotes: values.staffNotes || "",

          // Main products
          products:
            values.selectedProducts?.map((product: any) => ({
              productId: product.id,
              quantity: product.quantity || 1,
            })) || [],

          // Shipping destinations (for multiple addresses)
          shippingDestinations:
            values.shippingDestinations?.map((dest: any) => ({
              address: {
                firstName: dest.address.firstName || values.firstName || "",
                lastName: dest.address.lastName || values.lastName || "",
                companyName:
                  dest.address.companyName || values.companyName || "",
                addressLine1: dest.address.address1 || values.address1 || "",
                addressLine2: dest.address.address2 || values.address2 || "",
                city: dest.address.city || values.city || "",
                state: dest.address.state || values.state || "",
                zip: dest.address.zip || values.zip || "",
                country: dest.address.country || values.country || "",
                phone: dest.address.phoneNumber || values.phoneNumber || "",
              },
              products:
                dest.products?.map((p: any) => ({
                  productId: p.id,
                  quantity: p.quantity || 1,
                })) ||
                values.selectedProducts?.map((product: any) => ({
                  productId: product.id,
                  quantity: product.quantity || 1,
                })) ||
                [],
            })) || [],
        };
      } else {
        // Existing customer payload
        return {
          customerId: values.selectedCustomer?.id || null,
          billingInformation: {
            firstName: values.firstName || "",
            lastName: values.lastName || "",
            email: values.selectedCustomer?.email || "",
            phone: values.phoneNumber || "",
            companyName: values.companyName || "",
            addressLine1: values.address1 || "",
            addressLine2: values.address2 || "",
            city: values.city || "",
            state: values.state || "",
            zip: values.zip || "",
            country: values.country || "",
            paymentMethod: values.paymentMethod || "",
            shippingMethod: values.shippingMethod?.provider || "none",
          },
          paymentMethod: (() => {
            const baseData = { method: values.paymentMethod || null };
            if (!values.paymentMethod) return baseData;

            switch (values.paymentMethod) {
              case "stripe":
              case "card":
                return {
                  ...baseData,
                  cardType: values.cardType || "",
                  cardholderName: values.cardholderName || "",
                  creditCardNo: values.creditCardNo || "",
                  ccv2Value: values.ccv2Value || "",
                  expirationMonth: values.expirationMonth || "",
                  expirationYear: values.expirationYear || "",
                  emailInvoice: values.emailInvoice ?? true,
                };

              case "cash":
              case "bank":
                return {
                  ...baseData,
                  description: values.paymentDescription || "",
                  emailInvoice: values.emailInvoiceManual ?? true,
                };

              case "draft":
              default:
                return baseData;
            }
          })(),
          customerGroup: values.selectedCustomer?.customerGroup || "",
          receiveOffers:
            values.selectedCustomer?.receiveMarketingEmails || false,
          comments: values.customerComments || "",
          staffNotes: values.staffNotes || "",
          shippingMethod: values.shippingMethod,

          products:
            values.selectedProducts?.map((product: any) => ({
              productId: product.id,
              quantity: product.quantity || 1,
            })) || [],

          shippingDestinations:
            values.shippingDestinations?.map((dest: any) => ({
              address: {
                firstName: dest.address.firstName || "",
                lastName: dest.address.lastName || "",
                companyName: dest.address.companyName || "",
                addressLine1: dest.address.address1 || "",
                addressLine2: dest.address.address2 || "",
                city: dest.address.city || "",
                state: dest.address.state || "",
                zip: dest.address.zip || "",
                country: dest.address.country || "",
                phone: dest.address.phoneNumber || "",
              },
              products:
                dest.products?.map((p: any) => ({
                  productId: p.id,
                  quantity: p.quantity || 1,
                })) || [],
            })) || [],
        };
      }
    })();

    console.log("Final payload data: ", finalPayload);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
