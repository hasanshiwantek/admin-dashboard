import { ColumnDef } from "@/components/ui/Table/types";
import { Flag, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderActionsDropdown from "../OrderActionsDropdown";

interface OrderMessagesColumnProps {
  getRowActions: (message: any) => any[];
  formatDate: (date: string) => string;
  handleMarkRead: (messageId: number) => void;
  handleMarkUnread: (messageId: number) => void;
}

export default function OrderMessagesColumn({
  getRowActions,
  formatDate,
  handleMarkRead,
  handleMarkUnread,
}: OrderMessagesColumnProps): ColumnDef<any>[] {
  return [
    {
      key: "subject",
      header: "Subject",
      width: "175px",
      render: (message) => {
        const isUnread = message.isRead == 0;
        const isFromCustomer = message.from === "[Customer]";

        return (
          <span
            className={`text-xl 2xl:text-[1.4rem] ${
              isUnread && isFromCustomer
                ? "font-semibold text-gray-900"
                : "text-gray-700"
            }`}
          >
            {message.subject}
          </span>
        );
      },
    },
    {
      key: "flag",
      header: "",
      width: "50px",
      render: (message) =>
        message.isFlagged ? (
          <Flag className="w-6 h-6 text-red-500" />
        ) : null,
    },
    {
      key: "message",
      header: "Message",
      width: "250px",
      render: (message) => (
        <p className="text-xl 2xl:text-[1.4rem] text-gray-600 whitespace-pre-line break-words leading-snug">
          {message.message}
        </p>
      ),
    },
    {
      key: "from",
      header: "From",
      width: "110px",
      render: (message) => (
        <span className="text-xl 2xl:text-[1.4rem] text-gray-600">
          {message.from === "[Customer]"
            ? "[Customer]"
            : message?.senderType}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date Sent",
      width: "170px",
      render: (message) => (
        <span className="text-xl! 2xl:text-[1.4rem]! text-gray-600 whitespace-nowrap">
          {formatDate(message.createdAt)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "180px",
      render: (message) => {
        const isUnread = message.isRead == 0;
        const isFromCustomer = message.from === "[Customer]";

        if (!isFromCustomer) {
          return <span className="text-gray-400">N/A</span>;
        }

        return (
          <span className="text-xl 2xl:text-[1.4rem] text-gray-600">
            {isUnread ? "Unread" : "Read"}

            <button
              onClick={() =>
                isUnread
                  ? handleMarkRead(message.id)
                  : handleMarkUnread(message.id)
              }
              className="text-blue-500 hover:underline ml-1 text-base"
            >
              {isUnread ? "(Mark as read)" : "(Mark as unread)"}
            </button>
          </span>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      width: "70px",
      render: (message) => (
        <OrderActionsDropdown
          actions={getRowActions(message)}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
            >
              <Ellipsis className="w-7! h-7!" />
            </Button>
          }
        />
      ),
    },
  ];
}