import ActionButton from "@/components/ActionButton/ActionButton";
import { ColumnDef } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import { Settings } from "lucide-react";
import Link from "next/link";
import { BRAND_ROW_ACTIONS, editBrandRoute } from "./constant";
import type { BrandRow } from "./type";

export const getBrandColumns = ({
  onAction,
}: {
  onAction: (brand: BrandRow) => (action: ActionEnums) => void;
}): ColumnDef<BrandRow>[] => [
  {
    key: "name",
    header: "Brand Name",
    headClassName: "2xl:text-[1.6rem]!",
    render: (brand) => (
      <Link
        href={editBrandRoute(brand.id)}
        className="text-blue-600! hover:border-b-2 hover:border-b-blue-600 2xl:text-2xl!"
      >
        {brand.name}
      </Link>
    ),
  },
  {
    key: "productsCount",
    header: "Products",
    headClassName: "2xl:text-[1.6rem]!",
    className: "2xl:text-2xl!",
  },
  {
    key: "actions",
    header: "Action",
    headClassName: "2xl:text-[1.6rem]!",
    render: (brand) => (
      <ActionButton
        data={brand}
        actions={BRAND_ROW_ACTIONS}
        onAction={onAction}
        label={`Actions for ${brand.name}`}
        icon={<Settings className="size-6! text-gray-500" />}
        align="end"
      />
    ),
  },
];
