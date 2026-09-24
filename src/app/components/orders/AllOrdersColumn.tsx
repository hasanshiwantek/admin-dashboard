import { ColumnDef } from "@/components/ui/Table/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateOrderStatus } from "@/redux/slices/orderSlice";
import {
  Clock9,
  CreditCard,
  Mail,
  Monitor,
  NotepadText,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { COMPLETED, riskConfig, statusOptions } from "./constant";
import { OrderColumnsProps } from "./types";
import { findCountry } from "./utils";

export default function AllOrdersColumn({
  router,
  dispatch,
  refetch,
  clearSelection,
  isExpanded,
  onToggleExpand,
  onCaptureFunds,
  onViewNotes,
}: OrderColumnsProps): ColumnDef<any>[] {
  return [
    {
      key: "expand",
      header: "",
      className: "justify-items-center w-[75px]!",
      render: (order) => (
        <button className="flex items-center justify-center" onClick={() => onToggleExpand(order.id)}>
          {isExpanded(order) ? (
            <FaCircleMinus className="h-7 w-7 !fill-[#999]" />
          ) : (
            <FaCirclePlus className="h-7 w-7 !fill-[#999]" />
          )}
        </button>
      ),
    },
    {
      key: "device",
      header: "",
      className: "w-[75px]!",
      render: (order) => {
        const isMobileOrTablet =
          order?.deviceType?.includes("Mobile") ||
          order?.deviceType?.includes("Tablet");
        return (
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isMobileOrTablet ? (
                    <Smartphone className="h-9 w-9" />
                  ) : (
                    <Monitor className="h-9 w-9" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {order?.deviceType?.toUpperCase()}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      key: "date",
      header: "Date",
      className: "2xl:!text-2xl",
      render: (order) =>
        new Date(order.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      key: "id",
      header: "Order ID",
      className: "2xl:!text-2xl",
      render: (order) => order.id,
    },
    {
      key: "risk",
      header: "",
      render: (order) => {
        const countryData = findCountry(order?.orderPlaceCountry);
        const risk = riskConfig[order?.payment?.risk_level];
        return (
          <div className="flex items-center gap-2  ">
            <div className="w-6 shrink-0">
              {risk && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">{risk.icon}</span>
                    </TooltipTrigger>
                    <TooltipContent>{risk.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {countryData ? (
                    <Image
                      src={countryData?.flag as string}
                      width={22}
                      height={22}
                      className="rounded-sm object-cover"
                      alt={countryData?.label || ""}
                    />
                  ) : (
                    <span className="">🏳️</span>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {countryData?.label || "Unknown Country"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      key: "customer",
      header: "Customer",
      render: (order) => {
        const userType = order?.userType == "guest";
        return (
          <div className="flex items-center gap-2">
            {userType ? (
              <span className="2xl:!text-2xl">
                {order.billingAddress?.name} (Guest)
              </span>
            ) : (
              <Link
                href={"/manage/orders/customer/" + order?.customer?.id}
                className="2xl:!text-2xl !text-blue-500 cursor-pointer hover:underline"
              >
                {order?.customer?.firstName} {order?.customer?.lastName}
              </Link>
            )}

            {order?.payment?.payment_intent_id &&
              order?.payment?.payment_status !== COMPLETED && (
                <CreditCard
                  onClick={() =>
                    onCaptureFunds(order?.payment?.payment_intent_id)
                  }
                  className="w-7 h-7 text-gray-500 cursor-pointer"
                />
              )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (order) => {
        const currentStatus = statusOptions.find(
          (option) => option.value === order.status,
        );
        return (
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-12 inline-block rounded-none ${
                currentStatus?.color || "bg-gray-400"
              }`}
            />
            <Select
              defaultValue={order.status}
              onValueChange={async (newStatus) => {
                const result = await dispatch(
                  updateOrderStatus({ id: order.id, status: newStatus }),
                );
                if (updateOrderStatus.fulfilled.match(result)) {
                  refetch();
                  clearSelection();
                }
              }}
            >
              <SelectTrigger className="w-[200px] h-8 p-6">
                <SelectValue>{currentStatus?.label || ""}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      },
    },
    {
      key: "total",
      header: "Total",
      render: (order) => {
        const userType = order?.userType == "guest";
        return (
          <div className="flex justify-between items-center gap-2 2xl:!text-2xl">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(order.totalAmount))}
            <button
              className="text-gray-500  flex gap-1 "
              title="View messages for this order"
            >
              {order?.isMessage && !userType ? (
                <div
                  className="relative cursor-pointer w-6 h-6"
                  onClick={() =>
                    router.push(`/manage/orders/message/${order?.id}`)
                  }
                >
                  <Mail className="w-8 h-8" />
                  {order?.messageCount > 0 && (
                    <span className="absolute -top-2 right-0 bg-blue-600 !text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-[3px]">
                      {order.messageCount}
                    </span>
                  )}
                </div>
              ) : (
                <></>
              )}
            </button>
            <button
              className="text-gray-500  flex gap-1 "
              title="View comment for this order"
            >
              {order?.comments ? (
                <div className="relative">
                  <NotepadText
                    onClick={() => onViewNotes(order.id)}
                    className="w-8 h-8"
                  />
                </div>
              ) : (
                <></>
              )}
            </button>
            <button
              className="text-gray-500  flex gap-1 "
              title="View Order Timeline"
            >
              <Clock9
                onClick={() =>
                  router.push(`/manage/orders/order-timeline/${order?.id}`)
                }
                className="w-8 h-8 cursor-pointer"
              />
            </button>
          </div>
        );
      },
    },
  ];
}
