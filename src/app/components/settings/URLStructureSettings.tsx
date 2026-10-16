import { URL_STRUCTURE_SECTIONS, UrlStructureField } from "./constant";
import { UrlSettingSection } from "./UrlSettingSection";
import { useFormContext } from "@/components/form/Form";

export const URLStructureSettings = () => {
  return (
    <div className="space-y-5">
      {URL_STRUCTURE_SECTIONS.map((section, index) => (
        <div key={section.formatField}>
          <UrlSettingSection
            title={section.title}
            formatField={section.formatField}
            customUrlField={section.customUrlField}
            shortExample={section.shortExample}
            longExample={section.longExample}
          />
          {index < URL_STRUCTURE_SECTIONS.length - 1 && <hr className="my-8" />}
        </div>
      ))}
    </div>
  );
};
