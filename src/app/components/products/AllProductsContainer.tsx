import useTableContainer from "@/components/ui/Table/TableContainer";
import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  deriveDefaultsForSelection,
  getProductCategoryIds,
} from "@/lib/toggleCategoryHelper";
import {
  deleteProduct,
  deleteProductCategory,
  fetchAllProducts,
  setSelectedProducts,
  updateProduct,
} from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import React from "react";
import * as XLSX from "xlsx";
import ActionButton from "@/components/ActionButton/ActionButton";
import AllProductsColumn from "./AllProductsColumn";
import { BOOLEAN_FILTERS, PRODUCT_BULK_ACTIONS, ProductTabs } from "./constant";
import { useAlert } from "@/hooks/useAlert";
import { downloadExport } from "@/redux/slices/exportSlice";
import { Button } from "@/components/ui/Button";

const useAllProductsContainer = () => {
  const allProducts = useAppSelector((state: any) => state.product.products);
  const { loading, error } = useAppSelector((state: any) => state.product);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Category modal state
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const [categoryProductIds, setCategoryProductIds] = React.useState<number[]>(
    [],
  );
  const [categoryModalDefaults, setCategoryModalDefaults] = React.useState<
    string[]
  >([]);
  const [showProductDeleteConfirm, setShowProductDeleteConfirm] =
    React.useState(false);
  const [pendingDeleteProductIds, setPendingDeleteProductIds] = React.useState<
    number[]
  >([]);
  const [categoryAction, setCategoryAction] = React.useState<
    ActionEnums.ADD | ActionEnums.DELETE
  >(ActionEnums.ADD);

  const [showCategoryDeleteConfirm, setShowCategoryDeleteConfirm] =
    React.useState(false);
  const [pendingDeleteCategoryIds, setPendingDeleteCategoryIds] =
    React.useState<number[]>([]);
  const { showAlert, Alert } = useAlert();
  const products = allProducts?.data;
  const pagination = allProducts?.pagination;
  const totalPages = pagination?.lastPage;
  const productList: any[] = products || [];

  const table = useTableContainer<number>({
    defaultTab: "All",
    tabs: ProductTabs,
    fetcher: (params) => dispatch(fetchAllProducts(params)),
    filterFormat: { booleanKeys: BOOLEAN_FILTERS },
  });

  const {
    tab: selectedTab,
    page: currentPage,
    perPage,
    selectedIds: selectedProductIds,
    setSelectedIds,
    clearSelection,
  } = table;

  const handleApplyCategories = async (pickedIdsStr: string[]) => {
    if (categoryAction === ActionEnums.ADD) {
      try {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [
                {
                  id: categoryProductIds,
                  fields: { categoryIds: pickedIdsStr.map(Number) },
                },
              ],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) table.refetch();
      } catch (error) {
        console.error("Failed to update product categories:", error);
      } finally {
        setCategoryModalOpen(false);
        setCategoryProductIds([]);
        setCategoryModalDefaults([]);
        clearSelection();
      }
      return;
    }

    const picked = pickedIdsStr.map(Number);
    if (!picked.length) {
      setCategoryModalOpen(false);
      setCategoryModalDefaults([]);
      return;
    }
    setPendingDeleteCategoryIds(picked);
    setCategoryModalOpen(false);
    setShowCategoryDeleteConfirm(true);
  };

  const categoryDeleteCount = pendingDeleteCategoryIds.length;
  const categoryDeleteMessage =
    categoryDeleteCount === 1
      ? "Are you sure you want to delete this category from the product?"
      : `Are you sure you want to delete these ${categoryDeleteCount} categories from the product?`;

  const closeCategoryDeleteConfirm = () => {
    setShowCategoryDeleteConfirm(false);
    setPendingDeleteCategoryIds([]);
    setCategoryProductIds([]);
    setCategoryModalDefaults([]);
  };

  const confirmCategoryDelete = async () => {
    try {
      const result = await dispatch(
        deleteProductCategory({
          data: {
            productIds: categoryProductIds,
            categoryIds: pendingDeleteCategoryIds,
          },
        }),
      );
      if (deleteProductCategory.fulfilled.match(result)) table.refetch();
    } catch (error) {
      console.error("Failed to delete product categories:", error);
    } finally {
      setShowCategoryDeleteConfirm(false);
      setPendingDeleteCategoryIds([]);
      setCategoryProductIds([]);
      setCategoryModalDefaults([]);
      clearSelection();
    }
  };

  // Shared by the row and bulk action menus
  const openCategoryModal = (
    ids: number[],
    action: ActionEnums.ADD | ActionEnums.DELETE,
    defaults: string[],
  ) => {
    setCategoryAction(action);
    setCategoryProductIds(ids);
    setCategoryModalDefaults(defaults);
    setCategoryModalOpen(true);
  };

  const updateProductFields = async (
    ids: number[],
    fields: Record<string, number>,
  ) => {
    const result = await dispatch(
      updateProduct({ body: { products: [{ id: ids, fields }] } }),
    );
    return updateProduct.fulfilled.match(result);
  };

  const confirmDeleteProducts = (ids: number[]) => {
    setPendingDeleteProductIds(ids);
    setShowProductDeleteConfirm(true);
  };

  const openStorefront = (product: any) => {
    const selectedStore = JSON.parse(
      localStorage.getItem("availableStores") || "[]",
    ).find(
      (store: any) => store.id === Number(localStorage.getItem("storeId")),
    );

    if (selectedStore?.baseUrl && product?.productUrl) {
      window.open(`${selectedStore.baseUrl}${product.productUrl}`, "_blank");
    } else {
      showAlert({
        title: "Store or Product Not Found",
        message: "Store URL or Product SKU not found.",
      });
    }
  };

  // Per-row actions menu.
  const handleProductAction = (product: any) => async (action: ActionEnums) => {
    const ids = [product.id];
    const updateRow = async (fields: Record<string, number>) => {
      if (await updateProductFields(ids, fields)) table.refetch();
    };

    switch (action) {
      case ActionEnums.ADD_TO_CATEGORIES:
        return openCategoryModal(
          ids,
          ActionEnums.ADD,
          getProductCategoryIds(product),
        );
      case ActionEnums.REMOVE_FROM_CATEGORIES:
        return openCategoryModal(
          ids,
          ActionEnums.DELETE,
          getProductCategoryIds(product),
        );
      case ActionEnums.ENABLE:
        return updateRow({ isVisible: 1 });
      case ActionEnums.DISABLE:
        return updateRow({ isVisible: 0 });
      case ActionEnums.FEATURE:
        return updateRow({ isFeatured: 1 });
      case ActionEnums.UNFEATURE:
        return updateRow({ isFeatured: 0 });
      case ActionEnums.DELETE:
        return confirmDeleteProducts(ids);
      case ActionEnums.EDIT:
        return router.push(`/manage/products/edit/${product.id}`);
      case ActionEnums.DUPLICATE:
        return router.push(
          `/manage/products/dublicate/${product.id}?isDuplicate=true`,
        );
      case ActionEnums.VIEW_STOREFRONT:
        return openStorefront(product);
    }
  };

  // Bulk actions menu (shown when rows are selected).
  const handleBulkAction = (ids: number[]) => async (action: ActionEnums) => {
    const selected = productList.filter((p: any) => ids.includes(p.id));
    const updateSelected = async (fields: Record<string, number>) => {
      if (await updateProductFields(ids, fields)) {
        table.refetch();
        clearSelection();
      }
    };

    switch (action) {
      case ActionEnums.ADD_TO_CATEGORIES:
        return openCategoryModal(
          ids,
          ActionEnums.ADD,
          deriveDefaultsForSelection(selected, "intersection"),
        );
      case ActionEnums.REMOVE_FROM_CATEGORIES:
        return openCategoryModal(
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
        return confirmDeleteProducts(ids);
    }
  };

  const handleEditInventory = () => {
    const selected = productList.filter((p: any) =>
      selectedProductIds.includes(p.id),
    );
    localStorage.setItem("selectedProducts", JSON.stringify(selected));
    dispatch(setSelectedProducts(selected));
    router.push("/manage/products/inventory");
  };

  const handlebulkEdit = () => {
    const selected = productList.filter((p: any) =>
      selectedProductIds.includes(p.id),
    );
    localStorage.setItem("bulkEditProducts", JSON.stringify(selected));
    router.push("/manage/products/bulk-edit");
  };

  const handleExportProducts = async () => {
    if (!selectedProductIds.length) return;

    try {
      await downloadExport(dispatch, {
        endpoint: "dashboard/products/export-csv",
        ids: selectedProductIds,
        idField: "product_ids",
        filenamePrefix: "products",
      });
    } catch (error) {
      console.error("Product export failed:", error);
    }
  };
  const productDeleteMessage =
    pendingDeleteProductIds.length === 1
      ? "Are you sure you want to delete this product?"
      : `Are you sure you want to delete these ${pendingDeleteProductIds.length} products?`;

  const productDeleteConfirm = async () => {
    try {
      const result = await dispatch(
        deleteProduct({ ids: pendingDeleteProductIds }),
      );

      if (deleteProduct.fulfilled.match(result)) {
        table.refetch();
        clearSelection();
      }
    } finally {
      setShowProductDeleteConfirm(false);
      setPendingDeleteProductIds([]);
    }
  };

  const bulkActions = (
    <>
      <Button variant="outline" size="md" onClick={handleExportProducts}>
        Export
      </Button>
      <Button variant="outline" size="md" onClick={handlebulkEdit}>
        Bulk edit
      </Button>
      <Button variant="outline" size="md" onClick={handleEditInventory}>
        Edit Inventory
      </Button>
      <ActionButton
        data={selectedProductIds}
        actions={PRODUCT_BULK_ACTIONS}
        onAction={handleBulkAction}
        label="More actions for selected products"
        // icon="•••"
        align="start"
        triggerProps={{ variant: "outline", size: "md", className: "text-xl" }}
      />
      <Alert />
    </>
  );

  const columns = AllProductsColumn({
    onAction: handleProductAction,
    router,
    dispatch,
    refetch: table.refetch,
  });

  return {
    columns,
    productList,
    loading,
    error,
    selectedTab,
    table,
    selectedProductIds,
    setSelectedIds,
    currentPage,
    totalPages,
    perPage,
    pagination,
    categoryModalOpen,
    setCategoryModalOpen,
    categoryModalDefaults,
    handleApplyCategories,
    bulkActions,
    // category-delete confirmation modal
    showCategoryDeleteConfirm,
    categoryDeleteMessage,
    confirmCategoryDelete,
    closeCategoryDeleteConfirm,
    showProductDeleteConfirm,
    productDeleteMessage,
    productDeleteConfirm,
    closeProductDeleteConfirm: () => {
      setShowProductDeleteConfirm(false);
      setPendingDeleteProductIds([]);
    },
    router,
  };
};

export default useAllProductsContainer;
