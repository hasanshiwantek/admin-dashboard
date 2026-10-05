"use client";

import PagedPickerDialog, { PickerPage } from "@/components/ui/PagedPickerDialog";
import { PickerRenderProps } from "@/components/ui/PickerField";
import { SelectOption } from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { fetchBrandPage } from "@/redux/slices/productSlice";
import { useCallback } from "react";

const toBrandPage = (payload: any, pageSize: number): PickerPage<SelectOption> => {
  const items = (payload?.data ?? [])
    .map((row: any) => row?.brand ?? row)
    .filter((brand: any) => brand?.id != null)
    .map((brand: any) => ({ value: String(brand.id), label: brand.name }));
  const total = Number(payload?.pagination?.totalCount ?? items.length);
  return {
    items,
    total,
    totalPages: Number(
      payload?.pagination?.totalPages ?? Math.ceil(total / pageSize),
    ),
  };
};

/** "Select Brands": searchable, paged brand list; Apply commits. */
const BrandPickerDialog = (props: PickerRenderProps) => {
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
        fetchBrandPage({ page, pageSize, keyword }),
      );
      if (!fetchBrandPage.fulfilled.match(action))
        return { items: [], total: 0, totalPages: 1 };
      return toBrandPage(action.payload, pageSize);
    },
    [dispatch],
  );

  return (
    <PagedPickerDialog
      {...props}
      title="Select Brands"
      noun={["Brand", "Brands"]}
      searchPlaceholder="Please search using whole brand name"
      fetchPage={fetchPage}
      renderItem={(brand) => <span className="pl-6">{brand.label}</span>}
    />
  );
};

export default BrandPickerDialog;
