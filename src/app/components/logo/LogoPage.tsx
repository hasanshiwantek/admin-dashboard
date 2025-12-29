"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useRouter } from "next/navigation";
import {
  createLogo,
  fetchLogo,
  deleteLogo,
} from "@/redux/slices/storefrontSlice";
import Spinner from "../loader/Spinner";
const MockLogo = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => (
  <div className="flex items-center justify-center p-6 sm:p-12">
    {src ? (
      <img
        src={src}
        alt="Logo Preview"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "contain",
          transition: "all 0.3s ease",
        }}
      />
    ) : (
      <div className="text-gray-400 text-sm italic">No logo selected</div>
    )}
  </div>
);

type LogoFormValues = {
  logoType: string;
  logoText: string;
  logoSize: string;
  maxWidth: number;
  maxHeight: number;
  logoFile?: FileList;
  faviconFile?: FileList;
};

const LogoPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const defaultFaviconUrl = "/navlogo.png";
  const logoSizeOptions = [
    { value: "optimized", label: "Optimized for your theme" },
    { value: "original", label: "Original as uploaded" },
    { value: "dimensions", label: "Specify Dimensions" },
  ];

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<LogoFormValues>({
      defaultValues: {
        logoType: "upload",
        logoText: "My Store",
        logoSize: "optimized",
        maxWidth: 250,
        maxHeight: 100,
      },
    });

  // --- Preview States ---
  const [logoPreview, setLogoPreview] = useState<string>("/navlogo.png");
  const [faviconPreview, setFaviconPreview] =
    useState<string>(defaultFaviconUrl);
  const { logoData, loading } =
    useAppSelector((state: any) => state.storefront) || {};
  const logo = logoData?.data;

  const logoType = watch("logoType");
  const logoSize = watch("logoSize");
  const maxWidth = watch("maxWidth");
  const maxHeight = watch("maxHeight");

  const getDimensions = () => {
    if (logoSize === "dimensions")
      return { width: maxWidth, height: maxHeight };
    if (logoSize === "optimized") return { width: 250, height: 100 };
    return { width: 350, height: 150 };
  };

  const { width, height } = getDimensions();

  const handleLogoFileChange = (fileList?: FileList) => {
    if (fileList && fileList[0]) {
      setLogoPreview(URL.createObjectURL(fileList[0]));
    }
  };

  const handleFaviconFileChange = (fileList?: FileList) => {
    if (fileList && fileList[0]) {
      setFaviconPreview(URL.createObjectURL(fileList[0]));
    }
  };

  // --- onSubmit Handler ---
  const onSubmit = async (data: LogoFormValues) => {
    try {
      // if (
      //   data.logoType === "upload" &&
      //   (!data.logoFile || data.logoFile.length === 0)
      // ) {
      //   alert("Please upload a logo image before saving.");
      //   return;
      // }

      const formData = new FormData();
      formData.append("logoType", data.logoType);
      formData.append("logoSize", data.logoSize);
      formData.append("dimensions[width]", data.maxWidth.toString());
      formData.append("dimensions[height]", data.maxHeight.toString());

      if (data.logoType === "text") {
        formData.append("logoText", data.logoText);
      } else if (data.logoFile && data.logoFile[0]) {
        formData.append("image", data.logoFile[0]);
      }

      // Favicon file
      if (data.faviconFile && data.faviconFile[0]) {
        formData.append("favicon", data.faviconFile[0]);
      }

      // Favicon URL (send preview URL if available)
      // if (faviconPreview) {
      //   formData.append("faviconUrl", faviconPreview);
      // }

      console.log("📦 FormData Preview:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await dispatch(createLogo({ data: formData }));
      if (createLogo.fulfilled.match(res)) {
        console.log("✅ Logo uploaded successfully", res?.payload);
      } else {
        console.error("❌ Error uploading logo", res?.payload);
      }
    } catch (err) {
      console.error("❌ Error saving logo settings:", err);
    }
  };

  // Fetch existing logo
  useEffect(() => {
    dispatch(fetchLogo());
  }, [dispatch]);

  // Prefill form after fetchLogo resolves
  useEffect(() => {
    if (logo && Array.isArray(logo) && logo.length > 0) {
      const logos = logo[0];

      reset({
        logoType: logos.logoType || "upload",
        logoText: logos.logoText || "My Store",
        logoSize: logos.logoSize || "optimized",
        maxWidth: parseInt(logos.dimensions?.width || "250"),
        maxHeight: parseInt(logos.dimensions?.height || "100"),
      });

      setLogoPreview(logos.logoUrl || "/navlogo.png");
      setFaviconPreview(logos.faviconUrl || defaultFaviconUrl);
    }
  }, [logo, reset]);

  const getDropdownActions = () => [
    {
      label: "Replace image",
      onClick: () => document.getElementById("logo-upload")?.click(),
    },
    {
      label: "Delete image",
      onClick: async () => {
        if (!logo || !logo[0]?.id) return;

        const confirmed = confirm(
          "Are you sure you want to delete this logo? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
          const res = await dispatch(deleteLogo({ id: logo[0].id }));
          if (deleteLogo.fulfilled.match(res)) {
            console.log("Logo deleted successfully.", res?.payload);
            setLogoPreview("/navlogo.png"); // reset preview
            reset({
              logoType: "upload",
              logoText: "My Store",
              logoSize: "optimized",
              maxWidth: 250,
              maxHeight: 100,
            }); // reset form fields
          } else {
            console.log("Failed to delete logo.", res?.payload);
          }
        } catch (err) {
          console.error("Error deleting logo:", err);
        }
      },
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <Spinner />
          </div>
        )}

        <div className="mx-auto">
          <h1 className="!font-extralight mb-6 2xl:!text-5xl">Logo Options</h1>

          {/* --- LOGO SECTION --- */}
          <div className="bg-white rounded-md shadow-md border p-10 space-y-8">
            {/* Logo Type */}
            <div>
              <h1 className="!font-semibold tracking-tight mb-6 2xl:!text-[2rem]">
                Select your logo type
              </h1>
              <Controller
                name="logoType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-5">
                      <RadioGroupItem value="text" id="text-logo" />
                      <Label className="2xl:!text-2xl" htmlFor="text-logo">
                        Enter text to display as your logo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-5">
                      <RadioGroupItem value="upload" id="upload-logo" />
                      <Label className="2xl:!text-2xl" htmlFor="upload-logo">Upload a custom image</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* Logo Preview */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="2xl:!text-2xl">Logo preview</span>
                {logoType === "upload" && (
                  <OrderActionsDropdown
                    actions={getDropdownActions()}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="!text-2xl cursor-pointer"
                      >
                        <MoreHorizontal className="!h-7 !w-7 text-gray-500 hover:text-gray-700" />
                      </Button>
                    }
                  />
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-2 min-h-[150px] flex items-center justify-center">
                {logoType === "text" ? (
                  <Textarea
                    {...register("logoText")}
                    className="border rounded-md p-2 text-lg text-center font-medium focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <MockLogo
                    src={logoPreview || "/navlogo.png"}
                    width={width}
                    height={height}
                  />
                )}
              </div>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    handleLogoFileChange(files); // update preview
                    setValue("logoFile", files as FileList, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }
                }}
              />
            </div>

            {/* Logo Size */}
            <div className="pt-6 border-t border-gray-100 space-y-2">
              <Label
                htmlFor="logo-size-select"
                className="text-base font-semibold 2xl:!text-2xl"
              >
                Logo size
              </Label>
              <Controller
                name="logoSize"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoSizeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {logoSize === "dimensions" ? (
                <div className="mt-5 space-x-2 flex items-center text-base text-gray-600">
                  <Label className="2xl:!text-2xl" htmlFor="max-width-input">Max Width:</Label>
                  <Input
                    id="max-width-input"
                    type="number"
                    {...register("maxWidth", { valueAsNumber: true })}
                    className="w-24 text-center"
                  />
                  <span className="2xl:!text-2xl">x</span>
                  <Label className="2xl:!text-2xl" htmlFor="max-height-input">Max Height:</Label>
                  <Input
                    id="max-height-input"
                    type="number"
                    {...register("maxHeight", { valueAsNumber: true })}
                    className="w-24 text-center"
                  />
                  <span>px</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500 pt-1 2xl:!text-2xl">
                  Recommended size:{" "}
                  <span className="font-medium text-gray-700">250 x 100px</span>
                </p>
              )}
            </div>

            {/* Launch Page Builder */}
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 2xl:!text-2xl">
                Want to adjust the position of your logo?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Launch Page Builder
                </a>
              </p>
            </div>
          </div>

          {/* --- FAVICON SECTION --- */}
          <div className="bg-white rounded-md shadow-md border p-10 space-y-6 my-30">
            <h1 className="!font-semibold tracking-tight 2xl:!text-[2.4rem]">Favicon</h1>
            <p className="text-sm text-gray-600 2xl:!text-2xl">
              A favicon is a small image that represents your brand in browser
              tabs.
            </p>

            <div className="flex items-center justify-center">
              <img
                src={faviconPreview || defaultFaviconUrl}
                alt="Favicon Preview"
                className="w-50 h-50 object-contain border border-gray-200 rounded-md p-1"
              />
            </div>

            <div className="flex space-x-3 items-center">
              <Button
                type="button"
                className="text-2xl !p-5"
                variant="outline"
                onClick={() =>
                  document.getElementById("favicon-upload")?.click()
                }
              >
                Upload Favicon
              </Button>
            </div>
            <input
              id="favicon-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) {
                  handleFaviconFileChange(files); // update preview
                  setValue("faviconFile", files as FileList, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
            />

            <div className="pt-4 border-t border-gray-100 space-y-1">
              <p className="text-sm font-medium text-gray-700 2xl:!text-2xl">
                Supported file types:{" "}
                <span className="font-normal">ICO, PNG, SVG, JPG, GIF</span>
              </p>
              <p className="text-sm font-medium text-gray-700 2xl:!text-2xl">
                Recommended size: <span className="font-normal">32 × 32px</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
        <button
          type="button"
          className="btn-outline-primary"
          onClick={() => {
            const confirmed = confirm(
              "Are you sure you want to cancel? All unsaved changes will be lost."
            );
            if (confirmed) {
              reset();
              setLogoPreview("/navlogo.png");
              setFaviconPreview(defaultFaviconUrl);
            }
          }}
        >
          Cancel
        </button>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default LogoPage;
