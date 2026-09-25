"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/ui/Table/Table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import {
  DownloadIcon,
  PlusIcon,
  SearchIcon,
  Trash,
} from "lucide-react";
import CustomerNotesModal from "../edit/CustomerNotesModal";
<<<<<<< HEAD
import useAllCustomersContainer, {
  CustomerTabs,
} from "./AllCustomersContainer";
import TableTabs from "@/components/ui/Table/TableTabs";
import { getCustomerColumns } from "./AllCustomersColumn";
import { renderExpandedRow } from "./CustomerDetailRow";

const AllCustomers = () => {
  
  const {
    table,
    customerList,
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
  } = useAllCustomersContainer();

 const customerColumns = useMemo(
  () => getCustomerColumns(expandedRow, toggleRow),
  [expandedRow, toggleRow],
);
  
=======
import ConfirmationModal from "@/app/(protected)/manage/user-settings/additional-authentication/helpers/ConfirmationModal";

const AllCustomers = () => {
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state: any) => state.customer);
  const { loading, error } = useAppSelector((state: any) => state.customer);
  const router = useRouter();
  const pagination = customers.pagination;
  const total = pagination?.total;
  const totalPages = Math.ceil(total / pagination?.pageSize);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [storeCredits, setStoreCredits] = useState<{ [id: number]: string }>(
    {},
  );
  const [showCustomerNotes, setShowCustomerNotes] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            const baseUrl = selectedStore.baseUrl.replace(/\/$/, ""); // ✅ trailing slash remove
            window.open(`${baseUrl}/?token=${token}`, "_blank");
          }
        } catch (err) {
          errorMessage("Failed to login as customer");
        }
      },
    },
  ];

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers?.data?.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers?.data);
    }
  };

  const handleSelectOne = (customer: any) => {
    const isAlreadySelected = selectedCustomers.some(
      (c) => c.id === customer.id,
    );

    const updated = isAlreadySelected
      ? selectedCustomers.filter((c) => c.id !== customer.id)
      : [...selectedCustomers, customer];

    setSelectedCustomers(updated);
  };

  // const deleteCustomerHandler = async () => {
  //   if (!selectedCustomers || selectedCustomers.length === 0) {
  //     alert("No customers selected for deletion.");
  //     return;
  //   }
  //   const id = selectedCustomers?.map((c) => c?.id);
  //   const payload = { ids: id };
  //   const confirm = window.confirm("Delete Selected Customer");
  //   if (!confirm) {
  //     return;
  //   } else {
  //     try {
  //       const result = await dispatch(deleteCustomer({ data: payload }));

  //       if (deleteCustomer.fulfilled.match(result)) {
  //         setSelectedCustomers([]);
  //         // optionally: refresh list or reset selection
  //       } else {
  //         console.error("Failed to delete customers:", result.payload);
  //       }
  //     } catch (err) {
  //       console.error("Error deleting customers:", err);
  //     }
  //   }
  // };
