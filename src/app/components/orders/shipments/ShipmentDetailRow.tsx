import {
  Phone,
  Mail,
  Clock,
  IdCard,
} from "lucide-react";

import { getValue } from "@/utils/getValue";

type ShipmentDetailRowProps = {
  shipment: any;
};

const ShipmentDetailRow = ({
  shipment,
}: ShipmentDetailRowProps) => {
  const handleCopyBilling = async () => {
    const billing =
      shipment?.order?.billingAddress;

    if (!billing) return;

    const text = [
      billing.name,
      billing.addressLine1,
      billing.addressLine2,
      `${billing.city || ""}, ${
        billing.state || ""
      }, ${billing.zip || ""}`,
      billing.country,
      billing.phone,
      billing.email,
      `Customer ID: ${
        shipment?.order?.customer?.id || ""
      }`,
      `Updated: ${
        shipment?.order?.updatedAt || ""
      }`,
    ]
      .filter(Boolean)
      .join("\n");

    await navigator.clipboard.writeText(text);
  };

  const handleCopyShipping = async () => {
    const shipping =
      shipment?.order?.billingInformation;

    if (!shipping) return;

    const text = [
      `${shipping.firstName || ""} ${
        shipping.lastName || ""
      }`.trim(),

      shipping.companyName,

      shipping.addressLine1,

      shipping.addressLine2,

      `${shipping.city || ""}, ${
        shipping.state || ""
      }, ${shipping.zip || ""}`,

      shipping.country,

      shipping.phone,

      shipping.email,

      shipping.shippingData,
    ]
      .filter(Boolean)
      .join("\n");

    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4">

      {/* Billing */}
      <div className="flex min-w-0">
        <div className="flex flex-col border-r pr-3 mr-3 shrink-0">
          <h4 className="font-bold text-lg">
            Billing
          </h4>

          <button
            type="button"
            className="btn-outline-primary text-sm mt-3"
            onClick={handleCopyBilling}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex items-start gap-2">
            <div className="text-sm">
              <p>
                {getValue(
                  shipment?.order?.billingAddress?.name
                )}
              </p>

              {shipment?.order?.billingAddress
                ?.addressLine1 && (
                <p>
                  {getValue(
                    shipment.order.billingAddress
                      .addressLine1
                  )}
                </p>
              )}

              {shipment?.order?.billingAddress
                ?.addressLine2 && (
                <p>
                  {getValue(
                    shipment.order.billingAddress
                      .addressLine2
                  )}
                </p>
              )}

              <p>
                {getValue(
                  shipment?.order?.billingAddress?.city
                )}
                ,{" "}
                {getValue(
                  shipment?.order?.billingAddress?.state
                )}
              </p>

              <p>
                {getValue(
                  shipment?.order?.billingAddress?.country
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {getValue(
                shipment?.order?.billingAddress?.phone
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm text-blue-400 break-all">
              {getValue(
                shipment?.order?.billingAddress?.email
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              #
              {getValue(
                shipment?.order?.customer?.id
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {getValue(
                shipment?.order?.updatedAt
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="flex min-w-0">
        <div className="flex flex-col border-r pr-3 mr-3 shrink-0">
          <h4 className="font-bold text-lg">
            Shipping
          </h4>

          <button
            type="button"
            className="btn-outline-primary text-sm mt-3"
            onClick={handleCopyShipping}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex items-start gap-2">
            <div className="text-sm">
              <p>
                {getValue(
                  `${shipment?.order?.billingInformation?.firstName || ""} ${
                    shipment?.order?.billingInformation?.lastName || ""
                  }`.trim()
                )}
              </p>

              {shipment?.order?.billingInformation
                ?.companyName && (
                <p>
                  {getValue(
                    shipment.order.billingInformation
                      .companyName
                  )}
                </p>
              )}

              <p>
                {getValue(
                  shipment?.order?.billingInformation
                    ?.addressLine1
                )}
              </p>

              {shipment?.order?.billingInformation
                ?.addressLine2 && (
                <p>
                  {getValue(
                    shipment.order.billingInformation
                      .addressLine2
                  )}
                </p>
              )}

              <p>
                {getValue(
                  shipment?.order?.billingInformation?.city
                )}
                ,{" "}
                {getValue(
                  shipment?.order?.billingInformation?.state
                )}
              </p>

              <p>
                {getValue(
                  shipment?.order?.billingInformation
                    ?.country
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {getValue(
                shipment?.order?.billingInformation?.phone
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm text-blue-400 break-all">
              {getValue(
                shipment?.order?.billingInformation?.email
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {getValue(
                shipment?.shippingMethod
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {getValue(
                shipment?.dateShipped
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Shipped Items */}
      <div className="flex min-w-0">
        <div className="flex flex-col border-r pr-3 mr-3 shrink-0">
          <h4 className="font-bold text-lg">
            Shipped
            <br />
            Items
          </h4>

          <div className="mt-3 text-sm">
            {shipment?.orderProducts?.length || 0}{" "}
            items
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          {shipment?.orderProducts?.length > 0 ? (
            shipment.orderProducts.map(
              (product: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2"
                >
                  <IdCard className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />

                  <div className="text-sm min-w-0">
                    <p className="font-medium">
                      {getValue(product?.quantity, "0")} x{" "}
                      {getValue(product?.productName)}
                    </p>

                    <p className="text-sm">
                      {getValue(product?.sku)}
                    </p>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-sm text-gray-500">
              No shipped items found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailRow;