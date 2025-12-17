"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setStoreId } from "@/redux/slices/configSlice";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/auth/ProtectedRoute";
import Image from "next/image";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function StoreSelectPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const stores = useSelector((state: RootState) => state.auth.stores);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedStore) return; // prevent click without selection
    setLoading(true);
    dispatch(setStoreId(selectedStore));
    localStorage.setItem("storeId", selectedStore.toString());
    router.push("/manage/dashboard");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  if (!stores || stores.length === 0) {
    return <p className="text-center mt-10 text-white">No stores found for this user.</p>;
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen items-center justify-center bg-black px-4 md:px-0">
        {/* Top logo */}
        <div className="mb-12">
          <Image
            src="/fav.png"
            alt="Logo"
            width={250}
            height={250}
            objectFit="contain"
            priority
          />
        </div>

        <h1 className="!text-5xl md:text-5xl mb-8 !text-white text-center">
          Choose an account
        </h1>

        {/* Dropdown */}
       <div className="w-full sm:w-[34rem] flex flex-col mb-5">
  <label className="text-white text-2xl mb-2">Account</label>
  
  <Select
    onValueChange={(value) => setSelectedStore(Number(value))}
    value={selectedStore ? String(selectedStore) : undefined}
  >
    <SelectTrigger   className="w-full sm:w-[34rem] !max-w-full !h-20 bg-[#FFFFFF] text-black text-2xl rounded-lg px-6 py-0 flex items-center justify-between"
>
      <SelectValue placeholder="Select a store" />
    </SelectTrigger>

    <SelectContent className="w-full">
      {stores.map((site: { storeId: number; name?: string }) => (
        <SelectItem
          key={site.storeId}
          value={String(site.storeId)}
          className="cursor-pointer text-2xl px-6 py-4"
        >
          {site.name || `Store ${site.storeId}`}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>


        {/* Continue button */}
        <Button
          type="button"
          variant="default"
          size="xxl"
          disabled={!selectedStore || loading}
          onClick={handleContinue}
          className="w-full sm:w-[34rem] cursor-pointer h-20 my-5 bg-blue-600 rounded-lg font-medium !text-2xl focus-within:ring-blue-200 focus-within:border-blue-200 border border-[#2c2c2c] transition hover:border-blue-200 hover:bg-[#3A426E]"
        >
          {loading ? "Continuing..." : "Continue"}
        </Button>

          {/* Secondary Text */}
  <p className="!text-white !text-lg sm:!text-2xl mt-2">
    Don’t see your account or store?{" "}
    <a href="/login" className="underline text-white !text-lg sm:!text-2xl">
      Change user
    </a>
  </p>
      </div>
    </ProtectedRoute>
  );
}
