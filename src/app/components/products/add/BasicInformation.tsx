// BasicInfoForm.tsx
"use client";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryTree from "./CategoryTree";
import { fetchBrands } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Link from "next/link";

export default function BasicInfoForm() {
  const { register, setValue, watch } = useFormContext();
  const productType = watch("productType");
  const isVisible = watch("isVisible");
  const brandId = watch("brandId");
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(fetchBrands({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  return (
    <section id="basic-info" className="space-y-4 scroll-mt-20">
      <div className="flex justify-center items-center flex-col">
        <h1 className="2xl:!text-[2.4rem]">Product Information</h1>
        <p className="2xl:!text-2xl">Information to help define a product.</p>
      </div>
      <div className="p-10 bg-white shadow-lg rounded-sm ">
        <h1 className="2xl:!text-[2.4rem]">Basic Information</h1>
        <div className="flex items-center space-x-4 my-6 ">
          <Checkbox
            id="isVisible"
            checked={!!isVisible}
            onCheckedChange={(checked) =>
              setValue("isVisible", checked === true)
            }
          />
          <Label className="2xl:!text-2xl" htmlFor="isVisible">Visible on Storefront</Label>
        </div>
        <div className="grid grid-cols-2 gap-6 my-4">
          {/* Left Div */}
          <div className="space-y-12">
            <div>
              <Label className="2xl:!text-2xl" htmlFor="name">Product Name</Label>
              <Input
                           className="!max-w-[90%] w-full"
                id="name"
                placeholder="Sample Product Name"
                {...register("name")}
                required
              />
            </div>

            <div>
              <Label className="2xl:!text-2xl" htmlFor="productType">Product Type</Label>

              <Select
                value={productType}
                onValueChange={(value) => setValue("productType", value)}
              >
                <SelectTrigger              className="!max-w-[90%] w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="2xl:!text-2xl" htmlFor="brandId">Brand</Label>
              <Select
                value={brandId ? String(brandId) : ""}
                onValueChange={(value) => setValue("brandId", Number(value))}
              >
                <SelectTrigger              className="!max-w-[90%] w-full">
                  <SelectValue placeholder="Select brand"  />
                </SelectTrigger>
                <SelectContent>
                  {brands?.data?.map((brand: any) => (
                    <SelectItem key={brand?.brand?.id} value={String(brand.brand?.id)}>
                      {brand.brand?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Div */}
          <div className="space-y-12">
            <div>
              <Label className="2xl:!text-2xl" htmlFor="sku">SKU</Label>
              <Input
                           className="!max-w-[90%] w-full" id="sku" placeholder="THX-1138" {...register("sku")}  required/>
            </div>

            <div>
              <Label className="2xl:!text-2xl" htmlFor="price">Default Price</Label>
              <Input
                           className="!max-w-[90%] w-full"
                id="price"
                placeholder="35"
                {...register("price", { valueAsNumber: true })}
                required
              />
            </div>

            <div>
              <Label className="2xl:!text-2xl" htmlFor="dimensions.weight">Weight (lbs)</Label>
              <Input
                           className="!max-w-[90%] w-full"
                id="weight"
                placeholder="0"
                {...register("dimensions.weight", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between my-5">
          <h1>Categories</h1>
          <Link href={"/manage/products/categories"}>
          <Button type="button" className="bg-transparent shadow-none text-blue-600 text-xl 2xl:!text-2xl hover:bg-blue-100 transition-all p-6 cursor-pointer">
            <Plus></Plus> Add Categories
          </Button>
          </Link>
        </div>
        <CategoryTree name="categoryIds" />
      </div>
    </section>
  );
}
