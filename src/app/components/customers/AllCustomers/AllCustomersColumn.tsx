import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export const getCustomerColumns = (
  expandedRow: number | null,
  toggleRow: (id: number) => void,
) => [
  {
    key: "expand",
    header: "",
    width: "50px",
    render: (customer: any) => (
      <button
        type="button"
        onClick={() => toggleRow(customer.id)}
        className="mt-3"
      >
        {expandedRow === customer.id ? (
          <FaCircleMinus className="h-7 w-7 fill-blue-500" />
        ) : (
          <FaCirclePlus className="h-7 w-7 fill-blue-500" />
        )}
      </button>
    ),
  },
  {
    key: "name",
    header: "Name",
    sortable: true,
    width: "28%",
    headClassName: "2xl:!text-[1.6rem]",
    className: "whitespace-normal break-words",
    render: (customer: any) => (
      <div className="text-blue-600 cursor-pointer hover:underline">
        <Link
          className="2xl:!text-2xl"
          href={`/manage/customers/edit/${customer.id}`}
        >
          {customer.firstName} {customer.lastName}
        </Link>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    headClassName: "2xl:!text-[1.6rem]",
    className: "text-blue-500 2xl:!text-2xl truncate",
    render: (customer: any) => (
      <Link
        href={`mailto:${customer?.email}`}
        className="!text-[15px] hover:underline"
      >
        {customer?.email || "N/A"}
      </Link>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    width: "160px",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (customer: any) => customer.phone,
  },
  {
    key: "totalOrders",
    header: "Orders",
    width: "120px",
    sortable: true,
    sortKey: "orders",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (customer: any) => customer?.totalOrders,
  },
  {
    key: "joinDate",
    header: "Join date",
    width: "230px",
    sortable: true,
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (customer: any) =>
      formatDateTime(customer?.joinDate, DateTimeFormat.SHORT_DATE_TIME),
  },
];
