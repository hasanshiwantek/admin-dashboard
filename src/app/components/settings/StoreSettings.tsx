import React, { useState } from "react";
import { Search, ChevronRight, ArrowLeft, Info } from "lucide-react";
import { WebsiteSettings } from "./WebsiteSettings";
import { DisplaySettings } from "./DisplaySettings";
import { DateTimezoneSettings } from "./DateTimeZoneSettings";
import { URLStructureSettings } from "./URLStructureSettings";
import { SearchSettings } from "./SearchSettings";
import { MiscellaneousSettings } from "./MiscellaneousSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SecurityPrivacySettings } from "./SecurityPrivacySettings";
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
  isFullWidth = false,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  infoText: string;
  isFullWidth?: boolean;
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

// 🆕 Custom Smtp Settings Sub-Component
const CustomSmtpSettings = () => {
  // Note: State for these fields needs to be managed in the parent MiscellaneousSettings component,
  // but for UI representation, we define the structure here.
  return (
    <div className="ml-10 space-y-4 pt-2">
      <FormField label="SMTP Hostname" hasInfo={true}>
        <Input className="w-64" />
      </FormField>
      <FormField label="SMTP Username (Optional)" hasInfo={true}>
        <Input className="w-64" />
      </FormField>
      <FormField label="SMTP Password" hasInfo={true}>
        <Input
          type="password"
          className="w-64"
          placeholder="Enter New Password"
        />
      </FormField>
      <FormField label="SMTP Port (Optional)" hasInfo={true}>
        <Input type="number" className="w-64" />
      </FormField>
      <div className="flex justify-end pr-8">
        <Button variant="outline" className="mt-4">
          Test SMTP Settings
        </Button>
      </div>
    </div>
  );
};

