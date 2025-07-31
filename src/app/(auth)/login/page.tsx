"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { setStoreId } from "@/redux/slices/configSlice";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
  email: "",
  password: "",
  showPassword: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email: formData.email, password: formData.password }));

    if (loginUser.fulfilled.match(result)) {
      const { token, stores, expireAt } = result.payload;
      Cookies.set("token", token, { expires: 7 });
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", new Date(expireAt).getTime().toString());


      if (stores.length === 1) {
        localStorage.setItem("storeId", stores[0].id.toString());
        dispatch(setStoreId(stores[0].id));
        router.push("/manage/dashboard");``
      } else {
        // Multiple stores – let user select
        localStorage.setItem("availableStores", JSON.stringify(stores));
        router.push("/store-select");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () =>
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  useEffect (() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.replace('/manage/dashboard')
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black">
      <h1 className="!text-5xl mb-2 !text-white">Login to your store</h1>

      <form
        onSubmit={handleLogin}
        className=" p-10 rounded shadow-md w-full max-w-md"
      >
        <div className="flex justify-center flex-col items-center">
          {error && <div className="text-red-400 text-xl mb-4">{error}</div>}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-[40rem] !text-2xl my-5 px-6 py-8 bg-blue-50 text-black placeholder:text-gray-500"
          />

          <div className="relative">
            <Input
              name="password"
              type={formData.showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-[40rem] !text-2xl my-5 px-6 py-8 bg-blue-50 text-black placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 "
            >
              {formData.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div> 
          <Button
            type="submit"
            variant="default"
            size="xxl"
            disabled={loading}
            className="w-[30rem]  cursor-pointer my-5  bg-blue-600  rounded-lg font-medium !text-2xl focus-within:ring-blue-200 focus-within:border-blue-200 border border-[#2c2c2c]  transition hover:border-blue-200 hover:bg-[#3A426E] "
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <div className="flex justify-between text-base text-gray-100 mt-2 whitespace-nowrap">
            <a href="#" className="hover:underline !text-xl">
              Log in with SSO
            </a>
            <div className="space-x-3 ml-40">
              <a href="#" className="hover:underline !text-xl">
                Forgot?
              </a>
              <a href="/register" className="hover:underline !text-xl">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}