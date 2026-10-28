import { DateTimeFormat } from "@/const/appConstants";
import type { ColumnDef } from "@/components/ui/Table/types";
import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import { ScriptRecord } from "./type";
import { REGEX } from "@/const/regex";

const scriptColumns: ColumnDef<ScriptRecord>[] = [
  {
    key: "script_name",
    header: "Name",
    sortable: true,
    className: "font-medium",
    render: (script) => replaceNullWithPlaceholder(script.script_name),
  },
  {
    key: "location",
    header: "Location",
    sortable: true,
    className: "capitalize",
    render: (script) =>
      replaceNullWithPlaceholder(
        script.location?.replace(REGEX.UPPERCASE_LETTER, " $1").trim(),
      ),
  },
  {
    key: "placement",
    header: "Placement",
    sortable: true,
    className: "capitalize",
    render: (script) => replaceNullWithPlaceholder(script.placement),
  },
  {
    key: "script_type",
    header: "Type",
    sortable: true,
    className: "uppercase",
    render: (script) => replaceNullWithPlaceholder(script.script_type),
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
