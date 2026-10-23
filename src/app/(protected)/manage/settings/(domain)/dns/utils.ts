import { FieldErrors } from "react-hook-form";
import {
  DEFAULT_MX_PRIORITY,
  DnsSection,
  DnsTab,
  FALLBACK_STORE_DOMAIN,
  MailServerMode,
  SECTION_TAB,
} from "./constant";
import type {
  DnsRecord,
  DnsSettingsFormValues,
  DnsSettingsPayload,
  MailForward,
} from "./type";

// "https://test-ecom-store.mybigcommerce.com/" → "test-ecom-store.mybigcommerce.com"
export const toStoreDomain = (baseUrl?: string | null) => {
  if (!baseUrl) return FALLBACK_STORE_DOMAIN;
  try {
    return new URL(baseUrl).hostname;
  } catch {
    return baseUrl.replace(/^https?:\/\//, "").split("/")[0] || FALLBACK_STORE_DOMAIN;
  }
};

// Full form path for a field, e.g. fieldPath("zoneDetails", "refresh")
export const fieldPath = <S extends DnsSection, F extends string>(
  section: S,
  field: F,
) => `${section}.${field}` as const;

export const getTabForErrors = (
  errors: FieldErrors<DnsSettingsFormValues>,
): DnsTab | undefined => {
  const section = Object.keys(errors)[0] as DnsSection | undefined;
  return section && SECTION_TAB[section];
};

// Fills the placeholder records' `{domain}` with the store's domain
export const withStoreDomain = (records: DnsRecord[], domain: string) =>
  records.map((record) => ({
    ...record,
    host: record.host.replace("{domain}", domain),
    value: record.value.replace("{domain}", domain),
  }));

export const transformGetDnsSettings = (
  records: DnsRecord[],
  forwards: MailForward[],
  current: DnsSettingsFormValues,
): DnsSettingsFormValues => ({
  ...current,
  mailServers: {
    ...current.mailServers,
    forwards: forwards.length ? forwards : current.mailServers.forwards,
  },
  webHosts: {
    records: records.map((record) => ({
      recordId: String(record.id),
      type: record.type,
      host: record.host,
      value: record.value,
      ttl: String(record.ttl),
      isManaged: record.isManaged,
    })),
  },
});

export const transformPostDnsSettings = (
  values: DnsSettingsFormValues,
): DnsSettingsPayload => ({
  mailServerMode: values.mailServers.mode,
  mailForwards:
    values.mailServers.mode === MailServerMode.Forward
      ? values.mailServers.forwards
      : [],
  mxRecords:
    values.mailServers.mode === MailServerMode.External
      ? values.mailServers.mxRecords.map((record) => ({
          host: record.host,
          value: record.value,
          ttl: Number(record.ttl),
          priority: Number(record.priority || DEFAULT_MX_PRIORITY),
        }))
      : [],
  // Managed NS records belong to the platform and are never sent
  records: values.webHosts.records
    .filter((record) => !record.isManaged)
    .map((record) => ({
      type: record.type,
      host: record.host,
      value: record.value,
      ttl: Number(record.ttl),
    })),
  zoneDetails: {
    refresh: Number(values.zoneDetails.refresh),
    retry: Number(values.zoneDetails.retry),
    expire: Number(values.zoneDetails.expire),
    minimum: Number(values.zoneDetails.minimum),
  },
});
