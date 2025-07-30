import { fetchAllProducts } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
export const refetchProducts = async (
  dispatch: AppDispatch,
  page = 1,
  pageSize = 50
) => {
  try {
    await dispatch(fetchAllProducts({ page, pageSize })).unwrap();
    console.log("✅ Refetched products.");
  } catch (err) {
    console.error("❌ Error re-fetching products:", err);
  }
};
