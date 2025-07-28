"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setStoreId } from "@/redux/slices/configSlice";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/auth/ProtectedRoute";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

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
      <div className="flex flex-col min-h-screen items-center justify-center bg-black">
        <h1 className="!text-4xl !text-white my-8">Login to your store</h1>
        <Select onValueChange={(value) => handleSelect(Number(value))}>
          <SelectTrigger className="w-full mt-4">
            <SelectValue placeholder="Select a store" />
          </SelectTrigger>
          <SelectContent >
            {stores.map((site: { storeId: number; name?: string }) => (
              <SelectItem key={site.storeId} value={String(site.storeId)} className="cursor-pointer">
                {site.name || `Store ${site.storeId}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ProtectedRoute>
  );
}