import { Input } from "@/components/ui/input";
import { ColumnDef } from "@/components/ui/Table/types";
import { formatDateTime } from "@/lib/utils";
import dayjs from "dayjs";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

type AllShipmentColumnProps = {
  isExpanded: (shipment: any) => boolean;
  onToggleExpand: (id: number) => void;

  isAllExpanded: boolean;
  onToggleExpandAll: () => void;

  trackingChanges: Record<number, string>;
  savingId: number | null;

  onTrackingChange: (id: number, value: string) => void;

  onSaveTracking: (shipment: any) => void;
};

const AllShipmentColumn = ({
  isExpanded,
  onToggleExpand,
  isAllExpanded,
  onToggleExpandAll,

  trackingChanges,
  savingId,

  onTrackingChange,
  onSaveTracking,
}: AllShipmentColumnProps): ColumnDef<any>[] => {
  return [

    {
      key: "expand",
      header: "",
      width: "40px",

      headClassName: "text-center!",
      className: "justify-items-center",

      render: (shipment) => {
        const expanded = isExpanded(shipment);

        return (
          <button type="button" onClick={() => onToggleExpand(shipment.id)}>
            {expanded ? (
              <FaCircleMinus className="h-7 w-7 fill-gray-600" />
            ) : (
              <FaCirclePlus className="h-7 w-7 fill-gray-600" />
            )}
          </button>
        );
      },
    },

 
    {
      key: "id",
      header: "Shipment ID",
      width: "140px",

      render: (shipment) => (
        <span className="2xl:!text-2xl whitespace-nowrap font-normal!">
          {shipment?.id ?? "N/A"}
        </span>
      ),
    },


    {
      key: "shippedTo",
      header: "Shipped to",
      width: "180px",

      render: (shipment) => (
        <span className="2xl:!text-2xl whitespace-nowrap font-normal! text-blue-400!">
          {shipment?.shippedTo || "N/A"}
        </span>
      ),
    },

   
    {
      key: "dateShipped",
      header: "Date shipped",
      width: "170px",

      render: (shipment) => (
        <span className="2xl:!text-2xl whitespace-nowrap font-normal!">
          {shipment?.dateShipped || "N/A"}
        </span>
      ),
    },


    {
      key: "trackingNumber",
      header: "Shipping tracking number",
      width: "350px",

      render: (shipment) => {
        const shipmentId = shipment?.id;

        const currentValue =
          trackingChanges[shipmentId] !== undefined
            ? trackingChanges[shipmentId]
            : shipment?.trackingNumber || "";

        const isSaving = savingId === shipmentId;

        return (
          <div className="flex items-center w-full">
            <Input
              value={currentValue}
              placeholder=""
              className="flex-1 min-w-0 font-normal!"
              onChange={(e) => onTrackingChange(shipmentId, e.target.value)}
            />

            <button
              type="button"
              className="btn-outline-primary whitespace-nowrap shrink-0 ml-2 2xl:h-[32.5px]"
              onClick={() => onSaveTracking(shipment)}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        );
      },
    },

 
    {
      key: "orderDate",
      header: "Order Date",
      width: "150px",

      render: (shipment) => {
        if (!shipment?.orderDate) {
          return (
            <span className="2xl:!text-2xl whitespace-nowrap font-normal!">
              N/A
            </span>
          );
        }

        return (
       <span className="2xl:!text-2xl whitespace-nowrap font-normal!">
  {formatDateTime(shipment.orderDate, "DD MMM YYYY")}
</span>
        );
      },
    },
  ];
};

export default AllShipmentColumn;