const deleteCustomerHandler = async () => {
  if (!selectedCustomers || selectedCustomers.length === 0) {
    alert("No customers selected for deletion.");
    return;
  }

  setShowDeleteModal(true);
};
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  const copyBilling = () => { };

  // CUSTOMER UPDATION LOGIC
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
        // Optionally show toast or refetch
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
        // Optionally refetch or toast
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

  // SEARCH CUSTOMER LOGIC

  const [keyword, setKeyword] = useState("");

  const filterHandler = async () => {
    try {
      const resultAction = await dispatch(
        fetchCustomerByKeyword({
          page: currentPage,
          pageSize: perPage,
          search: keyword,
        }),
      );
      if (fetchCustomerByKeyword.fulfilled.match(resultAction)) {
        // setKeyword("");
      } else {
        console.error("❌ Error fetching Customer");
      }
    } catch (err) {
      console.error("🚨 Unexpected error updating", err);
    }
  };

  // FETCH CUSTOMER LOGIC

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    if (queryObject[key]) {
      queryObject[key] = [...queryObject[key], value];
    } else {
      queryObject[key] = value;
    }
  });

  const currentPage = Number(queryObject.page || 1);
  const perPage = Number(queryObject.limit || queryObject.pageSize || 50);
  useEffect(() => {
    const filterKeys = Object.keys(queryObject).filter(
      (key) => !["page", "limit", "pageSize"].includes(key),
    );

    if (filterKeys.length > 0) {
      dispatch(
        fetchCustomers({
          ...queryObject,
          page: currentPage,
          pageSize: perPage,
        }),
      );
    } else {
      dispatch(fetchCustomers({ page: currentPage, pageSize: perPage }));
    }
  }, [searchParams]);

  const handleExport = () => {
    if (!selectedCustomers.length) return;
    const selectedCustomer = customers?.data?.filter((item: any) =>
      selectedCustomers?.some(
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
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePerPageChange = (limit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset page on limit change
    params.set("limit", limit);
    router.push(`?${params.toString()}`);
  };
>>>>>>> 4f620069d041a0e127a8dd52ddd68f8285d33ac7

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-6">
        <h1 className="!font-light 2xl:!text-5xl">View customers</h1>
      </div>
<TableTabs
  tabs={table.tabs}
  activeTab={activeTab}
  onTabChange={table.setTab}
  maxVisibleTabs={7}
  variant="underline"
/>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Link href="/manage/customers/add">
          <Button
            variant="outline"
            className="flex items-center gap-2 !p-6 btn-outline-primary 2xl:!text-2xl"
          >
            <PlusIcon className="!w-5 !h-5" /> Add
          </Button>
        </Link>

        <Button
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary"
          onClick={deleteCustomerHandler}
        >
          <Trash className="!w-5 !h-5" />
        </Button>

        <Button
          onClick={handleExport}
          variant="outline"
          className="flex items-center gap-2 !p-6 btn-outline-primary 2xl:!text-2xl"
        >
          <DownloadIcon className="!w-5 !h-5" /> Export selected customers
        </Button>

        <Input
          placeholder="Filter by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button
          variant="default"
          className="flex items-center gap-2 !p-6 btn-outline-primary 2xl:!text-2xl"
          onClick={filterHandler}
        >
          <SearchIcon className="!w-5 !h-5" /> Search
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-sm">
        <Table<any>
          bare
          data={customerList}
          columns={customerColumns}
          getRowId={(customer) => customer.id}
          loading={loading}
          error={error}
          emptyMessage="No customers found."
          selectAllInHeader
          showRecordCount={false}
          selectedIds={selectedCustomers.map((customer) => customer.id)}
          onToggleRow={(id, checked) => {
            const customer = customerList.find(
              (item) => Number(item.id) === Number(id),
            );

            if (customer) {
              handleSelectOne(customer, checked);
            }
          }}
          onToggleAll={(checked) => handleSelectAll(checked)}
          rowActions={getDropdownActions}
          renderExpandedRow={(customer) =>
  renderExpandedRow(
    customer,
    setSelectedOrderId,
    setShowCustomerNotes,
  )
}
          isRowExpanded={(customer) => expandedRow === customer?.id}
          pagination={{
            currentPage,
            totalPages,
            perPage,
            total,
            onPageChange: table.setPage,
            onPerPageChange: table.setPerPage,
          }}
        />
      </div>

      <CustomerNotesModal
        open={showCustomerNotes}
        onClose={() => setShowCustomerNotes(false)}
        orderId={selectedOrderId}
      />
      <ConfirmationModal
  open={showDeleteModal}
  onOpenChange={setShowDeleteModal}
  variant="warning"
  title="Delete Selected Customers?"
  description="Are you sure you want to delete the selected customer(s)?"
  onConfirm={async () => {
    const id = selectedCustomers?.map((c) => c?.id);
    const payload = { ids: id };

    try {
      const result = await dispatch(deleteCustomer({ data: payload }));

      if (deleteCustomer.fulfilled.match(result)) {
        setSelectedCustomers([]);
        setShowDeleteModal(false);
      } else {
        console.error("Failed to delete customers:", result.payload);
      }
    } catch (err) {
      console.error("Error deleting customers:", err);
    }
  }}
/>
    </div>
  );
};

export default AllCustomers;
