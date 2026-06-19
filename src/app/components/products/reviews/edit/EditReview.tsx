"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Loader2 } from "lucide-react";
import { getReviewById, updateReview } from "@/redux/slices/reviewSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useRouter, useParams } from "next/navigation";

interface ReviewFormData {
    name: string;
    userName: string;
    comment: string;
    email: string;
    approved: string;
    rating: string;
}

const RATING_OPTIONS = [
    { value: "1", label: "Terrible (1 Star)" },
    { value: "2", label: "Bad (2 Stars)" },
    { value: "3", label: "OK (3 Stars)" },
    { value: "4", label: "Good (4 Stars)" },
    { value: "5", label: "Excellent (5 Stars)" },
];

const EditReview = () => {
    const params = useParams();
    const reviewId = params?.id;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<ReviewFormData>({
        defaultValues: {
            name: "",
            comment: "",
            email: "",
            approved: "0",
            rating: "5",
        },
    });

    const { register, reset, handleSubmit } = methods;

    useEffect(() => {
        if (!reviewId) return;
        const fetchReview = async () => {
            setIsLoading(true);
            try {
                const result = await dispatch(getReviewById({ id: reviewId })).unwrap();
                const data = result?.data || result;
                if (data) {
                    reset({
                        name: data?.subject || "",
                        userName: data?.name || data?.user?.name,
                        // email: data.email || "",
                        comment: data.comment || "",
                        approved: String(data.approved ?? "0"),
                        rating: String(data.rating ?? "5"),
                    });
                }
            } catch (err) {
                console.error("Error fetching review:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReview();
    }, [reviewId]);

    const onSubmit = async (data: ReviewFormData) => {
        setIsSubmitting(true);
        try {
            const payload = {
                subject: data.name, //review title
                comment: data.comment, //comment
                name: data?.userName || "", //author name
                approved: data.approved === "1",   // ✅ string "1"/"0" → boolean true/false
                rating: Number(data.rating),
            };
            await dispatch(updateReview({ id: reviewId, data: payload })).unwrap();
             setTimeout(() => router.push("/manage/products/reviews"), 1000);
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
                    <p className="text-gray-600">Loading review...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col">

            {/* ── Page Header (outside white box) ── */}
            <div className="px-6 pt-6 pb-3">
                <h1 className="text-2xl font-normal text-gray-800">Edit Review</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Edit the review details in the form below.
                </p>
            </div>
            {/* Card Header */}
            <div className="px-6 py-4 border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">
                    Review Details
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
                                    htmlFor="name"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                                >
                                    Review Title:
                                </Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    className="w-[280px] h-8 text-sm border-gray-300"
                                />
                                <Info className="w-4 h-4 text-gray-400 shrink-0" />
                            </div>

                            {/* Review */}
                            <div className="flex items-start gap-3 mb-5">
                                <Label
                                    htmlFor="comment"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0 pt-1"
                                >
                                    Review:
                                </Label>
                                <textarea
                                    id="comment"
                                    {...register("comment")}
                                    rows={5}
                                    className="w-[280px] border border-gray-300 rounded-sm px-2 py-1 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                                />
                                <Info className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 mb-5">
                                <Label
                                    htmlFor="userName"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                                >
                                    Author:
                                </Label>
                                <Input
                                    id="userName"
                                    {...register("userName")}
                                    className="w-[280px] h-8 text-sm border-gray-300"
                                />
                                <Info className="w-4 h-4 text-gray-400 shrink-0" />
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-3 mb-5">
                                <Label
                                    htmlFor="approved"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                                >
                                    Status:
                                </Label>
                                <select
                                    id="approved"
                                    {...register("approved")}
                                    className="w-[180px] h-8 border border-gray-300 rounded-sm px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition bg-white"
                                >
                                    <option value="0">Pending</option>
                                    <option value="1">Approved</option>
                                </select>
                                <Info className="w-4 h-4 text-gray-400 shrink-0" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-2">
                                <Label
                                    htmlFor="rating"
                                    className="text-[12px] text-gray-600 text-right w-[110px] shrink-0"
                                >
                                    Rating:
                                </Label>
                                <select
                                    id="rating"
                                    {...register("rating")}
                                    className="w-[180px] h-8 border border-gray-300 rounded-sm px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition bg-white"
                                >
                                    {RATING_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* ── Footer inside card, right-aligned ── */}
                        <div className="flex justify-end gap-3 px-6 py-4  border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.push("/manage/products/reviews")}
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

export default EditReview;
