import { fetchAllOrders,fetchAllShipments } from "@/redux/slices/orderSlice";
import { AppDispatch } from "@/redux/store";
export const refetchOrders = async (
  dispatch: AppDispatch,
  page = 1,
  perPage = 50
) => {
  try {
    await dispatch(fetchAllOrders({ page, perPage })).unwrap();
    console.log("✅ Refetched orders.");
  } catch (err) {
    console.error("❌ Error re-fetching orders:", err);
  }
};


export const refetchShipments = async (
  dispatch: AppDispatch,
  page = 1,
  perPage = 50
) => {
  try {
    await dispatch(fetchAllShipments({ page, perPage })).unwrap();
    console.log("✅ Refetched shipments.");
  } catch (err) {
    console.error("❌ Error re-fetching shipments:", err);
  }
};
