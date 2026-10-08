import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useAlert } from "@/hooks/useAlert";

import {
 
  deleteShipment,
  exportShipmentsCsv,
  fetchAllShipments,
  fetchPackingSlipPdf,
  fetchShipmentById,
  fetchShipmentByKeyword,
  updateShipment,
} from "@/redux/slices/orderSlice";

import { refetchShipments } from "@/lib/orderUtils";
import { errorMessage } from "@/utils/message";
import { TableTab } from "@/components/ui/Table/types";
import { useTableContainer } from "@/components/ui/Table/TableContainer";

import AllShipmentColumn from "./AllShipmentColumn";
import ShipmentDetailRow from "./ShipmentDetailRow";
import { ColumnDef } from "@/components/ui/Table/types";

const ShipmentTabs: TableTab[] = [
  {
    key: "All shipments",
    label: "All shipments",
  },
];

const useAllShipmentContainer = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { showAlert, Alert } = useAlert();

  const { shipments, loading, error, shipmentLoader, singleShipment } =
    useAppSelector((state: any) => state.order);


  const pagination = shipments?.pagination;

  const filteredShipments = useMemo(() => {
    return shipments?.data || [];
  }, [shipments?.data]);

 
  const table = useTableContainer<number>({
    defaultTab: "All shipments",
    defaultPerPage: "50",
    pageParam: "page",
    perPageParam: "perPage",
    searchParam: "keyword",
    tabs: ShipmentTabs,
    fetcher: (params) =>
      dispatch(
        fetchAllShipments(params),
      ),
  });

  const { tab, page, perPage, selectedIds, clearSelection } = table;



  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const onToggleExpand = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const isAllExpanded =
    filteredShipments.length > 0 &&
    filteredShipments.every((shipment: any) =>
      expandedRows.includes(shipment.id),
    );

  const onToggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedRows([]);
    } else {
      setExpandedRows(filteredShipments.map((shipment: any) => shipment.id));
    }
  };

  const isRowExpanded = (shipment: any) => {
    return expandedRows.includes(shipment?.id);
  };



  const [trackingChanges, setTrackingChanges] = useState<
    Record<number, string>
  >({});

  const [savingId, setSavingId] = useState<number | null>(null);

  const handleTrackingChange = (id: number, value: string) => {
    setTrackingChanges((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveTracking = async (shipment: any) => {
    const updatedValue = trackingChanges[shipment?.id];

    if (updatedValue === undefined) {
      return;
    }

    try {
      setSavingId(shipment?.id);

      const result = await dispatch(
        updateShipment({
          id: shipment?.id,
          data: {
            trackingId: updatedValue,
          },
        }),
      );

      if (updateShipment.fulfilled.match(result)) {
        setTrackingChanges((prev) => {
          const updated = { ...prev };
          delete updated[shipment?.id];
          return updated;
        });

        refetchShipments(dispatch);
      }
    } finally {
      setSavingId(null);
    }
  };

 

  const rowActions = (shipment: any) => [
    {
      label: "Print Packaging Slip",

      onClick: async () => {
        try {
          const shipmentId = shipment?.orderId;

          const resultAction = await dispatch(
            fetchPackingSlipPdf({
              shipmentId,
            }),
          );

          if (fetchPackingSlipPdf.fulfilled.match(resultAction)) {
            const blob = new Blob([resultAction.payload], {
              type: "application/pdf",
            });

            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");

            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 1000);
          } else {
            errorMessage(
              String(resultAction.payload || "Failed to download PDF"),
            );
          }
        } catch (error) {
          errorMessage("Failed to download PDF");
        }
      },
    },
  ];



  const renderExpandedRow = (shipment: any) => {
    return <ShipmentDetailRow shipment={shipment} />;
  };

 

  const columns: ColumnDef<any>[] = AllShipmentColumn({
    isExpanded: isRowExpanded,
    onToggleExpand,
    isAllExpanded,
    onToggleExpandAll,

    trackingChanges,
    savingId,
    onTrackingChange: handleTrackingChange,
    onSaveTracking: handleSaveTracking,
  });

 

  const handleSearch = async () => {
    const keyword = table.search?.trim();

    if (!keyword) {
      refetchShipments(dispatch);
      return;
    }

    try {
      const resultAction = await dispatch(
        fetchShipmentByKeyword({
          page,
          perPage,
          keyword,
        }),
      );

      if (!fetchShipmentByKeyword.fulfilled.match(resultAction)) {
        return;
      }
    } catch (err) {
      console.error("Shipment search failed:", err);
    }
  };


  const handleExport = async (format: "csv" | "xml") => {
    if (format === "csv") {
      try {
        const blob = await dispatch(exportShipmentsCsv()).unwrap();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        const today = new Date().toISOString().slice(0, 10);

        a.href = url;
        a.download = `shipments-${today}.csv`;

        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Export failed:", error);
      }

      return;
    }

    // XML export can be added here later.
  };


  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShipmentDelete = () => {
    if (selectedIds.length <= 0) {
      showAlert({
        title: "No Shipment Selected",
        message: "Please select shipment to delete.",
      });

      return;
    }

    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await dispatch(
        deleteShipment({
          ids: selectedIds,
        }),
      );

      if (deleteShipment.fulfilled.match(result)) {
        setShowDeleteModal(false);

        clearSelection();

        setTimeout(() => {
          refetchShipments(dispatch);
        }, 700);
      }
    } catch (err) {
      console.error("Delete shipment failed:", err);
    }
  };



  const queryObject: Record<string, any> = {};

  searchParams.forEach((value, key) => {
    if (queryObject[key]) {
      queryObject[key] = [...queryObject[key], value];
    } else {
      queryObject[key] = value;
    }
  });



 

  const displayShipments = useMemo(() => {
    const shipmentId = searchParams.get("shipmentId");

    if (shipmentId) {
      return singleShipment ? [singleShipment] : [];
    }

    return filteredShipments;
  }, [searchParams, singleShipment, filteredShipments]);



  useEffect(() => {
    if (!shipmentLoader) {
      setSavingId(null);
    }
  }, [shipmentLoader]);

 

  return {
    table,
    columns,
    filteredShipments: displayShipments,
    loading,
    error,
    pagination,
    totalPages:
      pagination?.totalPages ??
      Math.ceil((pagination?.total || 0) / (pagination?.pageSize || 50)),
    currentPage: pagination?.page ?? page,
    perPage,
    activeTab: tab,
    selectedShipments: filteredShipments.filter((shipment: any) =>
      selectedIds.includes(shipment.id),
    ),
    rowActions,
    isRowExpanded,
    renderExpandedRow,
    expandedRows,
    handleSearch,
    handleExport,
    handleShipmentDelete,
    handleConfirmDelete,
    showDeleteModal,
    setShowDeleteModal,
    selectedIds,
    savingId,
    shipmentLoader,
    singleShipment,
    Alert,
  };
};

export default useAllShipmentContainer;
