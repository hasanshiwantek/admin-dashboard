"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordUser } from "@/redux/slices/authSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        email: "",
    });
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(
            forgotPasswordUser({ email: formData.email })
        );
        if (forgotPasswordUser.fulfilled.match(result)) {
            toast.success(result?.payload?.message || "Password reset link sent to your email.");
            router.push("/login");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storeId = localStorage.getItem("storeId");
        if (token && storeId) {
            router.replace("/manage/dashboard");
        } else {
        }
    }, [isAuthenticated]);

    return (

        <div className="bg-black">
            <p className="!text-[#fff] cursor-pointer !pt-9 !pl-9 !text-3xl" onClick={() => router.push("/login")}>
                {"<"} Back to login
            </p>
            <div className="flex flex-col min-h-screen items-center justify-center ">


                {/* Top image */}
                <div className="mb-8">
                </div>

                <h1 className="!text-5xl mb-2 !text-white">Need a new password?</h1>
                <p className="mt-5 text-center !text-white max-w-2xl !text-xl sm:!text-2xl">
                    Enter your email and we'll send you a password reset link.
                </p>
                <form onSubmit={handleLogin} className="p-10 rounded shadow-md w-full">
                    <div className="flex justify-center flex-col items-center">
                        {error && <div className="text-red-400 text-xl mb-4">{error}</div>}
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full sm:w-[34rem] !max-w-full !text-2xl my-4 px-6 h-20 bg-blue-50 text-black placeholder:text-gray-500"
                        />

                        <Button
                            type="submit"
                            variant="default"
                            size="xxl"
                            disabled={loading}
                            className="w-full sm:w-[34rem] cursor-pointer h-20 my-5 bg-blue-600 rounded-lg font-medium !text-2xl focus-within:ring-blue-200 focus-within:border-blue-200 border border-[#2c2c2c] transition hover:border-blue-200 hover:bg-[#3A426E]"
                        >
                            {loading ? "Sending reset link..." : "Email Reset Link"}
                        </Button>

                        <div className="flex justify-center w-full max-w-full sm:max-w-lg text-gray-100 mt-2 whitespace-nowrap">
                            {/* Right group */}

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
