"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  fetchOrderMessages,
  deleteOrderMessages,
  markMessageStatus,
  unreadMessageStatus,
  toggleFlagHeaders,
} from "@/redux/slices/orderMessageSlice";
import { useRouter, useParams } from "next/navigation";

const useOrderMessagesContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();

  const orderId = params?.orderId as string;

  const { messages, loading, error, order } = useAppSelector(
    (state: any) => state.orderMessage,
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderMessages({ orderId }));
    }
  }, [orderId, dispatch]);

  const isAllSelected =
    messages.length > 0 && selectedIds.length === messages.length;

  const handleSelectAll = (checked: boolean, allIds?: number[]) => {
    setSelectedIds(
      checked ? allIds ?? messages.map((message: any) => message.id) : [],
    );
  };

  const handleRowCheck = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked
        ? prev.includes(id)
          ? prev
          : [...prev, id]
        : prev.filter((item) => item !== id),
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) return;
    setShowDeleteModal(true);
  };

  const getRowActions = (message: any) => [
    {
      label: "Edit",
      onClick: () => {
        router.push(`/manage/orders/message/${orderId}/${message.id}`);
      },
    },
    {
      label: message?.isFlagged ? "Un-Flag" : "Flag",
      onClick: async () => {
        await dispatch(
          toggleFlagHeaders({
            messageId: [message.id],
            flag: !message?.isFlagged,
          }),
        );

        dispatch(fetchOrderMessages({ orderId }));
      },
    },
  ];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    return (
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      " @ " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const newMessageCount = messages.filter(
    (message: any) =>
      message.status === "unread" && message.from === "customer",
  ).length;

  const handleMarkRead = (messageId: number) => {
    dispatch(markMessageStatus({ messageId: [messageId] }))
      .unwrap()
      .finally(() => {
        dispatch(fetchOrderMessages({ orderId }));
      });
  };

  const handleMarkUnread = (messageId: number) => {
    dispatch(unreadMessageStatus({ messageId: [messageId] }))
      .unwrap()
      .finally(() => {
        dispatch(fetchOrderMessages({ orderId }));
      });
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteOrderMessages({ ids: selectedIds }));
    dispatch(fetchOrderMessages({ orderId }));
    setSelectedIds([]);
    setShowDeleteModal(false);
  };

  return {
    dispatch,
    router,
    orderId,
    messages,
    loading,
    error,
    order,
    selectedIds,
    setSelectedIds,
    showDeleteModal,
    setShowDeleteModal,
    isAllSelected,
    handleSelectAll,
    handleRowCheck,
    handleDeleteSelected,
    getRowActions,
    formatDate,
    newMessageCount,
    handleMarkRead,
    handleMarkUnread,
    handleConfirmDelete,
  };
};

export default useOrderMessagesContainer;