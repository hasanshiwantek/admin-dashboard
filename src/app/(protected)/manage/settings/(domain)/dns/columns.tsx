import { SelectField } from "@/components/form/fields/SelectField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@/components/ui/Table/types";
import { X } from "lucide-react";
import { DnsRecordRow, MxRecordRow } from "./_components/type";
import {
  DEFAULT_MX_PRIORITY,
  DNS_RECORD_CONNECTOR,
  DnsRecordFormNames,
  DnsRecordType,
  dnsRecordTypeOptions,
  DnsSection,
  MailServerFormNames,
  MX_RECORD_TYPE,
  MxRecordFormNames,
  WebHostFormNames,
} from "./constant";

const CELL_TEXT = "text-[1.4rem]! text-text-heading!";
const FIELD = "mb-0";
// Managed (NS) rows are read-only and greyed like the screenshot
const MANAGED =
  "disabled:bg-gray-100 disabled:text-gray-500! disabled:opacity-100";

const recordField = (index: number, field: DnsRecordFormNames) =>
  `${DnsSection.WebHosts}.${WebHostFormNames.Records}.${index}.${field}`;

const mxField = (index: number, field: MxRecordFormNames) =>
  `${DnsSection.MailServers}.${MailServerFormNames.MxRecords}.${index}.${field}`;

// MX rows for an external email host; the first row can't be removed
export const getMxRecordColumns = ({
  storeDomain,
  onRemove,
}: {
  storeDomain: string;
  onRemove: (index: number) => void;
}): ColumnDef<MxRecordRow>[] => [
  {
    key: "type",
    header: "Type",
    width: "50px",
    render: () => <span className={CELL_TEXT}>{MX_RECORD_TYPE}</span>,
  },
  {
    key: "host",
    header: "Fully Qualified Host",
    render: (_, index) => (
      <InputField
        name={mxField(index, MxRecordFormNames.Host)}
        layout="vertical"
        placeholder={`e.g. ${storeDomain}`}
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  {
    key: "connector",
    width: "130px",
    render: () => <span className={CELL_TEXT}>Mail handled by</span>,
  },
  {
    key: "value",
    header: "Value",
    render: (_, index) => (
      <InputField
        name={mxField(index, MxRecordFormNames.Value)}
        layout="vertical"
        placeholder="e.g. mail.exampledomain.com"
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  {
    key: "ttl",
    header: "Time to live",
    width: "100px",
    render: (_, index) => (
      <InputField
        name={mxField(index, MxRecordFormNames.Ttl)}
        layout="vertical"
        type="number"
        min={1}
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  {
    key: "priority",
    header: "Priority",
    width: "100px",
    render: (_, index) => (
      <InputField
        name={mxField(index, MxRecordFormNames.Priority)}
        layout="vertical"
        type="number"
        min={0}
        placeholder={DEFAULT_MX_PRIORITY}
        containerClassName={FIELD}
        className="max-w-none"
      />
    ),
  },
  {
    key: "remove",
    width: "50px",
    render: (_, index) =>
      index > 0 && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Remove this MX record"
          onClick={() => onRemove(index)}
        >
          <X className="size-6 text-primary-blue" />
        </Button>
      ),
  },
];

export const getDnsRecordColumns = ({
  onRemove,
}: {
  onRemove: (index: number) => void;
}): ColumnDef<DnsRecordRow>[] => [
  {
    key: "type",
    header: "Type",
    width: "170px",
    render: (row, index) =>
      row.isManaged ? (
        <span className="pl-2 text-[1.4rem] text-primary-blue">{row.type}</span>
      ) : (
        <InputField
          name={recordField(index, DnsRecordFormNames.Type)}
          layout="vertical"
          Component={SelectField}
          options={dnsRecordTypeOptions}
          containerClassName={FIELD}
          className="max-w-none"
        />
      ),
  },
  {
    key: "host",
    header: "Fully Qualified Host",
    render: (row, index) => (
      <InputField
        name={recordField(index, DnsRecordFormNames.Host)}
        layout="vertical"
        disabled={row.isManaged}
        containerClassName={FIELD}
        className={`max-w-none ${MANAGED}`}
      />
    ),
  },
  {
    key: "connector",
    width: "120px",
    render: (row) => (
      <span className={CELL_TEXT}>
        {DNS_RECORD_CONNECTOR[row.type as DnsRecordType] ?? ""}
      </span>
    ),
  },
  {
    key: "value",
    header: "Value",
    width: "290px",
    render: (row, index) => (
      <InputField
        name={recordField(index, DnsRecordFormNames.Value)}
        layout="vertical"
        // TXT values are long quoted strings, so they get a text area
        isTextArea={row.type === DnsRecordType.TXT}
        disabled={row.isManaged}
        containerClassName={FIELD}
        className={`max-w-none ${MANAGED} ${
          row.type === DnsRecordType.TXT ? "min-h-[5.4rem]" : ""
        }`}
      />
    ),
  },
  {
    key: "ttl",
    header: "Time to live",
    width: "95px",
    render: (row, index) => (
      <InputField
        name={recordField(index, DnsRecordFormNames.Ttl)}
        layout="vertical"
        type="number"
        min={1}
        disabled={row.isManaged}
        containerClassName={FIELD}
        className={`max-w-none ${MANAGED}`}
      />
    ),
  },
  {
    key: "remove",
    width: "50px",
    render: (row, index) =>
      !row.isManaged && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Remove this record"
          onClick={() => onRemove(index)}
        >
          <X className="size-6 text-primary-blue" />
        </Button>
      ),
  },
];
