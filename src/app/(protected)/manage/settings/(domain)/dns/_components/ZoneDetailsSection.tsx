import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import SettingsCard from "../../../_components/SettingsCard";
import { DnsSection, zoneDetailFields } from "../constant";
import { fieldPath } from "../utils";
import { ZoneDetailsSectionProps } from "./type";

const ZoneDetailsSection = ({ onRestoreDefaults }: ZoneDetailsSectionProps) => (
  <section className="flex flex-col gap-5">
    <h2 className="text-[2.2rem]! font-semibold text-text-heading!">
      Zone Details
    </h2>
    <SettingsCard className="border-0 p-8! shadow-sm">
      <ListRenderer
        data={zoneDetailFields}
        keyExtractor={(field) => field.name}
        className="space-y-0! gap-6"
        renderItem={(field) => (
          <InputField
            name={fieldPath(DnsSection.ZoneDetails, field.name)}
            label={field.label}
            layout="vertical"
            type="number"
            min={1}
            labelClassName="text-text-heading"
            containerClassName="mb-0"
            controlClassName="max-w-[50rem]"
            afterFieldComponent={
              <HelpTooltip
                content={field.hint}
                iconClassName="fill-muted-plum-gray"
              />
            }
          />
        )}
      />
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={onRestoreDefaults}>
          Restore Defaults
        </Button>
      </div>
    </SettingsCard>
  </section>
);

export default ZoneDetailsSection;
