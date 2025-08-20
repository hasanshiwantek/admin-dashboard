import { fetchCustomers } from "@/redux/slices/customerSlice";
import { AppDispatch } from "@/redux/store";
export const refetchCustomers = async (
  dispatch: AppDispatch,
  page = 1,
  pageSize = 50
) => {
  try {
    await dispatch(fetchCustomers({ page, pageSize })).unwrap();
    console.log("✅ Refetched Customers.");
  } catch (err) {
    console.error("❌ Error re-fetching customers:", err);
  }
};
