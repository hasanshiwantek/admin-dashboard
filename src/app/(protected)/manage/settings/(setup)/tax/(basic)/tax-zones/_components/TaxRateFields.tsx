import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import Link from "next/link";
import SettingsCard from "../../../../../_components/SettingsCard";
import { BasicTaxTab, basicTaxTabRoute } from "../../constant";
import { TaxRateClassFormNames, TaxRateFormNames } from "../constant";
import { TaxRateFieldsProps } from "./type";

const LABEL = "font-semibold! text-text-heading";
const SUFFIX = "text-[1.4rem] text-text-heading";

const TaxRateFields = ({ classRates }: TaxRateFieldsProps) => (
  <SettingsCard className="gap-8 border-0 p-12! shadow-sm">
    <InputField
      name={TaxRateFormNames.Name}
      label="Tax rate name"
      layout="vertical"
      labelClassName={LABEL}
      className="max-w-[60rem]"
    />

    <div className="flex flex-col gap-5">
      <p className={`text-[1.4rem]! ${LABEL}`}>Tax class rates</p>
      <ListRenderer
        data={classRates}
        keyExtractor={(row) => row.key}
        className="space-y-0! gap-5"
        renderItem={(row, index) => (
          <InputField
            name={`${TaxRateFormNames.ClassRates}.${index}.${TaxRateClassFormNames.Rate}`}
            layout="vertical"
            type="number"
            min={0}
            max={100}
            step="any"
            containerClassName="mb-0"
            // Shrink the column to the input so the label follows it
            controlClassName="w-fit"
            className="w-[7.5rem]"
            afterFieldComponent={
              <span className={SUFFIX}>
                % for products marked as &quot;{row.className}&quot;
              </span>
            }
          />
        )}
      />
      <Link
        href={basicTaxTabRoute(BasicTaxTab.Classes)}
        className="w-fit text-[1.4rem] text-primary-blue hover:underline"
      >
        Configure tax classes
      </Link>
    </div>

    <InputField
      name={TaxRateFormNames.Priority}
      label="Calculation priority"
      layout="vertical"
      labelClassName={LABEL}
      type="number"
      min={0}
      controlClassName="max-w-[57rem]"
      afterFieldComponent={
        <HelpTooltip
          side="right"
          content={
            <div className="flex flex-col gap-1">
              <strong>Calculation Priority</strong>
              <p>
                Enter a number which represents the priority in which this tax
                rate should be calculated against other tax rates in this zone.
                For tax rates in this zone that share the same priority, tax
                calculations be added together. For tax rates in this zone with
                different priorities, the tax calculations will be compounded in
                order of the priority from the highest priority (lowest number),
                to the lowest priority (highest number).
              </p>
            </div>
          }
          iconClassName="fill-muted-plum-gray"
        />
      }
    />

    <InputField
      name={TaxRateFormNames.IsEnabled}
      Component={CheckboxField}
      text="Enable this tax rate"
      layout="vertical"
      className="text-[1.4rem]! text-muted-plum-gray"
    />
  </SettingsCard>
);

export default TaxRateFields;
