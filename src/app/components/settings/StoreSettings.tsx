import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../loader/Spinner";
import {
  createStoreSettings,
  fetchStoreSettings,
} from "@/redux/slices/homeSlice";
// FormField Component
export const FormField = ({
  label,
  children,
  hasInfo = true,
  className, // sirf label width ke liye
}: {
  label: string | any;
  children: React.ReactNode;
  hasInfo?: boolean;
  className?: string; // FIX
}) => (
  <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
    <Label
      className={`flex justify-start lg:justify-end pt-2 pr-4 2xl:!text-2xl ${className ? className : "w-48 2xl:w-64"
        }`}
    >
      {label}
    </Label>

    <div className="flex-1 flex items-center gap-2">
      {children}
      {hasInfo && <Info className="w-6 h-6 text-gray-400 flex-shrink-0" />}
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
  className,
  isFullWidth = false,
}: {
  label: string;
  checked: boolean;
  className?: string;
  onCheckedChange: (checked: boolean) => void;
  infoText: string;
  isFullWidth?: boolean;
}) => (
  <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
    <Label
      className={`flex justify-start lg:justify-end pr-4 pt-1 2xl:!text-2xl ${className ? className : "w-48 2xl:w-64"
        }`}
    >
      {label}
    </Label>
    <div className="flex-1 flex items-center gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={label.replace(/\s/g, "-").toLowerCase()}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={label.replace(/\s/g, "-").toLowerCase()}
          className="font-normal cursor-pointer 2xl:!text-2xl"
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
  className, // sirf label width ke liye
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string; // optional
}) => (
  <div className="flex flex-col lg:flex-row items-start gap-4 py-3">
    <Label
      className={`flex justify-start lg:justify-end pr-4 pt-1 2xl:!text-2xl ${className ? className : "w-48 2xl:w-64"
        }`}
    >
      {label}
    </Label>

    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-col space-y-2 flex-1"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value} className="font-normal 2xl:!text-2xl">
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
  className, // optional, label width ke liye
}: {
  title: string;
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string; // optional
}) => (
  <div className="flex flex-col lg:flex-row lg:items-start gap-2 lg:gap-4 py-3">
    <Label
      className={`flex justify-start lg:justify-end 2xl:!text-2xl pt-1 ${className ? className : "w-full lg:w-48"
        }`}
    >
      {title}
    </Label>

    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="flex flex-col space-y-2 flex-1"
      name={name}
    >
      {options.map((option) => (
        <div key={option.value} className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="font-normal text-base sm:text-lg 2xl:!text-2xl"
            >
              {option.label}
            </Label>
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1 sm:mt-0" />
          </div>

          {/* Conditional rendering for Custom SMTP fields */}
          {option.value === "custom" && value === "custom" && (
            <div className="mt-2 pl-4 sm:pl-6">
              <CustomSmtpSettings />
            </div>
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
    <h2 className="!font-semibold mb-4 2xl:!text-[2.4rem]">{title}</h2>
    <RadioGroup
      value={settings[`${name}UrlFormat`]}
      onValueChange={(value) => updateSetting(`${name}UrlFormat`, value)}
      className="space-y-4"
    >
      <div className="flex flex-col lg:flex-row lg:item-center items-start gap-4">
        <div className="flex items-center  w-full lg:w-80 lg:flex-row-reverse gap-10">
          <RadioGroupItem value="seo-optimized-short" id={`${name}-short`} />
          <Label
            htmlFor={`${name}-short`}
            className="ml-2 font-normal 2xl:!text-2xl"
          >
            SEO Optimized (Short)
          </Label>
        </div>
        <div className="flex-1 text-gray-500 text-lg 2xl:!text-2xl">
          {seoOptimizedShortExample}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:item-center items-start gap-4">
        <div className="flex items-center  w-full lg:w-80 lg:flex-row-reverse gap-10">
          <RadioGroupItem value="seo-optimized-long" id={`${name}-long`} />
          <Label
            htmlFor={`${name}-long`}
            className="ml-2 font-normal 2xl:!text-2xl"
          >
            SEO Optimized (Long)
          </Label>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-gray-500 text-lg 2xl:!text-2xl">
            {seoOptimizedLongExample}
          </span>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row lg:item-center items-start gap-4">
          <div className="flex items-center  w-full lg:w-80 lg:flex-row-reverse gap-10">
            <RadioGroupItem value="custom" id={`${name}-custom`} />
            <Label
              htmlFor={`${name}-custom`}
              className="ml-2 font-normal 2xl:!text-2xl"
            >
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
          <div className="flex flex-col items-start w-full max-w-lg lg:ml-80 mt-2">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              What placeholders can I use and how do they work?
            </a>
            <Button
              variant="outline"
              className="mt-2 text-lg 2xl:!text-2xl !p-6"
            >
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
  <div className="lg:pl-52 space-y-3 mt-4">
    <div className="flex flex-col lg:flex-row items-start lg:items-center space-x-2">
      <p className="text-sm text-gray-700 2xl:!text-2xl">
        Set Max-Age Header (max-age) to:
      </p>
      {/* <Input
        type="number"
        value={settings.hstsMaxAge}
        onChange={(e) => updateSetting("hstsMaxAge", e.target.value)}
        className="w-20"
      /> */}
      <Select
        value={settings.hstsMaxAgeUnit}
        onValueChange={(value) => updateSetting("hstsMaxAgeUnit", value)}
      >
        <SelectTrigger className="w-56">
          <SelectValue defaultValue="5 minutes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">0 (disabled)</SelectItem>
          <SelectItem value="5 minutes">5 minutes (for testing)</SelectItem>
          <SelectItem value="1 year">1 year</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <CheckboxField
      className="w-full lg:w-0"
      label=""
      checked={settings.hstsApplySubdomains}
      onCheckedChange={(checked) =>
        updateSetting("hstsApplySubdomains", checked)
      }
      infoText="Apply HSTS policy to subdomains (includeSubdomains)"
      isFullWidth={true}
    />
    <CheckboxField
      className="w-full lg:w-0"
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
    className="w-full lg:w-56"
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
    className="w-full lg:w-56"
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
  const { storeSettings, settingsLoader } = useAppSelector(
    (state: any) => state.home
  );
  console.log("Store Settings ", storeSettings);

  const dispatch = useAppDispatch();
  const router = useRouter(); // ✅ Add
  const searchParams = useSearchParams(); // ✅ Add
  // Fetch settings on component mount
  useEffect(() => {
    dispatch(fetchStoreSettings());
  }, [dispatch]);


  // ✅ Add this useEffect to sync activeTab with URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]); // Re-run when URL changes


  // ✅ Add: Tab change handler with URL update
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);

    const view = searchParams.get("view");
    const setting = searchParams.get("setting");
    router.push(`/manage/settings?view=${view}&setting=${setting}&tab=${newTab}`);
  };




  const [websiteSettings, setWebsiteSettings] = useState({
    weightMeasurement: "",
    lengthMeasurement: "",
    decimalToken: "",
    thousandsToken: "",
    decimalPlaces: "",
    factoringDimension: "",
    homePageTitle: "",
    metaKeywords: "",
    metaDescription: "",
    wwwRedirect: "",
    robotsTxt: "",
  });

  // 🆕 State for Display tab settings (Initial values from the screenshot)
  const [displaySettings, setDisplaySettings] = useState({
    productBreadcrumbs: "",
    showQuantityBox: false,
    enableSearchSuggest: false,
    autoApproveReviews: false,
    enableWishlist: false,
    enableProductComparisons: false,
    enableAccountCreation: false,
    useWysiwygEditor: false,
    showProductThumbnails: false,
    categoryProductList: "",
    defaultProductSort: "",
    menuDisplayDepth: "",
    showProductPrice: false,
    detailPageDefaultPrice: "",
    listPageDefaultPrice: "",
    hidePriceFromGuests: false,
    showProductSku: false,
    showProductWeight: false,
    showProductBrand: false,
    showProductShippingCost: false,
    showProductRating: false,
    showAddToCartLink: false,
    defaultPreOrderMessage: "",
  });

  // 🆕 State for Date & Timezone settings
  const [dateTimezoneSettings, setDateTimezoneSettings] = useState({
    timezone: "",
    enableDstCorrection: false,
    displayDateFormat: "",
    extendedDisplayDateFormat: "",
  });

  // 🆕 State for URL Structure settings
  const [urlStructureSettings, setUrlStructureSettings] = useState({
    productUrlFormat: "",
    productCustomUrl: "",
    categoryUrlFormat: "",
    categoryCustomUrl: "",
    webPageUrlFormat: "",
    webPageCustomUrl: "",
  });

  // 🆕 State for Search settings
  const [searchSettings, setSearchSettings] = useState({
    defaultProductSort: "",
    defaultContentSort: "",
    storefrontSearchLogic: "",
  });


  const [securityPrivacySettings, setSecurityPrivacySettings] = useState({
    enforcePasswordComplexity: false,
    inactiveShopperLogout: "",
    customLogoutDuration: "",
    customLogoutDurationUnit: "",
    shopperActivityExtendsLogout: false,
    controlPanelTimeout: "",
    enableRecaptchaStorefront: false,
    recaptchaSiteKey: "",
    recaptchaSecretKey: "",
    failedLoginLockout: "",
    enableRecaptchaPrelaunch: false,
    enableCookieConsent: false,
    privacyPolicyUrl: "",
    dataCollectionLimit: "",
    enableHsts: false,
    hstsMaxAge: "",
    hstsMaxAgeUnit: "",
    hstsApplySubdomains: false,
    hstsApplyPreload: false,
    cspConfig: "",
    enableNonceSecurity: false,
    xFrameOptions: "",
  });


  const [miscellaneousSettings, setMiscellaneousSettings] = useState({
    // Email Settings
    reviewEmailDays: "",
    sendReviewEmailToGuests: false,
    forwardOrderInvoices: false,
    invoiceEmailRecipient: "",
    smtpServerOption: "",
    administratorEmail: "",
    requireMarketingConsent: false,
    enableAbandonedCartEmails: false,
    abandonedCartThreshold: "",
    emailEveryAbandonedCart: false,
    stopEmailOnCompleteOrder: false,
    enableConvertedCartEmails: false,
    convertedCartRecipient: "",

    // Advanced Store Settings
    allowPurchasing: false,

    // Order Settings
    startingOrderNumber: "",

    // Throttler
    enableThrottler: false,
    throttleReviewsPerPeriod: "",
    throttlePeriodValue: "",
    throttlePeriodUnit: "",
  });

  // Update state when storeSettings data is loaded
  useEffect(() => {
    if (!storeSettings || storeSettings.length === 0) return;

    const settings = Array.isArray(storeSettings)
      ? storeSettings[0]
      : storeSettings;

    console.log("📦 Populating form with fetched settings:", settings);

    if (settings.website)
      setWebsiteSettings((prev) => ({ ...prev, ...settings.website }));
    if (settings.display)
      setDisplaySettings((prev) => ({ ...prev, ...settings.display }));
    if (settings.dateTimezone)
      setDateTimezoneSettings((prev) => ({
        ...prev,
        ...settings.dateTimezone,
      }));
    if (settings.urlStructure)
      setUrlStructureSettings((prev) => ({
        ...prev,
        ...settings.urlStructure,
      }));
    if (settings.search)
      setSearchSettings((prev) => ({ ...prev, ...settings.search }));
    if (settings.securityPrivacy)
      setSecurityPrivacySettings((prev) => ({
        ...prev,
        ...settings.securityPrivacy,
      }));
    if (settings.miscellaneous)
      setMiscellaneousSettings((prev) => ({
        ...prev,
        ...settings.miscellaneous,
      }));
  }, [storeSettings]);

  // Add this function in your StoreSettings component

  const preparePayload = () => {
    return {
      website: websiteSettings,
      display: displaySettings,
      dateTimezone: dateTimezoneSettings,
      urlStructure: urlStructureSettings,
      search: searchSettings,
      securityPrivacy: securityPrivacySettings,
      miscellaneous: miscellaneousSettings,
    };
  };

  const handleSave = async () => {
    const payload = preparePayload();

    console.log("Complete payload:", payload);

    try {
      const response = await dispatch(createStoreSettings({ data: payload }));
      if (createStoreSettings.fulfilled.match(response)) {
        // Show success message to user
        console.log("Settings saved successfully!", response.payload);
        // onBack();
      } else {
        console.log("Error saving store settings", response.payload);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };
  const [activeTab, setActiveTab] = useState(initialTab || "website");

  // Show loading state while fetching
  if (settingsLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">
            <Spinner />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-8">
      <div className="">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-sm 2xl:!text-2xl">Settings</span>
        </button>

        <h1 className=" mb-2 !font-extralight 2xl:!text-5xl">Store Settings</h1>
        <p className=" mb-6 2xl:!text-2xl">
          Update the settings in the form below and click "Save", or click
          "Cancel" to keep the current settings.
        </p>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-6"
        >
          <TabsList className="border-b  w-80 justify-start rounded-none h-auto p-0">
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

          {/* CONTENT */}
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
