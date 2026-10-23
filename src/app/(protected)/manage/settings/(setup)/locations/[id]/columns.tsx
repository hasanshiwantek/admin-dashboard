import CheckboxField from "@/components/form/fields/CheckboxField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@/components/ui/Table/types";
import { X } from "lucide-react";
import TimeField from "../_components/TimeField";
import { SpecialHourRow } from "../_components/type";
import {
  LocationFormNames,
  OpeningHourFormNames,
  SpecialHourFormNames,
} from "../constant";
import { OpeningHour } from "../type";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";
const FIELD = "mb-0";

const openingHourField = (index: number, field: OpeningHourFormNames) =>
  `${LocationFormNames.OpeningHours}.${index}.${field}`;
const specialHourField = (index: number, field: SpecialHourFormNames) =>
  `${LocationFormNames.SpecialHours}.${index}.${field}`;

export const openingHourColumns: ColumnDef<OpeningHour>[] = [
  {
    key: "day",
    header: "Day",
    render: (row) => <span className={CELL_TEXT}>{row.day}</span>,
  },
  {
    key: "open",
    header: "Open",
    width: "180px",
    render: (_, index) => (
      <InputField
        name={openingHourField(index, OpeningHourFormNames.Open)}
        Component={CheckboxField}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "opening",
    header: "Opening",
    width: "190px",
    render: (row, index) => (
      <InputField
        name={openingHourField(index, OpeningHourFormNames.Opening)}
        Component={TimeField}
        disabled={!row.open}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "closing",
    header: "Closing",
    width: "190px",
    render: (row, index) => (
      <InputField
        name={openingHourField(index, OpeningHourFormNames.Closing)}
        Component={TimeField}
        disabled={!row.open}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
];

export const getSpecialHourColumns = ({
  onRemove,
}: {
  onRemove: (index: number) => void;
}): ColumnDef<SpecialHourRow>[] => [
  {
    key: "name",
    header: "Name",
    render: (_, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.Name)}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "date",
    header: "Date",
    width: "150px",
    render: (_, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.Date)}
        type="date"
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "open",
    header: "Open",
    width: "70px",
    render: (_, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.Open)}
        Component={CheckboxField}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "allDay",
    header: "All day",
    width: "80px",
    render: (_, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.AllDay)}
        Component={CheckboxField}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "opening",
    header: "Opening",
    width: "170px",
    render: (row, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.Opening)}
        Component={TimeField}
        disabled={row.allDay}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "closing",
    header: "Closing",
    width: "170px",
    render: (row, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.Closing)}
        Component={TimeField}
        disabled={row.allDay}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "annual",
    header: "Annual",
    width: "80px",
    render: (_, index) => (
      <InputField
        name={specialHourField(index, SpecialHourFormNames.Annual)}
        Component={CheckboxField}
        layout="vertical"
        containerClassName={FIELD}
      />
    ),
  },
  {
    key: "remove",
    width: "60px",
    render: (row, index) => (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Remove ${row.name || "special hours"}`}
        onClick={() => onRemove(index)}
      >
        <X className="size-7 text-text-heading" />
      </Button>
    ),
  },
];
