import { AppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categorySlice";
export const refetchCategories = async (dispatch: AppDispatch) => {
  try {
    await dispatch(fetchCategories()).unwrap();
    console.log("✅ Refetched Categories.");
  } catch (err) {
    console.error("❌ Error re-fetching Categories:", err);
  }
};
