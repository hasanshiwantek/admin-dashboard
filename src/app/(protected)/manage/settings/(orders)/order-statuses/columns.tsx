import InputField from "@/components/form/InputField";
import { ColumnDef } from "@/components/ui/Table/types";
import { OrderStatusRow } from "./type";
import { statusNamePath } from "./utils";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";
const CELL_PADDING = "px-8 py-6";
const HEAD_PADDING = "px-8 py-5";

export const getOrderStatusColumns = ({
  isEditing,
}: {
  isEditing: boolean;
}): ColumnDef<OrderStatusRow>[] => [
  {
    key: "name",
    header: "Status",
    width: "380px",
    className: CELL_PADDING,
    headClassName: HEAD_PADDING,
    render: (status, index) =>
      isEditing ? (
        <InputField
          name={statusNamePath(index)}
          layout="vertical"
          placeholder={status.defaultName}
          className="max-w-[80%]"
        />
      ) : (
        <span className={CELL_TEXT}>{status.name}</span>
      ),
  },
  {
    key: "description",
    header: "Status description",
    className: CELL_PADDING,
    headClassName: HEAD_PADDING,
    render: (status) => <span className={CELL_TEXT}>{status.description}</span>,
  },
];
