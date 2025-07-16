"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { setBaseURL } from "@/redux/slices/configSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await dispatch(loginUser({ email, password }));

//     if (loginUser.fulfilled.match(result)) {
//       router.push("/dashboard");
//     }
//   };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await dispatch(loginUser({ email, password }));

  if (loginUser.fulfilled.match(result)) {
    const websites = result.payload.websites;

    if (websites.length === 1) {
      // Single store – set baseURL and go to dashboard
      localStorage.setItem("baseURL", websites[0].baseURL);
      dispatch(setBaseURL(websites[0].baseURL));
      router.push("/dashboard");
    } else {
      // Multiple stores – let user select
      localStorage.setItem("availableWebsites", JSON.stringify(websites));
      router.push("/store-select");
    }
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
