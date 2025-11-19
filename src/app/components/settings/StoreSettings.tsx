import React, { useState } from "react";
import { Search, ChevronRight, ArrowLeft, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WebsiteSettings } from "./WebsiteSettings";
import { DisplaySettings } from "./DisplaySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// FormField Component
export const FormField = ({
  label,
  children,
  hasInfo = true, // default value
}: {
  label: string | any;
  children: React.ReactNode; // use React.ReactNode for children
  hasInfo?: boolean; // make optional
}) => (
  <div className="flex items-start gap-4 py-3">
    <Label className="w-48 text-right  pt-2">{label}</Label>
    <div className="flex-1 flex items-center gap-2">
      {children}
      {hasInfo && <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />}
    </div>
  </div>
);

// CheckboxField Component (Helper for the Display tab)
// Note: Assumes a Checkbox component that takes 'checked' and 'onCheckedChange'
export const CheckboxField = ({
  label,
  checked,
  onCheckedChange,
  infoText,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  infoText: string;
}) => (
  <div className="flex items-center gap-4 py-3">
    <Label className="w-48 text-right pr-4">{label}</Label>
    <div className="flex-1 flex items-center gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={label.replace(/\s/g, "-").toLowerCase()}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={label.replace(/\s/g, "-").toLowerCase()}
          className="font-normal cursor-pointer"
        >
          {infoText}
        </Label>
      </div>
      <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
    </div>
  </div>
);

// 🆕 RadioField Component (Helper for radio buttons like Category Product List)
export const RadioField = ({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex items-start gap-4 py-3">
    <Label className="w-48 text-right pr-4 pt-1">{label}</Label>
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-col space-y-2 flex-1"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="font-normal">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

// StoreSettings Component
export const StoreSettings = ({
  currentSetting,
  onBack,
}: {
  currentSetting: any;
  onBack: any;
}) => {
  const [websiteSettings, setWebsiteSettings] = useState({
    weightMeasurement: "pounds",
    lengthMeasurement: "inches",
    decimalToken: ".",
    thousandsToken: ",",
    decimalPlaces: "2",
    factoringDimension: "product-depth",
    homePageTitle: "CTS Point, Inc. | Computer Technology Solutions Point",
    metaKeywords:
      "NETWORK ADAPTERS, POWER SUPPLY, HARD DRIVE, SSD, SWITCHES, PRI",
    metaDescription:
      "Empower your digital journey with High-Performance IT hardware",
    wwwRedirect: "redirect-www-to-no-www",
    robotsTxt: `User-agent: *
Disallow: /account.php
Disallow: /cart.php
Disallow: /checkout.php
Disallow: /checkout
Disallow: /finishorder.php
Disallow: /login.php
Disallow: /orderstatus.php
Disallow: /postreview.php
Disallow: /productimage.php
Disallow: /productupdates.php
Disallow: /remote.php
Disallow: /search.php
Disallow: /viewfile.php
Disallow: /wishlist.php
Disallow: /admin/
Disallow: /*/price_min
Disallow: /*/sort=
Disallow: /*/searchId
Disallow: /search.php`,
  });

  // 🆕 State for Display tab settings (Initial values from the screenshot)
  const [displaySettings, setDisplaySettings] = useState({
    productBreadcrumbs: "show-one-only",
    showQuantityBox: true,
    enableSearchSuggest: true,
    autoApproveReviews: false,
    enableWishlist: false,
    enableProductComparisons: false,
    enableAccountCreation: true,
    useWysiwygEditor: true,
    showProductThumbnails: true,

    categoryProductList: "current-and-children",
    defaultProductSort: "featured",
    menuDisplayDepth: "3",

    showProductPrice: true,
    detailPageDefaultPrice: "default-catalog",
    listPageDefaultPrice: "default-catalog",
    hidePriceFromGuests: false,
    showProductSku: true,
    showProductWeight: true,
    showProductBrand: true,
    showProductShippingCost: true,
    showProductRating: true,
    showAddToCartLink: false,
    defaultPreOrderMessage: "%DATE%",
  });

  const handleSave = () => {
    console.log("Saving settings:", websiteSettings);
    console.log("Saving display settings:", displaySettings);
    // Add your save logic here
  };

  return (
    <div className="min-h-screen  p-8">
      <div className="">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-sm">Settings</span>
        </button>

        <h1 className=" mb-2 !font-extralight">Store Settings</h1>
        <p className=" mb-6">
          Update the settings in the form below and click "Save", or click
          "Cancel" to keep the current settings.
        </p>

        <Tabs defaultValue="website" className="mb-6">
          <TabsList className="border-b  w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="website"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Website
            </TabsTrigger>
            <TabsTrigger
              value="display"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Display
            </TabsTrigger>
            <TabsTrigger
              value="share"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Share
            </TabsTrigger>
            <TabsTrigger
              value="date-timezone"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Date & Timezone
            </TabsTrigger>
            <TabsTrigger
              value="url-structure"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              URL Structure
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Search
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Security & Privacy
            </TabsTrigger>
            <TabsTrigger
              value="misc"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent px-4 py-3"
            >
              Miscellaneous
            </TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="mt-6">
            <WebsiteSettings
              settings={websiteSettings}
              onSettingsChange={setWebsiteSettings}
            />
          </TabsContent>

          <TabsContent value="display" className="mt-6">
            <DisplaySettings
              settings={displaySettings}
              onSettingsChange={setDisplaySettings}
            />
          </TabsContent>

          <TabsContent value="share" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">
                Share settings content goes here...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="date-timezone" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">
                Date & Timezone settings content goes here...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="url-structure" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">
                URL Structure settings content goes here...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">
                Search settings content goes here...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">
                Security & Privacy settings content goes here...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="misc" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600">
                Miscellaneous settings content goes here...
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
          <button className="btn-outline-primary" onClick={onBack}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
