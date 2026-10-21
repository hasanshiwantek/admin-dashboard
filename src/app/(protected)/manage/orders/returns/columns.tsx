import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import { getSelectedStore } from "@/utils/storage";
import Link from "next/link";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export const getReturnsColumns = (
  expandedRow: number | null,
  toggleRow: (id: number) => void,
) => [
  {
    key: "expand",
    header: "",
    width: "50px",
    render: (ret: any) => (
      <button type="button" onClick={() => toggleRow(ret.id)}>
        {expandedRow === ret.id ? (
          <FaCircleMinus className="h-7 w-7 fill-blue-500" />
        ) : (
          <FaCirclePlus className="h-7 w-7 fill-blue-500" />
        )}
      </button>
    ),
  },
  {
    key: "id",
    header: "Return ID",
    render: (ret: any) => `RET-${String(ret.id).padStart(3, "0")}`,
  },
  {
    key: "product",
    header: "Returned Item",
    className: "whitespace-normal break-words",
    render: (ret: any) => {
      const products = ret?.product || [];
      const label = !products.length
        ? "No products"
        : products.length === 1
          ? `1 x ${products[0].name}`
          : `${products.length} items`;
      return (
        <span
          onClick={() => {
            const selectedStore = getSelectedStore();
            const productUrl = ret?.product?.[0]?.productUrl;
            if (selectedStore?.baseUrl && productUrl) {
              window.open(
                `${selectedStore.baseUrl}${
                  productUrl.startsWith("/") ? productUrl.slice(1) : productUrl
                }`,
                "_blank",
              );
            } else {
              alert("Store URL or Product URL not found");
            }
          }}
          className="text-[var(--color-text-link)] text-[15px]"
        >
          {label}
        </span>
      );
    },
  },
  {
    key: "orderId",
    header: "Order #",
    render: (ret: any) => (
      <Link
        href={`/manage/orders?orderIdFrom=${ret.orderId}&orderIdTo=${ret.orderId}&expand=${ret.orderId}`}
        className=" text-[15px]"
      >
        Order# {replaceNullWithPlaceholder(ret.orderNumber)}
      </Link>
    ),
  },
  {
    key: "customerName",
    header: "Customer",
    render: (ret: any) => (
      <Link
        href={`/manage/orders/customer/${ret.customerId}`}
        className=" text-[15px]"
      >
        {replaceNullWithPlaceholder(ret.customerName)}
      </Link>
    ),
  },
  {
    key: "createdAt",
    header: "Date",
    render: (ret: any) =>
      ret.createdAt ? formatDateTime(ret.createdAt) : "N/A",
  },
];
