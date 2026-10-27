import type { SelectOption } from "@/components/ui/Select";
import type {
  DnsRecord,
  DnsSettingsFormValues,
  MailForwardFormRow,
  MxRecordFormRow,
  WebHostRecordFormRow,
} from "./type";

export const DNS_ROUTE = "/manage/settings/dns";
export const EXTERNAL_EMAIL_HOSTING_URL =
  "https://support.bigcommerce.com/s/article/Using-a-Custom-Email-Service";

// Shown until the store's own domain is known
export const FALLBACK_STORE_DOMAIN = "your-store.mybigcommerce.com";

export enum DnsTab {
  MailServers = "mail-servers",
  WebHosts = "web-hosts",
  ZoneDetails = "zone-details",
}

export const dnsTabs = [
  { key: DnsTab.MailServers, label: "Mail Servers" },
  { key: DnsTab.WebHosts, label: "Web Hosts" },
  { key: DnsTab.ZoneDetails, label: "Zone Details" },
];

// One form holds every tab; values are nested by section
export enum DnsSection {
  MailServers = "mailServers",
  WebHosts = "webHosts",
  ZoneDetails = "zoneDetails",
}

// The tab to open when a section has a validation error
export const SECTION_TAB: Record<DnsSection, DnsTab> = {
  [DnsSection.MailServers]: DnsTab.MailServers,
  [DnsSection.WebHosts]: DnsTab.WebHosts,
  [DnsSection.ZoneDetails]: DnsTab.ZoneDetails,
};

// ─── Mail servers ────────────────────────────────────────────
export enum MailServerMode {
  Forward = "forward",
  External = "external",
  GoogleSuite = "googleSuite",
}

export const mailServerModeOptions: SelectOption[] = [
  {
    value: MailServerMode.Forward,
    label: "I want to forward my shoppers' emails to a set of email addresses",
  },
  {
    value: MailServerMode.External,
    label: "I'm setting up an external email hosting solution",
  },
  {
    value: MailServerMode.GoogleSuite,
    label: "I want to use Google G Suite for emails sent to my store's domain",
  },
];

export enum MailServerFormNames {
  Mode = "mode",
  Forwards = "forwards",
  MxRecords = "mxRecords",
}

export enum MailForwardFormNames {
  DisplayAddress = "displayAddress",
  ForwardTo = "forwardTo",
}

export const newMailForward: MailForwardFormRow = {
  [MailForwardFormNames.DisplayAddress]: "",
  [MailForwardFormNames.ForwardTo]: "",
};

// MX records for an external email host ("external" mail option)
export enum MxRecordFormNames {
  Host = "host",
  Value = "value",
  Ttl = "ttl",
  Priority = "priority",
}

// MX rows live here, not in the Web Hosts record types
export const MX_RECORD_TYPE = "MX";
export const DEFAULT_MX_TTL = "86400";
// Sent when Priority is left blank; also its placeholder
export const DEFAULT_MX_PRIORITY = "10";

export const newMxRecord: MxRecordFormRow = {
  [MxRecordFormNames.Host]: "",
  [MxRecordFormNames.Value]: "",
  [MxRecordFormNames.Ttl]: DEFAULT_MX_TTL,
  [MxRecordFormNames.Priority]: "",
};

// ─── Web hosts (DNS records) ─────────────────────────────────
export enum DnsRecordType {
  A = "A",
  CNAME = "CNAME",
  TXT = "TXT",
  NS = "NS",
}

// NS records are managed by the platform, so they can't be picked for a new row
export const dnsRecordTypeOptions: SelectOption[] = [
  DnsRecordType.A,
  DnsRecordType.CNAME,
  DnsRecordType.TXT,
].map((type) => ({ value: type, label: type }));

// The words between host and value, e.g. "www.… is an alias of …"
export const DNS_RECORD_CONNECTOR: Record<DnsRecordType, string> = {
  [DnsRecordType.A]: "points to",
  [DnsRecordType.CNAME]: "is an alias of",
  [DnsRecordType.TXT]: "",
  [DnsRecordType.NS]: "is managed by",
};

export const DEFAULT_DNS_TTL = "900";

// The Web Hosts and MX tables hold form rows, not data rows: no row lines or
// hover, regular-weight inputs (globals.css bolds every input, Table's body
// is font-medium) and compact cells
export const DNS_FORM_TABLE_CLASS = [
  "[&_tr]:border-0! [&_tr]:hover:bg-transparent",
  "[&_th]:h-auto [&_th]:px-3 [&_th]:py-3 [&_th]:text-[1.4rem]! [&_th]:font-semibold",
  "[&_td]:px-3 [&_td]:py-2 [&_td]:align-middle [&_tbody]:font-normal",
  "[&_input]:font-normal! [&_textarea]:font-normal! [&_input]:text-text-heading [&_textarea]:text-text-heading",
].join(" ");

