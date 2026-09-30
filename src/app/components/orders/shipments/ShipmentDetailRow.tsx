import {
  Phone,
  Mail,
  Clock,
  IdCard,
} from "lucide-react";

type ShipmentDetailRowProps = {
  shipment: any;
};

const ShipmentDetailRow = ({
  shipment,
}: ShipmentDetailRowProps) => {
  /*
   * ==========================================================
   * BILLING COPY
   * ==========================================================
   */

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

  /*
   * ==========================================================
   * SHIPPING COPY
   * ==========================================================
   */

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
      {/* ======================================================
          BILLING
      ====================================================== */}

      <div className="flex min-w-0">
        {/* Billing Left */}

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

        {/* Billing Right */}

        <div className="flex flex-col gap-3 min-w-0">
          {/* Address */}

          <div className="flex items-start gap-2">
            <div className="text-sm">
              <p>
                {shipment?.order?.billingAddress
                  ?.name || "N/A"}
              </p>

              {shipment?.order?.billingAddress
                ?.addressLine1 && (
                <p>
                  {
                    shipment.order.billingAddress
                      .addressLine1
                  }
                </p>
              )}

              {shipment?.order?.billingAddress
                ?.addressLine2 && (
                <p>
                  {
                    shipment.order.billingAddress
                      .addressLine2
                  }
                </p>
              )}

              <p>
                {shipment?.order?.billingAddress
                  ?.city || "N/A"}
                ,{" "}
                {shipment?.order?.billingAddress
                  ?.state || "N/A"}
              </p>

              <p>
                {shipment?.order?.billingAddress
                  ?.country || "N/A"}
              </p>
            </div>
          </div>

          {/* Phone */}

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {shipment?.order?.billingAddress
                ?.phone || "N/A"}
            </span>
          </div>

          {/* Email */}

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm text-blue-400 break-all">
              {shipment?.order?.billingAddress
                ?.email || "N/A"}
            </span>
          </div>

          {/* Customer ID */}

          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              #
              {shipment?.order?.customer?.id ||
                "N/A"}
            </span>
          </div>

          {/* Updated */}

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {shipment?.order?.updatedAt || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================
          SHIPPING
      ====================================================== */}

      <div className="flex min-w-0">
        {/* Shipping Left */}

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

        {/* Shipping Right */}

        <div className="flex flex-col gap-3 min-w-0">
          {/* Address */}

          <div className="flex items-start gap-2">
            <div className="text-sm">
              <p>
                {shipment?.order?.billingInformation
                  ?.firstName || ""}{" "}
                {shipment?.order?.billingInformation
                  ?.lastName || ""}
              </p>

              {shipment?.order?.billingInformation
                ?.companyName && (
                <p>
                  {
                    shipment.order
                      .billingInformation.companyName
                  }
                </p>
              )}

              <p>
                {shipment?.order?.billingInformation
                  ?.addressLine1 || "N/A"}
              </p>

              {shipment?.order?.billingInformation
                ?.addressLine2 && (
                <p>
                  {
                    shipment.order
                      .billingInformation.addressLine2
                  }
                </p>
              )}

              <p>
                {shipment?.order?.billingInformation
                  ?.city || "N/A"}
                ,{" "}
                {shipment?.order?.billingInformation
                  ?.state || "N/A"}
              </p>

              <p>
                {shipment?.order?.billingInformation
                  ?.country || "N/A"}
              </p>
            </div>
          </div>

          {/* Phone */}

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {shipment?.order?.billingInformation
                ?.phone || "N/A"}
            </span>
          </div>

          {/* Email */}

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm text-blue-400 break-all">
              {shipment?.order?.billingInformation
                ?.email || "N/A"}
            </span>
          </div>

          {/* Shipping Method */}

          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {shipment?.shippingMethod || "N/A"}
            </span>
          </div>

          {/* Date */}

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {shipment?.dateShipped || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================
          SHIPPED ITEMS
      ====================================================== */}

      <div className="flex min-w-0">
        {/* Shipped Items Left */}

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

        {/* Shipped Items Right */}

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
                      {product?.quantity || 0} x{" "}
                      {product?.productName || "N/A"}
                    </p>

                    <p className="text-sm">
                      {product?.sku || "N/A"}
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