"use client";

import CategoryTreeSm from "@/app/components/products/add/CategoryTreeSm";
import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import InputField from "@/components/form/InputField";
import Modal from "@/components/Modal/Modal";
import { ActionEnums } from "@/const/appConstants";
import useProductCategoriesContainer from "./ProductCategoriesModalContainer";
import { ProductCategoriesFormNames } from "./constant";
import { ProductCategoriesModalProps } from "./type";

const ProductCategoriesModal = ({
  open,
  onOpenChange,
  mode,
  productIds,
  defaultCategoryIds,
  onSaved,
}: ProductCategoriesModalProps) => {
  const { form, dropdownCategories, searchPick, handleSearchPick, onSubmit } =
    useProductCategoriesContainer({
      open,
      mode,
      productIds,
      defaultCategoryIds,
      onSaved,
    });
  const isRemove = mode === ActionEnums.DELETE;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isRemove ? "Remove categories" : "Choose categories"}
      description={
        isRemove
          ? "Tick the categories to remove from the selected products."
          : undefined
      }
      size="md"
      isForm
      form={form}
      onSubmit={onSubmit}
      saveText={isRemove ? "Remove" : "Save"}
      loadingText={isRemove ? "Removing..." : "Saving..."}
      saveButtonClassName={
        isRemove
          ? "bg-danger-red border-danger-red hover:bg-dark-danger-red hover:text-white"
          : undefined
      }
    >
      <CategoryDropdown
        categoryData={dropdownCategories}
        value={searchPick}
        onChange={handleSearchPick}
        className="max-w-full"
      />
      <InputField
        name={ProductCategoriesFormNames.Categories}
        layout="vertical"
        Component={CategoryTreeSm}
      />
    </Modal>
  );
};

export default ProductCategoriesModal;