export enum WebHostFormNames {
  Records = "records",
}

export enum DnsRecordFormNames {
  RecordId = "recordId",
  Type = "type",
  Host = "host",
  Value = "value",
  Ttl = "ttl",
  IsManaged = "isManaged",
}

export const newDnsRecord: WebHostRecordFormRow = {
  [DnsRecordFormNames.RecordId]: "",
  [DnsRecordFormNames.Type]: DnsRecordType.A,
  [DnsRecordFormNames.Host]: "",
  [DnsRecordFormNames.Value]: "",
  [DnsRecordFormNames.Ttl]: DEFAULT_DNS_TTL,
  [DnsRecordFormNames.IsManaged]: false,
};

// ─── Zone details ────────────────────────────────────────────
export enum ZoneDetailFormNames {
  Refresh = "refresh",
  Retry = "retry",
  Expire = "expire",
  Minimum = "minimum",
}

// Seconds
export const zoneDetailDefaults = {
  [ZoneDetailFormNames.Refresh]: "10800",
  [ZoneDetailFormNames.Retry]: "3600",
  [ZoneDetailFormNames.Expire]: "604800",
  [ZoneDetailFormNames.Minimum]: "10800",
};

export const zoneDetailFields = [
  {
    name: ZoneDetailFormNames.Refresh,
    label: "Refresh",
    hint: "This is how often (in seconds) the slave name servers check with the primary name server to see if any changes have been made to the domain&rsquo;s zone file. The default value is three hours (10800 seconds)",
  },
  {
    name: ZoneDetailFormNames.Retry,
    label: "Retry",
    hint: "This is the time (in seconds) a slave (secondary) DNS server waits before retrying a failed zone transfer. This time is typically less than the refresh interval. Typical values vary from 180 (three minutes) to 900 (15 minutes). The default is one hour (3600 seconds).",
  },
  {
    name: ZoneDetailFormNames.Expire,
    label: "Expire",
    hint: "Indicates when the zone data is no longer authoritative. Applies to Slaves or Secondary servers only. The default value is one week (604800 seconds).",
  },
  {
    name: ZoneDetailFormNames.Minimum,
    label: "Minimum",
    hint: "This is the time (in seconds) during which a secondary server should cache a negative response. The maximum value allowed by BIND 9 for this parameter is 3 hours (10800 seconds). The default value is three hours (10800 seconds)",
  },
];

export const dnsSettingsDefaults: DnsSettingsFormValues = {
  [DnsSection.MailServers]: {
    [MailServerFormNames.Mode]: MailServerMode.Forward,
    [MailServerFormNames.Forwards]: [newMailForward],
    [MailServerFormNames.MxRecords]: [newMxRecord],
  },
  [DnsSection.WebHosts]: {
    [WebHostFormNames.Records]: [],
  },
  [DnsSection.ZoneDetails]: zoneDetailDefaults,
};

// Placeholders until the DNS API is available; `{domain}` is the store's
// domain, filled in by utils
export const defaultDnsRecords: DnsRecord[] = [
  {
    id: 1,
    type: DnsRecordType.TXT,
    host: "{domain}",
    value: '"v=spf1 +a +mx include:_spf.bigcommerce.com -all"',
    ttl: 900,
    isManaged: false,
  },
  {
    id: 2,
    type: DnsRecordType.NS,
    host: "{domain}",
    value: "ns1.bigcommerce.com",
    ttl: 900,
    isManaged: true,
  },
  {
    id: 3,
    type: DnsRecordType.NS,
    host: "{domain}",
    value: "ns2.bigcommerce.com",
    ttl: 900,
    isManaged: true,
  },
  {
    id: 4,
    type: DnsRecordType.CNAME,
    host: "www.{domain}",
    value: "{domain}",
    ttl: 900,
    isManaged: false,
  },
  {
    id: 5,
    type: DnsRecordType.NS,
    host: "{domain}",
    value: "ns3.bigcommerce.com",
    ttl: 900,
    isManaged: true,
  },
  {
    id: 6,
    type: DnsRecordType.TXT,
    host: "_dmarc.{domain}",
    value: '"v=DMARC1; p=none;"',
    ttl: 900,
    isManaged: false,
  },
  {
    id: 7,
    type: DnsRecordType.A,
    host: "{domain}",
    value: "63.141.128.23",
    ttl: 900,
    isManaged: false,
  },
];
