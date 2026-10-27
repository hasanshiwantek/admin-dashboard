import { DateTimeFormat } from "@/const/appConstants";
import type { ColumnDef } from "@/components/ui/Table/types";
import { formatDateTime } from "@/lib/utils";
import { ScriptRecord } from "./type";
import { REGEX } from "@/const/regex";

const scriptColumns: ColumnDef<ScriptRecord>[] = [
  {
    key: "script_name",
    header: "Name",
    sortable: true,
    className: "font-medium",
    render: (script) => script.script_name || "Untitled Script",
  },
  {
    key: "location",
    header: "Location",
    sortable: true,
    className: "capitalize",
    render: (script) =>
      script.location?.replace(REGEX.UPPERCASE_LETTER, " $1").trim() || "N/A",
  },
  {
    key: "placement",
    header: "Placement",
    sortable: true,
    className: "capitalize",
    render: (script) => script.placement || "N/A",
  },
  {
    key: "script_type",
    header: "Type",
    sortable: true,
    className: "uppercase",
    render: (script) => script.script_type || "N/A",
  },
  {
    key: "created_at",
    header: "Date installed",
    sortable: true,
    render: (script) =>
      formatDateTime(script.created_at, DateTimeFormat.SHORT_DATE),
  },
];

export default scriptColumns;
