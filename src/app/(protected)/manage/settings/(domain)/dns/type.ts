import type { DnsSettingsSchema } from "@/validations/formValidations";
import * as yup from "yup";

export interface DnsRecord {
  id: number;
  type: string;
  host: string;
  value: string;
  /** Seconds */
  ttl: number;
  /** Platform records (NS) shown read-only */
  isManaged: boolean;
}

export interface MailForward {
  displayAddress: string;
  forwardTo: string;
}

export interface DnsSettings {
  mailServerMode: string;
  mailForwards: MailForward[];
  records: DnsRecord[];
  zoneDetails: { refresh: number; retry: number; expire: number; minimum: number };
}

export type DnsSettingsFormValues = yup.InferType<typeof DnsSettingsSchema>;
export type MailForwardFormRow =
  DnsSettingsFormValues["mailServers"]["forwards"][number];
export type MxRecordFormRow =
  DnsSettingsFormValues["mailServers"]["mxRecords"][number];

export interface MxRecord {
  host: string;
  value: string;
  /** Seconds */
  ttl: number;
  priority: number;
}
export type WebHostRecordFormRow =
  DnsSettingsFormValues["webHosts"]["records"][number];

export interface DnsSettingsPayload {
  mailServerMode: string;
  mailForwards: MailForward[];
  mxRecords: MxRecord[];
  records: Omit<DnsRecord, "id" | "isManaged">[];
  zoneDetails: DnsSettings["zoneDetails"];
}
