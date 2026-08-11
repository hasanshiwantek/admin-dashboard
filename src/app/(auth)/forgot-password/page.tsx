"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "@/redux/slices/authSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ForgotPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const [localError, setLocalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Get token & email from URL
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        setSuccessMessage(null);

        if (!token || !email) {
            setLocalError("Invalid or missing reset link. Please request a new one.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setLocalError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setLocalError("Password must be at least 8 characters");
            return;
        }

        const result = await dispatch(
            resetPasswordUser({
                email,
                token,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            })
        );

        if (resetPasswordUser.fulfilled.match(result)) {
            setSuccessMessage(result.payload.message || "Password reset successfully.");
            // Optionally redirect after success
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleShowPassword = () =>
        setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));

    const toggleShowConfirmPassword = () =>
        setFormData((prev) => ({
            ...prev,
            showConfirmPassword: !prev.showConfirmPassword,
        }));

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storeId = localStorage.getItem("storeId");
        if (token && storeId) {
            router.replace("/manage/dashboard");
        }
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <p
                className="!text-[#fff] cursor-pointer !pt-9 !pl-9 !text-3xl"
                onClick={() => router.push("/login")}
            >
                {"<"} Back to login
            </p>

            <div className="flex flex-col min-h-[80vh] items-center justify-center">
                <h1 className="!text-5xl mb-2 !text-white">Set a new password</h1>
                <p className="mt-3 mb-8 text-center !text-white/80 max-w-xl !text-xl">
                    Enter your new password below
                </p>

                <form onSubmit={handleSubmit} className="p-6 w-full max-w-2xl">
                    <div className="flex flex-col items-center">
                        {/* Error / Success messages */}
                        {(error || localError) && (
                            <div className="text-red-400 text-xl mb-4 text-center">
                                {localError || error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="text-green-400 text-xl mb-4 text-center">
                                {successMessage}
                            </div>
                        )}

                        {/* New Password */}
                        <div className="relative w-full sm:w-[34rem]">
                            <Input
                                name="password"
                                type={formData.showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full sm:w-[34rem] !max-w-full !text-2xl my-4 px-6 h-20 bg-blue-50 text-black placeholder:text-gray-500"
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800"
                            >
                                {!formData.showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        {/* <div className="relative w-full sm:w-[34rem] my-3">
                            <Input
                                name="confirmPassword"
                                type={formData.showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full !text-2xl px-6 h-20 bg-blue-50 text-black placeholder:text-gray-500 pr-16"
                            />

                        </div> */}
                        {/* New Password */}
                        <div className="relative w-full sm:w-[34rem]">
                            <Input
                                name="confirmPassword"
                                type={formData.showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full sm:w-[34rem] !max-w-full !text-2xl my-4 px-6 h-20 bg-blue-50 text-black placeholder:text-gray-500"
                            />
                            <button
                                type="button"
                                onClick={toggleShowConfirmPassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800"
                            >
                                {!formData.showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="default"
                            size="xxl"
                            disabled={loading}
                            className="w-full sm:w-[34rem] cursor-pointer h-20 my-6 bg-blue-600 rounded-lg font-medium !text-2xl border border-[#2c2c2c] transition hover:bg-[#3A426E]"
                        >
                            {loading ? "Resetting Password..." : "Reset Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// This is the important part
export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-white text-2xl">Loading...</div>}>
            <ForgotPasswordForm />
        </Suspense>
    );
}