"use client";
import React, { useState } from "react";
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

const AddBrand = () => {
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
    setFormData((prev: any) => ({
      ...prev,
      logo: e.target.files?.[0] || null,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      templateLayout: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Brand Details:", formData);
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
    <>
      <div>
        <div className="p-10">
          <div className="flex flex-col   gap-6 ">
            <h1 className="!font-light">Brand Details</h1>
            <p>Modify the details of the brand below and click "Save".</p>
          </div>
          <div>
            <div className="bg-white p-5 shadow-md my-2">
              <form onSubmit={handleSubmit} className="max-w-3xl p-6 space-y-6">
                {formField("Brand Name", "name", false)}
                {formField("Page Title", "pageTitle")}
                {formField("Meta Keywords", "metaKeywords")}
                {formField("Meta Description", "metaDescription", true, true)}
                {formField("Search Keywords", "searchKeywords")}

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
                  <Input
                    type="file"
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
    </>
  );
};

export default AddBrand;
