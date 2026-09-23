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
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import AllProductsColumn from "./AllProductsColumn";
import { BOOLEAN_FILTERS, ProductTabs } from "./constant";

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
  const [categoryAction, setCategoryAction] = React.useState<
    ActionEnums.ADD | ActionEnums.DELETE
  >(ActionEnums.ADD);

  const [showCategoryDeleteConfirm, setShowCategoryDeleteConfirm] =
    React.useState(false);
  const [pendingDeleteCategoryIds, setPendingDeleteCategoryIds] =
    React.useState<number[]>([]);

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

  // Per-row actions dropdown.
  const getRowActions = (product: any) => [
    {
      label: "Add to categories",
      onClick: () => {
        const defaults = getProductCategoryIds(product);
        setCategoryAction(ActionEnums.ADD);
        setCategoryProductIds([product.id]);
        setCategoryModalDefaults(defaults);
        setCategoryModalOpen(true);
      },
    },
    {
      label: "Remove from categories",
      onClick: () => {
        const defaults = getProductCategoryIds(product);
        setCategoryAction(ActionEnums.DELETE);
        setCategoryProductIds([product.id]);
        setCategoryModalDefaults(defaults);
        setCategoryModalOpen(true);
      },
    },
    {
      label: "Enable visibility",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: [product?.id], fields: { isVisible: 1 } }],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) table.refetch();
      },
    },
    {
      label: "Disable visibility",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: [product?.id], fields: { isVisible: 0 } }],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) table.refetch();
      },
    },
    {
      label: "Make featured",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: [product?.id], fields: { isFeatured: 1 } }],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) table.refetch();
      },
    },
    {
      label: "Make not featured",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: [product?.id], fields: { isFeatured: 0 } }],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) table.refetch();
      },
    },
    {
      label: "Delete",
      onClick: async () => {
        const confirm = window.confirm("Delete Product?");
        if (!confirm) return;
        const result = await dispatch(deleteProduct({ ids: [product.id] }));
        if (deleteProduct.fulfilled.match(result)) table.refetch();
      },
    },
    {
      label: "Edit",
      onClick: () => {
        router.push(`/manage/products/edit/${product?.id}`);
      },
    },
    {
      label: "Duplicate",
      onClick: () => {
        router.push(
          `/manage/products/dublicate/${product?.id}?isDuplicate=true`,
        );
      },
    },
    {
      label: "View Storefront",
      onClick: () => {
        const selectedStore = JSON.parse(
          localStorage.getItem("availableStores") || "[]",
        ).find(
          (store: any) => store.id === Number(localStorage.getItem("storeId")),
        );

        if (selectedStore?.baseUrl && product?.productUrl) {
          window.open(
            `${selectedStore.baseUrl}${product.productUrl}`,
            "_blank",
          );
        } else {
          alert("Store URL or Product SKU not found");
        }
      },
    },
  ];

  // Bulk actions dropdown (shown when rows are selected).
  const editdropdownActions = [
    {
      label: "Add to categories",
      onClick: () => {
        const selected = productList.filter((p: any) =>
          selectedProductIds.includes(p.id),
        );
        const defaults = deriveDefaultsForSelection(selected, "intersection");
        setCategoryAction(ActionEnums.ADD);
        setCategoryProductIds(selectedProductIds);
        setCategoryModalDefaults(defaults);
        setCategoryModalOpen(true);
      },
    },
    {
      label: "Remove from categories",
      onClick: () => {
        const selected = productList.filter((p: any) =>
          selectedProductIds.includes(p.id),
        );
        const defaults = deriveDefaultsForSelection(selected, "union");
        setCategoryAction(ActionEnums.DELETE);
        setCategoryProductIds(selectedProductIds);
        setCategoryModalDefaults(defaults);
        setCategoryModalOpen(true);
      },
    },
    {
      label: "Enable visiblity",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: selectedProductIds, fields: { isVisible: 1 } }],
            },
          }),
        );

        if (updateProduct.fulfilled.match(result)) {
          table.refetch();
          clearSelection();
        }
      },
    },
    {
      label: "Disable visiblity",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: selectedProductIds, fields: { isVisible: 0 } }],
            },
          }),
        );

        if (updateProduct.fulfilled.match(result)) {
          table.refetch();
          clearSelection();
        }
      },
    },
    {
      label: "Make featured",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: selectedProductIds, fields: { isFeatured: 1 } }],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) {
          table.refetch();
          clearSelection();
        }
      },
    },
    {
      label: "Make Not featured",
      onClick: async () => {
        const result = await dispatch(
          updateProduct({
            body: {
              products: [{ id: selectedProductIds, fields: { isFeatured: 0 } }],
            },
          }),
        );
        if (updateProduct.fulfilled.match(result)) {
          table.refetch();
          clearSelection();
        }
      },
    },
    {
      label: "Delete",
      onClick: async () => {
        const confirm = window.confirm("Delete Selecred Products?");
        if (!confirm) return;
        const result = await dispatch(
          deleteProduct({ ids: selectedProductIds }),
        );
        if (deleteProduct.fulfilled.match(result)) {
          table.refetch();
          clearSelection();
        }
      },
    },
  ];

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

  const handleExport = () => {
    const selectedProducts = products?.filter((item: any) =>
      selectedProductIds.includes(item.id),
    );

    const exportData = selectedProducts.map((item: any) => ({
      ID: item.id,
      SKU: item.sku,
      Name: item.name,
      Price: item.price,
      Featured: item.isFeatured ? "Yes" : "No",
      Visible: item.isVisible ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products_export.xlsx");
  };

  const bulkActions = (
    <>
      <button className="btn-outline-primary" onClick={handleExport}>
        Export
      </button>
      <button className="btn-outline-primary" onClick={handlebulkEdit}>
        Bulk edit
      </button>
      <button className="btn-outline-primary" onClick={handleEditInventory}>
        Edit Inventory
      </button>
      <OrderActionsDropdown
        actions={editdropdownActions}
        trigger={
          <button className="text-xl cursor-pointer btn-outline-primary">
            •••
          </button>
        }
      />
    </>
  );

  const columns = AllProductsColumn({
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
    getRowActions,
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
  };
};

export default useAllProductsContainer;
