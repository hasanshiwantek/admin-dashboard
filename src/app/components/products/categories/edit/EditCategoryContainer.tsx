import {
  LocalStorageKeys,
  STOREFRONT_URL,
  UrlSettingEnums,
} from "@/const/appConstants";
import { useAlert } from "@/hooks/useAlert";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { findCategoryAncestors, findCategoryPath } from "@/lib/categoryUtils";
import { generateSlug } from "@/lib/productUtils";
import { buildQueryParams } from "@/lib/utils";
import {
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from "@/redux/slices/categorySlice";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import { getFromStorage, setInStorage } from "@/utils/storage";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  CATEGORIES_LIST_PATH,
  CategoryField,
  EditCategoryFormValues,
  INVALID_SLUG_CHARS,
  editCategoryDefaultValues,
} from "./constant";

const EMPTY_TREE: any[] = [];

const getInitialImageUrl = (cat: any): string | null =>
  cat?.image_url || cat?.image || cat?.thumbnail || cat?.media?.url || null;

const buildSlug = (
  name: string,
  rootParentName: string | null,
  urlSettingData: any,
): string | null => {
  const formatType = urlSettingData?.format_type;

  if (formatType == UrlSettingEnums.SEO_OPTIMIZED_SHORT) {
    return name ? `/${generateSlug(name)}` : null;
  }
  if (formatType == UrlSettingEnums.SEO_OPTIMIZED_LONG) {
    return name ? `/categories/${generateSlug(name)}` : null;
  }

  const customFormat = urlSettingData?.custom_format;
  if (formatType === "custom" && customFormat && (name || rootParentName)) {
    const replacements = {
      "%parent%": rootParentName ? generateSlug(rootParentName) : "",
      "%categoryname%": name ? generateSlug(name) : "",
    };
    const finalUrl = Object.entries(replacements)
      .reduce(
        (url, [key, value]) => url.replace(new RegExp(key, "gi"), value),
        customFormat,
      )
      .replace(/%[^%]+%/g, "")
      .replace(/\/+/g, "/")
      .replace(/\/$/g, "");
    return finalUrl || null;
  }
  return null;
};

const useEditCategoryContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string | string[] }>();
  const searchParams = useSearchParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const categoryId = Number(idStr);
  const rootParentName = searchParams.get("rootParent");

  // Select the raw value; defaulting to `[]` inside the selector returns a new
  // reference every call and causes an infinite re-render before categories load.
  const catTree: any[] =
    useAppSelector((s: any) => s.category?.categories?.data) ?? EMPTY_TREE;
  const urlSettingData = useAppSelector(
    (state: any) => state.home?.urlSettingData,
  );

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<any>(null);
  // Existing categories keep their saved URL until the user hits "Reset".
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const { showAlert, Alert } = useAlert();

  const form = useForm<EditCategoryFormValues>({
    defaultValues: editCategoryDefaultValues,
  });
  const { control, reset, setValue, watch } = form;
  const nameVal = useWatch({ control, name: CategoryField.Name });
  const isVisible = useWatch({ control, name: CategoryField.IsVisible });

  useEffect(() => {
    dispatch(fetchUrlSettings("category"));
  }, [dispatch]);

  // Channel is the currently selected store
  useEffect(() => {
    const stores =
      getFromStorage<any[]>(LocalStorageKeys.AvailableStores, []) ?? [];
    const savedStoreId = Number(getFromStorage(LocalStorageKeys.StoreId));
    const selected = stores.find((store) => store.id === savedStoreId);

    if (selected) {
      setSelectedStore(selected);
    } else if (stores.length > 0) {
      // Fallback to first store if saved ID not found
      setSelectedStore(stores[0]);
      setInStorage(LocalStorageKeys.StoreId, stores[0].id.toString());
    }
  }, []);

  // Fetch current category and the tree for the parent picker
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        if (!Number.isNaN(categoryId)) {
          const res: any = await dispatch(
            fetchCategoryById({ id: categoryId }),
          ).unwrap();
          if (mounted) setInitial(res?.category ?? null);
        }
        if (!catTree.length) dispatch(fetchCategories());
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [categoryId, dispatch]);

  // Prefill when the category arrives
  useEffect(() => {
    if (!initial) return;
    setIsUrlManuallyEdited(true);
    reset({
      [CategoryField.Name]: initial.name || "",
      [CategoryField.Slug]: initial.slug
        ? `/${initial.slug.replace(/^\/|\/$/g, "")}/`
        : "",
      [CategoryField.Description]: initial.description || "",
      [CategoryField.IsVisible]: Boolean(initial.is_visible),
      [CategoryField.Parent]: { id: initial.parent_id ?? null, path: "" },
      [CategoryField.TemplateLayout]:
        initial.templateLayout || initial.template_layout || "Default",
      [CategoryField.SortOrder]: Number(
        initial.sortOrder ?? initial.sort_order ?? 0,
      ),
      [CategoryField.DefaultProductSort]:
        initial.defaultProductSort ||
        initial.default_product_sort ||
        "storefront_default",
      [CategoryField.SeoHomeTitle]: initial.seoHomeTitle || "",
      [CategoryField.SeoMetaKeywords]: initial.seoMetakeywords || "",
      [CategoryField.SeoMetaDescription]: initial.seoMetaDescription || "",
      [CategoryField.SeoSearchKeywords]: initial.seoSearchKeywords || "",
      [CategoryField.Image]: getInitialImageUrl(initial),
    });
  }, [initial, reset]);

  // Resolve the parent's display path once the tree is available (may load after `initial`)
  useEffect(() => {
    const parentId = initial?.parent_id;
    if (!parentId || !catTree.length) return;
    const path = findCategoryPath(catTree, parentId);
    if (path) {
      setValue(
        CategoryField.Parent,
        { id: parentId, path },
        { shouldDirty: false },
      );
    }
  }, [initial, catTree, setValue]);

  // Typing in the URL field stops it from following the display name
  useEffect(() => {
    const { unsubscribe } = watch((_, { name, type }) => {
      if (name === CategoryField.Slug && type === "change") {
        setIsUrlManuallyEdited(true);
      }
    });
    return unsubscribe;
  }, [watch]);

  useEffect(() => {
    if (isUrlManuallyEdited) return;
    const slug = buildSlug(nameVal, rootParentName, urlSettingData);
    if (slug) setValue(CategoryField.Slug, slug, { shouldDirty: true });
  }, [isUrlManuallyEdited, nameVal]);

  const onResetSlug = () => {
    if (!nameVal) return;
    setIsUrlManuallyEdited(false);
    const slug = buildSlug(nameVal, rootParentName, urlSettingData);
    if (slug) setValue(CategoryField.Slug, slug, { shouldDirty: true });
  };

  const blockInvalidSlugKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (INVALID_SLUG_CHARS.test(e.key)) e.preventDefault();
  };

  const blockInvalidSlugPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (INVALID_SLUG_CHARS.test(e.clipboardData.getData("text"))) {
      e.preventDefault();
    }
  };

  const storeName: string = selectedStore?.name ?? "";
  const channelOptions = useMemo(
    () => (storeName ? [{ value: storeName, label: storeName }] : []),
    [storeName],
  );

  // Runs after the prefill reset so the store name isn't overwritten
  useEffect(() => {
    setValue(CategoryField.Channel, storeName, { shouldDirty: false });
  }, [storeName, initial, setValue]);

  // "1 of N" pager across categories that share this category's parent
  const siblings: any[] = useMemo(() => {
    const ancestors = findCategoryAncestors(catTree, categoryId);
    if (!ancestors) return [];
    const parent = ancestors[ancestors.length - 2];
    return parent ? parent.subcategories : catTree;
  }, [catTree, categoryId]);
  const siblingIndex = siblings.findIndex(
    (c: any) => Number(c.id) === categoryId,
  );

  const goToSibling = (offset: number) => {
    const target = siblings[siblingIndex + offset];
    if (!target) return;
    const query = searchParams.toString();
    router.push(
      `${CATEGORIES_LIST_PATH}/edit/${target.id}${query ? `?${query}` : ""}`,
    );
  };

  const pager = {
    current: siblingIndex + 1,
    total: siblings.length,
    hasPrev: siblingIndex > 0,
    hasNext: siblingIndex >= 0 && siblingIndex < siblings.length - 1,
    onPrev: () => goToSibling(-1),
    onNext: () => goToSibling(1),
  };

  const onCancel = () => router.push(CATEGORIES_LIST_PATH);

  const onSubmit = async (vals: EditCategoryFormValues) => {
    if (vals[CategoryField.Parent]?.id === categoryId) {
      showAlert({
        title: "Invalid Category",
        message: "A category cannot be its own parent.",
      });
      return;
    }

    const payload: Record<string, any> = {
      name: vals[CategoryField.Name],
      slug: vals[CategoryField.Slug].replace(/^\/|\/$/g, ""),
      description: vals[CategoryField.Description] || "",
      isVisible: vals[CategoryField.IsVisible] ? 1 : 0,
      parentId: vals[CategoryField.Parent]?.id ?? "",
      templateLayout: vals[CategoryField.TemplateLayout],
      sortOrder: Number(vals[CategoryField.SortOrder]) || 0,
      defaultProductSort: vals[CategoryField.DefaultProductSort],
      seoHomeTitle: vals[CategoryField.SeoHomeTitle] || "",
      seoMetakeywords: vals[CategoryField.SeoMetaKeywords] || "",
      seoMetaDescription: vals[CategoryField.SeoMetaDescription] || "",
      seoSearchKeywords: vals[CategoryField.SeoSearchKeywords] || "",
    };

    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });

    const image = vals[CategoryField.Image];
    if (image instanceof File) {
      fd.append("image", image);
    } else if (!image && getInitialImageUrl(initial)) {
      fd.append("remove_image", "1");
    }

    try {
      await dispatch(editCategory({ id: categoryId, data: fd })).unwrap();
      dispatch(fetchCategories());
      router.push(CATEGORIES_LIST_PATH);
    } catch (e) {
      console.error(e);
    }
  };

  const onConfirmDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteCategory({ data: { ids: [categoryId] } })).unwrap();
      dispatch(fetchCategories());
      router.push(CATEGORIES_LIST_PATH);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Saved right away (like the list page), and kept in the form so Save doesn't revert it
  const onToggleVisibility = async () => {
    const next = !isVisible;
    try {
      await dispatch(
        updateCategory({
          id: categoryId,
          data: { name: initial?.name, isVisible: next },
        }),
      ).unwrap();
      setValue(CategoryField.IsVisible, next, { shouldDirty: false });
      dispatch(fetchCategories());
    } catch (e) {
      console.error(e);
    }
  };

  const savedSlug = initial?.slug?.replace(/^\/|\/$/g, "");

  const moreActions = [
    {
      label: "View on storefront",
      disabled: !savedSlug,
      onClick: () =>
        window.open(`${STOREFRONT_URL}/category/${savedSlug}`, "_blank"),
    },
    {
      label: "View products",
      onClick: () =>
        router.push(
          `/manage/products${buildQueryParams({ categoryIds: categoryId })}`,
        ),
    },
    {
      label: isVisible ? "Disable visibility" : "Enable visibility",
      onClick: onToggleVisibility,
    },
    {
      label: "Delete",
      onClick: () => setShowDeleteConfirm(true),
    },
  ];

  return {
    form,
    control,
    loading,
    catTree,
    channelOptions,
    pager,
    onResetSlug,
    blockInvalidSlugKey,
    blockInvalidSlugPaste,
    onSubmit,
    onCancel,
    moreActions,
    showDeleteConfirm,
    setShowDeleteConfirm,
    deleting,
    onConfirmDelete,
    Alert,
  };
};

export default useEditCategoryContainer;
