import { UrlSettingSection } from "./StoreSettings";

// 🆕 URLStructureSettings Component
export const URLStructureSettings = ({
  settings,
  onSettingsChange,
}: {
  settings: any;
  onSettingsChange: any;
}) => {
  const updateSetting = (key: any, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-5 ">
      <div className=" rounded-sm    space-y-5">
        {/* Product URL Settings */}
        <UrlSettingSection
          title="Product URL Settings"
          name="product"
          settings={settings}
          updateSetting={updateSetting}
          seoOptimizedShortExample="https://ctspoint.com/ipod-nano/"
          seoOptimizedLongExample="https://ctspoint.com/products/ipod-nano.html"
        />
        <hr className="my-8"/>

        {/* Category URL Settings */}
        <UrlSettingSection
          title="Category URL Settings"
          name="category"
          settings={settings}
          updateSetting={updateSetting}
          seoOptimizedShortExample="https://ctspoint.com/apple-ipod/"
          seoOptimizedLongExample="https://ctspoint.com/categories/apple-ipod.html"
        />
        <hr className="my-8"/>

        {/* Web Page URL Settings */}
        <UrlSettingSection
          title="Web Page URL Settings"
          name="webPage"
          settings={settings}
          updateSetting={updateSetting}
          seoOptimizedShortExample="https://ctspoint.com/about-us/"
          seoOptimizedLongExample="https://ctspoint.com/pages/about-us.html"
        />
      </div>
    </div>
  );
};