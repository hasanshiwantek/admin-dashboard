import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import {
  deleteProductCategory,
  updateProduct,
} from "@/redux/slices/productSlice";
import { errorMessage, successMessage } from "@/utils/message";
import { ProductCategoriesSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  productCategoriesDefaults,
  ProductCategoriesFormNames,
} from "./constant";
import type {
  CategoryNode,
  CategoryPick,
  ProductCategoriesFormValues,
  ProductCategoriesModalProps,
} from "./type";
import { toDropdownCategories } from "./utils";

const useProductCategoriesContainer = ({
  open,
  mode,
  productIds,
  defaultCategoryIds,
  onSaved,
}: Pick<
  ProductCategoriesModalProps,
  "open" | "mode" | "productIds" | "defaultCategoryIds" | "onSaved"
>) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => (state.category.categories as { data?: CategoryNode[] })?.data,
  );

  const form = useForm<ProductCategoriesFormValues>({
    resolver: yupResolver(ProductCategoriesSchema),
    defaultValues: productCategoriesDefaults,
  });
  const { reset, getValues, setValue } = form;
  const [searchPick, setSearchPick] = useState<CategoryPick>({
    id: null,
    path: "",
  });

  useEffect(() => {
    if (open && !categories?.length) dispatch(fetchCategories());
  }, [open, categories?.length, dispatch]);

  useEffect(() => {
    if (!open) return;
    reset({ [ProductCategoriesFormNames.Categories]: defaultCategoryIds });
    setSearchPick({ id: null, path: "" });
  }, [open, defaultCategoryIds, reset]);

  // Picking a category from the search ticks it in the tree
  const handleSearchPick = (pick: CategoryPick) => {
    setSearchPick(pick);
    if (pick.id === null) return;
    const current = getValues(ProductCategoriesFormNames.Categories);
    const id = String(pick.id);
    if (!current.includes(id)) {
      setValue(ProductCategoriesFormNames.Categories, [...current, id], {
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async ({ categories: picked }: ProductCategoriesFormValues) => {
    const categoryIds = picked.map(Number);
    const isAdd = mode === ActionEnums.ADD;
    if (!isAdd && !categoryIds.length) return true;

    const result = isAdd
      ? await dispatch(
          updateProduct({
            body: {
              products: [{ id: productIds, fields: { categoryIds } }],
            },
          }),
        )
      : await dispatch(
          deleteProductCategory({ data: { productIds, categoryIds } }),
        );

    if (
      updateProduct.rejected.match(result) ||
      deleteProductCategory.rejected.match(result)
    ) {
      errorMessage(result.payload as string);
      return false;
    }
    successMessage(isAdd ? "Categories updated" : "Categories removed");
    onSaved?.();
  };

  return {
    form,
    dropdownCategories: useMemo(
      () => toDropdownCategories(categories ?? []),
      [categories],
    ),
    searchPick,
    handleSearchPick,
    onSubmit,
  };
};

export default useProductCategoriesContainer;
