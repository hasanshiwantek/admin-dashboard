import Link from "next/link";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export const getCustomerColumns = (
  expandedRow: number | null,
  toggleRow: (id: number) => void,
) => [
  {
    key: "expand",
    header: "",
    className: "w-12",
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
    headClassName: "2xl:!text-[1.6rem]",
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
    className: "text-blue-500 2xl:!text-2xl",
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
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (customer: any) => customer.phone,
  },
  {
    key: "totalOrders",
    header: "Orders",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (customer: any) => customer?.totalOrders,
  },
  {
    key: "joinDate",
    header: "Join date",
    headClassName: "2xl:!text-[1.6rem]",
    className: "2xl:!text-2xl",
    render: (customer: any) =>
      new Date(customer?.joinDate).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
  },
];