"use client";
// AddProductPage.tsx
import { useEffect, useState, useMemo, useRef } from "react";
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

// const buildCopyNameSku = (name: string, sku: string) => {
//   // ✅ Name: strip "Copy N" → increment
//   const baseName = name.replace(/\s+Copy\s*\d*$/, "");
//   const nameMatch = name.match(/Copy\s*(\d+)$/);
//   const nextNameNum = nameMatch ? parseInt(nameMatch[1]) + 1 : 1;

//   // ✅ SKU: get last -N → increment → append to full sku
//   const skuMatch = sku.match(/-(\d+)$/);
//   const nextSkuNum = skuMatch ? parseInt(skuMatch[1]) + 1 : 1;
//   const randomNum = Math.floor(1000 + Math.random() * 9000);


//   return {
//     name: `${baseName} Copy ${nextNameNum}`, // Product Copy 1 → Copy 2 → Copy 3
//     sku: `${sku}-${nextSkuNum}`,             // BC12345678-1 → BC12345678-1-2 → BC12345678-1-2-3
//   };
// };
const buildCopyNameSku = (name: string, sku: string, productUrl: string) => {
  const baseName = name.replace(/\s+Copy\s*\d*$/, "");
  const nameMatch = name.match(/Copy\s*(\d+)$/);
  const nextNameNum = nameMatch ? parseInt(nameMatch[1]) + 1 : 1;

  const baseSku = sku.replace(/-\d+$/, "");
  const baseproductUrl = productUrl.replace(/-\d+$/, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return {
    name: `${baseName} Copy ${nextNameNum}`,
    sku: `${baseSku}-${randomNum}`, // BC12345678-4823 → BC12345678-1947 ✅
    productUrl: `${baseproductUrl}-${randomNum}`
  };
};
export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const exitAfterSaveRef = useRef(false);
  const copyAfterSaveRef = useRef(false)
  const hasUpdatedOriginalRef = useRef(false); // ✅ tracks if update already happened

  const defaultValues = useMemo(
    () => ({
      price: "",
      dimensions: { weight: "" },
      trackInventory: true,     // ✅ default checked for new product
      inventoryLevel: "product",// ✅ default level
      // ✅ OpenGraph defaults
      // objectType: "physical",
      useProductName: 1,
      graphDescription: 1,
      imageOption: "useThumbnail", // ✅ Default value for radio
    }),
    []
  );

  const methods: any = useForm({ defaultValues });
  const { reset } = methods;
  const { id } = useParams();
  const isEditModeRef = useRef(!!id);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct({ id }));
    }
  }, [dispatch, id]);

  const editProduct = useAppSelector(
    (state: any) => state.product.singleProduct
  );
  // const allProducts = useAppSelector((state: any) => state.product.products);
  const [product, setProduct] = useState<any>();
  // const product = editProduct?.data;
  // const product = allProducts.data?.find((p: any) => p.id === Number(id));

  const isEdit = !!product?.id;
  // const isEdit = !!id;


  useEffect(() => {
    if (editProduct?.data) {
      setProduct(editProduct.data);
    }
  }, [editProduct]);

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);


  // ✅ Map backend response to form fields
  useEffect(() => {
    if (product) {
      const mappedProduct = {
        ...product,
        // Map relatedProductsEnabled → relatedProducts
        relatedProducts: product.relatedProductsEnabled || 0,
        categoryIds: (product.categoryIds || []).map(Number), // ✅ critical fix
      };

      reset(mappedProduct);
    }
  }, [product, reset]);

  //   useEffect(() => {
  //   if (product) {
  //     reset((prev) => ({
  //       ...prev,
  //       ...product,
  //     }));
  //   }
  // }, [product, reset]);

  useEffect(() => {
    if (!id) {
      setProduct(undefined); // Clear previous product state
      reset();
    }
  }, [id, reset]);

  const onSubmit = methods.handleSubmit(async (data: Record<string, any>) => {
    setIsLoading(true);
    const isEdit = isEditModeRef.current;

    try {
      const imageData = Array.isArray(data.image)
        ? data.image.map((img: any) => ({
          file: img.file || null,
          url: typeof img.path === "string" ? img.path : "",
          description: img.description || "",
          isPrimary: img.isPrimary ? 1 : 0,
        }))
        : [];

      const { id, imageOption, exitAfterSave, ...rest } = data;

      const normalizedFields = {
        ...rest,
        image: imageData,
        fixedShippingCost: Number(data.fixedShippingCost || 0),
        minPurchaseQuantity: Number(data?.minPurchaseQuantity || 0),
        maxPurchaseQuantity: Number(data?.maxPurchaseQuantity || 0),
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
        useProductName: data.useProductName ? 1 : 0,
        graphDescription: data.graphDescription ? 1 : 0,
        useThumbnail: imageOption === "useThumbnail" ? 1 : 0,
        dontUse: imageOption === "dontUse" ? 1 : 0,
        manageCustoms: data.manageCustoms ? 1 : 0,
      };

      // ─── CASE 1: Edit + Copy — 1st click = UPDATE only ──────────
      if (hasUpdatedOriginalRef.current && isEdit) {
        const formData = objectToFormData(normalizedFields);
        const result = await dispatch(addProduct({ data: formData }));
        if (addProduct.fulfilled.match(result)) {
          hasUpdatedOriginalRef.current = true;
          const { name: copyName, sku: copySku, productUrl: copyProductUrl } = buildCopyNameSku(data.name, data.sku, data?.productUrl);
          methods.reset({ ...data, name: copyName, sku: copySku, productUrl: copyProductUrl });
        }
      }
      if (copyAfterSaveRef.current && isEdit && !hasUpdatedOriginalRef.current) {

        const updateFormData = objectToFormData(normalizedFields);
        const updateResult = await dispatch(
          updateProductFormData({ id: product.id, data: updateFormData })
        );

        if (updateProductFormData.fulfilled.match(updateResult)) {
          // ✅ Mark updated — next click will CREATE
          hasUpdatedOriginalRef.current = true;
          isEditModeRef.current = false;

          setProduct(undefined);

          const { name: copyName, sku: copySku, productUrl: copyProductUrl } = buildCopyNameSku(data.name, data.sku, data?.productUrl);
          methods.reset({ ...data, name: copyName, sku: copySku, productUrl: copyProductUrl });
          // router.replace("/manage/products/add");
        } else {
          console.error("Update failed:", updateResult.error);
        }

        // ─── CASE 2: Copy — 2nd click = CREATE only ─────────────────
      } else if (copyAfterSaveRef.current && !isEdit) {

        const formData = objectToFormData(normalizedFields);
        const result = await dispatch(addProduct({ data: formData }));

        if (addProduct.fulfilled.match(result)) {
          hasUpdatedOriginalRef.current = false; // ✅ reset for next time
          const { name: copyName, sku: copySku, productUrl: copyProductUrl } = buildCopyNameSku(data.name, data.sku, data?.productUrl);
          methods.reset({ ...data, name: copyName, sku: copySku, productUrl: copyProductUrl });
        } else {
          console.error("Create failed:", result.error);
        }

        // ─── CASE 3: Normal Save / Update ───────────────────────────
      } else {

        if (!hasUpdatedOriginalRef.current) {

          const formData = objectToFormData(normalizedFields);
          const result = isEdit
            ? await dispatch(updateProductFormData({ id: product.id, data: formData }))
            : await dispatch(addProduct({ data: formData }));

          const actionCreator = isEdit ? updateProductFormData : addProduct;

          if (actionCreator.fulfilled.match(result)) {
            if (exitAfterSaveRef.current) {
              router.push("/manage/products");
            } else if (!isEdit) {
              router.push("/manage/products/add");
            }
          } else {
            console.error("Product save failed:", result.error);
          }
        }
      }

    } catch (error) {
      console.error("Unexpected error during save:", error);
    } finally {
      setIsLoading(false);
      if (!isEdit) {
        exitAfterSaveRef.current = false;
      }
      copyAfterSaveRef.current = false;
    }
  });

  return (
    <div className="my-5">
      <div className="items-center mt-10 space-y-2">
        {/* Back Link */}
        <Link
          href={"/manage/products"}
          className="flex items-center justify-start gap-2 text-gray-500"
        >
          <FaArrowLeftLong size={18} />
          <h2 className="!text-gray-500 2xl:!text-2xl">VIEW PRODUCTS</h2>
        </Link>

        {/* Page Title */}
        <h1 className="!text-5xl 2xl:!text-[3.2rem] !font-extralight !text-gray-600 !my-2">
          Add Product
        </h1>

        {/* Dynamic Product Name */}
        {product?.name && (
          <h2 className="!text-2xl 2xl:!text-3xl font-medium text-gray-700">
            {product.name}
          </h2>
        )}

        {/* View Storefront Button */}
        {product?.sku && (
          <button
            type="button"
            className="btn-primary mt-2"
            onClick={() => {
              const availableStores = JSON.parse(
                localStorage.getItem("availableStores") || "[]"
              );
              const selectedStoreId = Number(localStorage.getItem("storeId"));
              const selectedStore = availableStores.find(
                (store: any) => store.id === selectedStoreId
              );
              if (selectedStore?.baseUrl) {
                window.open(`${selectedStore.baseUrl}/${product.sku}`, "_blank");
              } else {
                alert("Store URL or Product SKU not found");
              }
            }}
          >
            View Storefront
          </button>
        )}

        <hr className="my-5" />
      </div>

      <div className="flex ">
        <SidebarNavigation />
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="flex-1  p-6 space-y-8 ">
            <BasicInfoForm />
            <DescriptionEditor />
            {/* FAQ section */}
            <DescriptionEditor fieldName="faq" label="FAQ" height={300} />
            <ImageVideoUploader initialImages={product?.image || []} />
            <ProductIdentifiers />
            <Pricing />
            <Inventory isEdit={isEdit} />
            {/* <Variations /> */}
            {/* <Customizations /> */}
            <StoreFront />
            <CustomFields />
            <RelatedProducts isEdit={isEdit} />
            <Dimensions />
            <ShippingDetails />
            <Purchasability />
            <CustomsInformation />
            <Seo />
            <OpenGraph isEdit={isEdit} />
            <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
              {/* Cancel */}
              <Link href={"/manage/products"}>
                <button className="btn-outline-primary" type="button">
                  Cancel
                </button>
              </Link>
              {/* Save & Copy */}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-outline-primary flex items-center gap-2"
                onClick={() => {
                  if (!isEdit) {
                    exitAfterSaveRef.current = false; // ✅ not exit
                  }
                  copyAfterSaveRef.current = true;  // ✅ copy mode
                }}
              >
                {isLoading && exitAfterSaveRef.current && (
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {isEdit ? "Update & Copy" : "Save & Copy"}
              </button>
              {/* Save & Exit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-outline-primary flex items-center gap-2"
                onClick={() => { exitAfterSaveRef.current = true; }}
              >
                {isLoading && exitAfterSaveRef.current && (
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {isEdit ? "Update & Exit" : "Save & Exit"}
              </button>

              {/* Save / Update — same page pe raho */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center gap-2"
                onClick={() => { exitAfterSaveRef.current = false; }}
              >
                {isLoading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isEdit
                  ? isLoading ? "Updating..." : "Update Product"
                  : isLoading ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}









