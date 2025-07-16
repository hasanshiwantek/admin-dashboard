"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setBaseURL } from "@/redux/slices/configSlice";
import { RootState } from "@/redux/store";

export default function StoreSelectPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const websites = useSelector((state: RootState) => state.auth.websites);

  const handleSelect = (baseURL: string) => {
    dispatch(setBaseURL(baseURL));
    router.push("/dashboard");
  };

  if (!websites || websites.length === 0) {
    return <p>No websites found for this user.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Select a Store</h2>
      {websites.map((site: any) => (
        <button
          key={site.baseURL}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => handleSelect(site.baseURL)}
        >
          {site.name || site.baseURL}
        </button>
      ))}
    </div>
  );
}
