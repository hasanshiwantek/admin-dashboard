"use client";
import SearchProduct from "@/app/components/products/search/SearchProduct";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { advanceSearchProduct } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
const Page = () => {
  const methods = useForm({
    defaultValues: {
      page: 1,
      pageSize: 50,
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = async (data: Record<string, any>) => {
    const filteredData = Object.entries(data).reduce(
      (acc, [key, value]) => {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        const isEmpty =
          value === "" || value === null || value === undefined || isEmptyArray;

        const alwaysInclude = ["page", "pageSize"];
        if (!isEmpty || alwaysInclude.includes(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    );

    try {
      const result = await dispatch(
        advanceSearchProduct({ data: filteredData }),
      );

      if (advanceSearchProduct.fulfilled.match(result)) {
        // ✅ Push ALL filters to URL — not just page & limit
        const queryParams = new URLSearchParams();
        Object.entries(filteredData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v));
          } else {
            queryParams.set(key, String(value));
          }
        });

        router.push(`/manage/products?${queryParams.toString()}`);
      } else {
        console.error("❌ Search Failed:", result.error);
      }
    } catch (error) {
      console.error("🔥 Unexpected Error:", error);
    }
  };

  return (
    <div className="p-10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SearchProduct />

          <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
            <button className="btn-outline-primary">Cancel</button>
            <button className="btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
