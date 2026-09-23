"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useSafeBack } from "@/hooks/useSafeBack";
import objectToFormData from "@/lib/formDataUtils";
import { buildCopyNameSku } from "@/lib/productUtils";
import { removeEmptyValues } from "@/lib/utils";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import {
  addProduct,
  deleteProduct,
  fetchSingleProduct,
  updateProductFormData,
} from "@/redux/slices/productSlice";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import BasicInfoForm from "./BasicInformation";
import CustomFields from "./CustomFieldsSection";
import CustomsInformation from "./CustomsInformation";
import DescriptionEditorQuill from "./DescriptionEditorQuill";
import Dimensions from "./Dimensions";
import ImageVideoUploader from "./ImageVideoUploader";
import Inventory from "./Inventory";
import OpenGraph from "./OpenGraph";
import Pricing from "./Pricing";
import ProductIdentifiers from "./ProductIdentifiers";
import Purchasability from "./Purchasibility";
import RelatedProducts from "./RelatedProducts";
import Seo from "./Seo";
import ShippingDetails from "./ShippingDetails";
import SidebarNavigation from "./SidebarNavigation";
import StoreFront from "./StoreFront";

export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const exitAfterSaveRef = useRef(false);
  const copyAfterSaveRef = useRef(false);
  const submitActionRef = useRef<
    "save" | "duplicate" | "addAnother" | "viewProducts"
  >("viewProducts");
  const hasUpdatedOriginalRef = useRef(false); // ✅ tracks if update already happened
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const isDuplicate = searchParams.get("isDuplicate") === "true";
  const defaultValues = useMemo(
    () => ({
      price: "",
      dimensions: { weight: "" },
      trackInventory: true, // ✅ default checked for new product
      inventoryLevel: "product", // ✅ default level
      // ✅ OpenGraph defaults
      // objectType: "physical",
      isVisible: true,
      isRedirect: false,
      useProductName: 1,
      graphDescription: 1,
      imageOption: "useThumbnail", // ✅ Default value for radio
    }),
    [],
  );

  const methods: any = useForm({ defaultValues });

  const {
    reset,
    formState: { isDirty },
  } = methods;
  const { id } = useParams();
  const isEditModeRef = useRef(!!id);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct({ id }));
    }
  }, [dispatch, id]);

  const editProduct = useAppSelector(
    (state: any) => state.product.singleProduct,
  );
  const [product, setProduct] = useState<any>();

  const isEdit = !!product?.id;

  useEffect(() => {
    dispatch(fetchUrlSettings("product"));
  }, []);

  useEffect(() => {
    if (editProduct?.data) {
      if (isDuplicate) {
        const {
          name: copyName,
          sku: copySku,
          productUrl: copyProductUrl,
        } = buildCopyNameSku({
          name: editProduct.data.name,
          sku: editProduct.data.sku,
          hasDuplicate: Boolean(editProduct.data?.hasDuplicate),
        });
        const updatedProduct = {
          ...editProduct.data,
          name: copyName,
          sku: copySku,
          productUrl: copyProductUrl,
          callForPricing: editProduct.data?.callPricing,
        };
        setProduct(updatedProduct);
      } else {
        setProduct({
          ...editProduct?.data,
          callForPricing: editProduct?.data?.callPricing,
        });
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
        relatedProducts: product.relatedProductsEnabled || 0,
        categoryIds: (product.categoryIds || []).map(Number),
      };

      reset(mappedProduct);
    }
  }, [product, reset]);

  // ─── Tab close / page refresh handler ───────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const goBack = useSafeBack("/manage/products");

  const guardEntryRef = useRef(false);
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  const pushGuardEntry = () => {
    window.history.pushState(null, "", window.location.href);
    guardEntryRef.current = true;
  };

  useEffect(() => {
    if (isDirty && !guardEntryRef.current) pushGuardEntry();
  }, [isDirty]);

  // Navigation waiting for the guard entry to be popped (see navigateFromForm).
  const pendingNavRef = useRef<(() => void) | null>(null);

  // Removes the guard entry before navigating, so the form keeps a single
  // history entry and back always returns to the page it was opened from —
  // however many times the user saves & duplicates / adds another.
  const navigateFromForm = (navigate: () => void) => {
    if (guardEntryRef.current) {
      guardEntryRef.current = false;
      pendingNavRef.current = navigate;
      window.history.back();
    } else {
      navigate();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (pendingNavRef.current) {
        const navigate = pendingNavRef.current;
        pendingNavRef.current = null;
        navigate();
        return;
      }
      if (!guardEntryRef.current) return;
      guardEntryRef.current = false;
      if (isDirtyRef.current) {
        setShowLeaveModal(true);
      } else {
        goBack();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [goBack]);

  const handleBackNavigation = () => {
    if (guardEntryRef.current) {
      window.history.back();
    } else {
      goBack();
    }
  };

  const confirmLeave = () => {
    setShowLeaveModal(false);
    goBack();
  };

  const cancelLeave = () => {
    setShowLeaveModal(false);
    pushGuardEntry();
  };

  useEffect(() => {
    if (!id) {
      setProduct(undefined); // Clear previous product state
      reset();
    }
  }, [id, reset]);

  // Uses replace (not push) so chained duplicates / add-anothers don't pile up
  // history entries and back still lands on the products list with its params.
  const navigateAfterSave = (savedProductId?: number | string) => {
    const action = submitActionRef.current;

    if (action === "save") {
      // New product → switch to its edit form so later saves update it.
      if (savedProductId) {
        navigateFromForm(() =>
          router.replace(`/manage/products/edit/${savedProductId}`),
        );
      }
      return;
    }

    if (action === "duplicate") {
      const targetId = savedProductId ?? product?.id;
      if (targetId) {
        navigateFromForm(() =>
          router.replace(
            `/manage/products/dublicate/${targetId}?isDuplicate=true`,
          ),
        );
        return;
      }
    }

    if (action === "addAnother") {
      setProduct(undefined);
      reset(); // same URL when already on /add, so the page won't remount
      navigateFromForm(() => router.replace("/manage/products/add"));
      return;
    }

    navigateFromForm(goBack);
  };

  const onSubmit = methods.handleSubmit(async (data: Record<string, any>) => {
    setIsLoading(true);
    const isEdit = isEditModeRef.current;

    try {
      // 1. Process Image Data
      const imageData = Array.isArray(data.image)
        ? data.image.map((img: any) => ({
            file: img.file || null,
            url: typeof img.path === "string" ? img.path : "",
            description: img.description || "",
            isPrimary: img.isPrimary ? 1 : 0,
          }))
        : [];

      // 2. Destructure unused/form-specific properties
      const {
        id,
        imageOption,
        exitAfterSave,
        freeShipping,
        fixedShippingCost,
        ...rest
      } = data;
      console.log({ freeShipping });
      // 3. Normalize Payload Fields (Shared for duplicate and normal flows)
      const normalizedFields = {
        ...rest,
        image: imageData,
        freeShipping: freeShipping ? 1 : 0,
        ...(!freeShipping && {
          fixedShippingCost: Number(fixedShippingCost || 0),
        }),
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
        isVisible: data.isVisible ? 1 : 0,
        allowPurchase: data.allowPurchase ? 1 : 0,
        stopProcessingRules: data.stopProcessingRules ? 1 : 0,
        useProductName: data.useProductName ? 1 : 0,
        graphDescription: data.graphDescription ? 1 : 0,
        useThumbnail: imageOption === "useThumbnail" ? 1 : 0,
        dontUse: imageOption === "dontUse" ? 1 : 0,
        manageCustoms: data.manageCustoms ? 1 : 0,
        callForPricing: data.callForPricing ? 1 : 0,
        isRedirect: data.isRedirect ? 1 : 0,
        ...(isDuplicate && { parentId: parseInt(product?.id) }),
      };
      const normalizePayload = removeEmptyValues(normalizedFields, true);
      const formData = objectToFormData(normalizePayload);

      // ─── CASE 1: Copy / Duplicate After Save (Edit Mode) ────────────────
      if (copyAfterSaveRef.current && isEdit) {
        // If we are duplicating and it's a duplicate branch vs normal edit branch
        const action = isDuplicate ? addProduct : updateProductFormData;
        const payload = isDuplicate
          ? { data: formData }
          : { id: product.id, data: formData };

        const updateResult = await dispatch(action(payload as any));

        if (action.fulfilled.match(updateResult)) {
          isEditModeRef.current = false;
          setProduct(undefined);
          const {
            name: copyName,
            sku: copySku,
            productUrl: copyProductUrl,
          } = buildCopyNameSku({
            name: data.name,
            sku: data.sku,
            productUrl: data?.productUrl,
          });
          methods.reset({
            ...data,
            name: copyName,
            sku: copySku,
            productUrl: copyProductUrl,
          });
        } else {
          console.error("Create/Update copy failed:", updateResult.error);
        }

        // ─── CASE 2: Copy — 2nd click = CREATE only ────────────────────────
      } else if (copyAfterSaveRef.current && !isEdit) {
        const result = await dispatch(addProduct({ data: formData }));

        if (addProduct.fulfilled.match(result)) {
          hasUpdatedOriginalRef.current = false;
          const {
            name: copyName,
            sku: copySku,
            productUrl: copyProductUrl,
          } = buildCopyNameSku({
            name: data.name,
            sku: data.sku,
            productUrl: data?.productUrl,
          });
          methods.reset({
            ...data,
            name: copyName,
            sku: copySku,
            productUrl: copyProductUrl,
          });
        } else {
          console.error("Create failed:", result.error);
        }

        // ─── CASE 3: Normal Save / Update ───────────────────────────────────
      } else {
        // If it's a duplicate, it's always a new creation (`addProduct`), otherwise respect `isEdit`
        const shouldUpdate = isEdit && !isDuplicate;
        const action = shouldUpdate ? updateProductFormData : addProduct;
        const payload = shouldUpdate
          ? { id: product.id, data: formData }
          : { data: formData };

        const result = await dispatch(action(payload as any));

        if (action.fulfilled.match(result)) {
          const savedProductId = result?.payload?.data?.id ?? product?.id;
          if (submitActionRef.current === "save" && shouldUpdate) {
            // Updated in place: mark the form clean and reload saved data.
            reset(data);
            dispatch(fetchSingleProduct({ id: product.id }));
          } else {
            navigateAfterSave(savedProductId);
          }
        } else {
          console.error("Product save failed:", result.error);
        }
      }
    } catch (error) {
      console.error("Unexpected error during save:", error);
    } finally {
      setIsLoading(false);
      exitAfterSaveRef.current = false;
      submitActionRef.current = "viewProducts";
      hasUpdatedOriginalRef.current = false;
      copyAfterSaveRef.current = false;
    }
  });

  useLayoutEffect(() => {
    const main = document.querySelector("main");

    const scrollEl =
      main && main.scrollHeight > main.clientHeight ? main : window;

    const getScrollTop = () =>
      scrollEl === window
        ? window.scrollY
        : (scrollEl as HTMLElement).scrollTop;

    if (scrollEl === window) {
      window.scrollTo(0, 0);
    } else {
      (scrollEl as HTMLElement).scrollTop = 0;
    }

    setIsScrolled(false);

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const scrollTop = getScrollTop();

        setIsScrolled((prev) => {
          // Enter compact header
          if (!prev && scrollTop > 60) {
            return true;
          }

          // Return to normal header only when clearly back near top
          if (prev && scrollTop < 20) {
            return false;
          }

          return prev;
        });

        ticking = false;
      });
    };

    scrollEl.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]); // ✅ pat
  return (
    <React.Fragment>
      {showLeaveModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Leave site?
            </h2>
            <p className="text-2xl text-gray-600 mb-6">
              Changes you made may not be saved.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 text-2xl rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={cancelLeave}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-2xl rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={confirmLeave}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="my-5">
        <div className="sticky top-2 z-40 bg-[#f6f7f9] w-full overflow-visible px-6">
          {/* Back link — scroll pe hide */}
          {!isScrolled && (
            <div
              className={`flex items-center gap-2 text-gray-500 cursor-pointer mb-1 transition-opacity duration-200 ${
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              onClick={() => handleBackNavigation()}
            >
              <FaArrowLeftLong size={14} />
              <span className="text-sm uppercase tracking-wide">
                View Products
              </span>
            </div>
          )}

          {/* Title Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {/* scroll pe back arrow show karo */}
              <div
                className={`w-[14px] flex-shrink-0 transition-opacity duration-200 ${
                  isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <FaArrowLeftLong
                  size={14}
                  className="text-gray-500 cursor-pointer"
                  onClick={() => handleBackNavigation()}
                />
              </div>
              <h1
                className={`!font-semibold !text-gray-800 truncate transition-all duration-300 ${isScrolled ? "!text-base" : "!text-2xl"}`}
              >
                {product?.name && !isDuplicate
                  ? product?.name
                  : isDuplicate
                    ? "Duplicate Product"
                    : "Add Product"}
              </h1>
              {product?.productUrl && !isDuplicate && (
                <button
                  type="button"
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline whitespace-nowrap"
                  onClick={() => {
                    const availableStores = JSON.parse(
                      localStorage.getItem("availableStores") || "[]",
                    );
                    const selectedStoreId = Number(
                      localStorage.getItem("storeId"),
                    );
                    const selectedStore = availableStores.find(
                      (s: any) => s.id === selectedStoreId,
                    );
                    if (selectedStore?.baseUrl)
                      window.open(
                        `${selectedStore.baseUrl}${product?.productUrl[0] == "/" ? product?.productUrl.slice(1) : product?.productUrl}`,
                        "_blank",
                      );
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
                      <button
                        className="w-full text-left px-4 py-2 text-xl hover:bg-blue-50 text-gray-700"
                        onClick={() => {
                          const availableStores = JSON.parse(
                            localStorage.getItem("availableStores") || "[]",
                          );
                          const selectedStoreId = Number(
                            localStorage.getItem("storeId"),
                          );
                          const selectedStore = availableStores.find(
                            (s: any) => s.id === selectedStoreId,
                          );
                          setDropdownOpen(false);
                          if (selectedStore?.baseUrl)
                            window.open(
                              `${selectedStore.baseUrl}${product?.productUrl[0] == "/" ? product?.productUrl.slice(1) : product?.productUrl}`,
                              "_blank",
                            );
                        }}
                      >
                        View on storefront
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-xl hover:bg-gray-50 text-gray-700"
                        onClick={() => {
                          setDropdownOpen(false);
                          localStorage.setItem(
                            "filterProductId",
                            String(product.id),
                          );
                          router.push("/manage/orders");
                        }}
                      >
                        View orders
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-xl hover:bg-gray-50 text-gray-700"
                        onClick={async () => {
                          setDropdownOpen(false);
                          await dispatch(deleteProduct({ ids: [product?.id] }));
                          navigateFromForm(goBack);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="mt-3" />
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
              <DescriptionEditorQuill
                fieldName="faq"
                label="FAQ"
                height={300}
              />

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
              <Seo hasDuplicate={Boolean(product?.hasDuplicate)} />
              <OpenGraph isEdit={isEdit} />
              <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
                <button
                  className="btn-outline-primary"
                  type="button"
                  onClick={() => handleBackNavigation()}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    submitActionRef.current = "save";
                  }}
                >
                  {isLoading && submitActionRef.current === "save" && (
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  Save
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    submitActionRef.current = "duplicate";
                  }}
                >
                  {isLoading && submitActionRef.current === "duplicate" && (
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  Save & Duplicate
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-outline-primary flex items-center gap-2"
                  onClick={() => {
                    submitActionRef.current = "addAnother";
                  }}
                >
                  {isLoading && submitActionRef.current === "addAnother" && (
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  Save & Add Another
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center gap-2"
                  onClick={() => {
                    submitActionRef.current = "viewProducts";
                  }}
                >
                  {isLoading && submitActionRef.current === "viewProducts" && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isLoading ? "Saving..." : "Save & View Products"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </React.Fragment>
  );
}
