"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { getReviewById } from "@/redux/slices/reviewSlice";
import { Loader2 } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`w-5 h-5 ${s <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function PreviewReview() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [review, setReview] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await dispatch(getReviewById({ id: params?.id })).unwrap();
                setReview(result?.data || result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [params?.id]);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        </div>
    );

    return (
        <div className="text-sm font-sans">
            {/* ── Top bar ── */}
            <div className="bg-gray-200 px-3 py-2 text-gray-700 text-xs border-b border-gray-300">
                Preview Review{" "}
                <span
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() => window.close()}
                >
                    (Close Window)
                </span>
            </div>

            {/* ── Content ── */}
            <div className="p-5">
                {/* Title */}
                <h2 className="text-base font-bold text-gray-900 mb-1">
                    {review?.subject || review?.name}
                </h2>

                {/* Stars */}
                <StarRating rating={Number(review?.rating ?? 0)} />

                <hr className="my-3 border-gray-300" />

                {/* Product + Author */}
                <p className="text-gray-800 font-semibold text-sm mb-1">
                    <span className="font-bold">Product:</span>{" "}
                    {review?.product?.name || "-"}
                </p>
                <p className="text-gray-800 text-sm">
                    <span className="font-bold">Posted By:</span>{" "}
                    {review?.user?.name || review?.name || "-"}
                </p>

                <hr className="my-3 border-gray-300" />

                {/* Comment */}
                <p className="text-gray-700 text-sm">{review?.comment}</p>
            </div>
        </div>
    );
}