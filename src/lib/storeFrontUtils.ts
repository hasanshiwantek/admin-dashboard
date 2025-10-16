import { getWebPages } from "@/redux/slices/storefrontSlice";
import { AppDispatch } from "@/redux/store";
export const refetchWebpages = async (dispatch: AppDispatch) => {
  try {
    await dispatch(getWebPages()).unwrap();
    console.log("✅ Refetched webpages.");
  } catch (err) {
    console.error("❌ Error re-fetching webpages:", err);
  }
};
