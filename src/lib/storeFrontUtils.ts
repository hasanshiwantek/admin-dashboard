import { getWebPages, fetchBlogs } from "@/redux/slices/storefrontSlice";
import { AppDispatch } from "@/redux/store";
export const refetchWebpages = async (dispatch: AppDispatch) => {
  try {
    await dispatch(getWebPages()).unwrap();
    console.log("✅ Refetched webpages.");
  } catch (err) {
    console.error("❌ Error re-fetching webpages:", err);
  }
};

export const refetchBlogs = async (dispatch: AppDispatch) => {
  try {
    await dispatch(fetchBlogs()).unwrap();
    console.log("✅ Refetched blogs.");
  } catch (err) {
    console.error("❌ Error re-fetching blogs:", err);
  }
};
