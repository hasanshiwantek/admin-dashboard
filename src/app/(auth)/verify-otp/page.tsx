"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setStoreId } from "@/redux/slices/configSlice";
import { verifyOtp } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/auth/ProtectedRoute";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ShieldCheck } from "lucide-react";

export default function VerifyOtpPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const stores = useSelector((state: RootState) => state.auth.stores);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { two_factor_type, two_factor_required, pending_token } = useSelector((state: RootState) => state.auth);
    const [twoFactorData, setTwoFactorData] = useState<any>(null);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(59);

    useEffect(() => {
        const twoFactor = {
            two_factor_type,
            two_factor_required,
            pending_token
        }
        setTwoFactorData(twoFactor)
    }, [two_factor_type, two_factor_required, pending_token])

    useEffect(() => {
        if (twoFactorData?.two_factor_type !== "authenticator") return;
        const now = Math.floor(Date.now() / 1000);
        setTimeLeft(30 - (now % 30));

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            setTimeLeft(30 - (now % 30));
        }, 1000);

        return () => clearInterval(interval);
    }, [twoFactorData]);

    const handleVerifyOtp = async () => {
        if (otp.length < 6) {
            setOtpError("Please enter a valid 6-digit code");
            return;
        }

        setOtpLoading(true);
        setOtpError("");
        const result = await dispatch(
            verifyOtp({ otp, pendingToken: twoFactorData!.pending_token })
        );

        setOtpLoading(false);

        if (verifyOtp.fulfilled.match(result)) {
            const { token, stores, expireAt, user } = result.payload;
            router.push("/store-select");
            localStorage.removeItem("pending_token"); // ✅ cleanup
            localStorage.removeItem("two_factor_required"); // ✅ cleanup
            localStorage.removeItem("two_factor_type"); // ✅ cleanup
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("tokenExpiry", new Date(expireAt).getTime().toString());
            localStorage.setItem("availableStores", JSON.stringify(stores));
            localStorage.removeItem("twoFactorData"); // ✅ cleanup
        } else {
            setOtpError((result.payload as string) || "Invalid OTP. Please try again.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storeId = localStorage.getItem("storeId");
        const twoFactorRequired = localStorage.getItem("two_factor_required");
        const pendingToken = localStorage.getItem("pending_token");

        if (token && storeId) {
            router.push("/manage/dashboard");
        }
        if (!twoFactorRequired && !pendingToken) {
            router.push("/manage/dashboard");
        }
    }, [isAuthenticated, pending_token]);

    return (
        <>

            <div className="flex flex-col min-h-screen items-center justify-center bg-black px-4 md:px-0">

                {/* Icon + Title */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    {twoFactorData?.two_factor_type === "email" ? (
                        <div className="bg-blue-100 p-4 rounded-full">
                            <Mail className="w-10 h-10 text-blue-600" />
                        </div>
                    ) : (
                        <div className="bg-green-100 p-4 rounded-full">
                            <ShieldCheck className="w-10 h-10 text-green-600" />
                        </div>
                    )}
                    <h1 className="!text-5xl !text-white text-center">
                        {twoFactorData?.two_factor_type === "email"
                            ? "Email Verification"
                            : "Authenticator Verification"}
                    </h1>
                    <p className="text-gray-400 text-xl text-center max-w-sm">
                        {twoFactorData?.message || "Enter the 6-digit verification code"}
                    </p>
                </div>

                {/* OTP Input */}
                <div className="w-full sm:w-[34rem] flex flex-col gap-2 mb-2">
                    <Input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="0 0 0 0 0 0"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value.replace(/\D/g, ""));
                            setOtpError("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleVerifyOtp();
                        }}
                        className="w-full sm:w-[34rem] !max-w-full !text-2xl my-4 px-6 h-20 bg-blue-50 text-black placeholder:text-gray-500"

                    // className="w-full !h-20 bg-[#f0f4ff] text-gray-400 !text-3xl text-center tracking-[1rem] font-semibold rounded-lg px-6 border-0"
                    />
                    {otpError && <p className="text-red-400 text-lg">{otpError}</p>}
                </div>

                {/* Verify Button */}
                <Button
                    type="button"
                    disabled={otp.length !== 6 || otpLoading}
                    onClick={handleVerifyOtp}
                    className="w-full sm:w-[34rem] cursor-pointer h-20 mt-3 mb-5 bg-blue-700 rounded-lg font-medium !text-2xl border-0 transition hover:bg-[#3A426E] disabled:opacity-50"
                >
                    {otpLoading ? "Verifying..." : "Verify"}
                </Button>

                {/* Back to login */}
                <p className="!text-white !text-lg sm:!text-2xl mt-2">
                    Wrong account?{" "}
                    <a href="/login" className="underline text-white !text-lg sm:!text-2xl">
                        Back to login
                    </a>
                </p>
            </div>
        </>

    );
}