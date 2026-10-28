import useTableContainer from "@/components/ui/Table/TableContainer";
import { ActionEnums, LocalStorageKeys } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deriveDefaultsForSelection,
  getProductCategoryIds,
} from "@/lib/toggleCategoryHelper";
import { StoreObject } from "@/redux/slices/configSlice";
import { fetchDefaultCurrency } from "@/redux/slices/currencySlice";
import { downloadExport } from "@/redux/slices/exportSlice";
import {
  fetchAllProducts,
  setSelectedProducts,
  updateProduct,
} from "@/redux/slices/productSlice";
import { errorMessage } from "@/utils/message";
import { getFromStorage, getSelectedStore, setInStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProductCategoriesMode } from "@/Modals/ProductModals/ProductCategoriesModal/type";
import { getProductColumns } from "./columns";
import {
  duplicateProductRoute,
  editProductRoute,
  FALLBACK_CURRENCY,
  PRODUCT_BOOLEAN_FILTERS,
  PRODUCT_BULK_EDIT_ROUTE,
  PRODUCT_EXPORT_ENDPOINT,
  PRODUCT_INVENTORY_ROUTE,
  ProductTabs,
} from "./constant";
import type { ProductListItem, ProductListResponse } from "./type";
import { getStorefrontProductUrl } from "./utils";

type CategoryHelperProduct = Parameters<typeof getProductCategoryIds>[0];

const useProductsPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { products, productsLoading, error } = useAppSelector(
    (state) => state.product,
  ) as {
    products: ProductListResponse | null;
    productsLoading: boolean;
    error: string | null;
  };
  const defaultCurrency = useAppSelector(
    (state) => state.currency.defaultCurrency,
  );
  const rows = products?.data ?? [];

  const table = useTableContainer<number>({
    defaultTab: "All",
    tabs: ProductTabs,
    fetcher: (params) => dispatch(fetchAllProducts(params)),
    filterFormat: { booleanKeys: PRODUCT_BOOLEAN_FILTERS },
  });
  const { selectedIds, setSelectedIds, clearSelection, refetch } = table;

  const [storeName, setStoreName] = useState<string>();
  const [categoriesModal, setCategoriesModal] = useState<{
    open: boolean;
    mode: ProductCategoriesMode;
    productIds: number[];
    defaultCategoryIds: string[];
  }>({ open: false, mode: ActionEnums.ADD, productIds: [], defaultCategoryIds: [] });
  const [deleteTargets, setDeleteTargets] = useState<ProductListItem[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDefaultCurrency());
    setStoreName(
      getFromStorage<StoreObject>(LocalStorageKeys.CurrentStore)?.name,
    );
  }, [dispatch]);

  const selectedRows = rows.filter(({ id }) => selectedIds.includes(id));

  const updateProducts = async (
    ids: number[],
    fields: Record<string, number>,
  ) => {
    const result = await dispatch(
      updateProduct({ body: { products: [{ id: ids, fields }] } }),
    );
    if (updateProduct.rejected.match(result)) {
      errorMessage(result.payload as string);
      return false;
    }
    refetch();
    return true;
  };

  const openCategoriesModal = (
    productIds: number[],
    mode: ProductCategoriesMode,
    defaultCategoryIds: string[],
  ) =>
    setCategoriesModal({ open: true, mode, productIds, defaultCategoryIds });

  const confirmDelete = (targets: ProductListItem[]) => {
    setDeleteTargets(targets);
    setDeleteOpen(true);
  };

  const openStorefront = (product: ProductListItem) => {
    const baseUrl = getSelectedStore()?.baseUrl;
    if (!baseUrl || !product.productUrl) {
      return errorMessage("Store URL or product URL not found.");
    }
    window.open(getStorefrontProductUrl(baseUrl, product.productUrl), "_blank");
  };

  const handleProductAction =
    (product: ProductListItem) => (action: ActionEnums) => {
      const ids = [product.id];
      const categoryIds = getProductCategoryIds(
        product as CategoryHelperProduct,
      );

      switch (action) {
        case ActionEnums.EDIT:
          return router.push(editProductRoute(product.id));
        case ActionEnums.DUPLICATE:
          return router.push(duplicateProductRoute(product.id));
        case ActionEnums.VIEW_STOREFRONT:
          return openStorefront(product);
        case ActionEnums.ADD_TO_CATEGORIES:
          return openCategoriesModal(ids, ActionEnums.ADD, categoryIds);
        case ActionEnums.REMOVE_FROM_CATEGORIES:
          return openCategoriesModal(ids, ActionEnums.DELETE, categoryIds);
        case ActionEnums.ENABLE:
          return updateProducts(ids, { isVisible: 1 });
        case ActionEnums.DISABLE:
          return updateProducts(ids, { isVisible: 0 });
        case ActionEnums.FEATURE:
          return updateProducts(ids, { isFeatured: 1 });
        case ActionEnums.UNFEATURE:
          return updateProducts(ids, { isFeatured: 0 });
        case ActionEnums.DELETE:
          return confirmDelete([product]);
      }
    };

  const handleBulkAction = (ids: number[]) => async (action: ActionEnums) => {
    const selected = selectedRows as CategoryHelperProduct[];
    const updateSelected = async (fields: Record<string, number>) => {
      if (await updateProducts(ids, fields)) clearSelection();
    };

    switch (action) {
      case ActionEnums.ADD_TO_CATEGORIES:
        return openCategoriesModal(
          ids,
          ActionEnums.ADD,
          deriveDefaultsForSelection(selected, "intersection"),
        );
      case ActionEnums.REMOVE_FROM_CATEGORIES:
        return openCategoriesModal(
          ids,
          ActionEnums.DELETE,
          deriveDefaultsForSelection(selected, "union"),
        );
      case ActionEnums.ENABLE:
        return updateSelected({ isVisible: 1 });
      case ActionEnums.DISABLE:
        return updateSelected({ isVisible: 0 });
      case ActionEnums.FEATURE:
        return updateSelected({ isFeatured: 1 });
      case ActionEnums.UNFEATURE:
        return updateSelected({ isFeatured: 0 });
      case ActionEnums.DELETE:
        return confirmDelete(selectedRows);
    }
  };

  const handleEditInventory = () => {
    setInStorage(LocalStorageKeys.SelectedProducts, selectedRows);
    dispatch(setSelectedProducts(selectedRows));
    router.push(PRODUCT_INVENTORY_ROUTE);
  };

  const handleBulkEdit = () => {
    setInStorage(LocalStorageKeys.BulkEditProducts, selectedRows);
    router.push(PRODUCT_BULK_EDIT_ROUTE);
  };

  const handleExport = async () => {
    if (!selectedIds.length) return;
    try {
      await downloadExport(dispatch, {
        endpoint: PRODUCT_EXPORT_ENDPOINT,
        ids: selectedIds,
        idField: "product_ids",
        filenamePrefix: "products",
      });
    } catch {
      errorMessage("Product export failed");
    }
  };

  const handleSaved = () => {
    refetch();
    clearSelection();
  };

  return {
    table,
    rows,
    // Only the first load shows skeletons, so a refresh keeps rows (and the
    // quick-edit sheets open inside them) mounted
    loading: productsLoading && !rows.length,
    error,
    pagination: products?.pagination,
    columns: getProductColumns({
      currency: defaultCurrency ?? FALLBACK_CURRENCY,
      storeName,
      onAction: handleProductAction,
      onToggleFeatured: (id, featured) =>
        updateProducts([id], { isFeatured: featured ? 1 : 0 }),
      onToggleVisibility: (id, visible) =>
        updateProducts([id], { isVisible: visible ? 1 : 0 }),
      onSaved: refetch,
    }),
    selectedIds,
    setSelectedIds,
    handleBulkAction,
    handleEditInventory,
    handleBulkEdit,
    handleExport,
    categoriesModal,
    setCategoriesModalOpen: (open: boolean) =>
      setCategoriesModal((current) => ({ ...current, open })),
    deleteTargets,
    deleteOpen,
    setDeleteOpen,
    handleSaved,
  };
};

export default useProductsPageContainer;
