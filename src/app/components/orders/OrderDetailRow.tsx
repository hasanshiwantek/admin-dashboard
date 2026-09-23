"use client";

import dayjs from "dayjs";
import {
  Calendar,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Globe,
  Mail,
  Monitor,
  MonitorCheck,
  NotebookText,
  Phone,
  Ship,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { COMPLETED, riskConfig } from "./constant";
import { OrderDetailRowProps } from "./types";
import { findCountry } from "./utils";

const copyBilling = (info: any) => {
  if (!info) return;
  const text = [
    `${info.firstName || ""} ${info.lastName || ""}`.trim(),
    [info.addressLine1, info.addressLine2].filter(Boolean).join(" "),
    [info.city, info.state, info.zip].filter(Boolean).join(", "),
    info.country || "",
  ]
    .filter(Boolean)
    .join("\n");
  navigator.clipboard.writeText(text);
  toast.success("Address copied!");
};

export default function OrderDetailRow({
  order,
  onCaptureFunds,
  onViewShipmentId,
  onShipItems,
}: OrderDetailRowProps) {
  const countryData = findCountry(order?.billingAddress?.country);
  const countryDataForCustomer = findCountry(
    order?.billingInformation?.country,
  );
  const risk = riskConfig[order?.payment?.risk_level];
  const isMobileOrTablet =
    order?.deviceType?.includes("Mobile") ||
    order?.deviceType?.includes("Tablet");

  return (
    <div className="grid grid-cols-3 gap-4 bg-[#fcfcfb] p-4 ">
      <div className="flex">
        {/* Left Side: Billing Title & Copy Button */}
        <div className="flex flex-col border-r pr-3 mr-3 space-y-2">
          <h4 className="font-semibold text-[18px] #[34313f]">Billing</h4>
          <button
            className="!px-2 !py-1 flex items-center gap-1 text-[#4B71FC] border border-[#4B71FC]  text-base"
            onClick={() => copyBilling(order?.billingAddress)}
          >
            <Copy size={8} />
            Copy
          </button>
          <div className="flex flex-col items-end mt-17 space-y-4">
            {countryData?.flag ? (
              <Image
                src={countryData.flag}
                width={20}
                height={20}
                className="rounded-sm object-cover"
                alt=""
              />
            ) : (
              <Globe className="w-5 h-5 text-gray-500" />
            )}

            <Phone className="w-5 h-5 text-gray-500" />

            <Mail className="w-5 h-5 text-gray-500" />

            <Clock className="w-5 h-5 text-gray-500" />

            {order?.ipAddress && (
              <MonitorCheck className="w-5 h-5 text-gray-500" />
            )}
            {isMobileOrTablet ? (
              <Smartphone className="w-5 h-5 text-gray-500" />
            ) : (
              <Monitor className="w-5 h-5 text-gray-500" />
            )}

            <CreditCard className="w-5 h-5 text-gray-500" />

            {order?.payment?.payment_status == COMPLETED && (
              <CreditCard className="w-5 h-5 text-gray-500" />
            )}
            {order?.payment?.payment_intent_id &&
              order?.payment?.payment_status !== COMPLETED && (
                <CreditCard className="w-5 h-5 text-gray-500" />
              )}

            {order?.payment?.payment_intent_id && (
              <CreditCard className="w-5 h-5 text-gray-500" />
            )}

            {order?.comments && (
              <NotebookText className="w-5 h-5 text-gray-500" />
            )}

            {risk && (
              <div className="w-8 h-8  flex items-center justify-center">
                {risk.icon}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Customer Info with Icons */}
        <div className="flex flex-col space-y-2  ">
          <div className="w-[180px] min-w-[180px] h-[90px] overflow-y-auto pr-1">
            <p className="w-full whitespace-normal break-words text-[13px] text-[#34313f] overflow-wrap-anywhere">
              {order?.billingAddress?.name && (
                <>
                  {order.billingAddress.name}
                  <br />
                </>
              )}
              {order?.billingAddress?.addressLine1 && (
                <>
                  {order.billingAddress.addressLine1}
                  <br />
                </>
              )}
              {order?.billingAddress?.addressLine2 && (
                <>
                  {order.billingAddress.addressLine2}
                  <br />
                </>
              )}
              {order?.billingAddress?.state}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span>{countryData?.label || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>{order?.billingAddress?.phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="!text-blue-400"
              href={`mailto:${order.billingAddress.email}`}
            >
              {order?.billingAddress?.email || "N/A"}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {order?.billingInformation?.updatedAt
                ? dayjs(order?.billingInformation?.updatedAt).format(
                  "DD MMM YYYY HH:mm:ss",
                )
                : "N/A"}
            </span>
          </div>
          {order?.ipAddress && (
            <div className="flex items-center gap-2">
              <Link
                href={`https://whatismyipaddress.com/ip/${order?.ipAddress}`}
                target="_blank"
                className="!text-blue-400"
              >
                {order?.ipAddress}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span>{order?.deviceType}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>{order?.billingInformation?.paymentMethod || "N/A"}</span>
          </div>
          {order?.payment?.payment_status == COMPLETED && (
            <div className="flex items-center gap-2">
              <span>Captured</span>
            </div>
          )}
          {order?.payment?.payment_intent_id &&
            order?.payment?.payment_status !== COMPLETED && (
              <div className="flex items-center gap-2">
                <span
                  onClick={() =>
                    onCaptureFunds(order?.payment?.payment_intent_id)
                  }
                  className="!text-blue-400  cursor-pointer"
                >
                  Capture Funds
                </span>
              </div>
            )}
          {order?.payment?.payment_intent_id && (
            <div className="flex items-center gap-2">
              <Link
                href={`https://dashboard.stripe.com/payments/${order.payment.payment_intent_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-all"
              >
                {order.payment.payment_intent_id}
              </Link>
            </div>
          )}
          {order?.comments && (
            <div className="flex items-center gap-2">
              <span className="">{order?.comments || "N/A"}</span>
            </div>
          )}
          {risk && (
            <div className="flex items-center gap-1.5">
              <span className="!text-blue-400">{risk.extendLabel}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Left Side: Shipping Title, Labels & Icons */}
        <div className="flex flex-col border-r pr-3 mr-3 space-y-2">
          <h4 className="font-semibold text-[18px] text-[#34313f]">Shipping</h4>

          <button
            className="w-[48px] !px-2 !py-1 flex items-center gap-1 text-[#4B71FC] border border-[#4B71FC] text-base"
            onClick={() => copyBilling(order?.billingInformation)}
          >
            <Copy size={8} />
            Copy
          </button>

          {/* Method */}
          <div className="flex flex-col items-end mt-30">
            <h4 className="font-semibold text-[18px] text-[#34313f] mb-3">
              Method
            </h4>

            <div className="flex flex-col items-end space-y-4">
              <Ship className="w-5 h-5 text-gray-500" />
              <DollarSign className="w-5 h-5 text-gray-500" />
              <Mail className="w-5 h-5 text-gray-500" />
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>

            {/* Contact */}
            <h4 className="font-semibold text-[18px] text-[#34313f] mt-6 mb-3">
              Contact
            </h4>

            <div className="flex flex-col items-end space-y-4">
              <Phone className="w-5 h-5 text-gray-500" />
              <Mail className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Right Side: Shipping Info */}
        <div className="flex flex-col space-y-2 overflow-hidden">
          {/* Customer Info */}
          <div className="w-[180px] min-w-[180px] h-[120px] overflow-y-auto pr-1">
            <p className="w-full whitespace-normal break-words overflow-wrap-anywhere">
              {order?.billingInformation?.firstName}{" "}
              {order?.billingInformation?.lastName}
              <br />
              {order?.billingInformation?.addressLine1 && (
                <>{order.billingInformation.addressLine1}</>
              )}
              {order?.billingInformation?.addressLine2 && (
                <>, {order.billingInformation.addressLine2}</>
              )}
              <br />
              {order?.billingInformation?.state}
              <br />
              {countryDataForCustomer?.label || "N/A"}
            </p>
          </div>

          {/* Method Data */}
          <div
            className={`flex items-center gap-2 min-w-0 ${(order?.billingInformation?.shippingData?.length ?? 0) > 40
              ? "pt-[25px]"
              : "pt-[35px]"
              }`}
          >
            <div className="shipping-data-scroll w-[420px] max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap">
              <span> {order?.billingInformation?.shippingData || "N/A"} </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>
              {order?.shippingCost ? `$${order.shippingCost}` : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>{order?.billingInformation?.email || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>
              {dayjs(order?.updatedAt).format("DD MMM YYYY HH:mm:ss") || "N/A"}
            </span>
          </div>

          {/* Contact Data */}
          <div className="flex items-center gap-2 pt-[33px]">
            <span>{order?.billingInformation?.phone || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="text-[#6f8DFD] text-[13px]"
              href={`mailto:${order.billingInformation.email}`}
            >
              {order?.billingInformation?.email || "N/A"}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap max-w-full ">
        {/* Left - Item count */}
        <div className="flex flex-col border-r pr-1 pt-2 mr-1 ">
          <h4 className="whitespace-nowrap">{order?.products?.length} items</h4>
        </div>

        {/* Right - Details */}
        <div className="flex flex-col flex-1 min-w-0">
          {order?.shipmentId && (
            <div className="bg-gray-100 p-4 text-sm space-y-0">
              {order?.shipmentId && (
                <div className="flex ">
                  <span
                    onClick={() => onViewShipmentId(order.id)}
                    className="!text-blue-400 cursor-pointer"
                  >
                    Shipment #{order?.shipmentId}
                  </span>
                </div>
              )}
              <div className="flex ">
                <span>
                  {" "}
                  {order?.products?.length} items @{" "}
                  {dayjs(order?.updatedAt).format("DD MMM YYYY")}{" "}
                </span>
              </div>
              <div className="flex ">
                <span>Tracking #: </span>
                <span>{order?.trackingNumber}</span>
              </div>
            </div>
          )}
          {/* Product list */}
          <div className="p-4 border-b space-y-4">
            {order?.products?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between gap-4 flex-wrap">
                <div className="text-base leading-5 min-w-0 flex-1 overflow-hidden">
                  <p className="font-semibold">
                    {item?.quantity} x{" "}
                    <span
                      onClick={() => {
                        const availableStores = JSON.parse(
                          localStorage.getItem("availableStores") || "[]",
                        );
                        const selectedStoreId = Number(
                          localStorage.getItem("storeId"),
                        );
                        const selectedStore = availableStores.find(
                          (s: any) => s.id === selectedStoreId,
                        );
                        if (selectedStore?.baseUrl)
                          window.open(
                            `${selectedStore.baseUrl.replace(/\/$/, "")}${item?.productUrl == "/" ? item?.productUrl.slice(1) : item?.productUrl}`,
                            "_blank",
                          );
                        else alert("Store URL or Product SKU not found");
                      }}
                      className="!text-[#6F8DFD] font-light cursor-pointer hover:underline whitespace-normal break-words leading-snug max-w-[300px]"
                    >
                      {item?.name}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {item?.optionSet?.title}
                  </p>
                  <p className="text-sm mt-1">
                    {item?.sku}
                    <br />

                    {item?.brand?.name && (
                      <>
                        <strong>Brand:</strong> {item?.brand?.name}
                      </>
                    )}
                  </p>
                </div>
                <div className="font-medium whitespace-nowrap shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {!order?.shipmentId && (
              <button
                onClick={() => onShipItems(order)}
                className="flex items-center mt-4 px-3 py-1.5 text-base font-semibold border border-blue-500 text-blue-600 hover:bg-blue-50 rounded w-fit"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h2l.4 2M7 13h14l-1.5 8H6L4.5 5H20"></path>
                </svg>
                Ship Items
              </button>
            )}
          </div>

          {/* Totals */}
          <div className="bg-[#E4E7ED] text-[#34313f] p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                $
                {order?.products
                  .reduce(
                    (acc: number, item: any) =>
                      acc + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </div>
            {Number(order?.manualDiscount) > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-${Number(order?.manualDiscount).toFixed(2)}</span>
              </div>
            )}
            {order?.couponCode && (
              <div className="flex justify-between">
                <span>Coupon Code ({order?.couponCode})</span>
                <span>-${Number(order?.discountAmount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${Number(order?.shippingCost || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>TAX</span>
              <span>${Number(order?.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t">
              <span>GRAND TOTAL</span>
              <span>${Number(order?.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
