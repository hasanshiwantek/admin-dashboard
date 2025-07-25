"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/slices/authSlice";
import { RegisterPayload } from "@/redux/slices/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import styles from "@/styles/auth/Auth.module.css"

const initialForm: RegisterPayload = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  storeName: "",
  userRole: 1,
  businessSize: "",
  region: "",
};
 
const fields: {
  name: keyof typeof initialForm;
  label: string;
  type?: string;
  options?: string[];
}[] = [
  { name: "name", label: "Full Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "phoneNumber", label: "Phone Number" },
  { name: "storeName", label: "Store Name" },
  {
    name: "businessSize",
    label: "Business Size",
    options: [
      "Just starting out: <$100K",
      "$100K - $500K",
      "$500K - $1M",
      "Over $1M",
    ],
  },
  {
    name: "region",
    label: "Region",
    options: ["Asia", "Middle East", "Europe", "Northeast"],
  },
];
 
export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! (Check console)");
    console.log("Form Registered",registerForm);
   
    // dispatch(registerUser(registerForm)); // 🔥 send entire form as payload
  };
 
  return (
    <div className={`${styles.registerBg} flex flex-col min-h-screen items-center justify-center bg-black `}>
      <h1 className="!text-5xl mt-10 !text-white">Create your beautiful store today</h1>
 
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center flex-col items-center w-full p-10 rounded-md">
          {fields.map((field) => (
            <div key={field.name} className="relative">
              <label className="block text-xl font-medium  text-gray-200">
                {field.label}
              </label>
 
              {field.options ? (
                <Select
                  value={registerForm[field.name]?.toString()}
                  onValueChange={(val) =>
                    setRegisterForm((prev) => ({ ...prev, [field.name]: val }))
                  }
                >
                  <SelectTrigger className="w-[30rem] !text-2xl  px-6 py-8 bg-blue-50 text-black placeholder:text-gray-500">
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "password" ? (
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={registerForm[field.name]}
                    onChange={handleChange}
                    required
                    className="w-[30rem] !text-2xl  px-6 py-8 bg-blue-50 text-black placeholder:text-gray-500"
                    placeholder={`Enter your ${field.name}`}
                  />
 
                  <span
                    className=" absolute right-3 top-6 cursor-pointer"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15}/>}
                  </span>
                </div>
              ) : (
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={registerForm[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field.name}`}
                  required
                  className=" w-[30rem] !text-2xl  px-6 py-8 bg-blue-50 text-black placeholder:text-gray-500"
                />
              )}
            </div>
          ))}
 
          <Button
            type="submit"
            variant="default"
            size="xxl"
            className="w-[30rem]  cursor-pointer my-5  bg-blue-600  rounded-lg font-medium !text-2xl focus-within:ring-blue-200 focus-within:border-blue-200 border border-[#2c2c2c]  transition hover:border-blue-200 hover:bg-[#3A426E] "
          >
            CREATE YOUR STORE
          </Button>

          <div className="flex justify-between gap-2 text-base text-gray-100 whitespace-nowrap">
            <p className="hover:underline !text-base !text-gray-100 !text-xl"> Already have an account? </p>
             <a href="/login" className="hover:underline !text-xl">
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}