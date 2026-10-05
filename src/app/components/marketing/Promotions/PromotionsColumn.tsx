import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@/components/ui/Table/types";
import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  PROMOTION_TYPE_META,
  PromotionDisplay,
  PromotionStatus,
} from "./constant";
import { DiscountToggleStatus, Promotion } from "./types";

type ColumnsProps = {
  display: PromotionDisplay;
  usesHeader: string;
  onEdit: (promotion: Promotion) => string;
  onToggleActive: (promotion: Promotion, status: DiscountToggleStatus) => void;
};

const CellClass = "2xl:!text-[1.6rem] px-2 py-4";

const DateCell = ({ value }: { value: string | null }) =>
  value ? (
    <div className="flex flex-col gap-1">
      <div>{formatDateTime(value, DateTimeFormat.DAY_SHORT_DATE)}</div>
      <div>{formatDateTime(value, DateTimeFormat.TIME_12H)}</div>
    </div>
  ) : (
    "Not set"
  );

const PromotionsColumn = ({
  display,
  usesHeader,
  onEdit,
  onToggleActive,
}: ColumnsProps): ColumnDef<Promotion>[] => [
  {
    key: "name",
    header: "Name",
    sortable: true,
    className: CellClass,
    render: (promotion) => (
      <Link href={onEdit(promotion)} className="underline">
        {promotion.name}
      </Link>
    ),
  },
  ...(display === PromotionDisplay.Coupon
    ? [
        {
          key: "code",
          header: "Coupon code",
          className: CellClass,
          render: (promotion: Promotion) => promotion.code ?? "-",
        },
      ]
    : []),
  {
    key: "currency",
    header: "Currency",
    className: CellClass,
  },
  {
    key: "type",
    header: "Type",
    className: CellClass,
    render: (promotion) => {
      const meta = PROMOTION_TYPE_META[promotion.type];
      const Icon = meta?.icon ?? ShoppingCart;
      return (
        <span title={meta?.label}>
          <Icon className="w-8 h-8 text-gray-800" />
        </span>
      );
    },
  },
  {
    key: "uses",
    header: usesHeader,
    className: CellClass,
    render: (promotion) => promotion.usesLabel,
  },
  {
    key: "startDate",
    header: "Start",
    sortable: true,
    className: CellClass,
    render: (promotion) => <DateCell value={promotion.startDate} />,
  },
  {
    key: "endDate",
    header: "End",
    sortable: true,
    className: CellClass,
    render: (promotion) => <DateCell value={promotion.endDate} />,
  },
  {
    key: "active",
    header: "Active",
    className: CellClass,
    render: (promotion) => (
      <Switch
        checked={promotion.active}
        disabled={promotion.status === "archived"}
        onCheckedChange={(checked) =>
          onToggleActive(
            promotion,
            checked ? PromotionStatus.Active : PromotionStatus.Inactive,
          )
        }
      />
    ),
  },
];

export default PromotionsColumn;
