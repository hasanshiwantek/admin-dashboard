"use client";
// AddProductPage.tsx
import { useEffect } from "react";
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
import Purchasability from "./Purchasibility";
import CustomFields from "./CustomFieldsSection";
import CustomsInformation from "./CustomsInformation";
import RelatedProducts from "./RelatedProducts";
import Variations from "./Variations";
import Customizations from "./Customizations";
import { addProduct, updateProduct } from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useParams } from "next/navigation";

export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const methods = useForm();
  const { reset } = methods;
  const { id } = useParams();
  const allProducts = useAppSelector((state: any) => state.product.products)
  console.log("all products from edit", allProducts)
  const product = allProducts.data?.find((p: any) => p.id === Number(id));
  const isEdit = !!product?.id;

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const onSubmit = methods.handleSubmit(async (data: Record<string, any>) => {
    try {
      // const result = await dispatch(addProduct({ data: data }));

      console.log("Payload: ",data);
      
      const result = isEdit
        ? await dispatch(updateProduct({ body: { products: [{ id: product.id, fields: data }] } }))
        : await dispatch(addProduct({ data: data }))

      if ((isEdit ? updateProduct : addProduct).fulfilled.match(result)) {
        console.log("✅ Product Added:", result.payload);
      } else {
        console.error("Product add failed:", result.error);
      }
    } catch (error) {
      console.error("🔥 Unexpected error during add:", error);
    }
  });

  return (
    <div className="my-5">
      <div className=" items-center mt-10">
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
          <form onSubmit={onSubmit} className="flex-1  p-6 space-y-8 ">
            <BasicInfoForm />
            <DescriptionEditor />
            <ImageVideoUploader />
            <ProductIdentifiers />
            <Pricing />
            <Inventory />
            {/* <Variations /> */}
            {/* <Customizations /> */}
            <StoreFront />
            <CustomFields />
            <RelatedProducts />
            <Dimensions />
            <ShippingDetails />
            <Purchasability />
            <CustomsInformation />
            <Seo />
            <OpenGraph />
            <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
              <button className="btn-outline-primary" type="button">Cancel</button>
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
