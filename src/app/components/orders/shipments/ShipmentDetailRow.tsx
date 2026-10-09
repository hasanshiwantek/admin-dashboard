import {
  Phone,
  Mail,
  Clock,
  IdCard,
  
} from "lucide-react";

import {replaceNullWithPlaceholder} from "@/lib/utils"
import Link from "next/link";
import { useAlert } from "@/hooks/useAlert";
type ShipmentDetailRowProps = {
  shipment: any;
};

const ShipmentDetailRow = ({
  shipment,
}: ShipmentDetailRowProps) => {
   const { showAlert, Alert } = useAlert();
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
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingAddress?.name
                )}
              </p>

              {shipment?.order?.billingAddress
                ?.addressLine1 && (
                <p>
                  {replaceNullWithPlaceholder(
                    shipment.order.billingAddress
                      .addressLine1
                  )}
                </p>
              )}

              {shipment?.order?.billingAddress
                ?.addressLine2 && (
                <p>
                  {replaceNullWithPlaceholder(
                    shipment.order.billingAddress
                      .addressLine2
                  )}
                </p>
              )}

              <p>
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingAddress?.city
                )}
                ,{" "}
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingAddress?.state
                )}
              </p>

              <p>
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingAddress?.country
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {replaceNullWithPlaceholder(
                shipment?.order?.billingAddress?.phone
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />
             
            <Link 
              href={`mailto:${replaceNullWithPlaceholder(shipment?.order?.billingAddress?.email)}`}
              className="text-[12px]! text-blue-400! break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {replaceNullWithPlaceholder(
                shipment?.order?.billingAddress?.email
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-gray-400 shrink-0" />

            <Link    href={`/manage/orders?orderIdFrom=${shipment?.orderId}&orderIdTo=${shipment?.orderId}&expand=${shipment?.orderId}`} className="text-[14px]! text-blue-400!">
              #
             {replaceNullWithPlaceholder(shipment?.orderId)}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {replaceNullWithPlaceholder(
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
                {replaceNullWithPlaceholder(
                  `${shipment?.order?.billingInformation?.firstName || ""} ${
                    shipment?.order?.billingInformation?.lastName || ""
                  }`.trim()
                )}
              </p>

              {shipment?.order?.billingInformation
                ?.companyName && (
                <p>
                  {replaceNullWithPlaceholder(
                    shipment.order.billingInformation
                      .companyName
                  )}
                </p>
              )}

              <p>
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingInformation
                    ?.addressLine1
                )}
              </p>

              {shipment?.order?.billingInformation
                ?.addressLine2 && (
                <p>
                  {replaceNullWithPlaceholder(
                    shipment.order.billingInformation
                      .addressLine2
                  )}
                </p>
              )}

              <p>
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingInformation?.city
                )}
                ,{" "}
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingInformation?.state
                )}
              </p>

              <p>
                {replaceNullWithPlaceholder(
                  shipment?.order?.billingInformation
                    ?.country
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {replaceNullWithPlaceholder(
                shipment?.order?.billingInformation?.phone
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400 shrink-0" />

            <Link 
              href={`mailto:${replaceNullWithPlaceholder(shipment?.order?.billingInformation?.email)}`}
              className="text-[12px]! text-blue-400! break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {replaceNullWithPlaceholder(
                shipment?.order?.billingInformation?.email
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <IdCard className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {replaceNullWithPlaceholder(
                shipment?.shippingMethod
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0" />

            <span className="text-sm">
              {replaceNullWithPlaceholder(
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
  {shipment?.order?.products?.length > 0 ? (
    shipment.order.products.map((product: any, index: number) => (
      <div key={product?.id ?? index} className="flex items-start gap-2">
        <IdCard className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />

        <div className="text-sm min-w-0">
          <p className="font-medium">
            {replaceNullWithPlaceholder(product?.quantity, "0")} x{" "}

            <span
              onClick={() => {
                const availableStores = JSON.parse(
                  localStorage.getItem("availableStores") || "[]"
                );

                const selectedStoreId = Number(
                  localStorage.getItem("storeId")
                );

                const selectedStore = availableStores.find(
                  (s: any) => s.id === selectedStoreId
                );

                if (selectedStore?.baseUrl && product?.productUrl) {
                  const baseUrl = selectedStore.baseUrl.replace(/\/+$/, "");
                  const productUrl =
                    product.productUrl === "/"
                      ? ""
                      : product.productUrl.startsWith("/")
                        ? product.productUrl
                        : `/${product.productUrl}`;

                  window.open(
                    `${baseUrl}${productUrl}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                } else {
                  showAlert({
                    title: "Store or Product Not Found",
                    message: "Store URL or Product URL not found.",
                  });
                }
              }}
              className="text-[#6F8DFD]! font-light cursor-pointer hover:underline whitespace-normal break-words leading-snug"
            >
              {replaceNullWithPlaceholder(product?.name)}
            </span>
          </p>

          <p className="text-sm">
            {replaceNullWithPlaceholder(product?.brand?.name, "—")}
          </p>
          <p className="text-sm">
            {replaceNullWithPlaceholder(product?.sku, "—")}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">No shipped items found.</p>
  )}
</div>
      </div>
      <Alert />
    </div>
  );
};

export default ShipmentDetailRow;