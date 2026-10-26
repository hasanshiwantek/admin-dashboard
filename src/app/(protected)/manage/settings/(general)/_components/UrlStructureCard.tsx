"use client";

import { useFormContext } from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import { updateUrlsCopy } from "@/Modals/SettingsModals/UpdateUrlsModal/constant";
import UpdateUrlsModal from "@/Modals/SettingsModals/UpdateUrlsModal/UpdateUrlsModal";
import { useWatch } from "react-hook-form";
import { GeneralSection, UrlFormat } from "../constant";
import { fieldPath } from "../utils";
import SettingsCard from "../../_components/SettingsCard";
import { UrlStructureCardProps } from "./type";
import UrlFormatField from "./UrlFormatField";

// One URL type (product / category / web page): format radios + custom value
const UrlStructureCard = ({ section }: UrlStructureCardProps) => {
  const { control } = useFormContext();
  const formatName = fieldPath(GeneralSection.UrlStructure, section.formatField);
  const format = useWatch({ control, name: formatName });

  return (
    <SettingsCard title={section.title}>
      <InputField
        name={formatName}
        layout="vertical"
        Component={UrlFormatField}
        section={section}
        customInput={
          <InputField
            name={fieldPath(GeneralSection.UrlStructure, section.customUrlField)}
            layout="vertical"
            disabled={format !== UrlFormat.Custom}
            placeholder={section.customPlaceholder}
            containerClassName="max-w-lg"
          />
        }
        action={
          <UpdateUrlsModal
            section={section.apiSection}
            trigger={
              <Button type="button" variant="outline" size="xl" className="text-2xl">
                {updateUrlsCopy[section.apiSection].title}...
              </Button>
            }
          />
        }
      />
    </SettingsCard>
  );
};

export default UrlStructureCard;
