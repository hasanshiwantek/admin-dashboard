import { ColumnDef } from "@/components/ui/Table/types";
import { Pencil } from "lucide-react";
import { StaffLog } from "./type";

const CELL_TEXT = "text-[1.3rem]! text-gray-900!";

export const staffLogColumns: ColumnDef<StaffLog>[] = [
  {
    key: "icon",
    width: "50px",
    render: () => <Pencil size={13} strokeWidth={1.8} className="text-gray-400" />,
  },
  {
    key: "username",
    header: "Username",
    render: (log) => <span className={`${CELL_TEXT} break-all`}>{log.username}</span>,
  },
  {
    key: "action",
    header: "Action",
    render: (log) => (
      <span className={`${CELL_TEXT} whitespace-normal break-words`}>
        {log.action}
      </span>
    ),
  },
  {
    key: "date",
    header: "Date",
    width: "260px",
    render: (log) => <span className={CELL_TEXT}>{log.date}</span>,
  },
  {
    key: "ip_address",
    header: "IP Address",
    width: "180px",
    render: (log) => <span className={CELL_TEXT}>{log.ip_address}</span>,
  },
];
