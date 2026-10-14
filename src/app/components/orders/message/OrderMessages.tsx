"use client";

import { Button } from "@/components/ui/button";
import Table from "@/components/ui/Table/Table";
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";

import useOrderMessagesContainer from "./OrderMessagesContainer";
import OrderMessagesColumn from "./OrderMessagesColumn";

export default function OrderMessages() {
  const {
    router,
    orderId,
    messages,
    loading,
    error,
    selectedIds,
    showDeleteModal,
    setShowDeleteModal,
    handleSelectAll,
    handleRowCheck,
    handleDeleteSelected,
    getRowActions,
    formatDate,
    newMessageCount,
    handleMarkRead,
    handleMarkUnread,
    handleConfirmDelete,
  } = useOrderMessagesContainer();

  const columns = OrderMessagesColumn({
    getRowActions,
    formatDate,
    handleMarkRead,
    handleMarkUnread,
  });

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="!text-5xl 2xl:!text-[3.2rem] !font-extralight !text-gray-600 !my-5">
        View Messages for Order #{orderId}
      </h1>

      <p className="text-gray-500 !text-xl 2xl:!text-[1.4rem] mb-6">
        There are {messages.length} messages
        {newMessageCount > 0 && ` (${newMessageCount} new)`} for order #
        {orderId}. Click the 'Send Message' button to send a message to the
        customer about this order.
      </p>

      <div className="bg-white p-4 shadow-md">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <button
            className="btn-outline-primary"
            onClick={() =>
              router.push(`/manage/orders/message/${orderId}/add`)
            }
          >
            Send a Message
          </button>

          <button
            className="btn-outline-primary"
            onClick={handleDeleteSelected}
            disabled={!selectedIds.length}
          >
            Delete Selected
          </button>

          <button
            className="btn-outline-primary"
            onClick={() =>
              router.push(
                `/manage/orders?orderIdFrom=${orderId}&orderIdTo=${orderId}&expand=${orderId}`,
              )
            }
          >
            View Orders
          </button>
        </div>

        <Table<any>
          bare
          data={messages}
          columns={columns}
          getRowId={(message) => message.id}
          loading={loading}
          error={error}
          emptyMessage="No messages yet."
          selectAllInHeader
          hideRecordCount
          selectedIds={selectedIds}
          onToggleRow={(id, checked) =>
            handleRowCheck(Number(id), checked)
          }
          onToggleAll={(checked, allIds) =>
            handleSelectAll(checked, allIds?.map(Number))
          }
        />
      </div>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        variant="warning"
        title="Delete messages?"
        description={`Are you sure you want to delete ${selectedIds.length} message?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}