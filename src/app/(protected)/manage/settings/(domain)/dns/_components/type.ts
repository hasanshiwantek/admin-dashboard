import { ColumnDef } from "@/components/ui/Table/types";
import { MxRecordFormRow, WebHostRecordFormRow } from "../type";

export type DnsRecordRow = WebHostRecordFormRow & { key: string };
export type MxRecordRow = MxRecordFormRow & { key: string };

export interface MailServersSectionProps {
  mode: string;
  forwardKeys: string[];
  storeDomain: string;
  onAddForward: () => void;
  onRemoveForward: (index: number) => void;
  mxRecords: MxRecordRow[];
  mxColumns: ColumnDef<MxRecordRow>[];
  onAddMxRecord: () => void;
}

export interface ExternalEmailFieldsProps {
  records: MxRecordRow[];
  columns: ColumnDef<MxRecordRow>[];
  onAddRecord: () => void;
}

export interface MailForwardRowProps {
  index: number;
  storeDomain: string;
  canRemove: boolean;
  onRemove: (index: number) => void;
}

export interface WebHostsSectionProps {
  records: DnsRecordRow[];
  columns: ColumnDef<DnsRecordRow>[];
  onAddRecord: () => void;
}

export interface ZoneDetailsSectionProps {
  onRestoreDefaults: () => void;
}
