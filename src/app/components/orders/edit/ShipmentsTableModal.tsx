"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Spinner from "../../loader/Spinner";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Clock, Globe, IdCard, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { fetchPackingSlipPdf, updateShipment } from "@/redux/slices/orderSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import OrderActionsDropdown from "../OrderActionsDropdown";
import Image from "next/image";

interface ShipmentModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    shipments: any[];
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    orderDetails?: any;
    counrtyShipping: any;
    counrtyBilling: any
}

export default function ShipmentsTableModal({
    open,
    onClose,
    onConfirm,
    title = "View Shipments",
    shipments = [],
    confirmText = "Close",
    cancelText = "Manage These Shipments",
    loading = false,
    orderDetails,
    counrtyShipping,
    counrtyBilling
}: ShipmentModalProps) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [trackingChanges, setTrackingChanges] = useState<
        Record<number, string>
    >({});
    const dispatch = useAppDispatch();

    const [savingId, setSavingId] = useState<number | null>(null);

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            document.body.style.pointerEvents = "";
        }, 100);
    };
    const toggleRow = (id: number) => {
        setExpandedRow((prev) => (prev === id ? null : id));
    };
    const orderActions = (shipment: any) => [
        {
            label: "Print Packaging Slip",
            onClick: async () => {
                try {
                    const shipmentId = shipment?.id;
                    const resultAction = await dispatch(
                        fetchPackingSlipPdf({ shipmentId })
                    );

                    if (fetchPackingSlipPdf.fulfilled.match(resultAction)) {
                        const blob = new Blob([resultAction.payload], {
                            type: "application/pdf",
                        });
                        const url = URL.createObjectURL(blob);
                        window.open(url, "_blank");
                    } else {
                    }
                } catch (error) {
                }
            },
        },
    ];
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="sm:max-w-[1100px] p-0 gap-0 rounded-none [&>button]:text-white [&>button]:top-3 [&>button]:right-3"
                onEscapeKeyDown={handleClose}
                onPointerDownOutside={handleClose}
            >
                {/* Header */}
                <DialogHeader className="bg-[#3d4977] px-4 py-3 rounded-none">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="!text-white text-4xl font-medium">
                            {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <div className="overflow-x-auto px-6 py-8  ">
                    <Table>
                        <TableHeader>
                            <TableRow>

                                <TableHead> </TableHead>
                                <TableHead >Shipment ID</TableHead>
                                <TableHead >Shipped to</TableHead>
                                <TableHead >Date shipped</TableHead>
                                <TableHead >Shipping tracking number</TableHead>
                                <TableHead >Order Date</TableHead>
                                <TableHead >Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-10">
                                        <Spinner />
                                    </TableCell>
                                </TableRow>
                            ) : shipments?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="text-center py-10 text-gray-500 text-xl"
                                    >
                                        No Shipment Found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                shipments?.map((shipment: any, idx: number) => (
                                    <>
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <button
                                                    onClick={() => toggleRow(shipment.id)}
                                                >
                                                    {expandedRow === shipment.id ? (
                                                        <FaCircleMinus className="h-7 w-7 fill-gray-600" />
                                                    ) : (
                                                        <FaCirclePlus className="h-7 w-7 fill-gray-600" />
                                                    )}
                                                </button>
                                            </TableCell>
                                            <TableCell className="2xl:!text-2xl">{shipment.id}</TableCell>

                                            <TableCell className="text-blue-600 2xl:!text-2xl">
                                                {shipment.shippedTo}
                                            </TableCell>
                                            <TableCell className="2xl:!text-2xl">
                                                {new Date(shipment.dateShipped).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </TableCell>
                                            <TableCell className="gap-1">
                                                <Input
                                                    placeholder=""
                                                    value={
                                                        trackingChanges[shipment.id] !== undefined
                                                            ? trackingChanges[shipment.id]
                                                            : shipment.trackingNumber
                                                    }
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setTrackingChanges((prev) => ({
                                                            ...prev,
                                                            [shipment.id]: newValue,
                                                        }));
                                                    }}
                                                />

                                                <button
                                                    className="btn-outline-primary 2xl:h-[32.5px] ml-2.5"
                                                    onClick={() => {
                                                        const updatedValue = trackingChanges[shipment?.id];
                                                        if (updatedValue !== undefined) {
                                                            setSavingId(shipment?.id);
                                                            dispatch(
                                                                updateShipment({
                                                                    id: shipment?.id,
                                                                    data: { trackingId: updatedValue },
                                                                })
                                                            );
                                                        }
                                                    }}
                                                    disabled={savingId === shipment?.id}
                                                >
                                                    {savingId === shipment?.id ? "Saving..." : "Save"}
                                                </button>
                                            </TableCell>

                                            <TableCell className="2xl:!text-2xl">
                                                {new Date(shipment.orderDate).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <OrderActionsDropdown
                                                    actions={orderActions(shipment)}
                                                    trigger={
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-xl cursor-pointer"
                                                        >
                                                            •••
                                                        </Button>
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {expandedRow === shipment.id && (
                                            <TableRow>
                                                <TableCell colSpan={11}>
                                                    <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6">
                                                        {/* Billing */}
                                                        <div className="flex gap-4">
                                                            <div className="flex flex-col items-start gap-2 min-w-[70px]">
                                                                <h4 className="font-bold text-lg ">Billing</h4>
                                                                <button
                                                                    className="btn-outline-primary text-sm"
                                                                    onClick={() => {
                                                                        const b = orderDetails?.billingInformation;
                                                                        navigator.clipboard.writeText(
                                                                            `${b?.firstName} ${b?.lastName}\n${b?.companyName}\n${b?.addressLine1} ${b?.addressLine2}\n${b?.city}, ${b?.state} ${b?.zip}`
                                                                        );
                                                                    }}
                                                                >
                                                                    Copy
                                                                </button>
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <p className="font-semibold">
                                                                    {orderDetails?.billingInformation?.firstName} {orderDetails?.billingInformation?.lastName}
                                                                </p>
                                                                <p>{orderDetails?.billingInformation?.companyName}</p>
                                                                <p>{orderDetails?.billingInformation?.addressLine1} {orderDetails?.billingInformation?.addressLine2}</p>
                                                                <p>{orderDetails?.billingInformation?.city}, {orderDetails?.billingInformation?.state} {orderDetails?.billingInformation?.zip}</p>
                                                                <div className="flex items-center gap-2">
                                                                    {/* <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" /> */}
                                                                    {counrtyBilling?.flag ? (
                                                                        <Image
                                                                            src={counrtyBilling?.flag as string}
                                                                            width={22}
                                                                            height={22}
                                                                            className="rounded-sm object-cover"
                                                                            alt={counrtyBilling?.label || ""}
                                                                        />
                                                                    ) : (
                                                                        <span className="">🏳️</span>
                                                                    )}
                                                                    <span>{orderDetails?.billingInformation?.country || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{orderDetails?.billingInformation?.phone || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{orderDetails?.billingInformation?.email || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <IdCard className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>#{orderDetails?.billingInformation?.customerId || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>
                                                                        {orderDetails?.billingInformation?.createdAt
                                                                            ? new Date(orderDetails.billingInformation.createdAt).toLocaleString("en-GB", {
                                                                                day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
                                                                            })
                                                                            : "N/A"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Shipping */}
                                                        <div className="flex gap-4">
                                                            <div className="flex flex-col items-start gap-2 min-w-[80px]">
                                                                <h4 className="font-bold text-lg ">Shipping</h4>
                                                                <button
                                                                    className="btn-outline-primary text-sm"
                                                                    onClick={() => {
                                                                        const b = orderDetails?.billingInformation;
                                                                        navigator.clipboard.writeText(
                                                                            `${b?.firstName} ${b?.lastName}\n${b?.companyName}\n${b?.addressLine1} ${b?.addressLine2}\n${b?.city}, ${b?.state} ${b?.zip}`
                                                                        );
                                                                    }}
                                                                >
                                                                    Copy
                                                                </button>
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <p className="font-semibold">
                                                                    {orderDetails?.billingInformation?.firstName} {orderDetails?.billingInformation?.lastName}
                                                                </p>
                                                                <p>{orderDetails?.billingInformation?.companyName}</p>
                                                                <p>{orderDetails?.billingInformation?.addressLine1} {orderDetails?.billingInformation?.addressLine2}</p>
                                                                <p>{orderDetails?.billingInformation?.city}, {orderDetails?.billingInformation?.state} {orderDetails?.billingInformation?.zip}</p>
                                                                <div className="flex items-center gap-2">
                                                                    {/* <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" /> */}
                                                                    {counrtyShipping?.flag ? (
                                                                        <Image
                                                                            src={counrtyShipping?.flag as string}
                                                                            width={22}
                                                                            height={22}
                                                                            className="rounded-sm object-cover"
                                                                            alt={counrtyShipping?.label || ""}
                                                                        />
                                                                    ) : (
                                                                        <span className="">🏳️</span>
                                                                    )}
                                                                    <span>{orderDetails?.billingInformation?.country || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{orderDetails?.billingInformation?.phone || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{orderDetails?.customer?.email || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <IdCard className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{shipment?.shippingMethod || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{shipment?.dateShipped || "N/A"}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <IdCard className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                                    <span>{shipment?.trackingNumber || "N/A"}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Shipped Items */}
                                                        {/* <div className="flex gap-4">
                                                            <div className="flex flex-col items-start min-w-[80px]">
                                                                <h4 className="font-bold text-lg italic">Shipped</h4>
                                                                <h4 className="font-bold text-lg italic">Items</h4>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {shipment?.orderProducts?.length || 0} items
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-col space-y-3 flex-1">
                                                                {shipment?.orderProducts?.map((item: any, idx: number) => (
                                                                    <div key={idx}>
                                                                        <p className="font-semibold">{item?.quantity} x</p>
                                                                        <p className="text-blue-600 text-sm leading-snug">{item?.productName}</p>
                                                                        <p className="text-sm text-gray-500 mt-0.5">{item?.sku || ""}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div> */}
                                                        {/* Shipped Items */}
                                                        <div className="flex gap-4 min-w-0">
                                                            <div className="flex flex-col items-start min-w-[70px] flex-shrink-0">
                                                                <h4 className="font-bold text-lg ">Shipped</h4>
                                                                <h4 className="font-bold text-lg ">Items</h4>
                                                                <p className="text-sm text-gray-500 mt-1">
                                                                    {shipment?.orderProducts?.length || 0} items
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-col space-y-3 flex-1 min-w-0 overflow-hidden">
                                                                {shipment?.orderProducts?.map((item: any, idx: number) => (
                                                                    <div key={idx} className="min-w-0">
                                                                        <p className="font-semibold">{item?.quantity} x</p>
                                                                        <p className="text-blue-600 text-sm leading-snug break-words ">
                                                                            {item?.productName}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 mt-0.5">{item?.sku || ""}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>


                {/* Footer */}
                <DialogFooter className="bg-gray-100 px-4 py-3 rounded-none flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="btn-outline-primary  2xl:!text-2xl h-12"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            handleClose();
                        }}
                        disabled={loading}
                        className="btn-outline-primary 2xl:!text-2xl h-12 !text-white !bg-[#64a2e4]  border-none"
                    >
                        {loading ? "..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}