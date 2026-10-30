"use client";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";
import { Button } from "@/components/ui/Button";
import { REGEX } from "@/const/regex";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  addOrder,
  addOrderForNewCustomer,
  updateOrder,
} from "@/redux/slices/orderSlice";
import { StoreItem } from "@/types/types";
import { errorMessage } from "@/utils/message";
import { getFromStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import OrderReview from "../OrderReview.tsx/OrderReview";
import { buildOrderPricing, useOrderCalculate } from "../useOrderCalculate";

export default function StepFour({ step, setStep, isEditMode, orderId }: any) {
  const dispatch = useAppDispatch();
  const { handleSubmit, getValues } = useFormContext();
  const [ipAddress, setIpAddress] = useState("");
  const [orderPlaceCountry, setOrderPlaceCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { appliedCoupon } = useAppSelector((state: any) => state.order);
  const { currencies } = useAppSelector((state) => state.currency);
  const router = useRouter();
  // The order priced by the backend in the selected currency
  const calculation = useOrderCalculate();

  const handleCancel = () => {
    setShowCancelModal(true);
  };
  const getDeviceType = () => {
    const availableStores =
      (getFromStorage("availableStores") as StoreItem[] | null) || [];
    const selectedStoreId = Number(getFromStorage("storeId"));
    const selectedStore = availableStores.find((s) => s.id === selectedStoreId);
    if (typeof window === "undefined")
      return `${selectedStore?.name} (Manual order)`;

    const userAgent = navigator.userAgent;

    if (REGEX.MOBILE_USER_AGENT.test(userAgent))
      return `${selectedStore?.name} (Manual order)`;
    if (REGEX.TABLET_USER_AGENT.test(userAgent))
      return `${selectedStore?.name} (Manual order)`;

    return `${selectedStore?.name} (Manual order)`;
  };

  const onSubmit = async () => {
    const values = getValues(); // ✅ collect all step data
    const isNewCustomer = !values.selectedCustomer?.id;
    const isDraft = values.paymentMethod === "draft";
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
          return baseData;
      }
    };

    if (!values.paymentMethod) {
      errorMessage("Please select your payment method");
      return;
    }

    // The total isn't final until the backend has priced the order
    if (calculation.notReadyMessage) {
      errorMessage(calculation.notReadyMessage);
      return;
    }
    // Minor units (cents/pence) of the selected currency: the total the
    // backend priced, which the order is placed and charged at. Left out
    // when the backend can't price the order (custom products or prices,
    // custom shipping cost, several destinations).
    const amount =
      calculation.applies && calculation.quote
        ? { amount: calculation.quote.totalMinor }
        : {};

    const currency =
      currencies.find(({ code }) => code === values.selectedCurrency?.code) ??
      values.selectedCurrency;
    const orderPricing = {
      ...buildOrderPricing(values, currency, appliedCoupon),
      products: (values.selectedProducts ?? []).map((product: any) => ({
        product_id: Number(product.id),
        quantity: Number(product.quantity) || 1,
        ...(Number(product.actualPrice) !== Number(product.price)
          ? { price: Number(product.price ?? 0) }
          : {}),
      })),
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
          ipAddress,
          orderPlaceCountry,
          isSaveAddressForBilling: values.saveAddress ? true : false,
          isSaveAddressForShipping: values?.shipping?.saveToAddressBook
            ? true
            : false,
          emailInvoice: values.emailInvoice,
          billingAddress: {
            //billing address is same as billing address
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
          billingInformation: {
            //shipping address is same as billing address
            firstName: values?.shipping?.firstName,
            lastName: values?.shipping?.lastName,
            companyName: values?.shipping?.companyName,
            email: values.selectedCustomer?.email,
            phone: values?.shipping?.phoneNumber,
            addressLine1: values?.shipping?.address1,
            addressLine2: values?.shipping?.address2,
            city: values?.shipping?.city,
            state: values?.shipping?.state,
            zip: values?.shipping?.zip,
            country: values?.shipping?.country,
          },
          isDraft,
          ...orderPricing,
          ...amount,
          paymentMethod: buildPaymentMethod(),
          comments: values.customerComments || "",
          staffNotes: values.staffNotes || "",
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
          ...orderPricing,
          ...amount,
          customerId: values.selectedCustomer?.id,
          deviceType: getDeviceType(),
          userType: null,
          ipAddress,
          orderPlaceCountry,
          comments: values.customerComments || "",
          staffNotes: values.staffNotes || "",
          billingAddress: {
            //billing address is same as billing address
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
          billingInformation: {
            //shipping address is same as billing address
            firstName: values?.shipping?.firstName,
            lastName: values?.shipping?.lastName,
            companyName: values?.shipping?.companyName,
            email: values.selectedCustomer?.email,
            phone: values?.shipping?.phoneNumber,
            addressLine1: values?.shipping?.address1,
            addressLine2: values?.shipping?.address2,
            city: values?.shipping?.city,
            state: values?.shipping?.state,
            zip: values?.shipping?.zip,
            country: values?.shipping?.country,
          },
          paymentMethod: buildPaymentMethod(),
          isSaveAddressForBilling: values.saveAddress ? true : false,
          isSaveAddressForShipping: values?.shipping?.saveToAddressBook
            ? true
            : false,
          emailInvoice: values?.emailInvoice,
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

    setLoading(true);
    try {
      let resultAction: any;

      if (isEditMode && orderId) {
        resultAction = await dispatch(
          updateOrder({ id: orderId, data: finalPayload }),
        );
      } else if (isNewCustomer) {
        resultAction = await dispatch(
          addOrderForNewCustomer({ data: finalPayload }),
        );
      } else {
        resultAction = await dispatch(addOrder({ data: finalPayload }));
      }

      if (
        addOrder.fulfilled.match(resultAction) ||
        updateOrder.fulfilled.match(resultAction) ||
        addOrderForNewCustomer.fulfilled.match(resultAction)
      ) {
        const customerId =
          resultAction?.payload?.data[0]?.customer?.id ||
          resultAction?.payload?.data?.customer?.id;

        // Temporary comment
        // if (values.saveAddress == true) {
        //   const billingAddress = {
        //     customer_id: Number(customerId),
        //     firstName: values.billingFirstName,
        //     lastName: values.billingLastName,
        //     phoneNumber: values.billingPhoneNumber,
        //     companyName: values.billingCompanyName,
        //     addressLine1: values.billingAddress1,
        //     address_line_2: values.billingAddress2,
        //     city: values.billingCity,
        //     state: values.billingState,
        //     zip: values.billingZip,
        //     country: values.billingCountry,
        //   };
        //   await dispatch(addCustomerAddress({ data: billingAddress }));
        // }
        // if (values?.shipping?.saveToAddressBook == true) {
        //   const billingInformation = {
        //     //shipping address is same as billing address
        //     customer_id: Number(customerId),
        //     firstName: values?.shipping?.firstName,
        //     lastName: values?.shipping?.lastName,
        //     companyName: values?.shipping?.companyName,
        //     phoneNumber: values?.shipping?.phoneNumber,
        //     addressLine1: values?.shipping?.address1,
        //     address_line_2: values?.shipping?.address2,
        //     city: values?.shipping?.city,
        //     state: values?.shipping?.state,
        //     zip: values?.shipping?.zip,
        //     country: values?.shipping?.country,
        //   };
        //   await dispatch(addCustomerAddress({ data: billingInformation }));
        // }

        setTimeout(() => {
          if (isDraft) {
            window.location.href = "/manage/orders/draft";
          } else {
            window.location.href = "/manage/orders";
          }
        }, 1000);
      } else {
        // errorMessage(resultAction.payload || "Order failed")
      }
    } catch (error) {
      errorMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip));
    fetch("/api/detect-country")
      .then((res) => res.json())
      .then((data) => setOrderPlaceCountry(data?.country_code));
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="p-10">
        <OrderReview step={step} setStep={setStep} calculation={calculation} />
      </div>
      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <Button
          variant="outline"
          size="md"
          type="button"
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>

        <Button
          variant="outline"
          size="md"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <div className="flex gap-4">
          {isEditMode ? (
            <Button variant="primary" size="md" type="submit">
              Update Order
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              disabled={loading}
              type="submit"
            >
              {loading ? "Save..." : "Save"}
            </Button>
          )}
        </div>
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
