import {
  getFirstSectionWithErrors,
  getNavSections,
} from "@/components/SectionNav/utils";
import { ActionEnums } from "@/const/appConstants";
import useActiveSection from "@/hooks/useActiveSection";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import useScrollCollapse from "@/hooks/useScrollCollapse";
import useUnsavedChangesGuard from "@/hooks/useUnsavedChangesGuard";
import objectToFormData from "@/lib/formDataUtils";
import { generateDuplicateProductUrl, normalizeProductUrl } from "@/lib/productUtils";
import { removeEmptyValues } from "@/lib/utils";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchDefaultCurrency } from "@/redux/slices/currencySlice";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import {
  addProduct,
  fetchBrands,
  fetchSingleProduct,
  updateProductFormData,
} from "@/redux/slices/productSlice";
import { getSelectedStore } from "@/utils/storage";
import { errorMessage, successMessage } from "@/utils/message";
import { ProductSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FieldErrors,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import type { ProductBrandOption } from "../_components/type";
import {
  ADD_PRODUCT_ROUTE,
  DUPLICATE_PRODUCT_PARAM,
  duplicateProductRoute,
  editProductRoute,
  NEW_PRODUCT_ID,
  productOrdersRoute,
  PRODUCTS_ROUTE,
  FALLBACK_CURRENCY,
} from "../constant";
import { getDecimalPlaces, getStorefrontProductUrl } from "../utils";
import type { ApiCategory, Product } from "../type";
import {
  getBulkPricingColumns,
  getCustomFieldColumns,
  getHsCodeColumns,
} from "./columns";
import {
  ADVANCED_PRICING_FIELDS,
  newBulkPricingTier,
  newCustomField,
  newHsCode,
  productActions,
  productDefaults,
  ProductFormNames,
  productSections,
  ProductSubmitAction,
  PurchasabilityStatus,
} from "./constant";
import type {
  BulkPricingTierValues,
  CustomFieldValues,
  HsCodeValues,
  ProductFormValues,
} from "./type";
import {
  buildProductUrl,
  getBasePrice,
  getDiscountLabel,
  getDiscountTypeOptions,
  toFieldRows,
  transformGetProduct,
  transformPostProduct,
} from "./utils";

// Scroll positions (px) where the header collapses and expands again
const HEADER_COLLAPSE_AT = 60;
const HEADER_EXPAND_AT = 8;

const SECTION_IDS = productSections.map(({ id }) => id);

const useProductFormPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: idParam } = useParams<{ id: string }>();

  const isEdit = idParam !== NEW_PRODUCT_ID;
  const id = isEdit ? Number(idParam) : null;
  if (isEdit && !id) notFound();
  const duplicateId = isEdit
    ? null
    : Number(searchParams.get(DUPLICATE_PRODUCT_PARAM)) || null;
  // The product being edited, or the one being duplicated
  const sourceId = id ?? duplicateId;

  const { singleProduct, singleProductLoading, brands } = useAppSelector(
    (state) => state.product,
  ) as {
    singleProduct: { data?: Product } | null;
    singleProductLoading: boolean;
    brands: { data?: { brand?: ProductBrandOption }[] } | null;
  };
  const categories: ApiCategory[] = useAppSelector(
    (state) => (state.category.categories as { data?: ApiCategory[] })?.data,
  ) ?? [];
  const urlSettings = useAppSelector((state) => state.home.urlSettingData);
  const defaultCurrency = useAppSelector(
    (state) => state.currency.defaultCurrency,
  );
  const defaultCurrencyLoaded = useAppSelector(
    (state) => state.currency.defaultCurrencyLoaded,
  );
  const currency = defaultCurrency ?? FALLBACK_CURRENCY;

  useEffect(() => {
    dispatch(fetchDefaultCurrency());
    dispatch(fetchBrands({ page: 1, pageSize: 50 }));
    dispatch(fetchCategories());
    dispatch(fetchUrlSettings("product"));
  }, [dispatch]);

  useEffect(() => {
    if (sourceId) dispatch(fetchSingleProduct({ id: sourceId }));
  }, [dispatch, sourceId]);

  // Ignore a product left in the store from a previously opened page
  const product = singleProduct?.data;
  const record = sourceId && product?.id === sourceId ? product : null;

  // Read by the schema's price rules when validating
  const validationContext = useRef({ decimalPlaces: 2 });
  validationContext.current.decimalPlaces = getDecimalPlaces(currency);

  const form = useForm<ProductFormValues>({
    resolver: yupResolver(ProductSchema),
    defaultValues: productDefaults,
    context: validationContext.current,
  });
  const { control, reset, setValue, getValues } = form;
  const { errors, isDirty, isSubmitting } = useFormState({ control });

  // Waits for the currency so saved prices show with its decimal places
  useEffect(() => {
    if (record && defaultCurrencyLoaded) {
      reset(transformGetProduct(record, { currency, duplicate: !isEdit }));
    }
  }, [record, defaultCurrencyLoaded, currency, isEdit, reset]);

  const [
    trackInventory,
    freeShipping,
    purchasabilityStatus,
    callForPricing,
    manageCustoms,
    discountType,
    price,
    salePrice,
    tierValues,
    customFieldValues,
    hsCodeValues,
    productUrl,
  ] = useWatch({
    control,
    name: [
      ProductFormNames.TrackInventory,
      ProductFormNames.FreeShipping,
      ProductFormNames.PurchasabilityStatus,
      ProductFormNames.CallForPricing,
      ProductFormNames.ManageCustoms,
      ProductFormNames.DiscountType,
      ProductFormNames.Price,
      ProductFormNames.SalePrice,
      ProductFormNames.BulkPricingTiers,
      ProductFormNames.CustomFields,
      ProductFormNames.HsCodes,
      ProductFormNames.ProductUrl,
    ],
  });

  const tiers = useFieldArray({
    control,
    name: ProductFormNames.BulkPricingTiers,
  });
  const customFields = useFieldArray({
    control,
    name: ProductFormNames.CustomFields,
  });
  const hsCodes = useFieldArray({ control, name: ProductFormNames.HsCodes });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // The URL follows the name/SKU/brand until it's typed in; a saved or
  // duplicated product keeps its own
  const [autoUrl, setAutoUrl] = useState(!sourceId);
  const [autoUrlSource, setAutoUrlSource] = useState(sourceId);
  if (autoUrlSource !== sourceId) {
    setAutoUrlSource(sourceId);
    setAutoUrl(!sourceId);
  }

  const brandOptions = (brands?.data ?? []).flatMap(({ brand }) =>
    brand ? [brand] : [],
  );

  const generateProductUrl = () => {
    const values = getValues();
    return buildProductUrl({
      urlSettings,
      name: values.name,
      sku: values.sku,
      brand: brandOptions.find(({ id }) => String(id) === values.brandId)
        ?.name,
    });
  };

  const handleIdentityChange = ({ name }: { name: string }) => {
    if (name === ProductFormNames.Name) {
      setValue(ProductFormNames.PageTitle, getValues(ProductFormNames.Name), {
        shouldDirty: true,
      });
    }
    if (!autoUrl) return;
    const url = generateProductUrl();
    if (url) setValue(ProductFormNames.ProductUrl, url, { shouldDirty: true });
  };

  const handleResetProductUrl = () => {
    setAutoUrl(true);
    const url = record?.hasDuplicate
      ? normalizeProductUrl(
          generateDuplicateProductUrl(getValues(ProductFormNames.Name) || "copy"),
        )
      : generateProductUrl();
    if (url) {
      setValue(ProductFormNames.ProductUrl, url, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const guard = useUnsavedChangesGuard(isDirty, PRODUCTS_ROUTE);

  const { activeSection, scrollToSection } = useActiveSection(SECTION_IDS);
  const navSections = getNavSections(productSections, errors);

  const submitAction = useRef(ProductSubmitAction.ViewProducts);
  const setSubmitAction = (action: ProductSubmitAction) => () => {
    submitAction.current = action;
  };

  const handleSaved = (savedId: number | undefined, values: ProductFormValues) => {
    switch (submitAction.current) {
      case ProductSubmitAction.Save:
        if (!id && savedId) {
          return guard.leaveForm(() => router.replace(editProductRoute(savedId)));
        }
        reset(values);
        if (id) dispatch(fetchSingleProduct({ id }));
        return;
      case ProductSubmitAction.Duplicate:
        if (savedId) {
          return guard.leaveForm(() =>
            router.replace(duplicateProductRoute(savedId)),
          );
        }
        return;
      case ProductSubmitAction.AddAnother:
        reset(productDefaults);
        setAutoUrl(true);
        return guard.leaveForm(() => router.replace(ADD_PRODUCT_ROUTE));
      default:
        return guard.leaveForm();
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    const payload = transformPostProduct(values, {
      currency,
      parentId: duplicateId,
    });
    const data = objectToFormData(removeEmptyValues(payload, true));
    const result = id
      ? await dispatch(updateProductFormData({ id, data }))
      : await dispatch(addProduct({ data }));

    if (
      updateProductFormData.rejected.match(result) ||
      addProduct.rejected.match(result)
    ) {
      errorMessage(result.payload as string);
    } else {
      successMessage(id ? "Product updated" : "Product created");
      const savedId =
        id ?? (result.payload as { data?: { id?: number } })?.data?.id;
      handleSaved(savedId, values);
    }
    submitAction.current = ProductSubmitAction.ViewProducts;
  };

  const onInvalid = (formErrors: FieldErrors<ProductFormValues>) => {
    submitAction.current = ProductSubmitAction.ViewProducts;
    if (ADVANCED_PRICING_FIELDS.some((field) => field in formErrors)) {
      setShowAdvanced(true);
    }
    const section = getFirstSectionWithErrors(productSections, formErrors);
    if (section) scrollToSection(section.id);
  };

  const storeBaseUrl = record ? getSelectedStore()?.baseUrl : null;
  const storefrontUrl =
    isEdit && storeBaseUrl && record?.productUrl
      ? getStorefrontProductUrl(storeBaseUrl, record.productUrl)
      : null;

  const { ref: headerRef, collapsed: compactHeader } = useScrollCollapse({
    collapseAt: HEADER_COLLAPSE_AT,
    expandAt: HEADER_EXPAND_AT,
  });

  const handleProductAction = (product: Product) => (action: ActionEnums) => {
    switch (action) {
      case ActionEnums.VIEW_STOREFRONT:
        if (!storefrontUrl) {
          return errorMessage("Store URL or product URL not found.");
        }
        return window.open(storefrontUrl, "_blank");
      case ActionEnums.VIEW_ORDERS:
        return router.push(productOrdersRoute(product.id));
      case ActionEnums.DUPLICATE:
        return guard.leaveForm(() =>
          router.push(duplicateProductRoute(product.id)),
        );
      case ActionEnums.DELETE:
        return setDeleteOpen(true);
    }
  };

  const activeDiscountType = discountType ?? productDefaults.discountType;

  return {
    form,
    isEdit,
    record,
    title: isEdit
      ? record?.name || "Edit product"
      : duplicateId
        ? "Duplicate product"
        : "Add product",
    storefrontUrl,
    headerRef,
    compactHeader,
    loading: !!sourceId && singleProductLoading && !record,
    saving: isSubmitting,
    navSections,
    activeSection,
    scrollToSection,
    brands: brandOptions,
    categories,
    handleIdentityChange,
    showAdvanced,
    toggleAdvanced: () => setShowAdvanced((open) => !open),
    discountTypeOptions: getDiscountTypeOptions(currency.symbol),
    bulkPricingTiers: toFieldRows<BulkPricingTierValues>(tiers.fields, tierValues),
    bulkPricingColumns: getBulkPricingColumns({
      currency,
      discountLabel: getDiscountLabel(activeDiscountType, currency.symbol),
      discountType: activeDiscountType,
      basePrice: getBasePrice({ price, salePrice }),
      onRemove: tiers.remove,
    }),
    handleAddTier: () => tiers.append(newBulkPricingTier()),
    trackInventory: !!trackInventory,
    customFields: toFieldRows<CustomFieldValues>(customFields.fields, customFieldValues),
    customFieldColumns: getCustomFieldColumns({ onRemove: customFields.remove }),
    handleAddCustomField: () => customFields.append(newCustomField()),
    freeShipping: !!freeShipping,
    showCallForPricing:
      purchasabilityStatus === PurchasabilityStatus.NotAvailable,
    showCallForPricingFields:
      purchasabilityStatus === PurchasabilityStatus.NotAvailable &&
      !!callForPricing,
    manageCustoms: !!manageCustoms,
    hsCodes: toFieldRows<HsCodeValues>(hsCodes.fields, hsCodeValues),
    hsCodeColumns: getHsCodeColumns({ onRemove: hsCodes.remove }),
    handleAddHsCode: () => hsCodes.append(newHsCode()),
    showRedirect:
      isEdit && !!record?.productUrl && productUrl !== record.productUrl,
    handleProductUrlChange: () => setAutoUrl(false),
    handleResetProductUrl,
    productActions,
    handleProductAction,
    deleteOpen,
    setDeleteOpen,
    handleDeleted: () => guard.leaveForm(),
    setSubmitAction,
    onSubmit,
    onInvalid,
    handleCancel: guard.requestLeave,
    leaveOpen: guard.leaveOpen,
    setLeaveOpen: guard.setLeaveOpen,
    confirmLeave: guard.confirmLeave,
    stay: guard.stay,
  };
};

export default useProductFormPageContainer;
