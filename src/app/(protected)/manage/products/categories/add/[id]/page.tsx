"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
    fetchCategoryById,
    fetchCategories,
    addCategory,
} from "@/redux/slices/categorySlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export default function AddSubCategoryPage() {
    const router = useRouter();
    const params = useParams<{ id: string | string[] }>();

    const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
    const parentCategoryId = Number(idStr);

    const dispatch = useAppDispatch();

    const catTree = useAppSelector(
        (s: any) => s.category?.categories?.data || []
    );
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [parentCategory, setParentCategory] = useState<ApiCategory | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // ✅ Fetch parent category ki ID nikalne ke liye
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                if (!Number.isNaN(parentCategoryId)) {
                    const res: any = await dispatch(
                        fetchCategoryById({ id: parentCategoryId })
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

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        control,
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

    // ✅ Sirf parent ID set karo, baaki form empty
    useEffect(() => {
        if (!parentCategory) return;

        setValue("parent", {
            id: parentCategory.id,
            path: parentCategory.name
        }, { shouldDirty: false });
    }, [parentCategory, setValue]);

    // Find path for parent dropdown
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
        [setValue]
    );

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onRemoveImage = () => {
        setValue("image", null, { shouldDirty: true });
        setImagePreview(null);
    };

    const [selectedStore, setSelectedStore] = useState<any>(null);

    useEffect(() => {
        // Get available stores
        const storedStores = localStorage.getItem('availableStores');
        const parsedStores = storedStores ? JSON.parse(storedStores) : [];

        // Get the selected store ID (convert to number for comparison)
        const savedStoreId = localStorage.getItem('storeId');
        const selected = parsedStores.find((store: any) => store.id === Number(savedStoreId));

        if (selected) {
            setSelectedStore(selected);
        } else if (parsedStores.length > 0) {
            // Fallback to first store if saved ID not found
            setSelectedStore(parsedStores[0]);
            localStorage.setItem('storeId', parsedStores[0].id.toString());
        }
    }, []);
    // ✅ SUBMIT: addCategory API call
    const onSubmit = async (vals: FormVals) => {
        try {
            setSaving(true);

            const basePayload: Record<string, any> = {
                name: vals.name,
                slug: vals.slug.replace(/^\/|\/$/g, ""),
                description: vals.description || "",
                isVisible: vals.is_visible ? 1 : 0,
                parentId: vals.parent?.id ?? "", // ✅ Parent ID from fetched category
                templateLayout: vals.template_layout,
                sortOrder: Number(vals.sort_order) || 0,
                defaultProductSort: vals.default_product_sort,
                seoHomeTitle: vals.seo_home_title || "",
                seoMetakeywords: vals.seo_meta_keywords || "",
                seoMetaDescription: vals.seo_meta_description || "",
                seoSearchKeywords: vals.seo_search_keywords || "",
            };

            const fd = new FormData();
            Object.entries(basePayload).forEach(([k, v]) => {
                if (v !== undefined && v !== null) fd.append(k, String(v));
            });

            if (vals.image) {
                fd.append("image", vals.image);
            }

            // ✅ Call addCategory API
            await dispatch(addCategory({ data: fd })).unwrap();

            setTimeout(() => {
                router.push("/manage/products/categories");
            }, 2000);
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
                <div className="flex flex-col gap-10 mb-6">
                    <Link href="/manage/products/categories">
                        <h2 className="2xl:!text-[1.6rem]">Categories</h2>
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="!font-light 2xl:!text-[3.2rem]">Add sub-category</h1>
                    </div>
                    <a className="border-blue-600 border-b-4 w-fit !text-2xl">Details</a>
                </div>

                {/* DETAILS CARD */}
                <div className="bg-white rounded-sm shadow-sm border p-6 mb-8">
                    <h1 className="mb-6 2xl:!text-[2.4rem]">Category details</h1>

                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Display name</Label>
                        <Input placeholder="Category display name" {...register("name")} />
                    </div>

                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">URL</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                placeholder="/audio-video-devices-1/"
                                {...register("slug")}
                                value={slugVal}
                                onChange={(e) =>
                                    setValue("slug", e.target.value, { shouldDirty: true })
                                }
                                className="!text-lg flex-1"
                            />
                            <button
                                type="button"
                                className="text-xl text-blue-600 hover:underline 2xl:!text-[1.6rem]"
                                onClick={onResetSlug}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Description</Label>
                        <Textarea
                            rows={6}
                            placeholder="Write a description…"
                            {...register("description")}
                            className="!h-[100px]"
                        />
                    </div>

                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Channel</Label>
                        <Input disabled value={selectedStore?.name} />
                    </div>

                    <div className="mb-5 !w-full !max-w-md">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Parent category</Label>
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

                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Template layout file</Label>
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

                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Default product sort</Label>
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
                                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                        <SelectItem value="name_asc">Name: A → Z</SelectItem>
                                        <SelectItem value="name_desc">Name: Z → A</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="mb-2">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Category Image</Label>
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
                                <p className="mb-2 2xl:!text-[1.6rem]">Drag & drop image here or</p>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        document.getElementById("cat-image-input")?.click()
                                    }
                                >
                                    Choose File
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2 2xl:!text-[1.6rem]">
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
                    <h2 className="text-xl font-medium mb-6 2xl:!text-[2.4rem]">
                        Search engine optimization
                    </h2>
                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Home page title (Optional)</Label>
                        <Input {...register("seo_home_title")} />
                    </div>
                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Meta keywords (Optional)</Label>
                        <Input
                            placeholder="comma,separated,keywords"
                            {...register("seo_meta_keywords")}
                        />
                    </div>
                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Meta description (Optional)</Label>
                        <Input {...register("seo_meta_description")} />
                    </div>
                    <div className="mb-8">
                        <Label className="mb-2 block 2xl:!text-[1.6rem]">Search keywords (Optional)</Label>
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