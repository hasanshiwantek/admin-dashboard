"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import OrderActionsDropdown from "../orders/OrderActionsDropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createLogo, fetchLogo } from "@/redux/slices/storefrontSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
// --- Mock Logo Component ---
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

const LogoPage = () => {
  // --- Logo States ---
  const [logoType, setLogoType] = useState("upload");
  const [logoText, setLogoText] = useState("My Store");
  const [logoUrl, setLogoUrl] = useState<string>("/navlogo.png");
  const [logoSize, setLogoSize] = useState("optimized");
  const [maxWidth, setMaxWidth] = useState(250);
  const [maxHeight, setMaxHeight] = useState(100);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // --- Favicon States ---
  const [faviconUrl, setFaviconUrl] = useState<string>("");
  const defaultFaviconUrl = "/navlogo.png";

  // --- Logo Size Options ---
  const logoSizeOptions = [
    { value: "optimized", label: "Optimized for your theme" },
    { value: "original", label: "Original as uploaded" },
    { value: "dimensions", label: "Specify Dimensions" },
  ];

  const isDimensions = logoSize === "dimensions";

  const getDimensions = () => {
    if (isDimensions) return { width: maxWidth, height: maxHeight };
    if (logoSize === "optimized") return { width: 250, height: 100 };
    return { width: 350, height: 150 };
  };

  const { width, height } = getDimensions();

  // --- Handlers ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoUrl(URL.createObjectURL(file));
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFaviconUrl(URL.createObjectURL(file));
  };

  const getDropdownActions = () => [
    {
      label: "Replace image",
      onClick: () => document.getElementById("logo-upload")?.click(),
    },
    {
      label: "Delete image",
      onClick: () => setLogoUrl(""),
    },
  ];

  // --- Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("logoType", logoType);
      formData.append("logoSize", logoSize);

      // Nested dimensions
      formData.append("dimensions[width]", maxWidth.toString());
      formData.append("dimensions[height]", maxHeight.toString());

      // --- Logo Handling ---
      if (logoType === "text") {
        formData.append("logoText", logoText);
      } else {
        const fileInput = document.getElementById(
          "logo-upload"
        ) as HTMLInputElement;

        if (fileInput?.files?.[0]) {
          // ✅ File uploaded
          formData.append("image", fileInput.files[0]);
        } else {
          // ❌ No uploaded file, cannot send URL string
          alert("Please upload a logo image before saving.");
          return;
        }
      }

      // --- Favicon Handling ---
      const faviconInput = document.getElementById(
        "favicon-upload"
      ) as HTMLInputElement;

      if (faviconInput?.files?.[0]) {
        formData.append("faviconFile", faviconInput.files[0]);
      } else if (faviconUrl) {
        // Optional: If backend accepts a URL for favicon
        formData.append("faviconUrl", faviconUrl);
      }

      console.log("📦 FormData Preview:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // --- Dispatch API ---
      const res = await dispatch(createLogo({ data: formData }));
      if (createLogo.fulfilled.match(res)) {
        console.log("✅ Logo uploaded successfully", res?.payload);
      } else {
        console.log("❌ Error uploading logo", res?.payload);
        alert("Failed to save logo settings.");
      }
    } catch (err) {
      console.error("❌ Error saving logo settings:", err);
    }
  };

  //   FETCH LOGO

  useEffect(() => {
    dispatch(fetchLogo());
  }, [dispatch]);

  return (
    <div>
      <div className="p-4">
        <div className="mx-auto">
          <h1 className="!font-extralight mb-6">Logo Options</h1>

          {/* --- LOGO SECTION --- */}
          <div className="bg-white rounded-md shadow-md border p-10 space-y-8">
            {/* Logo Type Selection */}
            <div>
              <h1 className="!font-semibold tracking-tight mb-6">
                Select your logo type
              </h1>
              <RadioGroup
                value={logoType}
                onValueChange={setLogoType}
                className="space-y-2"
              >
                <div className="flex items-center space-x-5">
                  <RadioGroupItem value="text" id="text-logo" />
                  <Label htmlFor="text-logo">
                    Enter text to display as your logo
                  </Label>
                </div>
                <div className="flex items-center space-x-5">
                  <RadioGroupItem value="upload" id="upload-logo" />
                  <Label htmlFor="upload-logo">Upload a custom image</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Logo Preview */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span>Logo preview</span>
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
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="border rounded-md p-2 text-lg text-center font-medium focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <MockLogo
                    src={logoUrl || "/navlogo.png"}
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
                onChange={handleLogoUpload}
              />
            </div>

            {/* Logo Size Selection */}
            <div className="pt-6 border-t border-gray-100 space-y-2">
              <Label
                htmlFor="logo-size-select"
                className="text-base font-semibold"
              >
                Logo size
              </Label>

              <Select value={logoSize} onValueChange={setLogoSize}>
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

              {isDimensions ? (
                <div className="mt-5 space-x-2 flex items-center text-base text-gray-600">
                  <Label htmlFor="max-width-input">Max Width:</Label>
                  <Input
                    id="max-width-input"
                    type="number"
                    value={maxWidth}
                    onChange={(e) =>
                      setMaxWidth(Math.max(1, parseInt(e.target.value) || 0))
                    }
                    className="w-24 text-center"
                  />
                  <span>x</span>
                  <Label htmlFor="max-height-input">Max Height:</Label>
                  <Input
                    id="max-height-input"
                    type="number"
                    value={maxHeight}
                    onChange={(e) =>
                      setMaxHeight(Math.max(1, parseInt(e.target.value) || 0))
                    }
                    className="w-24 text-center"
                  />
                  <span>px</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500 pt-1">
                  Recommended size:{" "}
                  <span className="font-medium text-gray-700">250 x 100px</span>
                </p>
              )}
            </div>

            {/* Launch Page Builder */}
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
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
          <div className="bg-white rounded-md shadow-md border p-10 space-y-6 my-30 ">
            <h1 className="!font-semibold tracking-tight">Favicon</h1>
            <p className="text-sm text-gray-600">
              A favicon is a small image that represents your brand in browser
              tabs.
            </p>

            {/* Favicon Preview */}
            <div className="flex items-center justify-center">
              <img
                src={faviconUrl || defaultFaviconUrl}
                alt="Favicon Preview"
                className="w-50 h-50 object-contain border border-gray-200 rounded-md p-1"
              />
            </div>

            <div className="flex space-x-3 items-center">
              <Button
                className="text-2xl !p-5"
                variant="outline"
                onClick={() =>
                  document.getElementById("favicon-upload")?.click()
                }
              >
                Upload Favicon
              </Button>
              <Button
                variant="outline"
                onClick={() => setFaviconUrl("")}
                className="text-red-600 border-red-300 hover:bg-red-50 text-2xl !p-5"
              >
                Delete Favicon
              </Button>
            </div>

            <input
              id="favicon-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFaviconUpload}
            />

            <div className="pt-4 border-t border-gray-100 space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Supported file types:{" "}
                <span className="font-normal">ICO, PNG, SVG, JPG, GIF</span>
              </p>
              <p className="text-sm font-medium text-gray-700">
                Recommended size: <span className="font-normal">32 × 32px</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM ACTION BUTTONS */}
      <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
        <button
          type="button"
          className="btn-outline-primary"
          onClick={() => {
            const confirmed = confirm(
              "Are you sure you want to cancel? All unsaved changes will be lost."
            );
            if (confirmed) {
              // Reset all form states
              setLogoType("upload");
              setLogoText("My Store");
              setLogoUrl("/navlogo.png");
              setLogoSize("optimized");
              setMaxWidth(250);
              setMaxHeight(100);
              setFaviconUrl("");
            }
          }}
        >
          Cancel
        </button>

        <button type="submit" onClick={handleSubmit} className="btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default LogoPage;

















// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MoreHorizontal } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import OrderActionsDropdown from "../orders/OrderActionsDropdown";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";
// import { createLogo, fetchLogo } from "@/redux/slices/storefrontSlice";
// import { useAppDispatch } from "@/hooks/useReduxHooks";

// // --- Mock Logo Component ---
// const MockLogo = ({ src, width, height }: { src: string; width: number; height: number }) => (
//   <div className="flex items-center justify-center p-6 sm:p-12">
//     {src ? (
//       <img
//         src={src}
//         alt="Logo Preview"
//         style={{ width: `${width}px`, height: `${height}px`, objectFit: "contain", transition: "all 0.3s ease" }}
//       />
//     ) : (
//       <div className="text-gray-400 text-sm italic">No logo selected</div>
//     )}
//   </div>
// );

// type LogoFormValues = {
//   logoType: "text" | "upload";
//   logoText: string;
//   logoSize: "optimized" | "original" | "dimensions";
//   maxWidth: number;
//   maxHeight: number;
//   logoFile?: FileList;
//   faviconFile?: FileList;
//   faviconUrl?: string;
// };

// const defaultValues: LogoFormValues = {
//   logoType: "upload",
//   logoText: "My Store",
//   logoSize: "optimized",
//   maxWidth: 250,
//   maxHeight: 100,
//   faviconUrl: "",
// };

