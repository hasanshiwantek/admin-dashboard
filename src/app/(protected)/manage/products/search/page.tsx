"use client";
import SearchProduct from "@/app/components/products/search/SearchProduct";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
const Page = () => {
  const methods = useForm({
    defaultValues: {
      page: 1,
      pageSize: 50,
    },
  });

  const router = useRouter();
  const onSubmit = (data: Record<string, any>) => {
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

    // Push every filter to the products page URL; its table container reads the
    // URL and fetches through fetchAllProducts (no separate advanced-search).
    const queryParams = new URLSearchParams();
    Object.entries(filteredData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, String(v)));
      } else {
        queryParams.set(key, String(value));
      }
    });

    router.push(`/manage/products?${queryParams.toString()}`);
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
