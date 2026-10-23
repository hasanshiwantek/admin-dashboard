import HelpTooltip from "@/components/HelpTooltip/HelpTooltip";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { ColumnDef } from "@/components/ui/Table/types";
import { Check } from "lucide-react";
import Link from "next/link";
import { editLocationRoute } from "./constant";
import { Location } from "./type";
import { formatLocationRegion, getFlagUrl } from "./utils";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";

export const locationColumns: ColumnDef<Location>[] = [
  {
    key: "id",
    header: "Id",
    width: "150px",
    render: (location) => (
      <span className="text-[1.5rem]! text-text-heading!">{location.id}</span>
    ),
  },
  {
    key: "name",
    header: "Name",
    width: "250px",
    render: (location) => (
      <div className="flex items-center gap-3">
        <img
          src={getFlagUrl(location.countryCode)}
          alt={location.countryCode}
          className="h-6 w-9 object-cover"
        />
        <Link
          href={editLocationRoute(location.id)}
          className="text-[1.5rem]! text-primary-blue hover:underline"
        >
          {location.name}
        </Link>
      </div>
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (location) => (
      <div className="flex flex-col gap-1">
        <span className={CELL_TEXT}>{location.addressLine1},</span>
        <span className="text-[1.3rem]! text-muted-plum-gray!">
          {formatLocationRegion(location)}
        </span>
      </div>
    ),
  },
  {
    key: "isShippingOrigin",
    header: "Shipping Origin",
    width: "150px",
    headClassName: "text-center",
    className: "text-center",
    render: (location) =>
      location.isShippingOrigin && (
        <Check className="mx-auto size-8 text-text-heading" />
      ),
  },
  {
    key: "isEnabled",
    header: (
      <span className="flex items-center gap-2">
        Status
        <HelpTooltip content="Only enabled locations can stock inventory and fulfill orders." />
      </span>
    ),
    width: "180px",
    render: (location) => (
      <StatusBadge tone={location.isEnabled ? "success" : "neutral"}>
        {location.isEnabled ? "Enabled" : "Disabled"}
      </StatusBadge>
    ),
  },
];
