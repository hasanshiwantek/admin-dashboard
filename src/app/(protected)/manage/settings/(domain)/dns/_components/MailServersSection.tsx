import RadioGroupField from "@/components/form/fields/RadioGroupField";
import InputField from "@/components/form/InputField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { ReactNode } from "react";
import SectionCard from "@/components/SectionCard/SectionCard";
import {
  DnsSection,
  MailForwardFormNames,
  MailServerFormNames,
  MailServerMode,
  mailServerModeOptions,
} from "../constant";
import { fieldPath } from "../utils";
import ExternalEmailFields from "./ExternalEmailFields";
import { MailForwardRowProps, MailServersSectionProps } from "./type";

const LABEL = "font-semibold! text-text-heading";

const forwardField = (index: number, field: MailForwardFormNames) =>
  `${fieldPath(DnsSection.MailServers, MailServerFormNames.Forwards)}.${index}.${field}`;

// Labels only on the first row, like column headings
const MailForwardRow = ({
  index,
  storeDomain,
  canRemove,
  onRemove,
}: MailForwardRowProps) => (
  <div className="grid grid-cols-[minmax(0,59rem)_minmax(0,37rem)_auto] items-start gap-x-8">
    <InputField
      name={forwardField(index, MailForwardFormNames.DisplayAddress)}
      label={index === 0 ? "Display address" : undefined}
      layout="vertical"
      labelClassName={LABEL}
      containerClassName="mb-0"
      // Input + "@domain" share this width, so the domain hugs the input
      controlClassName="max-w-[53rem]"
      afterFieldComponent={
        <span className="text-[1.4rem] text-text-heading">@{storeDomain}</span>
      }
    />
    <InputField
      name={forwardField(index, MailForwardFormNames.ForwardTo)}
      label={index === 0 ? "Forward email to" : undefined}
      layout="vertical"
      labelClassName={LABEL}
      type="email"
      containerClassName="mb-0"
      className="max-w-none"
    />
    {canRemove ? (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Remove this forwarding address"
        onClick={() => onRemove(index)}
        className={index === 0 ? "mt-[3.2rem]" : undefined}
      >
        <X className="size-6 text-primary-blue" />
      </Button>
    ) : (
      <span />
    )}
  </div>
);

const MailServersSection = ({
  mode,
  forwardKeys,
  storeDomain,
  onAddForward,
  onRemoveForward,
  mxRecords,
  mxColumns,
  onAddMxRecord,
}: MailServersSectionProps) => {
  // Each option's extra fields open under it, like the reference
  const optionContent: Partial<Record<MailServerMode, ReactNode>> = {};
  optionContent[MailServerMode.Forward] = mode === MailServerMode.Forward && (
    <div className="flex flex-col gap-5 pt-2 pb-4 pl-12">
      <ListRenderer
        data={forwardKeys}
        keyExtractor={(key) => key}
        className="space-y-0! gap-5"
        renderItem={(_, index) => (
          <MailForwardRow
            index={index}
            storeDomain={storeDomain}
            canRemove={forwardKeys.length > 1}
            onRemove={onRemoveForward}
          />
        )}
      />
      <Button
        type="button"
        variant="link"
        onClick={onAddForward}
        className="h-auto w-fit p-0 text-[1.4rem] text-primary-blue"
      >
        Add another
      </Button>
    </div>
  );

  optionContent[MailServerMode.External] = mode === MailServerMode.External && (
    <ExternalEmailFields
      records={mxRecords}
      columns={mxColumns}
      onAddRecord={onAddMxRecord}
    />
  );

  return (
    <SectionCard className="border-0 p-12! shadow-sm">
      <InputField
        name={fieldPath(DnsSection.MailServers, MailServerFormNames.Mode)}
        layout="vertical"
        Component={RadioGroupField}
        options={mailServerModeOptions.map((option) => ({
          ...option,
          content: optionContent[option.value as MailServerMode],
        }))}
        className="gap-6"
        optionClassName="gap-4 text-[1.4rem]! text-text-heading"
      />
    </SectionCard>
  );
};

export default MailServersSection;
