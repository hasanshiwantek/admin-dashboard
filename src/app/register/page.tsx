"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/slices/authSlice";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  storeName: "",
  userRole: 1,
  businessSize: "",
  region: "",
};

const fields: { name: keyof typeof initialForm; label: string; type?: string; options?: string[] }[] = [
  { name: "name", label: "Full Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "phoneNumber", label: "Phone Number" },
  { name: "storeName", label: "Store Name" },
  { name: "businessSize", label: "Business Size", options: [
    "Just starting out: <$100K",
    "$100K - $500K",
    "$500K - $1M",
    "Over $1M",
  ] },
  { name: "region", label: "Region", options: ["Asia", "Middle East", "Europe", "Northeast"] },
];

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
    alert("Form submitted! (Check console)");
  dispatch(registerUser(registerForm)); // 🔥 send entire form as payload
};

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-xl font-semibold text-blue-600 text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.name} className="relative">
            <label className="block text-sm font-medium mb-1">{field.label}</label>

            {field.options ? (
              <select
                name={field.name}
                value={registerForm[field.name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select...</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === "password" ? (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name={field.name}
                  value={registerForm[field.name]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer"
                  onClick={() => setShowPassword(p => !p)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={registerForm[field.name]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