// RadioGroupField Component (Re-used)
export const RadioGroupField = ({
  title,
  name,
  value,
  onValueChange,
  options,
}: {
  title: string;
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex items-start gap-4 py-3">
    <Label className="w-48 text-right pr-4 pt-1">{title}</Label>
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-col space-y-2 flex-1"
      name={name}
    >
      {options.map((option) => (
        <div key={option.value} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label htmlFor={`${name}-${option.value}`} className="font-normal">
              {option.label}
            </Label>
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
          {/* Conditional rendering for Custom SMTP fields */}
          {option.value === "custom" && value === "custom" && (
            <CustomSmtpSettings />
          )}
        </div>
      ))}
    </RadioGroup>
  </div>
);

// Helper component for the three URL Setting sections (Product, Category, Web Page)
export const UrlSettingSection = ({
  title,
  name,
  settings,
  updateSetting,
  seoOptimizedShortExample,
  seoOptimizedLongExample,
}: {
  title: string;
  name: string;
  settings: any;
  updateSetting: (key: string, value: string) => void;
  seoOptimizedShortExample: string;
  seoOptimizedLongExample: string;
}) => (
  <div className="mb-8 bg-white border p-8">
    <h2 className="!font-semibold mb-4">{title}</h2>
    <RadioGroup
      value={settings[`${name}UrlFormat`]}
      onValueChange={(value) => updateSetting(`${name}UrlFormat`, value)}
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center  w-72 text-right flex-row-reverse gap-10">
          <RadioGroupItem value="seo-optimized-short" id={`${name}-short`} />
          <Label htmlFor={`${name}-short`} className="ml-2 font-normal">
            SEO Optimized (Short)
          </Label>
        </div>
        <div className="flex-1 text-gray-500 text-lg">
          {seoOptimizedShortExample}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center  w-72 text-right flex-row-reverse gap-10">
          <RadioGroupItem value="seo-optimized-long" id={`${name}-long`} />
          <Label htmlFor={`${name}-long`} className="ml-2 font-normal">
            SEO Optimized (Long)
          </Label>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-gray-500 text-lg">
            {seoOptimizedLongExample}
          </span>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center  w-72 text-right flex-row-reverse gap-10">
            <RadioGroupItem value="custom" id={`${name}-custom`} />
            <Label htmlFor={`${name}-custom`} className="ml-2 font-normal">
              Custom
            </Label>
          </div>
          <div className="flex-1">
            <Input
              value={settings[`${name}CustomUrl`]}
              onChange={(e) =>
                updateSetting(`${name}CustomUrl`, e.target.value)
              }
              disabled={settings[`${name}UrlFormat`] !== "custom"}
              className="w-full max-w-lg"
            />
          </div>
        </div>
        {settings[`${name}UrlFormat`] === "custom" && (
          <div className="flex flex-col items-start w-full max-w-lg ml-52 mt-2">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              What placeholders can I use and how do they work?
            </a>
            <Button variant="outline" className="mt-2 text-lg !p-6">
              Update {title.replace(" Settings", "")} URLs...
            </Button>
          </div>
        )}
      </div>
    </RadioGroup>
  </div>
);

// HSTS Settings Sub-Component
export const HstsSettings = ({
  settings,
  updateSetting,
}: {
  settings: any;
  updateSetting: any;
}) => (
  <div className="pl-52 space-y-3 mt-4">
    <p className="text-sm text-gray-700">Set Max-Age Header (max-age) to:</p>
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={settings.hstsMaxAge}
        onChange={(e) => updateSetting("hstsMaxAge", e.target.value)}
        className="w-20"
      />
      <Select
        value={settings.hstsMaxAgeUnit}
        onValueChange={(value) => updateSetting("hstsMaxAgeUnit", value)}
      >
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="minutes">minutes</SelectItem>
          <SelectItem value="hours">hours</SelectItem>
          <SelectItem value="days">days</SelectItem>
          <SelectItem value="months">months</SelectItem>
          <SelectItem value="years">years</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <CheckboxField
      label=""
      checked={settings.hstsApplySubdomains}
      onCheckedChange={(checked) =>
        updateSetting("hstsApplySubdomains", checked)
      }
      infoText="Apply HSTS policy to subdomains (includeSubdomains)"
      isFullWidth={true}
    />
    <CheckboxField
      label=""
      checked={settings.hstsApplyPreload}
      onCheckedChange={(checked) => updateSetting("hstsApplyPreload", checked)}
      infoText="Apply Preload (This requires subdomains to be ON & Max Age to be 12 months)"
      isFullWidth={true}
    />
  </div>
);

// CSP Settings Sub-Component
export const CspSettings = ({
  settings,
  updateSetting,
}: {
  settings: any;
  updateSetting: any;
}) => (
  <RadioGroupField
    title="Configure Content-Security-Policy Header Value"
    name="csp-config"
    value={settings.cspConfig}
    onValueChange={(value: any) => updateSetting("cspConfig", value)}
    options={[
      { value: "no-custom", label: "Do not use a custom CSP header" },
      { value: "custom", label: "Specify my own CSP header" },
    ]}
  />
);

// X-Frame-Options Header Sub-Component
export const XFrameOptionsSettings = ({
  settings,
  updateSetting,
}: {
  settings: any;
  updateSetting: any;
}) => (
  <RadioGroupField
    title="X-Frame-Options Header settings"
    name="xframe-options"
    value={settings.xFrameOptions}
    onValueChange={(value: any) => updateSetting("xFrameOptions", value)}
    options={[
      { value: "deny", label: "Deny" },
      { value: "same-origin", label: "Same Origin" },
      { value: "allow-from-url", label: "Allow from url" },
    ]}
  />
);

// StoreSettings Component
export const StoreSettings = ({
  currentSetting,
  onBack,
  initialTab,  
}: {
  currentSetting: any;
  onBack: any;
  initialTab?: string;
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

  // 🆕 State for Date & Timezone settings
  const [dateTimezoneSettings, setDateTimezoneSettings] = useState({
    timezone: "pacific-gmt-8",
    enableDstCorrection: false,
    displayDateFormat: "M d, Y",
    extendedDisplayDateFormat: "i S M Y @ g:i A",
  });

  // 🆕 State for URL Structure settings
  const [urlStructureSettings, setUrlStructureSettings] = useState({
    productUrlFormat: "seo-optimized-short",
    productCustomUrl: "custom/url/product/%productname%/",
    categoryUrlFormat: "custom", // Custom is selected in the image for Category
    categoryCustomUrl: "/%parent%/%categoryname%/",
    webPageUrlFormat: "seo-optimized-short",
    webPageCustomUrl: "custom/url/page/%pagename%.html",
  });

  // 🆕 State for Search settings
  const [searchSettings, setSearchSettings] = useState({
    defaultProductSort: "relevance",
    defaultContentSort: "relevance",
    storefrontSearchLogic: "one-or-more",
  });

  const [securityPrivacySettings, setSecurityPrivacySettings] = useState({
    enforcePasswordComplexity: true,
    inactiveShopperLogout: "default",
    customLogoutDuration: "7",
    customLogoutDurationUnit: "days",
    shopperActivityExtendsLogout: true,
    controlPanelTimeout: "2hours",
    enableRecaptchaStorefront: false,
    recaptchaSiteKey: "",
    recaptchaSecretKey: "",
    failedLoginLockout: "10",
    enableRecaptchaPrelaunch: true,
    enableCookieConsent: false,
    privacyPolicyUrl: "",
    dataCollectionLimit: "off",
    enableHsts: true,
    hstsMaxAge: "5",
    hstsMaxAgeUnit: "minutes",
    hstsApplySubdomains: false,
    hstsApplyPreload: false,
    cspConfig: "no-custom",
    enableNonceSecurity: false,
    xFrameOptions: "deny",
  });

  const [miscellaneousSettings, setMiscellaneousSettings] = useState({
    // Email Settings
    reviewEmailDays: "7",
    sendReviewEmailToGuests: true,
    forwardOrderInvoices: true,
    invoiceEmailRecipient: "sales@ctspoint.com, info@ctspoint.cc",
    smtpServerOption: "default",
    administratorEmail: "info@ctspoint.com",
    requireMarketingConsent: false,
    enableAbandonedCartEmails: true,
    abandonedCartThreshold: "10",
    emailEveryAbandonedCart: false,
    stopEmailOnCompleteOrder: true,
    enableConvertedCartEmails: true,
    convertedCartRecipient: "info@ctspoint.com",

    // Advanced Store Settings
    allowPurchasing: true,

    // Order Settings
    startingOrderNumber: "311080",

    // Throttler
    enableThrottler: false,
    throttleReviewsPerPeriod: "1",
    throttlePeriodValue: "30",
    throttlePeriodUnit: "minutes",
  });
  const handleSave = () => {
    console.log("Saving settings:", websiteSettings);
    console.log("Saving display settings:", displaySettings);
    console.log("Saving date & timezone settings:", dateTimezoneSettings);
    console.log("Saving URL structure settings:", urlStructureSettings);
    console.log("Saving search settings:", searchSettings);
    console.log("Saving Security settings:", securityPrivacySettings);
    console.log("Saving miscellaneous settings:", miscellaneousSettings);
    // Add your save logic here
  };
 const [activeTab, setActiveTab] = useState(initialTab || "website"); 
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

        <Tabs
          value={activeTab}
          onValueChange={(val:any) => setActiveTab(val)}
          className="mb-6"
        >
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
            <DateTimezoneSettings
              settings={dateTimezoneSettings}
              onSettingsChange={setDateTimezoneSettings}
            />
          </TabsContent>

          <TabsContent value="url-structure" className="mt-6">
            <URLStructureSettings
              settings={urlStructureSettings}
              onSettingsChange={setUrlStructureSettings}
            />
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <SearchSettings
              settings={searchSettings}
              onSettingsChange={setSearchSettings}
            />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecurityPrivacySettings
              settings={securityPrivacySettings}
              onSettingsChange={setSecurityPrivacySettings}
            />
          </TabsContent>

          <TabsContent value="misc" className="mt-6">
            <MiscellaneousSettings
              settings={miscellaneousSettings}
              onSettingsChange={setMiscellaneousSettings}
            />
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
