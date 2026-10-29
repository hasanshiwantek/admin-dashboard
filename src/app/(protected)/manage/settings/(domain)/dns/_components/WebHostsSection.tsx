import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import SectionCard from "@/components/SectionCard/SectionCard";
import SettingsNotice from "../../../_components/SettingsNotice";
import { DNS_FORM_TABLE_CLASS, EXTERNAL_EMAIL_HOSTING_URL } from "../constant";
import { WebHostsSectionProps } from "./type";

const WebHostsSection = ({
  records,
  columns,
  onAddRecord,
}: WebHostsSectionProps) => (
  <div className="flex flex-col gap-8">
    <div className="shadow-sm">
      <SettingsNotice tone="info">
        Learn how to set up an external email hosting solution.{" "}
        <a
          href={EXTERNAL_EMAIL_HOSTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-blue hover:underline"
        >
          Learn More
        </a>
      </SettingsNotice>
    </div>

    <SectionCard className="gap-2 border-0 p-10! shadow-sm">
      <Table
        data={records}
        columns={columns}
        getRowId={(record) => record.key}
        emptyMessage="No DNS records yet."
        selectable={false}
        hideRecordCount
        bare
        tableWrapperClassName={DNS_FORM_TABLE_CLASS}
      />
      <Button
        type="button"
        variant="link"
        onClick={onAddRecord}
        className="h-auto w-fit p-0 text-[1.4rem] text-primary-blue"
      >
        Add another
      </Button>
    </SectionCard>
  </div>
);

export default WebHostsSection;
