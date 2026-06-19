"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Loader2 } from "lucide-react";
import { getReviewById, updateReview } from "@/redux/slices/reviewSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter, useParams } from "next/navigation";
import { getMessageById, updateMessage } from "@/redux/slices/orderMessageSlice";

interface ReviewFormData {
    message: string;
    subject: string;
    email: string
}

const RATING_OPTIONS = [
    { value: "1", label: "Terrible (1 Star)" },
    { value: "2", label: "Bad (2 Stars)" },
    { value: "3", label: "OK (3 Stars)" },
    { value: "4", label: "Good (4 Stars)" },
    { value: "5", label: "Excellent (5 Stars)" },
];

const EditMessage = () => {
    const params = useParams();
    const messageId = params?.messageId;
    const orderId = params?.orderId;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<ReviewFormData>({
        defaultValues: {
            message: "",
            subject: "",
        },
    });

    const { register, reset, handleSubmit } = methods;

    useEffect(() => {
        if (!messageId) return;
        const fetchReview = async () => {
            setIsLoading(true);
            try {
                const result = await dispatch(getMessageById({ id: messageId })).unwrap();
                const data = result?.data || result;
                if (data) {

                    reset({
                        email: data?.customer?.email || "",
                        subject: data?.subject,
                        message: data.message || "",
                    });
                }
            } catch (err) {
                console.error("Error fetching review:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReview();
    }, [messageId]);

    const onSubmit = async (data: ReviewFormData) => {
        setIsSubmitting(true);
        try {
            const payload = {
                "subject": data.subject,
                "message": data.message,
                "is_read": true
            }
            await dispatch(updateMessage({ id: messageId, data: payload })).unwrap();
            setTimeout(() => router.push(`/manage/orders/message/${orderId}`), 1000);
        } catch (err) {
            console.error("Error updating review:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Loading message...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col">

            {/* ── Page Header (outside white box) ── */}
            <div className="px-6 pt-6 pb-3">
                <h1 className="text-2xl font-normal text-gray-800">Edit Message</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Edit the details of the message below. When you click 'Save' the message will not be re-emailed to the customer, but is still visible from their account.
                </p>
            </div>
            {/* Card Header */}
            <div className="px-6 py-4 border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">
                    Message Details
                </h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 px-6 pb-6">

                    {/* ── White Card ── */}
                    <div className="bg-white border border-gray-200 rounded-sm">

                        {/* Form Fields */}
                        <div className="px-8 py-6">

                            {/* Review Title */}
                            <div className="flex items-center gap-3 mb-5">
                                <Label
                                    htmlFor="email"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                                >
                                    From:
                                </Label>
                                <Input
                                    id="email"
                                    {...register("email")}
                                    disabled={true}
                                    className="w-[280px] h-8 text-sm border-gray-300"
                                />
                            </div>
                            {/* Author */}
                            <div className="flex items-center gap-3 mb-5">
                                <Label
                                    htmlFor="subject"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                                >
                                    Subject:
                                </Label>
                                <Input
                                    id="subject"
                                    {...register("subject")}
                                    className="w-[280px] h-8 text-sm border-gray-300"
                                />
                            </div>
                            {/* Review */}
                            <div className="flex items-start gap-3 mb-5">
                                <Label
                                    htmlFor="message"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0 pt-1"
                                >
                                    Message:
                                </Label>
                                <textarea
                                    id="message"
                                    {...register("message")}
                                    rows={5}
                                    className="w-[280px] border border-gray-300 rounded-sm px-2 py-1 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                                />
                            </div>
                        </div>

                        {/* ── Footer inside card, right-aligned ── */}
                        <div className="flex justify-end gap-3 px-6 py-4  border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.push(`/manage/orders/message/${orderId}`)}
                                disabled={isSubmitting || isLoading}
                                className="text-sm text-blue-600 hover:underline px-3 py-1 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-1.5 rounded-sm flex items-center gap-2 disabled:opacity-50 transition"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-3 w-3 animate-spin" />
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

export default EditMessage;