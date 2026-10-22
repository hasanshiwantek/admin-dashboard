import ActionButton from "@/components/ActionButton/ActionButton";
import { ActionItem } from "@/components/ActionButton/type";
import EnableDisable from "@/components/common/EnableDisable";
import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import { ColumnDef } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import { TaxZone } from "../type";
import { formatPriceDisplay } from "../utils";

const CELL_TEXT = "text-[1.4rem]! font-normal! text-text-heading!";

// The default zone can be edited but never deleted
const getZoneActions = (zone: TaxZone): ActionItem[] => [
  { type: ActionEnums.EDIT, label: "Edit" },
  { type: ActionEnums.EDIT_SETTINGS, label: "Edit settings" },
  { type: ActionEnums.EDIT_RATES, label: "Edit rates" },
  { type: ActionEnums.DUPLICATE, label: "Duplicate zone" },
  ...(zone.isDefault
    ? []
    : [{ type: ActionEnums.DELETE, label: "Delete" } as ActionItem]),
];

export const getTaxZoneColumns = ({
  onAction,
}: {
  onAction: (zone: TaxZone) => (action: ActionEnums) => void;
}): ColumnDef<TaxZone>[] => [
  {
    key: "name",
    header: "Zone name",
    render: (zone) => (
      <span className="flex items-center gap-2">
        <span className={CELL_TEXT}>{zone.name}</span>
        {zone.isDefault && (
          <>
            <span className="text-[1.2rem] text-muted-plum-gray">
              (everywhere else)
            </span>
            <HelpTooltip
              content="Applies to every customer whose address doesn't match another tax zone."
              iconClassName="fill-muted-plum-gray"
            />
          </>
        )}
      </span>
    ),
  },
  {
    key: "zoneType",
    header: "Zone type",
    width: "190px",
    render: (zone) => <span className={CELL_TEXT}>{zone.zoneType}</span>,
  },
  {
    key: "priceDisplay",
    header: "Price display",
    width: "230px",
    render: (zone) => (
      <span className={CELL_TEXT}>{formatPriceDisplay(zone)}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "150px",
    render: (zone) =>
      !zone.isDefault && (
        <EnableDisable
          enabled={zone.isEnabled}
          data={zone}
          handleToggle={() => null}
        />
      ),
  },
  {
    key: "actions",
    header: "Action",
    width: "100px",
    render: (zone) => (
      <ActionButton
        data={zone}
        actions={getZoneActions(zone)}
        onAction={onAction}
        label={`Actions for ${zone.name}`}
      />
    ),
  },
];
