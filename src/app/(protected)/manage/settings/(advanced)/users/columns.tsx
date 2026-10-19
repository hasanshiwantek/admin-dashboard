import { Button } from "@/components/ui/button";
import { ColumnDef } from "@/components/ui/Table/types";
import { DateTimeFormat, UserRoles } from "@/const/appConstants";
import { formatDateTime } from "@/lib/utils";
import DeleteUserModal from "@/Modals/SettingsModals/DeleteUserModal/DeleteUserModal";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { editUserRoute } from "../constant";
import { AdminUserRow } from "./type";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";

export const getUserColumns = ({
  onUserDeleted,
}: {
  onUserDeleted: () => void;
}): ColumnDef<AdminUserRow>[] => [
  {
    key: "name",
    header: "Name",
    width: "180px",
    render: (user) => (
      <span className={`${CELL_TEXT} capitalize`}>{user.name || "-"}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (user) => <span className={CELL_TEXT}>{user.email}</span>,
  },
  {
    key: "userRole",
    header: "User Role",
    render: (user) => (
      <span className={CELL_TEXT}>
        {UserRoles[user.userRole as keyof typeof UserRoles] || "-"}
      </span>
    ),
  },
  {
    key: "created_at",
    header: "Date",
    width: "260px",
    render: (user) => (
      <span className={CELL_TEXT}>
        {user.created_at
          ? formatDateTime(user.created_at, DateTimeFormat.ORDINAL_DATE_TIME)
          : "-"}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    width: "110px",
    headClassName: "text-center",
    render: (user) => (
      <div className="flex items-center justify-center gap-2">
        <Button asChild variant="ghost" size="icon" title="Edit">
          <Link href={editUserRoute(user.id)}>
            <Pencil className="text-primary-blue" />
          </Link>
        </Button>
        <DeleteUserModal
          user={{ id: user.id, name: user.name }}
          onDeleted={onUserDeleted}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Delete"
              className="hover:bg-red-50"
            >
              <Trash2 className="text-danger-red" />
            </Button>
          }
        />
      </div>
    ),
  },
];
