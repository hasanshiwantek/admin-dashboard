"use client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
// import OrderActionsDropdown from "../../orders/OrderActionsDropdown";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
    fetchOrderMessages,
    deleteOrderMessages,
    markMessageStatus,
    unreadMessageStatus,
} from "@/redux/slices/orderMessageSlice";
// import Spinner from "../../loader/Spinner";
import { useRouter, useParams } from "next/navigation";
import OrderActionsDropdown from "../OrderActionsDropdown";

export default function OrderMessages() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useParams();

    const orderId = params?.orderId as string;

    const { messages, loading, error, order } = useAppSelector(
        (state: any) => state.orderMessage
    );

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderMessages({ orderId }));
        }
    }, [orderId]);

    // ── Selection helpers ────────────────────────────────────────────────────
    const isAllSelected =
        messages.length > 0 && selectedIds.length === messages.length;

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? messages.map((m: any) => m.id) : []);
    };

    const handleRowCheck = (id: number, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
        );
    };

    // ── Bulk delete ──────────────────────────────────────────────────────────
    const handleDeleteSelected = async () => {
        if (!selectedIds.length) return;
        const ok = window.confirm(`Delete ${selectedIds.length} message(s)?`);
        if (!ok) return;
        await dispatch(deleteOrderMessages({ ids: selectedIds, orderId }));
        dispatch(fetchOrderMessages({ orderId }));
        setSelectedIds([]);
    };

    // ── Row dropdown ─────────────────────────────────────────────────────────
    const getRowActions = (message: any) => [
        {
            label: "Edit",
            onClick: async () => {
                router.push(`/manage/orders/message/${orderId}/${message.id}`)
            },
        },
        {
            label: "Flag",
            onClick: () => {

                // toggle read/unread action
            },
        },
    ];

    // ── Date formatter ───────────────────────────────────────────────────────
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }) + " @ " + date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const newMessageCount = messages.filter((m: any) => m.status === "unread" && m.from === "customer").length;

    if (error) {
        return (
            <div className="text-center py-10 text-red-500 text-lg">
                Error: {error}
            </div>
        );
    }

    return (
        <div>
            {/* ── Page header ── */}
            <h1 className="!text-5xl 2xl:!text-[3.2rem] !font-extralight !text-gray-600 !my-5">
                View Messages for Order #{orderId}
            </h1>
            <p className="text-gray-500 !text-xl 2xl:!text-[1.4rem] mb-6">
                There are {messages.length} messages
                {newMessageCount > 0 && ` (${newMessageCount} new)`} for order #{orderId}.
                Click the 'Send Message' button to send a message to the customer about this order.
            </p>

            <div className="bg-white p-4 shadow-md">
                {/* ── Toolbar ── */}
                <div className="flex flex-wrap gap-3 items-center mb-4">
                    <button
                        className="btn-outline-primary"
                        onClick={() => router.push(`/manage/orders/message/${orderId}/add`)}
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
                        onClick={() => router.push(`/manage/orders/${orderId}`)}
                    >
                        View Orders
                    </button>
                </div>

                {/* ── Table ── */}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-10">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={(checked: boolean) =>
                                        handleSelectAll(checked)
                                    }
                                />
                            </TableHead>
                            {/* empty col for envelope icon */}
                            <TableHead className="w-8" />
                            <TableHead className="!text-xl 2xl:!text-[1.4rem] font-semibold text-gray-700">
                                Subject
                            </TableHead>
                            <TableHead className="!text-xl 2xl:!text-[1.4rem] font-semibold text-gray-700">
                                Message
                            </TableHead>
                            <TableHead className="!text-xl 2xl:!text-[1.4rem] font-semibold text-gray-700">
                                From
                            </TableHead>
                            <TableHead className="!text-xl 2xl:!text-[1.4rem] font-semibold text-gray-700">
                                Date Sent
                            </TableHead>
                            <TableHead className="!text-xl 2xl:!text-[1.4rem] font-semibold text-gray-700">
                                Status
                            </TableHead>
                            <TableHead className="!text-xl 2xl:!text-[1.4rem] font-semibold text-gray-700">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-10">
                                    {/* <Spinner /> */}
                                </TableCell>
                            </TableRow>
                        ) : messages.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center py-10 text-gray-500 !text-xl"
                                >
                                    No messages yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            messages.map((message: any) => {
                                const isUnread = message.isRead ? true : false
                                const isFromCustomer = message.from === "[Customer]";

                                return (
                                    <TableRow
                                        key={message.id}
                                        className="hover:bg-gray-50 align-top"
                                    >
                                        {/* Checkbox */}
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedIds.includes(message.id)}
                                                onCheckedChange={(checked: boolean) =>
                                                    handleRowCheck(message.id, checked)
                                                }
                                            />
                                        </TableCell>

                                        {/* Envelope icon */}
                                        <TableCell className="py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 text-blue-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                                                />
                                            </svg>
                                        </TableCell>

                                        {/* Subject */}
                                        <TableCell className="py-2">
                                            <span
                                                className={`!text-xl 2xl:!text-[1.4rem] ${isUnread && isFromCustomer ? "font-semibold text-gray-900" : "text-gray-700"}`}
                                            >
                                                {message.subject}
                                            </span>
                                        </TableCell>

                                        {/* Message body */}
                                        <TableCell className="py-2 max-w-[400px]">
                                            <p className="!text-xl 2xl:!text-[1.4rem] text-gray-600 whitespace-pre-line break-words leading-snug">
                                                {message.message}
                                            </p>
                                        </TableCell>

                                        {/* From */}
                                        <TableCell className="!text-xl 2xl:!text-[1.4rem] text-gray-600">
                                            {isFromCustomer ? "[Customer]" : message.from}
                                        </TableCell>

                                        {/* Date Sent */}
                                        <TableCell className="!text-xl 2xl:!text-[1.4rem] text-gray-600 whitespace-nowrap">
                                            {formatDate(message.createdAt)}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="!text-xl 2xl:!text-[1.4rem] text-gray-600">
                                            {isFromCustomer ? (
                                                isUnread ? (
                                                    <span>
                                                        Unread
                                                        <button onClick={() => {
                                                            dispatch(unreadMessageStatus({ messageId: [message.id] })).unwrap().finally(() => {
                                                                dispatch(fetchOrderMessages({ orderId }))
                                                            })
                                                        }} className="text-blue-500 hover:underline ml-1 text-base">
                                                            (Mark as read)
                                                        </button>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        Read
                                                        <button onClick={() => {
                                                            dispatch(markMessageStatus({ messageId: [message.id] })).unwrap().finally(() => {
                                                                dispatch(fetchOrderMessages({ orderId }))
                                                            })
                                                        }} className="text-blue-500 hover:underline ml-1 text-base">
                                                            (Mark as unread)
                                                        </button>
                                                    </span>
                                                )
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </TableCell>

                                        {/* Action dropdown */}
                                        <TableCell>
                                            <OrderActionsDropdown
                                                actions={getRowActions(message)}
                                                trigger={
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="cursor-pointer"
                                                    >
                                                        <Ellipsis className="!w-7 !h-7" />
                                                    </Button>
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}