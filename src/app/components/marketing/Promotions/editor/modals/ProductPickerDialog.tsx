"use client";

import PagedPickerDialog, { PickerPage } from "@/components/ui/PagedPickerDialog";
import { PickerRenderProps } from "@/components/ui/PickerField";
import { SelectOption } from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { useCallback } from "react";

type ProductOption = SelectOption & {
  image: string;
  sku: string;
  price: number | null;
};

const FALLBACK_IMAGE = "/default-product-image.svg";

const primaryImage = (product: any) =>
  product?.image?.find((img: any) => img?.isPrimary === 1)?.path ??
  product?.image?.[0]?.path ??
  FALLBACK_IMAGE;

const toProductPage = (
  payload: any,
  pageSize: number,
): PickerPage<ProductOption> => {
  const list = payload?.data?.data ?? payload?.data ?? [];
  const items = (Array.isArray(list) ? list : []).map((product: any) => ({
    value: String(product.id),
    label: product.name,
    image: primaryImage(product),
    sku: product.sku ?? "",
    price: product.price != null ? Number(product.price) : null,
  }));
  const pagination = payload?.pagination ?? payload?.data?.pagination;
  const total = Number(pagination?.total ?? items.length);
  return {
    items,
    total,
    totalPages: Number(pagination?.lastPage ?? Math.ceil(total / pageSize)),
  };
};

/**
 * "Select Products": paged product list, searched by name or SKU.
 * `single` limits it to one product (e.g. a gift reward).
 */
const ProductPickerDialog = ({
  single,
  ...props
}: PickerRenderProps & { single?: boolean }) => {
  const dispatch = useAppDispatch();

  const fetchPage = useCallback(
    async ({
      page,
      pageSize,
      keyword,
    }: {
      page: number;
      pageSize: number;
      keyword: string;
    }) => {
      const action = await dispatch(
        fetchAllProducts({ page, pageSize, search: keyword }),
      );
      if (!fetchAllProducts.fulfilled.match(action))
        return { items: [], total: 0, totalPages: 1 };
      return toProductPage(action.payload, pageSize);
    },
    [dispatch],
  );

  return (
    <PagedPickerDialog<ProductOption>
      {...props}
      single={single}
      title={single ? "Select Product" : "Select Products"}
      noun={["Product", "Products"]}
      searchPlaceholder="Search by product name or SKU"
      searchOnType
      showSelectedChips
      pageSize={20}
      fetchPage={fetchPage}
      renderItem={(product) => (
        <span className="grid flex-1 grid-cols-[4.8rem_1fr_14rem_10rem] items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- product
              images come from arbitrary store hosts. */}
          <img
            src={product.image}
            alt=""
            className="size-12 object-contain"
          />
          <span className="text-gray-800">{product.label}</span>
          <span className="text-gray-800 break-all">{product.sku}</span>
          <span className="text-gray-800">
            {product.price != null ? `$${product.price.toFixed(2)}` : "-"}
          </span>
        </span>
      )}
    />
  );
};

export default ProductPickerDialog;
