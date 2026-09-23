// components/Providers.tsx
"use client";

import { setStoreId } from "@/redux/slices/configSlice";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedId = localStorage.getItem("storeId");
    if (savedId) {
      store.dispatch(setStoreId(Number(savedId)));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
