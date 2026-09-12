import { fetchAllProducts } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import { toBase62 } from "./utils";
import { REGEX } from "@/const/regex";
export const refetchProducts = async (
  dispatch: AppDispatch,
  page = 1,
  pageSize = 20,
) => {
  try {
    await dispatch(fetchAllProducts({ page, pageSize })).unwrap();
  } catch (err) {
    console.error("❌ Error re-fetching products:", err);
  }
};

export function generateDuplicateProductUrl(
  productId: string | number,
  title: string,
): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(REGEX.PRODUCT_SLUG_INVALID_CHARS, "-")
    .replace(REGEX.PRODUCT_SLUG_TRIM_HYPHENS, "");

  const code = toBase62(Number(productId)).padStart(4, "0");

  return `${slug}-${code}`;
}