import { ActionEnums } from "@/const/appConstants";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { findCategoryAncestors, findCategoryPath } from "@/lib/categoryUtils";
import {
  addCategory,
  editCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from "@/redux/slices/categorySlice";
import { errorMessage, successMessage } from "@/utils/message";
import { getSelectedStore } from "@/utils/storage";
import { CategoryFormSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CATEGORIES_ROUTE,
  categoryProductsRoute,
  categoryStorefrontUrl,
  editCategoryRoute,
  NEW_CATEGORY_ID,
  PARENT_CATEGORY_PARAM,
} from "../constant";
import type { Category, CategoryNode } from "../type";
import { buildCategorySlug, trimSlashes } from "../utils";
import {
  CATEGORY_EDIT_ACTIONS,
  categoryDefaults,
  CategoryFormNames,
} from "./constant";
import type { CategoryFormValues } from "./type";
import {
  getCategoryImageUrl,
  transformGetCategory,
  transformPostCategory,
} from "./utils";

const EMPTY_TREE: CategoryNode[] = [];

const useCategoryFormPageContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: idParam } = useParams<{ id: string }>();

  const isEdit = idParam !== NEW_CATEGORY_ID;
  const id = isEdit ? Number(idParam) : null;
  if (isEdit && !id) notFound();
  // Creating a sub-category: the parent it starts under
  const parentId = isEdit
    ? null
    : Number(searchParams.get(PARENT_CATEGORY_PARAM)) || null;

  const categoryTree =
    (useAppSelector(
      (state) => (state.category.categories as { data?: CategoryNode[] })?.data,
    ) as CategoryNode[] | undefined) ?? EMPTY_TREE;
  const { selectedCategory, selectedCategoryLoading } = useAppSelector(
    (state) => state.category,
  ) as { selectedCategory: Category | null; selectedCategoryLoading: boolean };

  const [storeName, setStoreName] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: yupResolver(CategoryFormSchema),
    defaultValues: categoryDefaults,
  });
  const { reset, setValue, getValues } = form;

  useEffect(() => {
    dispatch(fetchCategories());
    setStoreName(getSelectedStore()?.name ?? "");
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(fetchCategoryById({ id }));
  }, [dispatch, id]);

  // Ignore a category left in the store from a previously opened page
  const record = id && selectedCategory?.id === id ? selectedCategory : null;

  useEffect(() => {
    if (record) reset(transformGetCategory(record));
  }, [record, reset]);

  // The channel is always the current store
  useEffect(() => {
    setValue(CategoryFormNames.Channel, storeName);
  }, [storeName, record, setValue]);

  // Show the parent's path once the tree is in; a new sub-category starts
  // under the category it was created from
  const startParentId = record ? (record.parent_id ?? null) : parentId;
  useEffect(() => {
    if (!startParentId || !categoryTree.length) return;
    const current = getValues(CategoryFormNames.Parent);
    // Already shown, or the user picked another parent
    if (current.path || (current.id && current.id !== startParentId)) return;
    const path = findCategoryPath(categoryTree, startParentId);
    if (path) setValue(CategoryFormNames.Parent, { id: startParentId, path });
  }, [startParentId, categoryTree, getValues, setValue]);

  // The URL follows the name for a new category until it's typed in; a saved
  // category keeps its own until Reset
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const fillSlug = () => {
    const slug = buildCategorySlug(getValues(CategoryFormNames.Name));
    if (slug) setValue(CategoryFormNames.Slug, slug, { shouldDirty: true });
  };

  // "1 of N" pager across the categories that share this one's parent
  const ancestors = id ? findCategoryAncestors(categoryTree, id) : null;
  const siblings: CategoryNode[] = ancestors
    ? (ancestors[ancestors.length - 2]?.subcategories ?? categoryTree)
    : [];
  const siblingIndex = siblings.findIndex((node) => Number(node.id) === id);
  const openSibling = (offset: number) => {
    const target = siblings[siblingIndex + offset];
    return target ? () => router.push(editCategoryRoute(target.id)) : undefined;
  };

  const refreshTree = () => dispatch(fetchCategories());

  const handleCategoryAction =
    (category: Category) => async (action: ActionEnums) => {
      switch (action) {
        case ActionEnums.VIEW_STOREFRONT:
          return window.open(
            categoryStorefrontUrl(
              getSelectedStore()?.baseUrl,
              trimSlashes(category.slug ?? ""),
            ),
            "_blank",
          );
        case ActionEnums.VIEW:
          return router.push(categoryProductsRoute(category.id));
        case ActionEnums.ENABLE:
        case ActionEnums.DISABLE: {
          // Saved right away, and kept in the form so Save doesn't revert it
          const isVisible = action === ActionEnums.ENABLE;
          const result = await dispatch(
            updateCategory({
              id: category.id,
              data: { name: category.name, isVisible },
            }),
          );
          if (updateCategory.rejected.match(result)) {
            return errorMessage(result.payload as string);
          }
          setValue(CategoryFormNames.IsVisible, isVisible);
          dispatch(fetchCategoryById({ id: category.id }));
          return refreshTree();
        }
        case ActionEnums.DELETE:
          return setDeleteOpen(true);
      }
    };

  const onSubmit = async (values: CategoryFormValues) => {
    if (id && values.parent.id === id) {
      errorMessage("A category cannot be its own parent.");
      return;
    }
    const data = transformPostCategory(values, {
      isEdit,
      hadImage: Boolean(getCategoryImageUrl(record)),
    });
    const result = id
      ? await dispatch(editCategory({ id, data }))
      : await dispatch(addCategory({ data }));

    if (
      editCategory.rejected.match(result) ||
      addCategory.rejected.match(result)
    ) {
      errorMessage(result.payload as string);
      return;
    }
    successMessage(isEdit ? "Category updated" : "Sub-category created");
    refreshTree();
    router.push(CATEGORIES_ROUTE);
  };

  return {
    form,
    isEdit,
    record,
    title: isEdit ? "Edit category" : "Add sub-category",
    loading: isEdit && selectedCategoryLoading && !record,
    saving: form.formState.isSubmitting,
    categoryTree,
    channelOptions: storeName ? [{ value: storeName, label: storeName }] : [],
    pager:
      isEdit && siblingIndex >= 0
        ? {
            current: siblingIndex + 1,
            total: siblings.length,
            onPrevious: openSibling(-1),
            onNext: openSibling(1),
          }
        : null,
    categoryActions: CATEGORY_EDIT_ACTIONS,
    handleCategoryAction,
    handleNameChange: () => autoSlug && fillSlug(),
    handleSlugChange: () => setAutoSlug(false),
    handleResetSlug: () => {
      setAutoSlug(true);
      fillSlug();
    },
    deleteOpen,
    setDeleteOpen,
    handleDeleted: () => {
      refreshTree();
      router.push(CATEGORIES_ROUTE);
    },
    onSubmit,
    handleCancel: () => router.push(CATEGORIES_ROUTE),
  };
};

export default useCategoryFormPageContainer;
