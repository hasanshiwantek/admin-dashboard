import FeaturedToggle from "@/app/components/dropdowns/FeaturedToggle";
import VisibilityToggle from "@/app/components/dropdowns/VisibilityToggle";
import ActionButton from "@/components/ActionButton/ActionButton";
import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@/components/ui/Table/types";
import { ActionEnums } from "@/const/appConstants";
import EditProductPricesSheet from "@/Modals/ProductModals/EditProductPricesSheet/EditProductPricesSheet";
import EditProductStockSheet from "@/Modals/ProductModals/EditProductStockSheet/EditProductStockSheet";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { editProductRoute, PRODUCT_ROW_ACTIONS } from "./constant";
import type { ProductCurrency, ProductListItem } from "./type";
import {
  formatPrice,
  getCategoryNames,
  getProductThumbnail,
  isFlagOn,
} from "./utils";

const CELL_TEXT = "text-xl 2xl:text-[1.6rem]!";

// A value that opens its quick-edit sheet when clicked
const EditableValue = ({ value }: { value: string }) => (
  <Button
    type="button"
    variant="ghost"
    className="group h-auto gap-2 rounded-md p-4 font-normal hover:bg-blue-100 hover:text-blue-600"
  >
    <span className={CELL_TEXT}>{value}</span>
    <Pencil className="size-5 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
  </Button>
);

export const getProductColumns = ({
  currency,
  storeName,
  onAction,
  onToggleFeatured,
  onToggleVisibility,
  onSaved,
}: {
  currency: ProductCurrency;
  storeName?: string;
  onAction: (product: ProductListItem) => (action: ActionEnums) => void;
  onToggleFeatured: (id: number, featured: boolean) => void;
  onToggleVisibility: (id: number, visible: boolean) => void;
  onSaved: () => void;
}): ColumnDef<ProductListItem>[] => [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (product) => (
      <div className="flex min-w-[28rem] max-w-[42rem] items-center gap-2">
        <Image
          src={getProductThumbnail(product)}
          alt={product.name}
          width={60}
          height={60}
          className="h-24 w-28 shrink-0 rounded border! border-gray-300! object-contain p-2"
        />
        <Link
          href={editProductRoute(product.id)}
          className="max-w-[35rem] whitespace-normal break-words text-xl! font-medium! capitalize leading-snug text-blue-600! hover:underline 2xl:text-[1.6rem]!"
        >
          {product.name}
        </Link>
      </div>
    ),
  },
  {
    key: "featured",
    header: "",
    className: "relative mx-4",
    render: (product) => (
      <FeaturedToggle
        productId={product.id}
        isFeatured={isFlagOn(product.isFeatured)}
        onChange={onToggleFeatured}
      />
    ),
  },
  {
    key: "sku",
    header: "SKU",
    className: CELL_TEXT,
    sortable: true,
  },
  {
    key: "categories",
    header: "Categories",
    className: `max-w-[30rem] whitespace-normal break-words leading-snug ${CELL_TEXT}`,
    render: getCategoryNames,
  },
  {
    key: "currentStock",
    header: "Current stock",
    sortable: true,
    render: (product) => (
      <EditProductStockSheet
        product={product}
        onSaved={onSaved}
        trigger={<EditableValue value={String(product.currentStock ?? 0)} />}
      />
    ),
  },
  {
    key: "price",
    header: "Price",
    sortable: true,
    render: (product) => (
      <EditProductPricesSheet
        product={product}
        currency={currency}
        onSaved={onSaved}
        trigger={
          <EditableValue
            value={formatPrice(Number(product.price) || 0, currency)}
          />
        }
      />
    ),
  },
  {
    key: "channels",
    header: "Channels",
    className: CELL_TEXT,
    render: () => storeName ?? "-",
  },
  {
    key: "visible",
    header: "Visibility",
    sortable: true,
    className: "relative transition-all hover:bg-blue-100",
    render: (product) => (
      <VisibilityToggle
        productId={product.id}
        value={isFlagOn(product.isVisible) ? "ENABLED" : "DISABLED"}
        onChange={(id, value) => onToggleVisibility(id, value === "ENABLED")}
      />
    ),
  },
  {
    key: "actions",
    render: (product) => (
      <ActionButton
        data={product}
        actions={PRODUCT_ROW_ACTIONS}
        onAction={onAction}
        label={`Actions for ${product.name}`}
      />
    ),
  },
];
