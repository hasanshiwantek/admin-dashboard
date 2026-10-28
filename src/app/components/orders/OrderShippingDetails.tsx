"use client";

import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import { successMessage } from "@/utils/message";
import { Calendar, DollarSign, Mail, Phone } from "lucide-react";
import Link from "next/link";
import OrderInfoList from "./OrderInfoList";
import OrderSectionHeader from "./OrderSectionHeader";
import { OrderShippingDetailsProps } from "./types";
import { findCountry, formatMoney, getAddressCopyText } from "./utils";
import { DateTimeFormat } from "@/const/appConstants";

const SUB_HEADING_ROW = "flex items-center pt-5";

export default function OrderShippingDetails({
  order,
}: OrderShippingDetailsProps) {
  const info = order?.billingInformation;
  const country = findCountry(info?.country);
  const fullName = `${info?.firstName ?? ""} ${info?.lastName ?? ""}`.trim();
  const addressText = [
    fullName,
    [info?.addressLine1, info?.addressLine2].filter(Boolean).join(", "),
    info?.state,
    country?.label,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(getAddressCopyText(info));
    successMessage("Address copied!");
  };

  return (
    <OrderInfoList
      items={[
        {
          key: "address",
          label: <OrderSectionHeader title="Shipping" onCopy={handleCopy} />,
          content: (
            <p className="leading-relaxed whitespace-pre-line">
              {addressText || "N/A"}
            </p>
          ),
        },
        {
          key: "method",
          label: <OrderSectionHeader title="Method" />,
          content: (
            <div className="no-scrollbar min-w-0 overflow-x-auto whitespace-nowrap">
              {replaceNullWithPlaceholder(info?.shippingData)}
            </div>
          ),
          rowClassName: SUB_HEADING_ROW,
        },
        {
          key: "shippingCost",
          label: <DollarSign />,
          content: order?.shippingCost
            ? formatMoney(order.shippingCost)
            : "N/A",
        },
        {
          key: "shippingEmail",
          label: <Mail />,
          content: replaceNullWithPlaceholder(info?.email),
        },
        {
          key: "updatedAt",
          label: <Calendar />,
          content: formatDateTime(
            order?.updatedAt,
            DateTimeFormat.DATE_TIME_SECONDS,
            "N/A",
          ),
        },
        {
          key: "contact",
          label: <OrderSectionHeader title="Contact" />,
          content: replaceNullWithPlaceholder(fullName),
          rowClassName: SUB_HEADING_ROW,
        },
        {
          key: "phone",
          label: <Phone />,
          content: replaceNullWithPlaceholder(info?.phone),
        },
        {
          key: "contactEmail",
          label: <Mail />,
          content: info?.email ? (
            <Link
              className="text-[1.3rem] text-link"
              href={`mailto:${info.email}`}
            >
              {info.email}
            </Link>
          ) : (
            "N/A"
          ),
        },
      ]}
    />
  );
}
