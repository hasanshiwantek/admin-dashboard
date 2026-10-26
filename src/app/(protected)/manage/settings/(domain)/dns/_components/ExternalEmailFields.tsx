import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import SettingsNotice from "../../../_components/SettingsNotice";
import { DNS_FORM_TABLE_CLASS, EXTERNAL_EMAIL_HOSTING_URL } from "../constant";
import { ExternalEmailFieldsProps } from "./type";

// Opens under the "external email hosting" option
const ExternalEmailFields = ({
  records,
  columns,
  onAddRecord,
}: ExternalEmailFieldsProps) => (
  <div className="flex flex-col gap-5 pt-2 pb-4 pl-12">
    <div className="shadow-sm">
      <SettingsNotice tone="info">
        <span className="flex flex-wrap items-center gap-2">
          Learn how to set up an external email hosting solution.
          <Button variant="primary" asChild size="sm" className="h-auto py-2">
            <a
              href={EXTERNAL_EMAIL_HOSTING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </Button>
        </span>
      </SettingsNotice>
    </div>

    <Table
      data={records}
      columns={columns}
      getRowId={(record) => record.key}
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
  </div>
);

export default ExternalEmailFields;