// const LogoPage = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [logoPreview, setLogoPreview] = useState("/navlogo.png");
//   const [faviconPreview, setFaviconPreview] = useState("/navlogo.png");

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     watch,
//     setValue,
//   } = useForm<LogoFormValues>({ defaultValues });

//   const logoType = watch("logoType");
//   const logoSize = watch("logoSize");
//   const maxWidth = watch("maxWidth");
//   const maxHeight = watch("maxHeight");

//   // Fetch logo on mount
//   useEffect(() => {
//     async function fetchData() {
//       const res = await dispatch(fetchLogo());
//       if (res.payload) {
//         const data = res.payload;
//         reset({
//           logoType: data.logoType || "upload",
//           logoText: data.logoText || "My Store",
//           logoSize: data.logoSize || "optimized",
//           maxWidth: data.dimensions?.width || 250,
//           maxHeight: data.dimensions?.height || 100,
//           faviconUrl: data.faviconUrl || "/navlogo.png",
//         });
//         setLogoPreview(data.logoUrl || "/navlogo.png");
//         setFaviconPreview(data.faviconUrl || "/navlogo.png");
//       }
//     }
//     fetchData();
//   }, [dispatch, reset]);

//   const getDimensions = () => {
//     if (logoSize === "dimensions") return { width: maxWidth, height: maxHeight };
//     if (logoSize === "optimized") return { width: 250, height: 100 };
//     return { width: 350, height: 150 };
//   };

//   const { width, height } = getDimensions();

//   const getDropdownActions = () => [
//     {
//       label: "Replace image",
//       onClick: () => document.getElementById("logo-upload")?.click(),
//     },
//     {
//       label: "Delete image",
//       onClick: () => {
//         setLogoPreview("");
//         setValue("logoFile", undefined);
//       },
//     },
//   ];

//   const onSubmit = async (data: LogoFormValues) => {
//     try {
//       const formData = new FormData();

//       formData.append("logoType", data.logoType);
//       formData.append("logoSize", data.logoSize);
//       formData.append("dimensions[width]", data.maxWidth.toString());
//       formData.append("dimensions[height]", data.maxHeight.toString());

//       if (data.logoType === "text") {
//         formData.append("logoText", data.logoText);
//       } else if (data.logoFile && data.logoFile[0]) {
//         formData.append("image", data.logoFile[0]);
//       } else {
//         alert("Please upload a logo image before saving.");
//         return;
//       }

//       if (data.faviconFile && data.faviconFile[0]) {
//         formData.append("faviconFile", data.faviconFile[0]);
//       } else if (data.faviconUrl) {
//         formData.append("faviconUrl", data.faviconUrl);
//       }

//       const res = await dispatch(createLogo({ data: formData }));
//       if (createLogo.fulfilled.match(res)) {
//         alert("Logo saved successfully!");
//       } else {
//         alert("Failed to save logo settings.");
//       }
//     } catch (err) {
//       console.error("Error saving logo settings:", err);
//     }
//   };

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setLogoPreview(URL.createObjectURL(file));
//       setValue("logoFile", e.target.files);
//     }
//   };

//   const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFaviconPreview(URL.createObjectURL(file));
//       setValue("faviconFile", e.target.files);
//     }
//   };

