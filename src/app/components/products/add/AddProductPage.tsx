"use client";
// AddProductPage.tsx
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SidebarNavigation from "./SidebarNavigation";
import BasicInfoForm from "./BasicInformation";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
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
  deleteProduct,
  resetSingleProduct,
} from "@/redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import objectToFormData from "@/lib/formDataUtils";
import { buildUpdateProductFormData } from "@/lib/formDataUtils";
// import { updateProductFormData } from "@/redux/slices/productSlice";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import DescriptionEditorQuill from "./DescriptionEditorQuill";


const buildCopyNameSku = (name: string, sku: string, productUrl: string) => {
  const baseName = name.replace(/\s+Copy\s*\d*$/, "");
  const nameMatch = name.match(/Copy\s*(\d+)$/);
  const nextNameNum = nameMatch ? parseInt(nameMatch[1]) + 1 : 1;

  const baseSku = sku.replace(/-\d+$/, "");
  const baseProductUrl = productUrl.replace(/-\d+$/, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return {
    name: `${baseName} Copy ${nextNameNum}`,
    sku: `${baseSku}-${randomNum}`,
    ...(productUrl && { productUrl: `${baseProductUrl}-${randomNum}` }), // ✅
  };
};
export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const exitAfterSaveRef = useRef(false);
  const [redirectUpdateScreen, setRedirectUpdateScreen] = useState<any>(null)
  const copyAfterSaveRef = useRef(false)
  const hasUpdatedOriginalRef = useRef(false); // ✅ tracks if update already happened
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isDuplicate = searchParams.get("isDuplicate") === "true";
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
    dispatch(fetchUrlSettings("product"));
  }, [])

  useEffect(() => {
    if (editProduct?.data) {
      if (isDuplicate) {
        const {
          name: copyName,
          sku: copySku,
          productUrl: copyProductUrl
        } = buildCopyNameSku(
          editProduct.data.name,
          editProduct.data.sku,
          editProduct.data?.productUrl
        );
        const updatedProduct = {
          ...editProduct.data,
          name: copyName,
          sku: copySku,
          productUrl: copyProductUrl,
        };
        setProduct(updatedProduct);
      } else {
        setProduct(editProduct.data);
      }
    }
  }, [editProduct, isDuplicate]);


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
    if (isDuplicate) {
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

        // // ─── CASE 1: Edit + Copy — 1st click = UPDATE only ──────────
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
            addProduct({ data: updateFormData })
          );

          if (addProduct.fulfilled.match(updateResult)) {
            // ✅ Mark updated — next click will CREATE
            hasUpdatedOriginalRef.current = true;
            isEditModeRef.current = false;

            setProduct(undefined);

            const { name: copyName, sku: copySku, productUrl: copyProductUrl } = buildCopyNameSku(data.name, data.sku, data?.productUrl);
            methods.reset({ ...data, name: copyName, sku: copySku, productUrl: copyProductUrl });
            // router.replace("/manage/products/add");
          } else {

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
            const result = await dispatch(addProduct({ data: formData }));
            const { name: copyName, sku: copySku, productUrl: copyProductUrl } = buildCopyNameSku(data.name, data.sku, data?.productUrl);
            methods.reset({ ...data, name: copyName, sku: copySku, productUrl: copyProductUrl });

            const actionCreator = addProduct;

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
    } else {
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


        // // ─── CASE 1: Edit + Copy — 1st click = UPDATE only ──────────
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
                if (isEdit) {
                  router.push("/manage/products");
                } else {
                  router.push(`/manage/products/edit/${result?.payload?.data?.id}`)
                }
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
    }

  });

  useLayoutEffect(() => {
    const scrollEl =
      document.querySelector("main") ||
      document.querySelector("#__next > div") ||
      window;

    if (scrollEl === window) {
      window.scrollTo(0, 0);
    } else {
      (scrollEl as Element).scrollTop = 0;
    }

    setIsScrolled(false);

    const handleScroll = () => {
      const scrollTop =
        scrollEl === window
          ? window.scrollY
          : (scrollEl as Element).scrollTop;
      setIsScrolled(scrollTop > 60);
    };

    const timer = setTimeout(() => {
      handleScroll();
    }, 50);

    scrollEl.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]); // ✅ pat
  return (
    <div className="my-5" >
      <div className={`!sticky !top-2 z-40 bg-[#f6f7f9] w-full overflow-visible transition-all duration-300 px-6 ${isScrolled ? "py-1" : "py-3"}`}>

        {/* Back link — scroll pe hide */}
        {!isScrolled && (
          <div className="flex items-center gap-2 text-gray-500 cursor-pointer mb-1"
            onClick={() => router.push("/manage/products")}
          >
            <FaArrowLeftLong size={14} />
            <span className="text-sm uppercase tracking-wide">View Products</span>
          </div>
        )}

        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {/* scroll pe back arrow show karo */}
            {isScrolled && (
              <FaArrowLeftLong
                size={14}
                className="text-gray-500 cursor-pointer flex-shrink-0"
                onClick={() => router.push("/manage/products")}
              />
            )}
            <h1 className={`!font-semibold !text-gray-800 truncate transition-all duration-300 ${isScrolled ? "!text-base" : "!text-2xl"}`}>
              {product?.name && !isDuplicate ? product?.name : isDuplicate ? "Duplicate Product" : "Add Product"}
            </h1>
            {product?.sku && !isDuplicate && (
              <button
                type="button"
                className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
                onClick={() => {
                  const availableStores = JSON.parse(localStorage.getItem("availableStores") || "[]");
                  const selectedStoreId = Number(localStorage.getItem("storeId"));
                  const selectedStore = availableStores.find((s: any) => s.id === selectedStoreId);
                  if (selectedStore?.baseUrl) window.open(`${selectedStore.baseUrl}${product.sku}`, "_blank");
                  else alert("Store URL or Product SKU not found");
                }}
              >
                <FiExternalLink size={14} />
              </button>
            )}
          </div>

          {product?.sku && !isDuplicate && (
            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="p-2 rounded border border-gray-300 hover:bg-gray-100 text-gray-600"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <HiDotsHorizontal size={18} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <button className="w-full text-left px-4 py-2 text-xl hover:bg-blue-50 text-gray-700"
                      onClick={() => {
                        const availableStores = JSON.parse(localStorage.getItem("availableStores") || "[]");
                        const selectedStoreId = Number(localStorage.getItem("storeId"));
                        const selectedStore = availableStores.find((s: any) => s.id === selectedStoreId);
                        setDropdownOpen(false);
                        if (selectedStore?.baseUrl) window.open(`${selectedStore.baseUrl}${product.sku}`, "_blank");
                      }}>
                      View on storefront
                    </button>
                    <button className="w-full text-left px-4 py-2 text-xl hover:bg-gray-50 text-gray-700"
                      onClick={() => {
                        setDropdownOpen(false);
                        localStorage.setItem("filterProductId", String(product.id));
                        router.push("/manage/orders");
                      }}>
                      View orders
                    </button>
                    <button className="w-full text-left px-4 py-2 text-xl hover:bg-gray-50 text-red-600"
                      onClick={async () => {
                        setDropdownOpen(false);
                        await dispatch(deleteProduct({ ids: [product?.id] }));
                        router.push("/manage/products");
                      }}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {!isScrolled && <hr className="mt-3" />}
      </div>
      <div className="flex ">
        <SidebarNavigation />
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="flex-1  p-6 space-y-8 ">
            <BasicInfoForm />
            {/* <DescriptionEditor />
            FAQ section
            <DescriptionEditor fieldName="faq" label="FAQ" height={300} /> */}
            <DescriptionEditorQuill />
            {/* FAQ section */}
            <DescriptionEditorQuill fieldName="faq" label="FAQ" height={300} />

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
            {isDuplicate ? <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
              {/* Cancel */}
              <Link href={"/manage/products"}>
                <button className="btn-outline-primary" type="button">
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-outline-primary flex items-center gap-2"
                onClick={() => { exitAfterSaveRef.current = true; }}
              >
                {isLoading && exitAfterSaveRef.current && (
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                Duplicate & Exit
              </button>

              {/* Duplicate */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center gap-2"
                onClick={() => { exitAfterSaveRef.current = false; }}
              >
                {isLoading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isLoading ? "Duplicating..." : "Duplicate Product"}
              </button>
            </div> : <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
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
              {!isEdit && <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center gap-2"
                onClick={() => { exitAfterSaveRef.current = true; }}
              >
                {isLoading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isEdit
                  ? isLoading ? "Updating..." : "Update Product"
                  : isLoading ? "Saving..." : "Save Product"}
              </button>}
            </div>}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}









