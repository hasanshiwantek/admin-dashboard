"use client";

import useTableContainer from "@/components/ui/Table/TableContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { refetchCustomers } from "@/lib/customerUtils";
import {
  deleteCustomer,
  fetchCustomerByKeyword,
  fetchCustomers,
  loginAsCustomer,
  updateCustomer,
} from "@/redux/slices/customerSlice";
import { errorMessage } from "@/utils/message";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { TableTab } from "@/components/ui/Table/types";

export const CustomerTabs:TableTab[]=  [
  {
    key: "All customers",
    label: "All customers",
  },
];

const useAllCustomersContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { customers, loading, error } = useAppSelector(
    (state: any) => state.customer,
  );

  const customerList: any[] = useMemo(
    () => customers?.data || [],
    [customers?.data],
  );
  const pagination = customers?.pagination;

  const table = useTableContainer<number>({
    defaultTab: "All customers",
    defaultPerPage: "50",
    pageParam: "page",
    perPageParam: "pageSize",
    tabs: CustomerTabs,
    fetcher: (params) =>
      dispatch(
        fetchCustomers(params),
      ),
  });

  const {
    tab: activeTab,
    page: currentPage,
    perPage,
  } = table;

  const total = pagination?.total || 0;
  const totalPages =
    pagination?.totalPages ||
    pagination?.lastPage ||
    Math.ceil(total / Number(perPage || 50));

  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [storeCredits, setStoreCredits] = useState<{ [id: number]: string }>(
    {},
  );
  const [showCustomerNotes, setShowCustomerNotes] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [keyword, setKeyword] = useState("");

  const getDropdownActions = (customer: any) => [
    {
      label: "Edit",
      onClick: () => router.push(`/manage/customers/edit/${customer.id}`),
    },
    {
      label: "Login",
      onClick: async () => {
        const customerId = customer?.id;

        const availableStores = JSON.parse(
          localStorage.getItem("availableStores") || "[]",
        );

        const selectedStoreId = Number(localStorage.getItem("storeId"));
        const selectedStore = availableStores.find(
          (s: any) => s.id === selectedStoreId,
        );

        if (!selectedStore?.baseUrl) {
          errorMessage("Store not found");
          return;
        }

        try {
          const res = await dispatch(loginAsCustomer({ customerId })).unwrap();
          const token = res?.token || res?.data?.token;

          if (token && selectedStore.baseUrl) {
            const baseUrl = selectedStore.baseUrl.replace(/\/$/, "");
            window.open(`${baseUrl}/?token=${token}`, "_blank");
          }
        } catch (err) {
          errorMessage("Failed to login as customer");
        }
      },
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customerList);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectOne = (customer: any, checked?: boolean) => {
    const isAlreadySelected = selectedCustomers.some(
      (c) => c.id === customer.id,
    );

    const shouldSelect =
      typeof checked === "boolean" ? checked : !isAlreadySelected;

    if (shouldSelect && !isAlreadySelected) {
      setSelectedCustomers([...selectedCustomers, customer]);
    } else if (!shouldSelect && isAlreadySelected) {
      setSelectedCustomers(
        selectedCustomers.filter((c) => c.id !== customer.id),
      );
    }
  };

  const deleteCustomerHandler = async () => {
    if (!selectedCustomers || selectedCustomers.length === 0) {
      alert("No customers selected for deletion.");
      return;
    }

    const id = selectedCustomers.map((c) => c?.id);
    const payload = { ids: id };

    const confirm = window.confirm("Delete Selected Customer");

    if (!confirm) return;

    try {
      const result = await dispatch(deleteCustomer({ data: payload }));

      if (deleteCustomer.fulfilled.match(result)) {
        setSelectedCustomers([]);
        table.refetch();
      } else {
        console.error("Failed to delete customers:", result.payload);
      }
    } catch (err) {
      console.error("Error deleting customers:", err);
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };



  const updateCustomerGroupStatus = async (
    customerId: number | string,
    group: string,
  ) => {
    const payload = {
      customerGroup: group === "none" ? null : group,
    };

    try {
      const result = await dispatch(
        updateCustomer({ id: customerId, data: payload }),
      );

      if (updateCustomer.fulfilled.match(result)) {
        setTimeout(() => {
          refetchCustomers(dispatch);
        }, 800);
      } else {
        console.error("❌ Update failed:", result.payload);
      }
    } catch (error) {
      console.error("🚨 Unexpected error:", error);
    }
  };

  const updateCustomerStoreCredit = async (customerId: number) => {
    const value = storeCredits[customerId];

    if (!value || isNaN(Number(value))) {
      alert("Please enter a valid number for store credit");
      return;
    }

    const payload = {
      storeCredit: value,
    };

    try {
      const result = await dispatch(
        updateCustomer({ id: customerId, data: payload }),
      );

      if (updateCustomer.fulfilled.match(result)) {
        setTimeout(() => {
          refetchCustomers(dispatch);
        }, 800);
      } else {
        console.error("❌ Store credit update failed:", result.payload);
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating store credit:", err);
    }
  };

  const filterHandler = async () => {
    try {
      const resultAction = await dispatch(
        fetchCustomerByKeyword({
          page: currentPage,
          pageSize: Number(perPage),
          search: keyword,
        }),
      );

      if (!fetchCustomerByKeyword.fulfilled.match(resultAction)) {
        console.error("❌ Error fetching Customer");
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating", err);
    }
  };

  const handleExport = () => {
    if (!selectedCustomers.length) return;

    const selectedCustomer = customerList.filter((item: any) =>
      selectedCustomers.some(
        (selected: any) =>
          Number(selected?.id || selected) === Number(item?.id),
      ),
    );

    const exportData = selectedCustomer.map((item: any) => ({
      ID: item?.id,
      "First Name": item?.firstName,
      "Last Name": item?.lastName,
      Email: item?.email,
      Phone: item?.phone,
      Address: item?.addresses,
      "Company Name": item?.companyName,
      "Customer Group": item?.customerGroup,
      "Store Credit": item?.storeCredit,
      Country: item?.country,
      State: item?.state,
      "Tax Exempt Code": item?.taxExemptCode,
      "Force Password Reset": item?.forcePasswordReset ? 1 : "",
      "Receive Review Emails": item?.receiveReviewEmails ? 1 : "",
      "Created At": item?.createdAt,
      "Updated At": item?.updatedAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "customer_export.xlsx");
  };

  return {
    table,
    customerList,
    pagination,
    total,
    totalPages,
    currentPage,
    perPage,
    activeTab,
    loading,
    error,
    selectedCustomers,
    keyword,
    setKeyword,
    expandedRow,
    showCustomerNotes,
    setShowCustomerNotes,
    selectedOrderId,
    setSelectedOrderId,
    getDropdownActions,
    handleSelectAll,
    handleSelectOne,
    deleteCustomerHandler,
    toggleRow,
    filterHandler,
    handleExport,
    storeCredits,
    setStoreCredits,
    updateCustomerGroupStatus,
    updateCustomerStoreCredit,
    
  };
};

export default useAllCustomersContainer;
