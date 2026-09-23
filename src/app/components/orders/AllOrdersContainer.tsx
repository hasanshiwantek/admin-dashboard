"use client";

import useTableContainer from "@/components/ui/Table/TableContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  addShipmentOrder,
  captureMultiplePayment,
  capturePayment,
  fetchAllOrders,
  printInvoicePdf,
  printMultiInvoicePdf,
  printMultiPackingSlipPdf,
  printPackingSlipPdf,
  refundOrder,
  resendInvoice,
  shipmentByOrderId,
  updateOrderStatus,
} from "@/redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import AllOrdersColumn from "./AllOrdersColumn";
import OrderDetailRow from "./OrderDetailRow";
import {
  BulkOrderAction,
  COMPLETED,
  ORDER_FILTER_LABELS,
  OrderTabs,
  STATUS_MAP,
} from "./constant";
import { findCountry } from "./utils";

/** Turn a thunk PDF payload into a Blob and open it in a new tab. */
const openPdfBlob = (payload: any) => {
  let blob: Blob;
  if (payload instanceof Blob) {
    blob = payload;
  } else if (payload instanceof ArrayBuffer || payload instanceof Uint8Array) {
    blob = new Blob([new Uint8Array(payload as ArrayBuffer)], {
      type: "application/pdf",
    });
  } else if (typeof payload === "string") {
    const byteCharacters = atob(
      payload.replace(/^data:application\/pdf;base64,/, ""),
    );
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
  } else {
    blob = new Blob([payload as any], { type: "application/pdf" });
  }
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

const useAllOrdersContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const orders = useAppSelector((state: any) => state?.order?.orders);
  const { loading, error, singleShipmentByOrder } = useAppSelector(
    (state: any) => state.order,
  );
  const pagination = orders?.pagination;
  const totalPages = pagination?.totalPages;
  const filteredOrders: any[] = useMemo(
    () => orders?.data || [],
    [orders?.data],
  );

  // Modal / expansion state.
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showVoidConfirm, setShowVoidConfirm] = useState(false);
  const [showShipmentTable, setShowShipmentTable] = useState(false);
  const [showShipmentIdTable, setShowShipmentIdTable] = useState(false);
  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [selectedAction, setSelectedAction] = useState("");

  const table = useTableContainer<number>({
    defaultTab: "All orders",
    defaultPerPage: "50",
    pageParam: "page",
    perPageParam: "perPage",
    searchParam: "keyword",
    tabs: OrderTabs,
    fetcher: (params) => dispatch(fetchAllOrders(params)),
  });

  const {
    tab: activeTab,
    page: currentPage,
    perPage,
    selectedIds: selectedOrderIds,
    clearSelection,
  } = table;

  // The generic table selects ids; derive the full order objects for handlers.
  const selectedOrders = useMemo(
    () => filteredOrders.filter((o) => selectedOrderIds.includes(o.id)),
    [filteredOrders, selectedOrderIds],
  );

  const refetch = table.refetch;

  // Expand a row from the ?expand= URL param once the orders are loaded.
  const expandParam =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("expand")
      : null;

  useEffect(() => {
    if (!expandParam || filteredOrders.length === 0) return;
    const exists = filteredOrders.some(
      (o) => Number(o.id) === Number(expandParam),
    );
    if (exists) setExpandedRow(Number(expandParam));
  }, [filteredOrders, expandParam]);

  // Cross-page "filter by product" entry (set in localStorage by the products
  // page); fetch once with it, then clear.
  useEffect(() => {
    const productId = localStorage.getItem("filterProductId");
    if (!productId) return;
    dispatch(
      fetchAllOrders({
        page: currentPage,
        perPage,
        status: activeTab,
        productId,
      }),
    );
    setTimeout(() => localStorage.removeItem("filterProductId"), 1000);
  }, []);

  // Load shipment details when a shipment modal opens.
  useEffect(() => {
    if (showShipmentTable || showShipmentIdTable) {
      dispatch(shipmentByOrderId({ orderId: selectedOrderId })).unwrap();
    }
  }, [showShipmentTable, showShipmentIdTable]);

  const handleCloseNotes = () => {
    setShowNotes(false);
    setSelectedOrderId(null);
    setTimeout(() => {
      document.body.style.pointerEvents = "";
    }, 100);
  };

  // ----- Row detail-row callbacks -----
  const onCaptureFunds = (paymentIntentId: string) => {
    setSelectedOrderId(paymentIntentId);
    setShowConfirm(true);
  };
  const onViewNotes = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowNotes(true);
  };
  const onViewShipmentId = (orderId: number | string) => {
    setSelectedOrderId(orderId);
    setShowShipmentIdTable(true);
  };
  const onShipItems = (order: any) => {
    setSelectedOrder(order);
    setShowShipmentModal(true);
  };
  const onToggleExpand = (id: number) =>
    setExpandedRow((prev) => (prev === id ? null : id));

  // ----- Per-row actions dropdown -----
  const rowActions = (order: any) => [
    {
      label: "Edit order",
      onClick: () => router.push(`/manage/orders/edit/${order.id}`),
    },
    {
      label: "Print invoice",
      onClick: async () => {
        if (!order?.id) return;
        const result = await dispatch(printInvoicePdf({ orderId: order.id }));
        if (printInvoicePdf.fulfilled.match(result))
          openPdfBlob(result.payload);
      },
    },
    {
      label: "Print packing slip",
      onClick: async () => {
        if (!order?.id) return;
        const result = await dispatch(
          printPackingSlipPdf({ orderId: order.id }),
        );
        if (printPackingSlipPdf.fulfilled.match(result)) {
          openPdfBlob(result.payload);
        } else {
          toast.error(
            (result.payload as string) ||
            result.error?.message ||
            "Failed to print packing slip",
          );
        }
      },
    },
    {
      label: "Resend invoice",
      onClick: async () => {
        await dispatch(resendInvoice({ orderId: order?.id }));
      },
    },
    ...(!order?.userType
      ? [
        {
          label: "Send Message",
          onClick: () => router.push(`/manage/orders/message/${order?.id}`),
        },
      ]
      : []),
    {
      label: "View notes",
      onClick: () => onViewNotes(order.id),
    },
    ...(!order?.shipmentId
      ? [{ label: "Ship items", onClick: () => onShipItems(order) }]
      : []),
    ...(order?.payment?.payment_intent_id &&
      order?.payment?.payment_status !== COMPLETED
      ? [
        {
          label: "Capture Funds",
          onClick: () => onCaptureFunds(order?.payment?.payment_intent_id),
        },
      ]
      : []),
    ...(order?.shipmentId
      ? [
        {
          label: "View shipments",
          onClick: () => {
            setSelectedOrderId(order.id);
            setShowShipmentTable(true);
          },
        },
      ]
      : []),
    ...(String(order?.status || "").toLowerCase() !== "shipped" &&
      String(order?.status || "").toLowerCase() !== "awaiting fulfillment"
      ? [
        {
          label: "Void Transaction",
          onClick: () => {
            setSelectedOrderId(order?.id);
            setShowVoidConfirm(true);
          },
        },
      ]
      : []),
    ...(String(order?.status || "").toLowerCase() !== "cancelled" &&
      String(order?.status || "").toLowerCase() !== "awaiting payment"
      ? [
        {
          label: "Refund",
          onClick: async () => {
            const result = await dispatch(
              refundOrder({ orderId: order?.id }),
            );
            if (refundOrder.fulfilled.match(result)) refetch();
          },
        },
      ]
      : []),
    {
      label: "View order timeline",
      onClick: () => router.push(`/manage/orders/order-timeline/${order?.id}`),
    },
  ];

  // ----- Bulk action ("Confirm") -----
  const handleConfirmClick = async () => {
    if (
      selectedAction.startsWith("updateMultiOrderStatus:") &&
      selectedOrders.length > 0
    ) {
      const statusId = selectedAction.split(":")[1];
      const status = STATUS_MAP[statusId];
      if (!status) return;
      selectedOrders.forEach((o) =>
        dispatch(updateOrderStatus({ id: o?.id, status })),
      );
      setTimeout(() => {
        setSelectedAction("");
        clearSelection();
        refetch();
      }, 700);
      return;
    }

    if (selectedAction === BulkOrderAction.PrintMultiOrderInvoices) {
      const result = await dispatch(printMultiInvoicePdf(selectedOrders));
      if (printMultiInvoicePdf.fulfilled.match(result)) {
        openPdfBlob(result.payload);
      }
      setSelectedAction("");
      clearSelection();
      return;
    }

    if (selectedAction === BulkOrderAction.PrintOrderPackingSlips) {
      const result = await dispatch(printMultiPackingSlipPdf(selectedOrders));
      if (printMultiPackingSlipPdf.fulfilled.match(result)) {
        openPdfBlob(result.payload);
      }
      setSelectedAction("");
      clearSelection();
      return;
    }

    if (selectedAction === BulkOrderAction.ResendOrderInvoices) {
      selectedOrders.forEach((o) =>
        dispatch(resendInvoice({ orderId: o?.id })),
      );
      setSelectedAction("");
      clearSelection();
      return;
    }

    if (selectedAction === BulkOrderAction.BulkCapture) {
      const paymentIntentIds = selectedOrders
        .map((o) => o?.payment?.payment_intent_id)
        .filter((id): id is string => typeof id === "string" && id.length > 0);

      if (!paymentIntentIds.length) {
        setSelectedAction("");
        return;
      }

      const result = await dispatch(
        captureMultiplePayment({
          payment_intent_id:
            paymentIntentIds.length === 1
              ? paymentIntentIds[0]
              : paymentIntentIds,
        }),
      );
      if (captureMultiplePayment.fulfilled.match(result)) refetch();
      setSelectedAction("");
      clearSelection();
      return;
    }
  };

  // ----- Export selected -----
  const handleExport = () => {
    if (!selectedOrders.length) return;
    const exportData = selectedOrders.map((item: any) => ({
      ID: item?.id,
      "Order Number": item?.orderNumber,
      "Customer Name": `${item?.billingInformation?.firstName} ${item?.billingInformation?.lastName}`,
      "Customer Email": item?.customer?.email,
      Status: item?.status,
      "Total Amount": item?.totalAmount,
      "Created At": item?.createdAt,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders_export.xlsx");
  };

  // ----- Modal confirm handlers -----
  const onConfirmCapture = async () => {
    if (!selectedOrderId) return;
    await dispatch(
      capturePayment({ payment_intent_id: selectedOrderId }),
    ).unwrap();
    refetch();
  };
  const onConfirmVoid = async () => {
    if (!selectedOrderId) return;
    await dispatch(
      updateOrderStatus({ id: selectedOrderId, status: "Cancelled" }),
    ).unwrap();
    refetch();
  };
  const onSubmitShipment = async (data: any) => {
    try {
      await dispatch(addShipmentOrder({ data }));
      if (data.updateStatusAndNotify) {
        await dispatch(
          updateOrderStatus({ id: selectedOrder.id, status: "Shipped" }),
        );
      }
      refetch();
      setShowShipmentModal(false);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Details for the shipment modals.
  const selectedOrderDetails = filteredOrders.find(
    (item: any) => Number(item.id) === Number(selectedOrderId),
  );
  const counrtyBilling = findCountry(
    selectedOrderDetails?.billingInformation?.country,
  );
  const counrtyShipping = findCountry(selectedOrderDetails?.customer?.country);

  // ----- Columns + expanded row -----
  const columns = AllOrdersColumn({
    router,
    dispatch,
    refetch,
    clearSelection,
    isExpanded: (order) => expandedRow === order?.id,
    onToggleExpand,
    onCaptureFunds,
    onViewNotes,
  });

  const isRowExpanded = (order: any) => expandedRow === order?.id;
  const renderExpandedRow = (order: any) => (
    <OrderDetailRow
      order={order}
      onCaptureFunds={onCaptureFunds}
      onViewShipmentId={onViewShipmentId}
      onShipItems={onShipItems}
    />
  );

  return {
    table,
    columns,
    filteredOrders,
    loading,
    error,
    pagination,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    filterLabels: ORDER_FILTER_LABELS,

    rowActions,
    isRowExpanded,
    renderExpandedRow,

    selectedOrders,
    selectedAction,
    setSelectedAction,
    handleConfirmClick,
    handleExport,

    showNotes,
    handleCloseNotes,
    selectedOrderId,
    showConfirm,
    setShowConfirm,
    onConfirmCapture,
    showVoidConfirm,
    setShowVoidConfirm,
    onConfirmVoid,
    showShipmentTable,
    setShowShipmentTable,
    showShipmentIdTable,
    setShowShipmentIdTable,
    showShipmentModal,
    setShowShipmentModal,
    selectedOrder,
    onSubmitShipment,
    singleShipmentByOrder,
    selectedOrderDetails,
    counrtyBilling,
    counrtyShipping,
  };
};

export default useAllOrdersContainer;
