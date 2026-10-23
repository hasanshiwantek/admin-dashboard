import { useAppSelector } from "@/hooks/useReduxHooks";
import { DnsSettingsSchema } from "@/validations/formValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { SETTINGS_ROUTE } from "../../(products)/constant";
import { getDnsRecordColumns, getMxRecordColumns } from "./columns";
import {
  defaultDnsRecords,
  DnsSection,
  dnsSettingsDefaults,
  DnsTab,
  dnsTabs,
  MailServerFormNames,
  newDnsRecord,
  newMailForward,
  newMxRecord,
  WebHostFormNames,
  zoneDetailDefaults,
} from "./constant";
import { DnsSettingsFormValues, WebHostRecordFormRow } from "./type";
import {
  fieldPath,
  getTabForErrors,
  toStoreDomain,
  transformGetDnsSettings,
  transformPostDnsSettings,
  withStoreDomain,
} from "./utils";

const FORWARDS_PATH = fieldPath(DnsSection.MailServers, MailServerFormNames.Forwards);
const RECORDS_PATH = fieldPath(DnsSection.WebHosts, WebHostFormNames.Records);
const MX_RECORDS_PATH = fieldPath(
  DnsSection.MailServers,
  MailServerFormNames.MxRecords,
);

const useDnsPageContainer = () => {
  const router = useRouter();
  const storeDomain = toStoreDomain(
    useAppSelector((state) => state.config.currentStore?.baseUrl),
  );

  // Plain tabs: they switch panels without changing the URL
  const [activeTab, setActiveTab] = useState<string>(DnsTab.MailServers);

  const form = useForm<DnsSettingsFormValues>({
    resolver: yupResolver(DnsSettingsSchema),
    defaultValues: dnsSettingsDefaults,
  });
  const { control, reset, setValue } = form;

  // Placeholder data until the DNS API is available
  useEffect(() => {
    reset(
      transformGetDnsSettings(
        withStoreDomain(defaultDnsRecords, storeDomain),
        [],
        dnsSettingsDefaults,
      ),
    );
  }, [storeDomain, reset]);

  const forwards = useFieldArray({ control, name: FORWARDS_PATH });
  const mxRecords = useFieldArray({ control, name: MX_RECORDS_PATH });
  const records = useFieldArray({ control, name: RECORDS_PATH });

  const mode = useWatch({
    control,
    name: fieldPath(DnsSection.MailServers, MailServerFormNames.Mode),
  });
  // useWatch can't resolve the value type of an enum-built path
  const recordValues = useWatch({ control, name: RECORDS_PATH }) as
    | WebHostRecordFormRow[]
    | undefined;

  const onSubmit = (values: DnsSettingsFormValues) =>
    // No DNS API yet: send this payload here
    transformPostDnsSettings(values);

  const onInvalid = (errors: FieldErrors<DnsSettingsFormValues>) => {
    const tab = getTabForErrors(errors);
    if (tab) setActiveTab(tab);
  };

  return {
    form,
    tabs: dnsTabs,
    activeTab,
    setActiveTab,
    storeDomain,
    mode: mode ?? "",
    forwardKeys: forwards.fields.map((field) => field.id),
    handleAddForward: () => forwards.append(newMailForward),
    handleRemoveForward: forwards.remove,
    mxRecords: mxRecords.fields.map((field) => ({
      ...newMxRecord,
      ...field,
      key: field.id,
    })),
    mxColumns: getMxRecordColumns({
      storeDomain,
      onRemove: mxRecords.remove,
    }),
    handleAddMxRecord: () => mxRecords.append(newMxRecord),
    // Each row's live values (type, managed) decide how its cells render
    records: records.fields.map((field, index) => ({
      ...newDnsRecord,
      ...field,
      ...recordValues?.[index],
      key: field.id,
    })),
    recordColumns: getDnsRecordColumns({ onRemove: records.remove }),
    handleAddRecord: () => records.append(newDnsRecord),
    handleRestoreZoneDefaults: () =>
      setValue(DnsSection.ZoneDetails, zoneDetailDefaults, {
        shouldDirty: true,
        shouldValidate: true,
      }),
    // Where the custom-domain setup lives isn't built yet
    handleMoveToCustomDomain: () => undefined,
    onSubmit,
    onInvalid,
    handleCancel: () => router.push(SETTINGS_ROUTE),
  };
};

export default useDnsPageContainer;
