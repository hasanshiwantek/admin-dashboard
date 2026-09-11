"use client";
import { useEffect, useState } from "react";
import OrderReview from "../OrderReview.tsx/OrderReview";
import { useRouter } from "next/navigation";
import { addOrder, addOrderForNewCustomer } from "@/redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { updateOrder } from "@/redux/slices/orderSlice";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
export default function StepFour({ step, setStep, isEditMode, orderId }: any) {
  const dispatch = useAppDispatch();
  const { handleSubmit, getValues } = useFormContext();
  const [ipAddress, setIpAddress] = useState("");
  const { appliedCoupon, loading } = useAppSelector(
    (state: any) => state.order,
  );
  const router = useRouter();
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      router.push("/manage/orders/");
    }
  };
  const getDeviceType = () => {
    if (typeof window === "undefined") return "Dashboard (Desktop)";

    const userAgent = navigator.userAgent;

    if (/mobile/i.test(userAgent)) return "Dashboard (Mobile)";
    if (/tablet/i.test(userAgent)) return "Dashboard (Tablet)";

    return "Dashboard (Desktop)";
  };


  const onSubmit = async () => {
    const values = getValues(); // ✅ collect all step data

    const isNewCustomer = !values.selectedCustomer?.id;
    const isDraft = values.paymentMethod === "draft";
    const manualDiscount = Number(values.manualDiscount || 0);
    // Build payment method object
    const buildPaymentMethod = () => {
      const baseData = { method: values.paymentMethod || null };
      if (!values.paymentMethod) return baseData;

      switch (values.paymentMethod) {
        case "stripe":
        case "credit_card":
          return {
            ...baseData,
            cardType: "Credit Card (Via Stripe)",
            cardholderName: values.cardholderName,
            creditCardNo: values.creditCardNo,
            ccv2Value: values.ccv2Value,
            expirationMonth: values.expirationMonth ? values.expirationMonth : "Jan",
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
          return baseData;
      }
    };

    // Main payload function (keeps payload exactly as original)
    const finalPayload = (() => {
      if (isNewCustomer) {
        return {
          deviceType: getDeviceType(),
          email: values.email || "",
          password: values.password || "",
          password_confirmation: values.password_confirmation || "",
          firstName: values.billingFirstName || "",
          lastName: values.billingLastName || "",
          phone: values.billingPhoneNumber || "",
          companyName: values.billingCompanyName || "",
          customerGroup: values.customerGroup || "",
          "ipAddress": ipAddress,
          "couponCode": appliedCoupon?.couponCode,
          "discountAmount": appliedCoupon?.discountAmount,
          manualDiscount: manualDiscount,
          "billingAddress": { //billing address is same as billing address
            firstName: values.billingFirstName || "",
            lastName: values.billingLastName || "",
            email: values.selectedCustomer?.email || "",
            phone: values.billingPhoneNumber || "",
            companyName: values.billingCompanyName || "",
            addressLine1: values.billingAddress1 || "",
            addressLine2: values.billingAddress2 || "",
            city: values.billingCity || "",
            state: values.billingState || "",
            zip: values.billingZip || "",
            country: values.billingCountry || "",
          },
          billingInformation: { //shipping address is same as billing address
            "firstName": values?.shipping?.firstName,
            "lastName": values?.shipping?.lastName,
            "companyName": values?.shipping?.companyName,
            "email": values.selectedCustomer?.email,
            "phone": values?.shipping?.phoneNumber,
            "addressLine1": values?.shipping?.address1,
            "addressLine2": values?.shipping?.address2,
            "city": values?.shipping?.city,
            "state": values?.shipping?.state,
            "zip": values?.shipping?.zip,
            "country": values?.shipping?.country,
          },
          isDraft,
          paymentMethod: buildPaymentMethod(),
          comments: values.customerComments || "",
          staffNotes: values.staffNotes || "",
          shippingMethod: {
            method_id: values.shippingMethod?.method_id ?? null,
            method_type: values.shippingMethod?.method_type || values.shippingMethod?.service_type || "",
            display_name: values.shippingMethod?.display_name || values.shippingMethod?.method || "",
            total_charge: Number(values.shippingMethod?.total_charge ?? values.shippingMethod?.cost ?? 0),
            currency: values.shippingMethod?.currency || "USD",
            transit_days: values.shippingMethod?.transit_days ?? null,
            delivery_date: values.shippingMethod?.delivery_date ?? null,
            service_type: values.shippingMethod?.service_type || "",
            is_fedex: !!values.shippingMethod?.is_fedex,
          },
          products:
            values.selectedProducts?.map((product: any) => ({
              productId: product.id,
              quantity: product.quantity || 1,
              price: Number(product.price ?? product.Price ?? 0),
            })) || [],
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
        return {
          isDraft,
          customerId: values.selectedCustomer?.id,
          deviceType: getDeviceType(),
          userType: null,
          "ipAddress": ipAddress,
          comments: values.customerComments || "",
          staffNotes: values.staffNotes || "",
          "couponCode": appliedCoupon?.couponCode,
          "discountAmount": appliedCoupon?.discountAmount,
          manualDiscount: manualDiscount,
          "billingAddress": { //billing address is same as billing address
            firstName: values.billingFirstName || "",
            lastName: values.billingLastName || "",
            email: values.selectedCustomer?.email || "",
            phone: values.billingPhoneNumber || "",
            companyName: values.billingCompanyName || "",
            addressLine1: values.billingAddress1 || "",
            addressLine2: values.billingAddress2 || "",
            city: values.billingCity || "",
            state: values.billingState || "",
            zip: values.billingZip || "",
            country: values.billingCountry || "",
          },
          billingInformation: { //shipping address is same as billing address
            "firstName": values?.shipping?.firstName,
            "lastName": values?.shipping?.lastName,
            "companyName": values?.shipping?.companyName,
            "email": values.selectedCustomer?.email,
            "phone": values?.shipping?.phoneNumber,
            "addressLine1": values?.shipping?.address1,
            "addressLine2": values?.shipping?.address2,
            "city": values?.shipping?.city,
            "state": values?.shipping?.state,
            "zip": values?.shipping?.zip,
            "country": values?.shipping?.country,
          },
          paymentMethod: buildPaymentMethod(),
          shippingMethod: {
            method_id: values.shippingMethod?.method_id ?? null,
            method_type: values.shippingMethod?.method_type || values.shippingMethod?.service_type || "",
            display_name: values.shippingMethod?.display_name || values.shippingMethod?.method || "",
            total_charge: Number(values.shippingMethod?.total_charge ?? values.shippingMethod?.cost ?? 0),
            currency: values.shippingMethod?.currency || "USD",
            transit_days: values.shippingMethod?.transit_days ?? null,
            delivery_date: values.shippingMethod?.delivery_date ?? null,
            service_type: values.shippingMethod?.service_type || "",
            is_fedex: !!values.shippingMethod?.is_fedex,
          },
          "isSaveAddressForBilling": values.saveAddress == "on" ? true : false,
          "isSaveAddressForShipping": values?.shipping?.saveToAddressBook ? true : false,
          products:
            values.selectedProducts?.map((product: any) => ({
              productId: product.id,
              quantity: product.quantity || 1,
              price: Number(product.price ?? product.Price ?? 0),
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

    try {
      let resultAction: any;

      if (isEditMode && orderId) {
        resultAction = await dispatch(
          updateOrder({ id: orderId, data: finalPayload })
        );
      } else if (isNewCustomer) {
        resultAction = await dispatch(
          addOrderForNewCustomer({ data: finalPayload })
        );
      } else {
        resultAction = await dispatch(addOrder({ data: finalPayload }));
      }

      if (
        addOrder.fulfilled.match(resultAction) ||
        updateOrder.fulfilled.match(resultAction) ||
        addOrderForNewCustomer.fulfilled.match(resultAction)
      ) {
        setTimeout(() => {
          window.location.href = "/manage/orders";
        }, 2000);
      } else {
        toast.error(resultAction.payload || "Order failed")

      }
    } catch (error) {
      toast.error("Unexpected error. Please try again.")
    }
  };
  useEffect(() => {
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip));
  }, []);
  return (
    // <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="p-10">
        <OrderReview step={step} setStep={setStep} />
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
