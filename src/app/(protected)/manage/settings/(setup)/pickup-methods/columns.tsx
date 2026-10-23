import ActionButton from "@/components/ActionButton/ActionButton";
import { ActionItem } from "@/components/ActionButton/type";
import { ColumnDef } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { editPickupMethodRoute } from "./constant";
import { PickupMethodRow } from "./type";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";
const ACTION_LABEL = "flex items-center gap-3";
const ACTION_ICON = "size-6 text-muted-plum-gray";

export const pickupMethodActions: ActionItem[] = [
  {
    type: ActionEnums.EDIT,
    label: (
      <span className={ACTION_LABEL}>
        <Pencil className={ACTION_ICON} />
        Edit
      </span>
    ),
  },
  {
    type: ActionEnums.DELETE,
    label: (
      <span className={ACTION_LABEL}>
        <Trash2 className={ACTION_ICON} />
        Delete
      </span>
    ),
  },
];

export const getPickupMethodColumns = ({
  onAction,
}: {
  onAction: (row: PickupMethodRow) => (action: ActionEnums) => void;
}): ColumnDef<PickupMethodRow>[] => [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (method) => (
      <Link
        href={editPickupMethodRoute(method.id)}
        className="text-[1.5rem]! text-primary-blue hover:underline"
      >
        {method.name}
      </Link>
    ),
  },
  {
    key: "locationName",
    header: "Location",
    render: (method) => (
      <span className={CELL_TEXT}>{method.locationName}</span>
    ),
  },
  {
    key: "actions",
    width: "80px",
    render: (method) => (
      <ActionButton
        data={method}
        actions={pickupMethodActions}
        onAction={onAction}
        label={`Actions for ${method.name}`}
      />
    ),
  },
];
