"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import SearchProduct from "@/app/components/products/search/SearchProduct";

const Page = () => {
  const methods = useForm({
    defaultValues: {
      searchKeywords: "",
      brandName: "",
      categoryIds: [],
      priceFrom: "",
      priceTo: "",
      qtyFrom: "",
      qtyTo: "",
      invFrom: "",
      invTo: "",
      visibility: "",
      featured: "",
      freeShipping: "",
      status: "",
      sortBy: "",
      sortOrder: "",
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    console.log("✅ Final Search Payload", data);
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
