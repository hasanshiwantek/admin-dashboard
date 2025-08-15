"use client";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import OrderActionsDropdown from "../OrderActionsDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchAllOrders, fetchAllShipments, updateOrderStatus } from "@/redux/slices/orderSlice";
import { refetchOrders } from "@/lib/orderUtils";
import Spinner from "../../loader/Spinner";
import { MdDelete } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import Link from "next/link";

const Shipments = () => {

    const [shipments, setShipments] = useState({
        data: [
            { id: 20, shippedTo: "Diana Newton", dateShipped: "2025-05-20", trackingNumber: "TQ754407595GB", orderDate: "2025-03-26" },
            { id: 19, shippedTo: "Sam Anthony", dateShipped: "2025-03-27", trackingNumber: "772564564865", orderDate: "2025-03-05" },
            { id: 18, shippedTo: "Jim Smith", dateShipped: "2025-03-04", trackingNumber: "1ZAV27996847025224", orderDate: "2025-02-26" },
            { id: 17, shippedTo: "Dave Anderton", dateShipped: "2025-02-07", trackingNumber: "771835789150", orderDate: "2025-01-28" },
        ],
        pagination: { total: 4, totalPages: 1, page: 1, pageSize: 20 },
    });

    const dispatch = useAppDispatch();
    //   const shipments = useAppSelector((state: any) => state.order.shipments);
    const pagination = shipments?.pagination;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState("50");
    const [activeTab, setActiveTab] = useState("All shipments");
    const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
    const total = pagination?.total;
    const totalPages = pagination?.totalPages;

    console.log("Orders Pagination: ", pagination);

    const { loading, error } = useAppSelector((state) => state.order);
    //   console.log("Orders data from frontend: ", orders);

    console.log("Shipments data from backend", shipments)

    useEffect(() => {
        dispatch(fetchAllShipments({ page: currentPage, perPage }));
    }, [dispatch, currentPage, perPage]);


    //   const filteredOrders = shipments?.data?.filter((order: any) => {
    //     if (activeTab === "All orders") return true;
    //     return order.status === activeTab;
    //   });

    const filteredOrders = shipments.data;
    console.log("Filtered Orders: ", filteredOrders);


    const tabs = [
        "All shipments",
        "Custom Views",
    ];


    // Handle single row checkbox change
    const handleOrderCheckboxChange = (order: any, checked: boolean) => {
        if (checked) {
            setSelectedOrderIds((prev) => [...prev, order.id]);
            console.log("Selected Order:", order);
        } else {
            setSelectedOrderIds((prev) => prev.filter((id) => id !== order.id));
            console.log("Unselected Order ID:", order.id);
        }
    };

    // Handle "Select All" checkbox
    const handleSelectAllChange = (checked: boolean, orders: any[]) => {
        if (checked) {
            const allIds = orders.map((order) => order.id);
            setSelectedOrderIds(allIds);
            console.log("Selected All IDs:", allIds);
        } else {
            setSelectedOrderIds([]);
            console.log("Deselected All");
        }
    };

    const handlePrintInvoice = () => {
        console.log("Printing invoice...");
    };

    const orderActions = [
        { label: "Print Packaging Slip", onClick: handlePrintInvoice },
    ];

    const handleSearch = () => {
        console.log("Search Clicked")
    }

    const handleTracking = () => {
        console.log("Tracking saved succesfully. ")
    }

    return (
        <div className=" bg-[var(--store-bg)] min-h-screen mt-20">
            {/* Tabs */}
            <div className="flex space-x-6 border-b pb-2 mb-4 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`!text-2xl pb-1 border-b-2 whitespace-nowrap ${activeTab === tab
                                ? "border-blue-600 text-blue-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-black"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Top Actions */}
            <div className="bg-white p-4 shadow-sm">
                <div className="flex flex-wrap gap-3 items-center mb-1">
                    <button className="btn-outline-primary">
                        <MdDelete className="h-7 w-7" />
                    </button>
                    <button className="btn-outline-primary">Export all</button>

                    <div className="flex items-center border rounded">
                        <Input
                            placeholder="Filter by keyword"
                            className="border-0 focus:ring-0"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button className="btn-outline-primary"
                            onClick={handleSearch}>
                            <IoFilterOutline />
                        </button>

                    </div>
                    <button className="btn-outline-primary">Search</button>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end my-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        perPage={perPage}
                        onPerPageChange={setPerPage}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto  rounded-md shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={
                                            filteredOrders?.length > 0 &&
                                            filteredOrders?.every((order: any) =>
                                                selectedOrderIds.includes(order.id)
                                            )
                                        }
                                        onCheckedChange={(checked) =>
                                            handleSelectAllChange(checked as boolean, filteredOrders)
                                        }
                                    />
                                </TableHead>
                                <TableHead>  </TableHead>
                                <TableHead>Shipment ID</TableHead>
                                <TableHead>Shipped to</TableHead>
                                <TableHead>Date shipped</TableHead>
                                <TableHead>Shipping tracking number</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-10">
                                        <Spinner />
                                    </TableCell>
                                </TableRow>
                            ) : filteredOrders?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="text-center py-10 text-gray-500 text-xl"
                                    >
                                        No Shipment Found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOrders?.map((shipment: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedOrderIds.includes(shipment.id)}
                                                onCheckedChange={(checked) =>
                                                    handleOrderCheckboxChange(shipment, checked as boolean)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell> <FaCirclePlus /> </TableCell>
                                        <TableCell>
                                            {shipment.id}
                                        </TableCell>

                                        <TableCell className="text-blue-600">{shipment.shippedTo}</TableCell>
                                        <TableCell>{shipment.dateShipped}</TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder=""
                                                className=" focus:ring-0"
                                                value={shipment.trackingNumber}
                                                onChange={(e) =>
                                                    setShipments((prev) => ({
                                                        ...prev,
                                                        data: prev.data.map((s) =>
                                                            s.id === shipment.id ? { ...s, trackingNumber: e.target.value } : s
                                                        ),
                                                    }))
                                                }
                                            />
                                            <button className="btn-outline-primary"
                                                onClick={handleTracking}>
                                                Save
                                            </button>
                                        </TableCell>

                                        <TableCell>
                                            {new Date(shipment.orderDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short", 
                                                year: "numeric",
                                            })}
                                        </TableCell>

                                        <TableCell>
                                            <OrderActionsDropdown
                                                actions={orderActions}
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end text-sm bg-[#fbfbfc]">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        perPage={perPage}
                        onPerPageChange={setPerPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shipments;