import Link from "next/link";
import { StickyNote } from "lucide-react";


export const renderExpandedRow = (
  customer: any,
  setSelectedOrderId: (id: number | null) => void,
  setShowCustomerNotes: (show: boolean) => void,
) => (
  <div className="grid grid-cols-[15%_40%_45%] bg-gray-50 p-4">
    <div className="border-r pr-4 !text-right">
      <h4 className="font-semibold text-[16px]">Current Orders</h4>
    </div>

    <div className="px-4">
      {customer?.currentOrders?.length > 0 ? (
        customer.currentOrders.map((order: any) => (
          <div key={order.id} className="mb-8">
            <Link
              href={`/manage/orders?orderIdFrom=${order?.id}&orderIdTo=${order?.id}&expand=${order?.id}`}
            >
              <h4 className="text-[15px] relative left-[85px] font-medium text-gray-900 mb-3 cursor-pointer">
                Order{" "}
                <span className="!text-blue-600 !text-[15px] hover:underline">
                  #{order.orderNumber}
                </span>
              </h4>
            </Link>

            <div className="grid grid-cols-[120px_1fr] gap-y-2">
              <span className="text-right pr-4 font-medium text-gray-600">
                Status
              </span>

              <span className="border-l-4 border-cyan-400 pl-2 font-medium text-gray-600">
                {order.status}
              </span>

              <span className="text-right pr-4 font-medium text-gray-600">
                Order total
              </span>

              <span className="font-medium text-gray-600">
                ${order.totalAmount}
              </span>

              <span className="text-right pr-4 font-medium text-gray-600">
                Date ordered
              </span>

              <span className="font-medium text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

              <span className="flex items-center justify-end pr-4 text-gray-600">
                <StickyNote size={16} strokeWidth={1.5} />
              </span>

              <span
                onClick={() => {
                  setSelectedOrderId(order?.id);
                  setShowCustomerNotes(true);
                }}
                className="!text-blue-600 font-medium cursor-pointer hover:underline"
              >
                View Notes
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No current orders</p>
      )}
    </div>

    <div className="px-4">
      <div className="flex items-stretch">
        <h4 className="font-semibold text-[12px] whitespace-nowrap pr-3">
          Past Orders
        </h4>

        <div className="border-l border-gray-200 pl-3">
          {customer?.pastOrders?.length > 0 ? (
            customer.pastOrders.map((order: any) => (
              <div key={order.id} className="flex items-center h-8">
                <Link
                  href={`/manage/orders?orderIdFrom=${order?.id}&orderIdTo=${order?.id}&expand=${order?.id}`}
                >
                  <span className="whitespace-nowrap pr-2 cursor-pointer">
                    Order{" "}
                    <span className="!text-blue-600 hover:underline">
                      #{order.orderNumber}
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrderId(order?.id);
                    setShowCustomerNotes(true);
                  }}
                  className="flex items-center gap-2 !text-blue-600 cursor-pointer whitespace-nowrap"
                >
                  <StickyNote
                    size={18}
                    strokeWidth={1.5}
                    className="text-gray-500"
                  />

                  <span className="!text-blue-600">View Notes</span>
                </button>
              </div>
            ))
          ) : (
            <p>No past orders</p>
          )}
        </div>
      </div>
    </div>
  </div>
);