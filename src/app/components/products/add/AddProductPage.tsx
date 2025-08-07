"use client";
// AddProductPage.tsx
import { useEffect, useState } from "react";
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
import {
  addProduct,
  updateProductFormData,
  fetchSingleProduct,
} from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import objectToFormData from "@/lib/formDataUtils";
import { buildUpdateProductFormData } from "@/lib/formDataUtils";
// import { updateProductFormData } from "@/redux/slices/productSlice";

export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      price: "35",
      dimensions: { weight: "0" },
    },
  });
  const { reset } = methods;
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [dispatch, id]);
  const editProduct = useAppSelector(
    (state: any) => state.product.singleProduct
  );
  // const allProducts = useAppSelector((state: any) => state.product.products);
  const [product, setProduct] = useState<any>();
  // const product = editProduct?.data;
  // const product = allProducts.data?.find((p: any) => p.id === Number(id));
  console.log("Product to edit: ", product);

  const isEdit = !!product?.id;

  useEffect(() => {
    if (editProduct?.data) {
      setProduct(editProduct.data);
    }
  }, [editProduct]);  

  // useEffect(() => {
  //   if (product) reset(product);
  // }, [product, reset]);

  useEffect(() => {
  if (product) {
    reset((prev) => ({
      ...prev,
      ...product,
    }));
  }
}, [product, reset]);

  useEffect(() => {
    if (!id) {
      setProduct(undefined); // Clear previous product state
      reset(); // Reset the form to empty/default values
    }
  }, [id, reset]);

  const onSubmit = methods.handleSubmit(async (data: Record<string, any>) => {
    try {
      const imageData = (data.image || []).map((img: any) => ({
        file: img.file || null,
        url: typeof img.path === "string" ? img.path : "",
        description: img.description || "",
        isThumbnail: img.isThumbnail ? 1 : 0,
      }));
      const { id, ...rest } = data;
      const normalizedFields = {
        ...rest,
        image: imageData,
        fixedShippingCost: Number(data.fixedShippingCost || 0),
        dimensions: {
          width: Number(data.dimensions?.width || 0),
          height: Number(data.dimensions?.height || 0),
          depth: Number(data.dimensions?.depth || 0),
          weight: Number(data.dimensions?.weight || 0),
        },
        isFeatured: data.isFeatured ? 1 : 0,
        relatedProducts: data.relatedProducts ? 1 : 0,
        showCondition: data.showCondition ? 1 : 0,
        trackInventory: data.trackInventory ? 1 : 0,
        freeShipping: data.freeShipping ? 1 : 0,
        isVisible: data.isVisible ? 1 : 0,
        allowPurchase: data.allowPurchase ? 1 : 0,
        stopProcessingRules: data.stopProcessingRules ? 1 : 0,
      };
      const payload = normalizedFields;
      const formData = objectToFormData(payload);
      const result = isEdit
        ? await dispatch(
            updateProductFormData({ id: product.id, data: formData })
          )
        : await dispatch(addProduct({ data: formData }));

      if (
        (isEdit ? updateProductFormData : addProduct).fulfilled.match(result)
      ) {
        router.push("/manage/products");
      } else {
        console.error("Product save failed:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error during save:", error);
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
            <ImageVideoUploader initialImages={product?.image || []} />
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
              <button className="btn-outline-primary" type="button">
                Cancel
              </button>
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
