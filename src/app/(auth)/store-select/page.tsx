"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setStoreId } from "@/redux/slices/configSlice";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/auth/ProtectedRoute";

export default function StoreSelectPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const stores = useSelector((state: RootState) => state.auth.stores);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSelect = (storeId: number) => {
    dispatch(setStoreId(storeId));
    localStorage.setItem("storeId", storeId.toString());
    router.push("/manage/dashboard");
  };

useEffect(() => {
  if (!isAuthenticated) {
    router.push("/login");
  }
}, [isAuthenticated]);

  if (!stores || stores.length === 0) {
    return <p>No stores found for this user.</p>;
  }

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto mt-20 space-y-4">
        <h2 className="text-xl font-bold">Select a Store</h2>
        {stores.map((site: { storeId: number; name?: string }) => (
          <button
            key={site.storeId}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => handleSelect(site.storeId)}
          >
            {site.name || `Store ${site.storeId}` }
          </button>
        ))}
      </div>
    </ProtectedRoute>
  );
}
