import { DateTimeFormat } from "@/const/appConstants";
import type { ColumnDef } from "@/components/ui/Table/types";
import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import { ScriptRecord } from "./type";
import { REGEX } from "@/const/regex";

const scriptColumns: ColumnDef<ScriptRecord>[] = [
  {
    key: "scriptName",
    header: "Name",
    sortable: true,
    className: "font-medium",
    render: (script) => replaceNullWithPlaceholder(script.scriptName),
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
    key: "scriptType",
    header: "Type",
    sortable: true,
    className: "uppercase",
    render: (script) => replaceNullWithPlaceholder(script.scriptType),
  },
  {
    key: "createdAt",
    header: "Date installed",
    sortable: true,
    render: (script) =>
      formatDateTime(script?.createdAt, DateTimeFormat.SHORT_DATE),
  },
];

export default scriptColumns;
