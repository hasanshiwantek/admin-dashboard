"use client";

import { Button } from "@/components/ui/Button";
import { DateTimeFormat } from "@/const/appConstants";
import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import { successMessage } from "@/utils/message";
import {
  Clock,
  CreditCard,
  Globe,
  Mail,
  Monitor,
  MonitorCheck,
  NotebookText,
  Phone,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { COMPLETED, riskConfig } from "./constant";
import OrderInfoList from "./OrderInfoList";
import OrderSectionHeader from "./OrderSectionHeader";
import { OrderBillingDetailsProps } from "./types";
import { findCountry, getAddressCopyText } from "./utils";

export default function OrderBillingDetails({
  order,
  onCaptureFunds,
}: OrderBillingDetailsProps) {
  const address = order?.billingAddress;
  const payment = order?.payment;
  const country = findCountry(address?.country);
  const risk = riskConfig[payment?.risk_level];
  const isCaptured = payment?.payment_status === COMPLETED;
  const isMobileOrTablet = /Mobile|Tablet/.test(order?.deviceType ?? "");
  const addressText = [
    address?.name,
    address?.addressLine1,
    address?.addressLine2,
    address?.state,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(getAddressCopyText(address));
    successMessage("Address copied!");
  };

  return (
    <OrderInfoList
      items={[
        {
          key: "address",
          label: <OrderSectionHeader title="Billing" onCopy={handleCopy} />,
          content: (
            <p className="leading-relaxed whitespace-pre-line">
              {addressText || "N/A"}
            </p>
          ),
          rowClassName: "pb-6",
        },
        {
          key: "country",
          label: country?.flag ? (
            <Image
              src={country.flag}
              width={20}
              height={20}
              className="rounded-sm object-cover"
              alt=""
            />
          ) : (
            <Globe />
          ),
          content: replaceNullWithPlaceholder(country?.label),
        },
        {
          key: "phone",
          label: <Phone />,
          content: replaceNullWithPlaceholder(address?.phone),
        },
        {
          key: "email",
          label: <Mail />,
          content: address?.email ? (
            <Link
              className="text-[1.3rem] text-link"
              href={`mailto:${address.email}`}
            >
              {address.email}
            </Link>
          ) : (
            "N/A"
          ),
        },
        {
          key: "updatedAt",
          label: <Clock />,
          content: formatDateTime(
            order?.billingInformation?.updatedAt,
            DateTimeFormat.DATE_TIME_SECONDS,
            "N/A",
          ),
        },
        order?.ipAddress && {
          key: "ip",
          label: <MonitorCheck />,
          content: (
            <Link
              href={`https://whatismyipaddress.com/ip/${order.ipAddress}`}
              target="_blank"
              className="text-[1.3rem] text-link"
            >
              {order.ipAddress}
            </Link>
          ),
        },
        {
          key: "device",
          label: isMobileOrTablet ? <Smartphone /> : <Monitor />,
          content: replaceNullWithPlaceholder(order?.deviceType),
        },
        {
          key: "paymentMethod",
          label: <CreditCard />,
          content: replaceNullWithPlaceholder(
            order?.billingInformation?.paymentMethod,
          ),
        },
        isCaptured && {
          key: "captured",
          label: <CreditCard />,
          content: "Captured",
        },
        payment?.payment_intent_id &&
          !isCaptured && {
            key: "capture",
            label: <CreditCard />,
            content: (
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 text-[1.3rem] text-link"
                onClick={() => onCaptureFunds(payment.payment_intent_id)}
              >
                Capture Funds
              </Button>
            ),
          },
        payment?.payment_intent_id && {
          key: "stripe",
          label: <CreditCard />,
          content: (
            <Link
              href={`https://dashboard.stripe.com/payments/${payment.payment_intent_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[1.3rem] break-all text-link underline"
            >
              {payment.payment_intent_id}
            </Link>
          ),
        },
        order?.comments && {
          key: "comments",
          label: <NotebookText />,
          content: order.comments,
        },
        risk && {
          key: "risk",
          label: risk.icon,
          content: <span className="text-link">{risk.extendLabel}</span>,
        },
      ]}
    />
  );
}
