import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import SectionCard from "@/components/SectionCard/SectionCard";
import { LocationFormNames, LocationSection } from "../constant";
import { LocationDetailsSectionProps } from "./type";

const SUBHEADING = "text-[1.8rem]! font-normal text-text-heading!";
const HOURS_TABLE = "-mx-10 border-t border-border-light";
// Line the first/last columns up with the card's content padding
const HOURS_TABLE_CELLS = cn(
  "[&_th]:px-4 [&_th]:py-5 [&_td]:px-4 [&_td]:py-4",
  "[&_th:first-child]:pl-10 [&_td:first-child]:pl-10",
  "[&_th:last-child]:pr-10 [&_td:last-child]:pr-10",
);

const LocationDetailsSection = ({
  openingHours,
  openingHourColumns,
  specialHours,
  specialHourColumns,
  onAddSpecialHour,
}: LocationDetailsSectionProps) => (
  <SectionCard
    id={LocationSection.Details}
    title="Location details"
    description="Shoppers will see this information on the storefront location page."
    className="scroll-mt-6 pb-4"
  >
    <InputField
      name={LocationFormNames.ShowDetails}
      Component={CheckboxField}
      text="Show location details"
      layout="vertical"
      className="text-[1.5rem]! text-text-heading"
    />
    <InputField
      name={LocationFormNames.Description}
      label="Description"
      layout="vertical"
      hint="Additional details about this location that your customers should know."
      hintPosition="top"
      isTextArea
      className="min-h-[8rem] max-w-[41.6rem]"
    />

    <h3 className={SUBHEADING}>Opening hours</h3>
    <Table
      data={openingHours}
      columns={openingHourColumns}
      getRowId={(row) => row.day}
      selectable={false}
      hideRecordCount
      bare
      className={HOURS_TABLE}
      tableWrapperClassName={HOURS_TABLE_CELLS}
    />

    <div>
      <h3 className={SUBHEADING}>Special hours</h3>
      <p className="mt-2 text-[1.4rem]! text-muted-plum-gray!">
        Customize hours at this location for special events or public holidays.
      </p>
    </div>
    {specialHours.length > 0 && (
      <Table
        data={specialHours}
        columns={specialHourColumns}
        getRowId={(row) => row.id}
        selectable={false}
        hideRecordCount
        bare
        className={HOURS_TABLE}
        tableWrapperClassName={HOURS_TABLE_CELLS}
      />
    )}
    <Button
      type="button"
      variant="link"
      onClick={onAddSpecialHour}
      className="w-fit gap-2 px-0 text-[1.4rem] text-primary-blue"
    >
      <Plus className="size-6" />
      Add special hours
    </Button>
  </SectionCard>
);

export default LocationDetailsSection;