//   const handleCancel = () => {
//     const confirmed = confirm("Are you sure you want to cancel? All unsaved changes will be lost.");
//     if (confirmed) {
//       reset(defaultValues);
//       setLogoPreview("/navlogo.png");
//       setFaviconPreview("/navlogo.png");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="!font-extralight mb-6">Logo Options</h1>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* --- LOGO TYPE --- */}
//         <div className="bg-white rounded-md shadow-md border p-10 space-y-8">
//           <div>
//             <h2 className="!font-semibold tracking-tight mb-6">Select your logo type</h2>
//             <Controller
//               control={control}
//               name="logoType"
//               render={({ field }) => (
//                 <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-2">
//                   <div className="flex items-center space-x-5">
//                     <RadioGroupItem value="text" id="text-logo" />
//                     <Label htmlFor="text-logo">Enter text to display as your logo</Label>
//                   </div>
//                   <div className="flex items-center space-x-5">
//                     <RadioGroupItem value="upload" id="upload-logo" />
//                     <Label htmlFor="upload-logo">Upload a custom image</Label>
//                   </div>
//                 </RadioGroup>
//               )}
//             />
//           </div>

//           {/* --- LOGO PREVIEW --- */}
//           <div className="pt-6 border-t border-gray-100 space-y-3">
//             <div className="flex justify-between items-center">
//               <span>Logo preview</span>
//               {logoType === "upload" && <OrderActionsDropdown actions={getDropdownActions()} trigger={<Button variant="ghost" size="icon" className="!text-2xl"><MoreHorizontal className="!h-7 !w-7 text-gray-500 hover:text-gray-700" /></Button>} />}
//             </div>

//             <div className="border border-gray-200 rounded-lg p-2 min-h-[150px] flex items-center justify-center">
//               {logoType === "text" ? (
//                 <Textarea {...register("logoText")} className="border rounded-md p-2 text-lg text-center font-medium focus:border-blue-500 focus:ring-blue-500" />
//               ) : (
//                 <MockLogo src={logoPreview} width={width} height={height} />
//               )}
//             </div>

//             <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
//           </div>

//           {/* --- LOGO SIZE --- */}
//           <div className="pt-6 border-t border-gray-100 space-y-2">
//             <Label htmlFor="logo-size-select" className="text-base font-semibold">Logo size</Label>
//             <Controller
//               control={control}
//               name="logoSize"
//               render={({ field }) => (
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="optimized">Optimized for your theme</SelectItem>
//                     <SelectItem value="original">Original as uploaded</SelectItem>
//                     <SelectItem value="dimensions">Specify Dimensions</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {logoSize === "dimensions" && (
//               <div className="mt-5 space-x-2 flex items-center text-base text-gray-600">
//                 <Label htmlFor="max-width-input">Max Width:</Label>
//                 <Input type="number" {...register("maxWidth", { valueAsNumber: true })} className="w-24 text-center" />
//                 <span>x</span>
//                 <Label htmlFor="max-height-input">Max Height:</Label>
//                 <Input type="number" {...register("maxHeight", { valueAsNumber: true })} className="w-24 text-center" />
//                 <span>px</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- FAVICON --- */}
//         <div className="bg-white rounded-md shadow-md border p-10 space-y-6 my-10">
//           <h2 className="!font-semibold tracking-tight">Favicon</h2>
//           <div className="flex items-center justify-center">
//             <img src={faviconPreview} alt="Favicon Preview" className="w-12 h-12 object-contain border border-gray-200 rounded-md p-1" />
//           </div>
//           <div className="flex space-x-3 items-center">
//             <input id="favicon-upload" type="file" accept="image/*" className="hidden" {...register("faviconFile")} onChange={handleFaviconChange} />
//             <Button variant="outline" onClick={() => document.getElementById("favicon-upload")?.click()}>Upload Favicon</Button>
//             <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => { setFaviconPreview("/navlogo.png"); setValue("faviconFile", undefined); }}>Delete Favicon</Button>
//           </div>
//         </div>

//         {/* --- ACTION BUTTONS --- */}
//         <div className="flex justify-end gap-4 items-center fixed w-full bottom-0 right-0 bg-white/90 z-10 shadow-xs border-t p-4">
//           <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
//           <Button type="submit">Save</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LogoPage;
