"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchCategoryById,
  fetchCategories,
  addCategory,
} from "@/redux/slices/categorySlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import Spinner from "@/app/components/loader/Spinner";
import { fetchUrlSettings } from "@/redux/slices/homeSlice";
import { useSearchParams } from "next/navigation";
import { LocalStorageKeys, UrlSettingEnums } from "@/const/appConstants";
import { getFromStorage, setInStorage } from "@/utils/storage";
import { generateSlug } from "@/lib/productUtils";
import { findCategoryPath } from "@/lib/categoryUtils";
import InputField from "@/components/form/InputField";
import RichTextEditor from "@/components/ui/RichTextEditor";
import Form from "@/components/form/Form";
import SelectField from "@/components/form/fields/SelectField";
import { ApiCategory, FormVals } from "./type";
import {
  CategoryField,
  CategoryFormDefaults,
  DefaultProductSortOptions,
  TemplateLayoutOptions,
} from "./constant";
import { buildCategoryPayload, generateCategorySlug } from "./utils";
import PageTitle from "@/components/ui/PageTitle";
import { REGEX } from "@/const/regex";

const EMPTY_TREE: any[] = [];

export default function AddSubCategoryPage() {
  const router = useRouter();
  const params = useParams<{ id: string | string[] }>();
  const searchParams = useSearchParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const parentCategoryId = Number(idStr);
  const rootParentName = searchParams.get("rootParent");

  const methods = useForm<FormVals>({
    defaultValues: CategoryFormDefaults,
  });

  const { setValue, watch, control } = methods;

  const dispatch = useAppDispatch();
  const urlSettingData = useAppSelector(
    (state: any) => state.home?.urlSettingData,
  );
  const catTree =
    useAppSelector((s: any) => s.category?.categories?.data) ?? EMPTY_TREE;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [parentCategory, setParentCategory] = useState<ApiCategory | null>(
    null,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUrlManuallyEdited, setIsUrlManuallyEdited] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  // Fetch parent category
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!Number.isNaN(parentCategoryId)) {
          const res: any = await dispatch(
            fetchCategoryById({ id: parentCategoryId }),
          ).unwrap();
          const cat: ApiCategory = res?.category;
          if (mounted) setParentCategory(cat);
        }
        if (!catTree?.length) {
          dispatch(fetchCategories());
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [parentCategoryId, dispatch]);

  // Set parent when parentCategory loads
  useEffect(() => {
    if (!parentCategory) return;
    setValue(
      "parent",
      {
        id: parentCategory.id,
        path: parentCategory.name,
      },
      { shouldDirty: false },
    );
  }, [parentCategory, setValue]);

  // Update parent path when tree loads
  useEffect(() => {
    const parentId = watch("parent")?.id;
    if (parentId && catTree?.length) {
      const p = findCategoryPath(catTree, parentId);
      if (p) {
        setValue("parent", { id: parentId, path: p }, { shouldDirty: false });
      }
    }
  }, [catTree, watch, setValue]);

  const nameVal = watch("name");
  const slugVal = watch("slug");

  const onResetSlug = () => {
    setIsUrlManuallyEdited(false);
    const slug = generateCategorySlug(nameVal, urlSettingData, rootParentName);
    if (slug) {
      setValue(CategoryField.Slug, slug, { shouldDirty: true });
    }
  };

  // Auto-generate slug when name changes (if not manually edited)
  useEffect(() => {
    if (isUrlManuallyEdited || !nameVal) return;
    const slug = generateCategorySlug(nameVal, urlSettingData, rootParentName);
    if (slug) {
      setValue(CategoryField.Slug, slug);
    }
  }, [isUrlManuallyEdited, nameVal]);
  // Mark slug as manually edited when user types in it
  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "slug" && !isUrlManuallyEdited) {
  //       setIsUrlManuallyEdited(true);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, isUrlManuallyEdited]);

  const onPickParent = (val: { id: number; path: string }) => {
    setValue("parent", { id: val.id, path: val.path }, { shouldDirty: true });
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setValue("image", f, { shouldDirty: true });
    if (f) {
      const objUrl = URL.createObjectURL(f);
      setImagePreview(objUrl);
    } else {
      setImagePreview(null);
    }
  };

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f) {
        setValue("image", f as File, { shouldDirty: true });
        const objUrl = URL.createObjectURL(f);
        setImagePreview(objUrl);
      }
    },
    [setValue],
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onRemoveImage = () => {
    setValue("image", null, { shouldDirty: true });
    setImagePreview(null);
  };

  // Load selected store
  useEffect(() => {
    const parsedStores =
      getFromStorage<any[]>(LocalStorageKeys.AvailableStores, []) ?? [];
    const savedStoreId = Number(getFromStorage(LocalStorageKeys.StoreId));
    const selected = parsedStores.find(
      (store: any) => store.id === savedStoreId,
    );

    if (selected) {
      setSelectedStore(selected);
    } else if (parsedStores.length > 0) {
      setSelectedStore(parsedStores[0]);
      setInStorage(LocalStorageKeys.StoreId, parsedStores[0].id.toString());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUrlSettings("category"));
  }, [dispatch]);

  const onSubmit = async (vals: FormVals) => {
    const payload = { ...vals, channel: selectedStore?.name };
    console.log(vals, "aaaaaaa", selectedStore, payload);
    try {
      setSaving(true);

      const basePayload = buildCategoryPayload(payload);
      const fd = new FormData();

      Object.entries(basePayload).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });

      if (vals.image) {
        fd.append("image", vals.image);
      }

      await dispatch(addCategory({ data: fd })).unwrap();

      setTimeout(() => {
        router.push("/manage/products/categories");
      }, 1500);

      dispatch(fetchCategories());
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <Form
      form={methods}
      onSubmit={onSubmit}
      footer={{
        cancelText: "Cancel",
        submitText: saving ? "Saving…" : "Save",
        onCancel: () => router.push("/manage/products/categories"),
      }}
    >
      <div className="p-10">
        <div className="flex flex-col gap-10 mb-6">
          <Link href="/manage/products/categories">
            <PageTitle
              title="Categories"
              hideActionButton
              titleClassName="2xl:text-[1.6rem]! font-normal"
              containerClassName="mb-0"
              textContainerClassName="mb-0"
            />
          </Link>

          <PageTitle
            title="Add sub-category"
            description={
              <a className="border-blue-600 border-b-4 w-fit text-2xl!">
                Details
              </a>
            }
            hideActionButton
            titleClassName="font-light! 2xl:text-[3.2rem]!"
            descriptionClassName="mt-0"
            containerClassName="mb-0"
            textContainerClassName="mb-0 gap-6"
          />
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white rounded-sm shadow-sm border p-6 mb-8">
          <PageTitle
            title="Category details"
            hideActionButton
            titleClassName="mb-6 2xl:text-[2.4rem]! font-normal"
            containerClassName="mb-0"
            textContainerClassName="mb-0"
          />

          <div className="mb-8">
            <InputField
              name={CategoryField.Name}
              label="Display name"
              control={control}
              placeholder="Category display name"
            />
          </div>

          <div className="mb-8 flex gap-5 ">
            <div>
              <InputField
                name={CategoryField.Slug}
                label="URL"
                control={control}
                placeholder="/audio-video-devices-1/"
                onKeyDown={(e) => {
                  if (REGEX.SLUG_BLOCKED_CHARS.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData("text");
                  if (REGEX.SLUG_BLOCKED_CHARS.test(pasted)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              className="text-xl text-blue-600 hover:underline 2xl:!text-[1.6rem] mb-1"
              onClick={onResetSlug}
            >
              Reset
            </Button>
          </div>

          <div className="mb-8">
            <InputField
              name={CategoryField.Description}
              label="Description…"
              Component={RichTextEditor}
              control={control}
              controlClassName="max-w-7xl"
              height={300}
              minHeight={250}
            />
          </div>

          <div className="mb-8 flex gap-6 items-center ml-40">
            <Label className="font-normal text-gray-600 2xl:text-2xl! ">
              Channel
            </Label>
            <Input disabled value={selectedStore?.name || ""} />
          </div>

          <div className="mb-5 flex gap-3 items-center ml-40">
            <Label className="font-normal text-gray-600 2xl:text-2xl!  pt-2">
              Parent category
            </Label>
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Adding sub-category under: {parentCategory?.name}
              </p>
              <CategoryDropdown
                categoryData={catTree}
                value={{
                  id: watch("parent")?.id ?? null,
                  path: watch("parent")?.path ?? "",
                }}
                onChange={onPickParent}
              />
            </div>
          </div>

          <div className="mb-8">
            <InputField
              name={CategoryField.TemplateLayout}
              label="Template layout file"
              Component={SelectField}
              control={control}
              options={TemplateLayoutOptions}
              placeholder="Select layout"
            />
          </div>

          <div className="mb-8">
            <InputField
              name={CategoryField.SortOrder}
              label="Sort order"
              control={control}
              type="number"
              min={0}
              step={1}
            />
          </div>

          <div className="mb-8">
            <InputField
              name={CategoryField.DefaultProductSort}
              label="Default product sort"
              Component={SelectField}
              control={control}
              options={DefaultProductSortOptions}
              placeholder="Use storefront settings default"
            />
          </div>

          {/* Image */}
          <div className="mb-2">
            <Label className="mb-2 block 2xl:!text-[1.6rem]">
              Category Image
            </Label>
            {imagePreview ? (
              <div className="flex items-start gap-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded border"
                />
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      document.getElementById("cat-image-input")?.click();
                    }}
                  >
                    Choose another file
                  </Button>
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={onRemoveImage}
                  >
                    Remove image
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    File types: ICO, JPG, GIF, PNG, maximum 8MB.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-md p-6 text-center"
                onDrop={onDrop}
                onDragOver={onDragOver}
              >
                <p className="mb-2 2xl:!text-[1.6rem]!">
                  Drag & drop image here or
                </p>
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("cat-image-input")?.click()
                  }
                >
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2 2xl:text-[1.6rem]!">
                  File types: ICO, JPG, GIF, PNG, maximum 8MB.
                </p>
              </div>
            )}
            <input
              id="cat-image-input"
              type="file"
              accept=".ico,.jpg,.jpeg,.gif,.png"
              className="hidden"
              onChange={onImageChange}
            />
          </div>
        </div>

        {/* SEO CARD */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <PageTitle
            title="Search engine optimization"
            hideActionButton
            titleClassName="text-xl font-medium mb-6 2xl:text-[2.4rem]!"
            containerClassName="mb-0"
            textContainerClassName="mb-0"
          />

          <div className="mb-8">
            <InputField
              name={CategoryField.SeoHomeTitle}
              label="Home page title (Optional)"
              control={control}
            />
          </div>
          <div className="mb-8">
            <InputField
              name={CategoryField.SeoMetaKeywords}
              label="Meta keywords (Optional)"
              control={control}
              placeholder="comma,separated,keywords"
            />
          </div>
          <div className="mb-8">
            <InputField
              name={CategoryField.SeoMetaDescription}
              label="Meta description (Optional)"
              control={control}
            />
          </div>
          <div className="mb-8">
            <InputField
              name={CategoryField.SeoSearchKeywords}
              label="Search keywords (Optional)"
              control={control}
              placeholder="comma,separated,keywords"
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
