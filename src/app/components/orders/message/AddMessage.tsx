"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Loader2 } from "lucide-react";
import { getReviewById, updateReview } from "@/redux/slices/reviewSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter, useParams } from "next/navigation";
import {
  fetchOrderMessages,
  getCustomerDetailById,
  sendOrderMessage,
} from "@/redux/slices/orderMessageSlice";

interface ReviewFormData {
  message: string;
  subject: string;
  email: string;
}

const RATING_OPTIONS = [
  { value: "1", label: "Terrible (1 Star)" },
  { value: "2", label: "Bad (2 Stars)" },
  { value: "3", label: "OK (3 Stars)" },
  { value: "4", label: "Good (4 Stars)" },
  { value: "5", label: "Excellent (5 Stars)" },
];

const AddMessage = () => {
  const params = useParams();
  const orderId = params?.orderId as string;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, order, customerDetail } = useAppSelector(
    (state: any) => state.orderMessage,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ReviewFormData>({
    defaultValues: {
      message: "",
      subject: "",
    },
  });

  const { register, reset, handleSubmit } = methods;

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        order_id: Number(orderId),
        subject: data.subject,
        message: data.message,
      };
      await dispatch(sendOrderMessage({ data: payload })).unwrap();
      setTimeout(() => router.push(`/manage/orders/message/${orderId}`), 1000);
    } catch (err) {
      console.error("Error updating review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    const fetchOrders = async () => {
      dispatch(getCustomerDetailById({ id: orderId }));
    };
    fetchOrders();
  }, [orderId]);

  useEffect(() => {
    if (customerDetail?.email) {
      reset({
        email: customerDetail?.email,
      });
    }
  }, [customerDetail?.email]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading Message...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* ── Page Header (outside white box) ── */}
      <div className="px-6 pt-6 pb-3">
        <h1 className="!text-[30px] font-normal text-[#34313F] mb-2">Send a Message</h1>
        <p className="!text-[15px] text-gray-500 mt-1">
          
Enter the message to send to the customer below. An email will be sent to them containing the message and a link to reply.
        </p>
      </div>
      {/* Card Header */}
      <div className="px-6 py-4 border-gray-200">
        <h2 className="!text-[24px] font-semibold text-[#34313F]">
          Message Details
        </h2>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 px-6 pb-6"
        >
          {/* ── White Card ── */}
          <div className="bg-white border border-gray-200 rounded-sm ">
            {/* Form Fields */}
            <div className="px-8 py-6">
              {/* Review Title */}
              <div className="flex items-center gap-3 mb-5">
                <Label
                  htmlFor="email"
                  className="text-[15px] text-gray-600 text-right w-[80px] shrink-0"
                >
                  From:
                </Label>
                <Input
                  id="email"
                  disabled={true}
                  {...register("email")}
                  className="!w-[380px] h-14 text-base !min-w-[380px] shrink-0 border-gray-300 bg-[#EBEBE4]"
                />
              </div>
              {/* Author */}
              <div className="flex items-center gap-3 mb-5">
                <Label
                  htmlFor="subject"
                  className="text-[15px] text-gray-600 text-right w-[80px] shrink-0"
                >
                  Subject:
                </Label>
                <Input
                  id="subject"
                  {...register("subject")}
                   className="!w-[380px] !min-w-[380px] shrink-0 h-14 !text-[14px] border-gray-300"
                />
              </div>
              {/* Review */}
              <div className="flex items-start gap-3 mb-5">
                <Label
                  htmlFor="message"
                  className="text-[15px] text-gray-600 w-[80px] shrink-0 pt-1"
                >
                  Message:
                </Label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  className="!w-[380px] h-[170px] border border-gray-300 rounded-sm px-2 py-1 !text-[16px] resize-y focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
            </div>

            {/* ── Footer inside card, right-aligned ── */}
            <div className="flex justify-end gap-4 px-6 py-4 border-gray-200">
              <button
                type="button"
                onClick={() => router.push(`/manage/orders/message/${orderId}`)}
                disabled={isSubmitting || isLoading}
                className="text-[12px] text-blue-600 hover: px-5 py-2.5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-7 py-2.5 min-w-[80px] rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddMessage;
