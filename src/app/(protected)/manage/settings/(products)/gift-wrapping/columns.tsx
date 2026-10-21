import EnableDisable from "@/components/common/EnableDisable";
import { ColumnDef } from "@/components/ui/Table/types";
import { Tag } from "lucide-react";
import { GiftWrapping } from "./type";
import { formatGiftWrappingPrice } from "./utils";

const CELL_TEXT = "text-[1.5rem]! font-normal! text-text-heading!";

export const giftWrappingColumns: ColumnDef<GiftWrapping>[] = [
  {
    key: "icon",
    width: "50px",
    render: () => <Tag className="size-[1.6rem] text-green-600" />,
  },
  {
    key: "name",
    header: "Name",
    render: (giftWrapping) => (
      <span className={CELL_TEXT}>{giftWrapping.name}</span>
    ),
  },
  {
    key: "price",
    header: "Price",
    width: "180px",
    render: (giftWrapping) => (
      <span className={CELL_TEXT}>
        {formatGiftWrappingPrice(giftWrapping.price)}
      </span>
    ),
  },
  {
    key: "isVisible",
    header: "Visible",
    width: "100px",
    render: (giftWrapping) => (
      <EnableDisable
        data={giftWrapping}
        enabled={!!giftWrapping?.isVisible}
        handleToggle={() => null}
      />
    ),
  },
  {
    key: "id",
    header: "ID",
    width: "80px",
    render: (giftWrapping) => (
      <span className={CELL_TEXT}>{giftWrapping.id}</span>
    ),
  },
];
