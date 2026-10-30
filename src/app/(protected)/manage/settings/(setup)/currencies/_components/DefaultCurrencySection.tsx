import Table from "@/components/ui/Table/Table";
import SectionCard from "@/components/SectionCard/SectionCard";
import { defaultCurrencyColumns } from "../columns";
import { DefaultCurrencySectionProps } from "./type";

const DefaultCurrencySection = ({
  currency,
  loading,
}: DefaultCurrencySectionProps) => (
  <SectionCard title="Default Currency" className="border-0 shadow-sm">
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
  </SectionCard>
);

export default DefaultCurrencySection;
