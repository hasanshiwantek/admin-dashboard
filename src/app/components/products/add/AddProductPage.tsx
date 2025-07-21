"use client";
// AddProductPage.tsx
import { FormProvider, useForm } from "react-hook-form";
import SidebarNavigation from "./SidebarNavigation";
import BasicInfoForm from "./BasicInformation";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import DescriptionEditor from "./DescriptionEditor";
import ImageVideoUploader from "./ImageVideoUploader";
import ProductIdentifiers from "./ProductIdentifiers";
import Inventory from "./Inventory";
import Seo from "./Seo";
import Dimensions from "./Dimensions";
import OpenGraph from "./OpenGraph";
import Pricing from "./Pricing";
import StoreFront from "./StoreFront";
import ShippingDetails from "./ShippingDetails";
export default function AddProductPage() {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => console.log(data));

  return (
    <div className="my-5">
      <div className=" items-center mb-4">
        <Link
          href={"/manage/products"}
          className="flex items-center justify-start gap-2 text-gray-500"
        >
          <FaArrowLeftLong size={18} />
          <h2 className="!text-gray-500">VIEW PRODUCTS</h2>
        </Link>
        <h1 className="!text-5xl !font-extralight !text-gray-600 !my-5">
          Add Product
        </h1>
        <hr className="my-5" />
      </div>

      <div className="flex ">
        <SidebarNavigation />
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-8 "
          >
            <BasicInfoForm />
            <DescriptionEditor />
            <ImageVideoUploader/>
            <ProductIdentifiers />
            <Pricing/>
            {/* <Inventory /> */}
            <Seo />
            <StoreFront/>
            <ShippingDetails/>
            
            <div className="flex justify-end  gap-10 items-center fixed  bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t w-full p-4">
              <button className="btn-outline-primary">Cancel</button>
              <button className="btn-primary" type="submit">
                Save Product
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

    </div>
  );
}
