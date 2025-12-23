"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Controller, useFormContext } from "react-hook-form";
import CategoryTreeSm from "../add/CategoryTreeSm";
import { fetchBrands } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
const SearchProduct = () => {
  const { register, control } = useFormContext();
  const { brands } = useAppSelector((state: any) => state.product);
  const dispatch = useAppDispatch();
  console.log("Brands data from frontend: ", brands);

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  return (
    <div className="p-10 ">
      <div className="flex flex-col space-y-5">
        <h1 className="!font-extralight 2xl:!text-[2.4rem]">Search</h1>
        <p className="2xl:!text-2xl">
          Search for specific products using the advanced search options below.
        </p>
      </div>

      {/* ADVANCED SEARCH */}
      <div className="my-10">
        <h1 className="my-5 2xl:!text-[2.4rem]">Advanced Search</h1>
        <div className="bg-white shadow-md p-10 space-y-10">
          <div className="flex items-center gap-4">
            <Label htmlFor="searchKeywords" className="w-[150px] text-right 2xl:!text-2xl">
              Search Keywords:
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-400 cursor-pointer">
                      <HiQuestionMarkCircle className="w-6 h-6" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <strong>Search Keywords</strong>
                    <br />
                    The search keywords you type into this box will be used to
                    search the following fields for all products: name.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input id="searchKeywords" {...register("searchKeywords")} />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="brandName" className="w-[150px] text-right 2xl:!text-2xl">
              Brand Name:
            </Label>
            <Controller
              name="brandName"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brand Names" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands?.data?.map((brand: any, ) => (
                      <SelectItem
                        key={brand?.brand?.id}
                        value={String(brand.brand?.id)}
                      >
                        {brand.brand?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex gap-4 items-start">
            <Label htmlFor="categoryIds" className="w-[150px] text-right 2xl:!text-2xl">
              Categories
            </Label>
            <CategoryTreeSm name="categoryIds" />
          </div>
        </div>
      </div>

      {/* SEARCH BY RANGE */}
      <div className="my-10">
        <h1 className="my-5 2xl:!text-[2.4rem]">Search by Range</h1>
        <div className="bg-white shadow-md p-10 space-y-10">
          <div className="flex items-center gap-4">
            <Label htmlFor="priceMin" className="w-[120px] text-right 2xl:!text-2xl">
              Price Range:
            </Label>
            <span className="text-sm text-gray-600 2xl:!text-2xl">From $</span>
            <Input
              id="priceMin"
              type="number"
              className="w-[100px]"
              {...register("priceMin")}
            />
            <span className="text-sm text-gray-600 2xl:!text-2xl">to $</span>
            <Input
              id="priceMax"
              type="number"
              className="w-[100px]"
              {...register("priceMax")}
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="qtyFrom" className="w-[120px] text-right 2xl:!text-2xl">
              Quantity Sold:
            </Label>
            <span className="text-sm text-gray-600 2xl:!text-2xl">From</span>
            <Input
              id="qtyFrom"
              type="number"
              className="w-[100px]"
              {...register("qtyFrom")}
            />
            <span className="text-sm text-gray-600 2xl:!text-2xl ml-4">to</span>
            <Input
              id="qtyTo"
              type="number"
              className="w-[100px]"
              {...register("qtyTo")}
            />
          </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="invFrom" className="w-[120px] text-right 2xl:!text-2xl">
              Inventory Level:
            </Label>
            <span className="text-sm text-gray-600 2xl:!text-2xl">From</span>
            <Input
              id="invFrom"
              type="number"
              className="w-[100px]"
              {...register("invFrom")}
            />
            <span className="text-sm text-gray-600 2xl:!text-2xl ml-4">to</span>
            <Input
              id="invTo"
              type="number"
              className="w-[100px]"
              {...register("invTo")}
            />
          </div>
        </div>
      </div>

      {/* SEARCH BY SETTING */}
      <div className="my-10">
        <h1 className="my-5 2xl:!text-[2.4rem]">Search by Setting</h1>
        <div className="bg-white shadow-md p-10 space-y-10">
          {[
            { label: "Product Visibility", name: "isVisible" },
            { label: "Featured Product", name: "isFeatured" },
            { label: "Free Shipping", name: "freeShipping" },
            { label: "Status", name: "status" },
          ].map(({ label, name }) => (
            <div className="flex items-center gap-4" key={name}>
              <Label htmlFor={name} className="w-[140px] text-right 2xl:!text-2xl">
                {label}:
              </Label>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="No Preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">No Preference</SelectItem>
                      {name === "isVisible" && (
                        <>
                          <SelectItem value="true">
                            Only Visible Products
                          </SelectItem>
                          <SelectItem value="false">
                            Only Invisible Products
                          </SelectItem>
                        </>
                      )}
                      {name === "isFeatured" && (
                        <>
                          <SelectItem value="true">Featured</SelectItem>
                          <SelectItem value="false">Not Featured</SelectItem>
                        </>
                      )}
                      {name === "freeShipping" && (
                        <SelectItem value="freeShipping">
                          Only Free Shipping
                        </SelectItem>
                      )}
                      {name === "status" && (
                        <>
                          <SelectItem value="purchased">
                            Can be Purchased
                          </SelectItem>
                          <SelectItem value="preOrdered">Pre-Order</SelectItem>
                          <SelectItem value="notPurchased">
                            Cannot Purchase
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH BY SORTING */}
      <div className="my-10">
        <h1 className="my-5 2xl:!text-[2.4rem]">Sort Order</h1>
        <div className="bg-white shadow-md p-10 space-y-10">
          <div className="flex items-center gap-4">
            <Label htmlFor="sortBy" className="w-[140px] text-right 2xl:!text-2xl">
              Sort Order:
            </Label>

            <Controller
              name="sortBy"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">ID</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="sortOrder"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ascending Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending Order</SelectItem>
                    <SelectItem value="desc">Descending Order</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
