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
import {
  fetchAllOrders,
  fetchAllShipments,
  updateOrderStatus,
} from "@/redux/slices/orderSlice";
import { refetchOrders } from "@/lib/orderUtils";
import Spinner from "../../loader/Spinner";
import { MdDelete } from "react-icons/md";
import { IoFilterOutline } from "react-icons/io5";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import Link from "next/link";
import {
  Globe,
  Phone,
  Mail,
  Clock,
  Calendar,
  LocationEdit,
  DollarSign,
  IdCard,
} from "lucide-react";
import SearchShipments from "./SearchShipments";
import ExportShipmentsDialog from "./ExportShipmentsDialog";

type Props = { onSearchModeChange?: (isSearch: boolean) => void };
const Shipments = ({ onSearchModeChange }: Props) => {
  const [shipments, setShipments] = useState({
    data: [
      {
        id: 20,
        shippedTo: "Diana Newton",
        dateShipped: "2025-05-20",
        trackingNumber: "TQ754407595GB",
        orderDate: "2025-03-26",
        billing: {
          name: "Diana Newton",
          company: "The National Archives",
          address: "Kew, Richmond, Surrey TW9 4DU",
          country: "United Kingdom",
          phone: "02039089237",
          email: "diana.newton@tna.gov.uk",
          customerId: "#500040",
          updatedAt: "2025-03-26 09:33:58",
        },
        shipping: {
          name: "Diana Newton",
          carrier: "Royal Mail",
          service: "Tracked 24",
          address: "Kew, Richmond, Surrey TW9 4DU, UK",
        },
        shippedItems: {
          qty: 1,
          title: "PCIe Adapter 9207-41E",
          sku: "9207-41E",
        },
      },
      {
        id: 19,
        shippedTo: "Sam Anthony",
        dateShipped: "2025-03-27",
        trackingNumber: "772564564865",
        orderDate: "2025-03-05",
        billing: {
          name: "Sam Anthony",
          company: "Acme Data Ltd",
          address: "12 King St, Manchester M2 4WU",
          country: "United Kingdom",
          phone: "0161 555 8811",
          email: "sam@acmedata.co.uk",
          customerId: "#500041",
          updatedAt: "2025-03-27 11:02:10",
        },
        shipping: {
          name: "Sam Anthony",
          carrier: "DPD",
          service: "Next Day",
          address: "12 King St, Manchester M2 4WU, UK",
        },
        shippedItems: { qty: 1, title: "SSD 2TB NVMe", sku: "SSD-2TB-NV" },
      },
      {
        id: 18,
        shippedTo: "Jim Smith",
        dateShipped: "2025-03-04",
        trackingNumber: "1ZAV27996847025224",
        orderDate: "2025-02-26",
        billing: {
          name: "Jim Smith",
          company: "Globex Corp",
          address: "45 Market Rd, Bristol BS1 4QA",
          country: "United Kingdom",
          phone: "0117 444 2200",
          email: "jim.smith@globex.com",
          customerId: "#500042",
          updatedAt: "2025-03-04 15:21:03",
        },
        shipping: {
          name: "Jim Smith",
          carrier: "UPS",
          service: "Standard",
          address: "45 Market Rd, Bristol BS1 4QA, UK",
        },
        shippedItems: { qty: 3, title: "Cat6 Patch Cable 2m", sku: "CAT6-2M" },
      },
      {
        id: 17,
        shippedTo: "Dave Anderton",
        dateShipped: "2025-02-07",
        trackingNumber: "771835789150",
        orderDate: "2025-01-28",
        billing: {
          name: "Dave Anderton",
          company: "Wayne Tech",
          address: "100 Park Ave, London W1A 1AA",
          country: "United Kingdom",
          phone: "0207 123 9000",
          email: "dave@waynetech.com",
          customerId: "#500043",
          updatedAt: "2025-02-07 10:05:44",
        },
        shipping: {
          name: "Dave Anderton",
          carrier: "FedEx",
          service: "Priority",
          address: "100 Park Ave, London W1A 1AA, UK",
        },
        shippedItems: { qty: 1, title: "Rackmount Kit 1U", sku: "RMK-1U" },
      },
    ],
    pagination: { total: 4, totalPages: 1, page: 1, pageSize: 20 },
  });
  const [showSearch, setShowSearch] = useState(false);

  // example data for this row
  const billing = {
    name: "Diana Newton",
    org: "The National Archives",
    addr: "Kew, Richmond, Surrey TW9 4DU",
    country: "United Kingdom",
    phone: "02039089237",
    email: "diana.newton@nationalarchives.gov.uk",
    customerId: "#500040",
    updatedAt: "26 Mar 2025 09:33:58",
  };

  const copyBilling = async () => {
    const text = `Billing
${billing.name}
${billing.org}
${billing.addr}
Country: ${billing.country}
Phone: ${billing.phone}
Email: ${billing.email}
Customer ID: ${billing.customerId}
Updated: ${billing.updatedAt}`;
    await navigator.clipboard.writeText(text);
    // toast("Billing copied"); // optional
  };

  const dispatch = useAppDispatch();
  //   const shipments = useAppSelector((state: any) => state.order.shipments);
  const pagination = shipments?.pagination;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("50");
  const [activeTab, setActiveTab] = useState("All shipments");
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const total = pagination?.total;
  const totalPages = pagination?.totalPages;

  console.log("Orders Pagination: ", pagination);

  const { loading, error } = useAppSelector((state) => state.order);
  //   console.log("Orders data from frontend: ", orders);

  console.log("Shipments data from backend", shipments);

  useEffect(() => {
    dispatch(fetchAllShipments({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  //   const filteredOrders = shipments?.data?.filter((order: any) => {
  //     if (activeTab === "All orders") return true;
  //     return order.status === activeTab;
  //   });

  const filteredOrders = shipments.data;
  console.log("Filtered Orders: ", filteredOrders);

  const tabs = ["All shipments", "Custom Views"];

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
    setShowSearch(true);
    onSearchModeChange?.(true);
  };

  const handleTracking = () => {
    console.log("Tracking saved succesfully. ");
  };

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const closeSearch = () => { setShowSearch(false); onSearchModeChange?.(false); };

  const handleExport = (format: 'csv' | 'xml') => {
  const rows = shipments?.data || [];
  if (!rows.length) return;

  const download = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  if (format === 'csv') {
    const esc = (v: any) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const header = ['Shipment ID','Shipped To','Date Shipped','Tracking Number','Order Date'];
    const lines = rows.map((r: any) =>
      [r.id, r.shippedTo, r.dateShipped, r.trackingNumber, r.orderDate].map(esc).join(',')
    );
    download([header.join(','), ...lines].join('\n'), 'text/csv;charset=utf-8;', 'shipments.csv');
  } else {
    const e = (v: any) => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const xml = `<?xml version="1.0" encoding="UTF-8"?><shipments>${
      rows.map((r: any) => `
        <shipment>
          <id>${e(r.id)}</id>
          <shippedTo>${e(r.shippedTo)}</shippedTo>
          <dateShipped>${e(r.dateShipped)}</dateShipped>
          <trackingNumber>${e(r.trackingNumber)}</trackingNumber>
          <orderDate>${e(r.orderDate)}</orderDate>
        </shipment>`).join('')
    }</shipments>`;
    download(xml, 'application/xml', 'shipments.xml');
  }
};

  return (
    <div className=" bg-[var(--store-bg)] min-h-screen mt-20">
      {showSearch ? (
        <SearchShipments  onClose={closeSearch}/>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex space-x-6 border-b pb-2 mb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`!text-2xl pb-1 border-b-2 whitespace-nowrap ${
                  activeTab === tab
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

              <ExportShipmentsDialog
                trigger={<button className="btn-outline-primary">Export all</button>}
                onConfirm={(fmt) => handleExport(fmt)}  // use shipments.data inside
              />

              <div className="flex items-center border rounded">
                <Input
                  placeholder="Filter by keyword"
                  className="border-0 focus:ring-0"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="btn-outline-primary" onClick={handleSearch}>
                  <IoFilterOutline />
                </button>
              </div>

              <button className="btn-outline-primary" onClick={handleSearch}>
                Search
              </button>
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
                          handleSelectAllChange(
                            checked as boolean,
                            filteredOrders
                          )
                        }
                      />
                    </TableHead>
                    <TableHead> </TableHead>
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
                      <>
                        <TableRow key={idx}>
                          <TableCell>
                            <Checkbox
                              checked={selectedOrderIds.includes(shipment.id)}
                              onCheckedChange={(checked) =>
                                handleOrderCheckboxChange(
                                  shipment,
                                  checked as boolean
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <button onClick={() => toggleRow(shipment.id)}>
                              {expandedRow === shipment.id ? (
                                <FaCircleMinus className="h-7 w-7 fill-gray-600" />
                              ) : (
                                <FaCirclePlus className="h-7 w-7 fill-gray-600" />
                              )}
                            </button>
                          </TableCell>
                          <TableCell>{shipment.id}</TableCell>

                          <TableCell className="text-blue-600">
                            {shipment.shippedTo}
                          </TableCell>
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
                                    s.id === shipment.id
                                      ? { ...s, trackingNumber: e.target.value }
                                      : s
                                  ),
                                }))
                              }
                            />
                            <button
                              className="btn-outline-primary"
                              onClick={handleTracking}
                            >
                              Save
                            </button>
                          </TableCell>

                          <TableCell>
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
                        {expandedRow === shipment.id && (
                          <TableRow>
                            <TableCell colSpan={11}>
                              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4">
                                <div className="flex">
                                  <div className="flex flex-col border-r pr-3 mr-3">
                                    <h4 className="font-bold">Billing</h4>
                                    <button
                                      className="btn-outline-primary text-sm"
                                      onClick={copyBilling}
                                    >
                                      Copy
                                    </button>
                                    <div className="flex flex-col gap-2.5">
                                      <span className="ml-4">
                                        <Globe className="w-6 h-6 text-gray-500" />
                                      </span>
                                      <span>
                                        <Phone className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <Mail className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <IdCard className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <Clock className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex flex-col">
                                    <p>
                                      {shipment.billing.name}
                                      <br />
                                      {shipment.billing.org}
                                      <br />
                                      {shipment.billing.addr}
                                    </p>
                                    <p>{shipment.billing.country}</p>
                                    <p>{shipment.billing.phone}</p>
                                    <p>{shipment.billing.email}</p>
                                    <p>{shipment.billing.customerId}</p>
                                    <p>{shipment.billing.updatedAt}</p>
                                  </div>
                                </div>

                                <div className="flex">
                                  <div className="flex flex-col border-r pr-3 mr-3">
                                    <h4 className="font-bold">Billing</h4>
                                    <button
                                      className="btn-outline-primary text-sm"
                                      onClick={copyBilling}
                                    >
                                      Copy
                                    </button>
                                    <div className="flex flex-col gap-2.5">
                                      <span className="ml-4">
                                        <Globe className="w-6 h-6 text-gray-500" />
                                      </span>
                                      <span>
                                        <Phone className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <Mail className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <IdCard className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <Clock className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex flex-col">
                                    <p>{shipment.shipping.name}</p>
                                    <p>{shipment.shipping.carrier}</p>
                                    <p>{shipment.shipping.service}</p>
                                    <p>{shipment.shipping.address}</p>
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="flex flex-col border-r pr-3 mr-3">
                                    <h4 className="font-bold">Billing</h4>
                                    <button
                                      className="btn-outline-primary text-sm"
                                      onClick={copyBilling}
                                    >
                                      Copy
                                    </button>
                                    <div className="flex flex-col gap-2.5">
                                      <span className="ml-4">
                                        <Globe className="w-6 h-6 text-gray-500" />
                                      </span>
                                      <span>
                                        <Phone className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <Mail className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <IdCard className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                      <span>
                                        <Clock className="w-6 h-6 text-gray-500 ml-4" />
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex flex-col">
                                    <p>{shipment.shippedItems.qty}</p>
                                    <p>{shipment.shippedItems.title}</p>
                                    <p>{shipment.shippedItems.sku}</p>
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
        </>
      )}
    </div>
  );
};

export default Shipments;
