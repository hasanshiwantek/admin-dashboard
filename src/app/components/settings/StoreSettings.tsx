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
  fetchUrlSettings,
  urlSettings,
} from "@/redux/slices/homeSlice";
import { UrlSettingEnums } from "@/const/appConstants";
import AppTabs from "@/components/ui/AppTabs/AppTabs";
import PageTitle from "@/components/ui/PageTitle";
import { Control, useForm, useWatch } from "react-hook-form";
import Form from "@/components/form/Form";
import {
  defaultValues,
} from "./constant";
import InputField from "@/components/form/InputField";
type StoreSettingsFormValues = Record<string, never>;

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
      className={`flex justify-start lg:justify-end pt-2 pr-4 2xl:!text-2xl ${
        className ? className : "w-48 2xl:w-64"
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
      className={`flex justify-start lg:justify-end pr-4 pt-1 2xl:!text-2xl ${
        className ? className : "w-48 2xl:w-64"
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
      className={`flex justify-start lg:justify-end pr-4 pt-1 2xl:!text-2xl ${
        className ? className : "w-48 2xl:w-64"
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
      className={`flex justify-start lg:justify-end 2xl:!text-2xl pt-1 ${
        className ? className : "w-full lg:w-48"
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
  const dispatch = useAppDispatch();
  const router = useRouter(); // ✅ Add
  const searchParams = useSearchParams(); // ✅ Add
  const { storeSettings, settingsLoader } = useAppSelector(
    (state: any) => state.home,
  );
  const form = useForm<StoreSettingsFormValues>({
    defaultValues: {},
  });
  const [activeTab, setActiveTab] = useState(initialTab || "website");
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: defaultValues,
  });

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
    router.push(
      `/manage/settings?view=${view}&setting=${setting}&tab=${newTab}`,
    );
  };

  // 🆕 State for Date & Timezone settings
  const [dateTimezoneSettings, setDateTimezoneSettings] = useState({
    timezone: "",
    enableDstCorrection: false,
    displayDateFormat: "",
    extendedDisplayDateFormat: "",
  });

  const tabs = [
    {
      key: "website",
      label: "Website",
      content: <WebsiteSettings control={control} />,
    },
    {
      key: "display",
      label: "Display",
      content: <DisplaySettings control={control} />,
    },
    {
      key: "share",
      label: "Share",
      content: (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600">Share settings content goes here...</p>
        </div>
      ),
    },
    // {
    //   key: "date-timezone",
    //   label: "Date & Timezone",
    //   content: (
    //     <DateTimezoneSettings
    //       settings={dateTimezoneSettings}
    //       onSettingsChange={setDateTimezoneSettings}
    //     />
    //   ),
    // },
    {
      key: "url-structure",
      label: "URL Structure",
      content: <URLStructureSettings control={control} />,
    },
    {
      key: "search",
      label: "Search",
      content: <SearchSettings control={control} />,
    },
    {
      key: "security",
      label: "Security & Privacy",
      content: <SecurityPrivacySettings control={control} />,
    },
    {
      key: "misc",
      label: "Miscellaneous",
      content: <MiscellaneousSettings control={control} />,
    },
  ];
  // // Update state when storeSettings data is loaded
  useEffect(() => {
    if (!storeSettings) return;

    const settings = Array.isArray(storeSettings)
      ? storeSettings[0]
      : storeSettings;
    if (!settings) return;

    reset(settings);
  }, [storeSettings, reset]);
  // Add this function in your StoreSettings component
  const preparePayload = () => {
    const values = getValues();
    return {
      website: values.website,
      display: values.display,
      urlStructure: values.urlStructure,
      search: values.search,
      securityPrivacy: values.securityPrivacy,
      miscellaneous: values.miscellaneous,
      // dateTimezone: values.dateTimezone,
    };
  };

  const handleSave = async () => {
    const payload = preparePayload();
    try {
      const response = await dispatch(createStoreSettings({ data: payload }));
      if (createStoreSettings.fulfilled.match(response)) {
        // Inside handleSave function in StoreSettings component
        const urlPayloads = {
          product: (() => {
            const format = payload.urlStructure.productUrlFormat;
            if (format === "custom") {
              return {
                format_type: "custom",
                custom_format:
                  payload.urlStructure.productCustomUrl?.trim() || "/%title%/",
              };
            }
            return {
              format_type:
                format === UrlSettingEnums.SEO_OPTIMIZED_SHORT
                  ? UrlSettingEnums.SEO_OPTIMIZED_SHORT
                  : UrlSettingEnums.SEO_OPTIMIZED_LONG,
            };
          })(),

          category: (() => {
            const format = payload.urlStructure.categoryUrlFormat;
            if (format === "custom") {
              return {
                format_type: "custom",
                custom_format:
                  payload.urlStructure.categoryCustomUrl?.trim() ||
                  "/%categoryname%/",
              };
            }
            return {
              format_type:
                format === UrlSettingEnums.SEO_OPTIMIZED_SHORT
                  ? UrlSettingEnums.SEO_OPTIMIZED_SHORT
                  : UrlSettingEnums.SEO_OPTIMIZED_LONG, // as per your requirement
            };
          })(),

          webPage: (() => {
            const format = payload.urlStructure.webPageUrlFormat;
            if (format === "custom") {
              return {
                format_type: "custom",
                custom_format:
                  payload.urlStructure.webPageCustomUrl?.trim() ||
                  "/%pagename%/",
              };
            }
            return {
              format_type:
                format === UrlSettingEnums.SEO_OPTIMIZED_SHORT
                  ? UrlSettingEnums.SEO_OPTIMIZED_SHORT
                  : UrlSettingEnums.SEO_OPTIMIZED_LONG,
            };
          })(),
        };
        // Save each URL section individually
        await Promise.all([
          dispatch(
            urlSettings({
              data: urlPayloads.product,
              sectionName: "product",
            }),
          ).unwrap(),

          dispatch(
            urlSettings({
              data: urlPayloads.category,
              sectionName: "category",
            }),
          ).unwrap(),

          dispatch(
            urlSettings({
              data: urlPayloads.webPage,
              sectionName: "webpage",
            }),
          ).unwrap(),
        ]);
      }
    } catch (error: any) {
      console.error("Error saving settings:", error);
    }
  };

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
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-sm 2xl:!text-2xl">Settings</span>
      </button>
      <PageTitle
        title={"Store Settings"}
        description="Update the settings in the form below and click Save, or click Cancel to keep the current settings."
        descriptionClassName="text-xl! 2xl:text-2xl!"
        hideActionButton
      />

      <Form
        form={form}
        onSubmit={async () => {
          await handleSave();
        }}
        footer={{
          submitText: "Save",
          onCancel: onBack,
          loading: form.formState.isSubmitting,
        }}
        className="pb-28"
        bodyClassName="!p-0 !border-0 !bg-transparent !gap-0"
      >
        <AppTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          variant="underline"
          maxVisibleTabs={8}
          className="mb-6"
          contentClassName="mt-6"
        />
      </Form>
    </div>
  );
};
