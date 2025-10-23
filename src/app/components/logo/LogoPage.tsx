"use client";
import React, { useState } from "react";
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

    const payload = {
      logoType,
      logoText: logoType === "text" ? logoText : null,
      logoUrl: logoType === "upload" ? logoUrl : null,
      logoSize,
      dimensions: { width: maxWidth, height: maxHeight },
      faviconUrl: faviconUrl || defaultFaviconUrl,
    };

    console.log("📝 Submitted Logo & Favicon Data:", payload);

    try {
      // Example API call (replace with your real endpoint)
      // const res = await fetch("/api/storefront/logo-settings", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // if (!res.ok) throw new Error("Failed to save settings");

      alert("✅ Logo and favicon settings saved successfully!");
      // router.push("/manage/storefront/web-pages");
    } catch (err) {
      console.error("❌ Error saving logo settings:", err);
      alert("⚠️ Failed to save logo settings.");
    }
  };

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
                        <MoreHorizontal  className="!h-7 !w-7 text-gray-500 hover:text-gray-700" />
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
          onClick={() => router.push("/manage/storefront/web-pages")}
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
