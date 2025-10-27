"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useParams, useRouter } from "next/navigation";
import { updateBrand, getBrandById } from "@/redux/slices/productSlice";

const EditBrand = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    pageTitle: "",
    metaKeywords: "",
    metaDescription: "",
    searchKeywords: "",
    logo: null,
    brandURL: "",
    templateLayout: "default",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // Fetch brand by ID on mount
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const resultAction = await dispatch(getBrandById(id));
        const data = (resultAction as any).payload;

        if (data) {
          setFormData({
            name: data.name || "",
            pageTitle: data.pageTitle || "",
            metaKeywords: data.metaKeywords || "",
            metaDescription: data.metaDescription || "",
            searchKeywords: data.searchKeywords || "",
            logo: null, // Don't prefill file input
            brandURL: data.brandURL || "",
            templateLayout: data.templateLayout || "default",
          });
          // Set preview if brand already has an image
          if (data.logo) {
            setPreviewImage(
              data.logo.startsWith("http")
                ? data.logo
                : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${data.logo}`
            );
          }
        }
      } catch (err) {
        console.error("❌ Failed to fetch brand:", err);
      }
    };

    if (id) fetchBrand();
  }, [id, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev: any) => ({ ...prev, logo: file }));

    // Set preview for selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      templateLayout: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("pageTitle", formData.pageTitle);
    formDataToSend.append("metaKeywords", formData.metaKeywords);
    formDataToSend.append("metaDescription", formData.metaDescription);
    formDataToSend.append("searchKeywords", formData.searchKeywords);
    formDataToSend.append("brandURL", formData.brandURL);
    formDataToSend.append("templateLayout", formData.templateLayout);

    // Append logo if selected
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo); // Change to "image" if backend expects that
    }

    // 🔍 Debug: Print FormData values
    console.log("🟡 SUBMITTING BRAND DATA:");
    for (const [key, value] of formDataToSend.entries()) {
      if (value instanceof File) {
        console.log(
          `📁 ${key}:`,
          value.name,
          `(${value.type}, ${value.size} bytes)`
        );
      } else {
        console.log(`🔤 ${key}:`, value);
      }
    }

    try {
      const resultAction = await dispatch(
        updateBrand({ id, formData: formDataToSend })
      );

      // 🔍 Debug response
      console.log("🟢 DISPATCH RESULT:", resultAction);

      const result = (resultAction as any).payload;

      if ((resultAction as any).meta.requestStatus === "fulfilled") {
        console.log("✅ Brand updated successfully:", result);
        router.push("/manage/products/brands");
      } else {
        console.error("❌ Failed to update brand:", result);
        alert(result?.message || "Brand update failed.");
      }
    } catch (err) {
      console.error("❌ Unexpected error during update:", err);
    }
  };

  const formField = (
    label: string,
    name: string,
    optional = true,
    textarea = false
  ) => (
    <div className="space-y-1">
      <Label className="flex items-center gap-1">
        {label}
        {optional && (
          <span className="text-sm text-muted-foreground">(optional)</span>
        )}
        <HelpCircle className="w-5 h-5 text-muted-foreground" />
      </Label>
      {textarea ? (
        <Textarea
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
          className="h-[50px]"
        />
      ) : (
        <Input
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="p-10">
        <div className="flex flex-col gap-6">
          <h1 className="!font-light">Edit Brand</h1>
          <p>Modify the details of the brand below and click "Save".</p>
        </div>
        <div className="bg-white p-5 shadow-md my-6">
          <form onSubmit={handleSubmit} className="max-w-3xl p-6 space-y-6">
            {formField("Brand Name", "name", false)}
            {formField("Page Title", "pageTitle")}
            {formField("Meta Keywords", "metaKeywords")}
            {formField("Meta Description", "metaDescription", true, true)}
            {formField("Search Keywords", "searchKeywords")}

            {/* Image upload with preview */}
            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                Brand Image
                <span className="text-sm text-muted-foreground">
                  (optional)
                </span>
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </Label>
              <p className="text-sm text-muted-foreground mb-1">
                Maximum file size: 8MB
              </p>

              {previewImage && (
                <div className="mb-3">
                  <p className="text-sm mb-1 text-gray-600">Preview:</p>
                  <img
                    src={previewImage}
                    alt="Brand preview"
                    className="h-32 w-auto rounded-md border object-contain"
                  />
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-gray-50"
              />
            </div>

            {formField("Brand URL", "brandURL")}

            <div className="space-y-1">
              <Label className="flex items-center gap-1">
                Template Layout File
                <span className="text-sm text-muted-foreground">
                  (optional)
                </span>
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </Label>
              <Select
                value={formData.templateLayout}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
      </div>

      <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4">
        <Link href="/manage/products/brands/">
          <button className="btn-outline-primary">Cancel</button>
        </Link>
        <button className="btn-primary" type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBrand;
