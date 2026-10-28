"use client";

import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import { useAlert } from "@/hooks/useAlert";
import { formatDateTime, replaceNullWithPlaceholder } from "@/lib/utils";
import { Truck } from "lucide-react";
import { OrderItemsSummaryProps, OrderProduct } from "./types";
import {
  formatMoney,
  getLineTotal,
  getOrderTotalRows,
  getStorefrontProductUrl,
} from "./utils";

export default function OrderItemsSummary({
  order,
  onViewShipmentId,
  onShipItems,
}: OrderItemsSummaryProps) {
  const { showAlert, Alert } = useAlert();
  const products: OrderProduct[] = order?.products ?? [];
  const itemCountText = `${products.length} ${products.length === 1 ? "item" : "items"}`;

  const openProduct = (item: OrderProduct) => {
    const url = getStorefrontProductUrl(item.productUrl);
    if (url) window.open(url, "_blank");
    else
      showAlert({
        title: "Store or Product Not Found",
        message: "Store URL or Product SKU not found.",
      });
  };

  return (
    <div className="flex max-w-full">
      <h4 className="shrink-0 pr-4 text-[1.3rem] font-semibold whitespace-nowrap text-text-heading">
        {itemCountText}
      </h4>

      <div className="flex min-w-0 flex-1 flex-col border-l">
        {order?.shipmentId && (
          <div className="space-y-1 bg-gray-100 p-4 text-[1.3rem] text-text-heading">
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-[1.4rem] font-medium text-link"
              onClick={() => onViewShipmentId(order.id)}
            >
              Shipment #{order.shipmentId}
            </Button>
            <p>
              {itemCountText} @ {formatDateTime(order.updatedAt, "DD MMM YYYY")}
            </p>
            <p>
              Tracking #: {replaceNullWithPlaceholder(order.trackingNumber)}
            </p>
          </div>
        )}

        <div className="border-b p-4">
          <ListRenderer
            data={products}
            keyExtractor={(item, index) => `${item.sku}-${index}`}
            emptyComponent={<></>}
            className="space-y-5!"
            renderItem={(item) => (
              <div className="flex justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-1 text-[1.3rem] text-text-heading">
                  <p className="text-[1.4rem] leading-snug">
                    <span className="font-semibold">{item.quantity} x </span>
                    <Button
                      asChild
                      variant="link"
                      className="inline h-auto p-0 text-[1.4rem] font-normal whitespace-normal text-link"
                    >
                      <a
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          openProduct(item);
                        }}
                      >
                        {item.name}
                      </a>
                    </Button>
                  </p>
                  {item.optionSet?.title && (
                    <p className="text-gray-500">{item.optionSet.title}</p>
                  )}
                  <p className="text-gray-500">{item.sku}</p>
                  {item.brand?.name && (
                    <p>
                      <span className="font-semibold">Brand:</span>{" "}
                      {item.brand.name}
                    </p>
                  )}
                </div>
                <p className="shrink-0 text-[1.4rem] whitespace-nowrap text-text-heading">
                  {formatMoney(getLineTotal(item))}
                </p>
              </div>
            )}
          />

          {!order?.shipmentId && (
            <Button
              type="button"
              variant="outline"
              size="md"
              className="mt-4 w-fit text-[1.3rem]"
              onClick={() => onShipItems(order)}
            >
              <Truck />
              Ship Items
            </Button>
          )}
        </div>

        <div className="space-y-2 bg-border-light p-4 text-[1.3rem] text-text-heading">
          <ListRenderer
            data={getOrderTotalRows(order)}
            keyExtractor={(row) => row.label}
            emptyComponent={<></>}
            className="space-y-2!"
            renderItem={(row) => (
              <div className="flex justify-between">
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            )}
          />
          <div className="flex justify-between pt-1 text-[1.6rem] font-semibold">
            <span>GRAND TOTAL</span>
            <span>{formatMoney(order?.totalAmount)}</span>
          </div>
        </div>
      </div>
      <Alert />
    </div>
  );
}
