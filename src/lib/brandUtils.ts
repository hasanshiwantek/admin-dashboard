import { fetchBrands } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
export const refetchBrands = async (
  dispatch: AppDispatch,
  page = 1,
  pageSize = 50
) => {
  try {
    await dispatch(fetchBrands({ page, pageSize })).unwrap();
    console.log("✅ Refetched brands.");
  } catch (err) {
    console.error("❌ Error re-fetching brands:", err);
  }
};
