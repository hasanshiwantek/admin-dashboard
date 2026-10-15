import { Control } from "react-hook-form";
import { UrlStructureField } from "./constant";
import { UrlSettingSection } from "./UrlSettingSection";

export const URLStructureSettings = ({
  control,
}: {
  control: Control<any>;
}) => {
  return (
    <div className="space-y-5">
      <UrlSettingSection
        title="Product URL Settings"
        formatField={UrlStructureField.ProductUrlFormat}
        customUrlField={UrlStructureField.ProductCustomUrl}
        control={control}
        shortExample="https://test.com/ipod-nano/"
        longExample="https://test.com/products/ipod-nano.html"
      />

      <hr className="my-8" />

      <UrlSettingSection
        title="Category URL Settings"
        formatField={UrlStructureField.CategoryUrlFormat}
        customUrlField={UrlStructureField.CategoryCustomUrl}
        control={control}
        shortExample="https://test.com/apple-ipod/"
        longExample="https://test.com/categories/apple-ipod.html"
      />

      <hr className="my-8" />

      <UrlSettingSection
        title="Web Page URL Settings"
        formatField={UrlStructureField.WebPageUrlFormat}
        customUrlField={UrlStructureField.WebPageCustomUrl}
        control={control}
        shortExample="https://test.com/about-us/"
        longExample="https://test.com/pages/about-us.html"
      />
    </div>
  );
};
