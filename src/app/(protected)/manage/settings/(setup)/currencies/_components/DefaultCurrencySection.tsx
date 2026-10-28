import Table from "@/components/ui/Table/Table";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { defaultCurrencyColumns } from "../columns";
import { DefaultCurrencySectionProps } from "./type";

const DefaultCurrencySection = ({
  currency,
  loading,
}: DefaultCurrencySectionProps) => (
  <SettingsCard title="Default Currency" className="border-0 shadow-sm">
    <Table
      data={currency ? [currency] : []}
      columns={defaultCurrencyColumns}
      getRowId={(row) => row.id}
      loading={loading}
      emptyMessage="No default currency set."
      selectable={false}
      hideRecordCount
      bare
    />
  </SettingsCard>
);

export default DefaultCurrencySection;
