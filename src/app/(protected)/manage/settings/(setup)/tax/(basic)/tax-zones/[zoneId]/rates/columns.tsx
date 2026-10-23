import ActionButton from "@/components/ActionButton/ActionButton";
import EnableDisable from "@/components/common/EnableDisable";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { ColumnDef } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import { taxRateActions } from "../../constant";
import { TaxRateRow } from "../../type";

const CELL_TEXT = "text-[1.4rem]! font-normal! text-text-heading!";
const LINES = "items-start! space-y-0! gap-5 p-0!";

export const getTaxRateColumns = ({
  onAction,
}: {
  onAction: (rate: TaxRateRow) => (action: ActionEnums) => void;
}): ColumnDef<TaxRateRow>[] => [
  {
    key: "name",
    header: "Name",
    className: "align-top",
    render: (rate) => <span className={CELL_TEXT}>{rate.name}</span>,
  },
  {
    key: "className",
    header: "Class name",
    width: "240px",
    className: "align-top",
    render: (rate) => (
      <ListRenderer
        data={rate.classLines}
        keyExtractor={(line) => line.key}
        className={LINES}
        renderItem={(line) => (
          <span className={CELL_TEXT}>{line.className}</span>
        )}
      />
    ),
  },
  {
    key: "rates",
    header: "Rates",
    width: "120px",
    className: "align-top",
    render: (rate) => (
      <ListRenderer
        data={rate.classLines}
        keyExtractor={(line) => line.key}
        className={LINES}
        renderItem={(line) => <span className={CELL_TEXT}>{line.rate}</span>}
      />
    ),
  },
  {
    key: "priority",
    header: "Calculation priority",
    width: "200px",
    className: "align-top",
    render: (rate) => <span className={CELL_TEXT}>{rate.priority}</span>,
  },
  {
    key: "status",
    header: "Status",
    width: "120px",
    className: "align-top",
    render: (rate) => (
      <EnableDisable
        enabled={rate.isEnabled}
        data={rate}
        handleToggle={() => null}
      />
    ),
  },
  {
    key: "actions",
    header: "Action",
    width: "100px",
    className: "align-top",
    render: (rate) => (
      <ActionButton
        data={rate}
        actions={taxRateActions}
        onAction={onAction}
        label={`Actions for ${rate.name}`}
      />
    ),
  },
];
