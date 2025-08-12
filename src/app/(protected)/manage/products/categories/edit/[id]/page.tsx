"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFormContext, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchCategoryById,
  fetchCategories,
  updateCategory, // <-- ensure this thunk exists in your slice
  editCategory,
} from "@/redux/slices/categorySlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CategoryDropdown from "@/app/components/products/categories/CategoryDropdown";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/app/components/loader/Spinner";

type FormVals = {
  name: string;
  slug: string;
  description: string;
  is_visible: boolean;
  parent: { id: number | null; path: string };
  template_layout: string;
  sort_order: number;
  default_product_sort: string;
  seo_home_title: string;
  seo_meta_keywords: string;
  seo_meta_description: string;
  seo_search_keywords: string;
  image?: File | null;
};

type ApiCategory = {
  id: number;
  name: string;
  slug: string | null;
  description: string | null;
  is_visible: 0 | 1 | boolean;
  parent_id: number | null;
  subcategories?: any[];
};

function slugify(s: string) {
  return (
    "/" +
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") +
    "/"
  );
}

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams<{ id: string | string[] }>();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const categoryId = Number(idStr);

  const dispatch = useAppDispatch();

  const catTree = useAppSelector(
    (s: any) => s.category?.categories?.data || []
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initial, setInitial] = useState<ApiCategory | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  // existing image URL ko pick karne ke liye flexible helper
  const getInitialImageUrl = (cat: any): string | null => {
    // backend se jo aaye us hisab se try kar rahe:
    return (
      cat?.image_url || cat?.image || cat?.thumbnail || cat?.media?.url || null
    );
  };

  // Fetch current category and the tree for parent picker
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!Number.isNaN(categoryId)) {
          const res: any = await dispatch(
            fetchCategoryById({ id: categoryId })
          ).unwrap();
          // response shape: { status: true, category: {...} }
          const cat: ApiCategory = res?.category;
          if (mounted) setInitial(cat);
        }
        // tree for parent dropdown
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
  }, [categoryId, dispatch]);

  // RHF
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { isDirty },
  } = useForm<FormVals>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      is_visible: true,
      parent: { id: null, path: "" },
      template_layout: "Default",
      sort_order: 0,
      default_product_sort: "storefront_default",
      seo_home_title: "",
      seo_meta_keywords: "",
      seo_meta_description: "",
      seo_search_keywords: "",
      image: null,
    },
  });

  // Prefill when initial category arrives
  useEffect(() => {
    if (!initial) return;
    reset({
      name: initial.name || "",
      slug: initial.slug ? `/${initial.slug.replace(/^\/|\/$/g, "")}/` : "",
      description: initial.description || "",
      is_visible: Boolean(initial.is_visible),
      parent: { id: initial.parent_id, path: "" }, // path is hydrated below if tree is present
      template_layout: "Default",
      sort_order: 0,
      default_product_sort: "storefront_default",
      seo_home_title: "",
      seo_meta_keywords: "",
      seo_meta_description: "",
      seo_search_keywords: "",
      image: null,
    });
    const url = getInitialImageUrl(initial);
    setImagePreview(url || null);
    setRemoveImage(false);
  }, [initial, reset]);

  // Find full path string for the parent id to show in the CategoryDropdown input
  const findPath = (
    nodes: any[],
    targetId: number,
    path: string[] = []
  ): string | null => {
    for (const n of nodes) {
      const nextPath = [...path, n.name];
      if (Number(n.id) === Number(targetId)) return nextPath.join(" / ");
      if (n.subcategories?.length) {
        const p = findPath(n.subcategories, targetId, nextPath);
        if (p) return p;
      }
    }
    return null;
  };

  useEffect(() => {
    const parentId = watch("parent")?.id;
    if (parentId && catTree?.length) {
      const p = findPath(catTree, parentId);
      if (p)
        setValue("parent", { id: parentId, path: p }, { shouldDirty: false });
    }
  }, [catTree, watch, setValue]);

  const nameVal = watch("name");
  const slugVal = watch("slug");

  const onResetSlug = () => {
    if (!nameVal) return;
    setValue("slug", slugify(nameVal), { shouldDirty: true });
  };

  const onPickParent = (val: { id: number; path: string }) => {
    setValue("parent", { id: val.id, path: val.path }, { shouldDirty: true });
  };

  // file choose
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setValue("image", f, { shouldDirty: true });
    setRemoveImage(false);
    if (f) {
      const objUrl = URL.createObjectURL(f);
      setImagePreview(objUrl);
    } else {
      setImagePreview(null);
    }
  };

  // drag & drop
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f) {
        setValue("image", f as File, { shouldDirty: true });
        setRemoveImage(false);
        const objUrl = URL.createObjectURL(f);
        setImagePreview(objUrl);
      }
    },
    [setValue]
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onRemoveImage = () => {
    // remove requested
    setRemoveImage(true);
    // clear selected file
    setValue("image", null, { shouldDirty: true });
    setImagePreview(null);
  };

  // --- SUBMIT: ALWAYS FORMDATA ---
  const onSubmit = async (vals: FormVals) => {
    try {
      setSaving(true);

      if (vals.parent?.id === categoryId) {
        alert("A category cannot be its own parent.");
        setSaving(false);
        return;
      }

      // Build snake_case keys that your API expects
      const basePayload: Record<string, any> = {
        name: vals.name,
        slug: vals.slug.replace(/^\/|\/$/g, ""),
        description: vals.description || "",
        isVisible: vals.is_visible ? 1 : 0,
        parentId: vals.parent?.id ?? "",
        templateLayout: vals.template_layout,
        sortOrder: Number(vals.sort_order) || 0,
        defaultProductSort: vals.default_product_sort,
        seoHomeTitle: vals.seo_home_title || "",
        seoMetakeywords: vals.seo_meta_keywords || "",
        seoMetaDescription: vals.seo_meta_description || "",
        seoSearchKeywords: vals.seo_search_keywords || "",
      };

      const fd = new FormData();
      // append fields (skip undefined/null; empty string is okay if your API permits)
      Object.entries(basePayload).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });

      // image handling
      if (vals.image) {
        fd.append("image", vals.image); // rename field if your backend expects a different key
      } else if (removeImage) {
        // tell backend to remove existing image
        fd.append("remove_image", "1"); // rename if backend expects another key
      }

      await dispatch(editCategory({ id: categoryId, data: fd })).unwrap();
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
    <div>
      <div className="p-10">
        {/* Header breadcrumb + pager mimic */}
        <div className="flex flex-col gap-10 mb-6">
          <Link href="/manage/products/categories">
            <h2>Categories</h2>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="!font-light">Edit category</h1>
            <div className="text-2xl">•••</div>
          </div>
          <a className="border-blue-600 border-b-4 w-fit !text-2xl">Details</a>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white rounded-sm shadow-sm border p-6 mb-8 ">
          <h1 className="mb-6">Category details</h1>

          {/* Display name */}
          <div className="mb-8">
            <Label className="mb-2 block">Display name</Label>
            <Input placeholder="Category display name" {...register("name")} />
          </div>

          {/* URL + Reset */}
          <div className="mb-8">
            <div className="flex items-center justify-start gap-20">
              <Label className="mb-2 block">URL</Label>
              <button
                type="button"
                className="text-xl text-blue-600 hover:underline"
                onClick={onResetSlug}
              >
                Reset
              </button>
            </div>
            <Input
              placeholder="/audio-video-devices-1/"
              {...register("slug")}
              value={slugVal}
              onChange={(e) =>
                setValue("slug", e.target.value, { shouldDirty: true })
              }
              className="!text-lg"
            />
          </div>

          {/* Description (simple textarea; swap with your rich editor if needed) */}
          <div className="mb-8">
            <Label className="mb-2 block">Description</Label>
            <Textarea
              rows={6}
              placeholder="Write a description…"
              {...register("description")}
              className="!h-[100px]"
            />
          </div>

          {/* Channel (disabled) */}
          <div className="mb-8">
            <Label className="mb-2 block">Channel</Label>
            <Input disabled value="New Town Spares UK Ltd" />
          </div>

          {/* Parent category (searchable) */}
          <div className="mb-5 !w-full !max-w-md">
            <Label className="mb-2 block">Parent category</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Leave empty to add to the root category
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

          {/* Template layout */}
          <div className="mb-8">
            <Label className="mb-2 block">Template layout file</Label>
            <Controller
              control={control}
              name="template_layout"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Sort order */}
          <div className="mb-8">
            <Label className="mb-0">Sort order</Label>
            <Input
              type="number"
              min={0}
              step={1}
              {...register("sort_order", { valueAsNumber: true })}
              className="mt-2"
            />
          </div>

          {/* Default product sort */}
          <div className="mb-8">
            <Label className="mb-2 block">Default product sort</Label>
            <Controller
              control={control}
              name="default_product_sort"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Use storefront settings default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="storefront_default">
                      Use storefront settings default
                    </SelectItem>
                    <SelectItem value="price_asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name_asc">Name: A → Z</SelectItem>
                    <SelectItem value="name_desc">Name: Z → A</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Category image */}
          {/* Category image */}
          <div className="mb-2">
            <Label className="mb-2 block">Category Image</Label>

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
                      // choose another
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
                <p className="mb-2">Drag & drop image here or</p>
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("cat-image-input")?.click()
                  }
                >
                  Choose File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
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
          <h2 className="text-xl font-medium mb-6">
            Search engine optimization
          </h2>

          <div className="mb-8">
            <Label className="mb-2 block">Home page title (Optional)</Label>
            <Input {...register("seo_home_title")} />
          </div>

          <div className="mb-8">
            <Label className="mb-2 block">Meta keywords (Optional)</Label>
            <Input
              placeholder="comma,separated,keywords"
              {...register("seo_meta_keywords")}
            />
          </div>

          <div className="mb-8">
            <Label className="mb-2 block">Meta description (Optional)</Label>
            <Textarea rows={4} {...register("seo_meta_description")} />
          </div>

          <div className="mb-8">
            <Label className="mb-2 block">Search keywords (Optional)</Label>
            <Input
              placeholder="comma,separated,keywords"
              {...register("seo_search_keywords")}
            />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <Link href="/manage/products/categories">
          <button className="btn-outline-primary" disabled={saving}>
            Cancel
          </button>
        </Link>
        <button
          className="btn-primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
