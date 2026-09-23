import { ColumnDef } from "@/components/ui/Table/types";
import { updateProduct } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store";
import { Pencil } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import FeaturedToggle from "../dropdowns/FeaturedToggle";
import VisibilityToggle from "../dropdowns/VisibilityToggle";
import EditPriceSheet from "./EditPriceSheet";
import EditStockSheet from "./EditStockSheet";

type ColumnsProps = {
  router: AppRouterInstance;
  dispatch: AppDispatch;
  refetch: () => void;
};

const AllProductsColumn = ({
  router,
  dispatch,
  refetch,
}: ColumnsProps): ColumnDef<any>[] => [
  {
    key: "name",
    header: "Name",
    className: "flex items-center gap-2",
    render: (product) => {
      const imageSrc =
        product.image?.find((img: any) => img?.isPrimary === 1)?.path ||
        product.image?.[0]?.path ||
        product.image?.[1]?.path ||
        "/default-product-image.svg";
      return (
        <>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={product.name}
              width={60}
              height={60}
              className="rounded !border object-contain !border-gray-300 p-2 shrink-0 w-28 h-24"
            />
          )}
          <span
            onClick={() => router.push(`/manage/products/edit/${product.id}`)}
            className="!text-blue-600 hover:underline !text-xl 2xl:!text-[1.6rem] !font-medium capitalize cursor-pointer whitespace-normal break-words leading-snug max-w-[350px]"
          >
            {product.name}
          </span>
        </>
      );
    },
  },
  {
    key: "featured",
    header: "",
    className: "relative mx-4",
    render: (product) => (
      <FeaturedToggle
        productId={product.id}
        isFeatured={product.isFeatured}
        onChange={async (id: any, value) => {
          const result = await dispatch(
            updateProduct({
              body: {
                products: [{ id: [id], fields: { isFeatured: value ? 1 : 0 } }],
              },
            }),
          );
          if (updateProduct.fulfilled.match(result)) refetch();
        }}
      />
    ),
  },
  {
    key: "sku",
    header: "SKU",
    className: "2xl:!text-[1.6rem]",
  },
  {
    key: "categories",
    header: "Categories",
    className:
      "whitespace-normal break-words leading-snug 2xl:!text-[1.6rem] max-w-[300px]",
    render: (product) =>
      product?.categoryIds
        ?.filter((cat: any) => cat.name !== "Uncategorized")
        .map((cat: any) => cat.name)
        .join(", ") || "-",
  },
  {
    key: "currentStock",
    header: "Current stock",
    render: (product) => (
      <EditStockSheet
        product={product}
        trigger={
          <div className="group hover:text-blue-600 flex items-center gap-1 hover:bg-blue-100 p-4 rounded-md cursor-pointer transition-colors">
            <a className="text-xl group-hover:opacity-100 2xl:!text-[1.6rem]">
              {product.currentStock}
            </a>
            <Pencil className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        }
        onSuccess={refetch}
      />
    ),
  },
  {
    key: "price",
    header: "Price",
    render: (product) => (
      <EditPriceSheet
        product={product}
        trigger={
          <div className="group hover:text-blue-600 flex items-center gap-1 hover:bg-blue-100 p-4 rounded-md cursor-pointer transition-colors">
            <a className="text-xl group-hover:opacity-100 2xl:!text-[1.6rem]">
              {product.price}
            </a>
            <Pencil className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        }
        onSuccess={refetch}
      />
    ),
  },
  {
    key: "channels",
    header: "Channels",
    className: "2xl:!text-[1.6rem]",
  },
  {
    key: "visibility",
    header: "Visibility",
    className: "relative hover:bg-blue-100 transition-all",
    render: (product) => (
      <VisibilityToggle
        productId={product.id}
        value={product.isVisible ? "ENABLED" : "DISABLED"}
        onChange={async (id, value) => {
          const isVisible = value === "ENABLED";
          const result = await dispatch(
            updateProduct({
              body: {
                products: [
                  { id: [id], fields: { isVisible: isVisible ? 1 : 0 } },
                ],
              },
            }),
          );
          if (updateProduct.fulfilled.match(result)) refetch();
        }}
      />
    ),
  },
];

export default AllProductsColumn;
