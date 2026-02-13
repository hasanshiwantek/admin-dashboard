"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, MoreHorizontal, Plus } from "lucide-react";
import OrderActionsDropdown from "../OrderActionsDropdown";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchDraftOrders, deleteDraftOrders } from "@/redux/slices/orderSlice";
import Spinner from "../../loader/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DraftOrder = () => {
  const dispatch = useAppDispatch();
  const { draftOrder, loading, error } = useAppSelector(
    (state: any) => state.order
  );
  const router = useRouter();

  // Fetch draft orders on component mount
  useEffect(() => {
    dispatch(fetchDraftOrders({ isDraft: true }));
  }, [dispatch]);

  const getDropdownActions = (row: any) => [
    {
      label: "Edit",
      onClick: () => {
        router.push(`/manage/orders/edit/${row.orderId}`);
        console.log(row.id);
      },
    },
    {
      label: "Delete",
      onClick: async () => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this draft order?"
        );

        if (!confirmed) return;

        try {
          await dispatch(deleteDraftOrders({ id: row.orderId })).unwrap();
          console.log("✅ Draft order deleted");
          setTimeout(() => {
            dispatch(fetchDraftOrders({ isDraft: true }));
          }, 2000);
        } catch (error) {
          console.error("❌ Delete failed:", error);
        }
      },
    },
  ];

  const handleCopyUrl = (url: string) => {
    if (url) {
      navigator.clipboard.writeText(url);
      console.log("URL copied to clipboard");
    }
  };

  // ✅ Calculate total for draft order
  const calculateTotal = (products: any[], shippingCost: string = "0.00") => {
    if (!products || products.length === 0) {
      return parseFloat(shippingCost || "0").toFixed(2);
    }

    const productsTotal = products.reduce((sum, product) => {
      const price = parseFloat(product.price || product.productPrice || "0");
      const quantity = parseInt(product.quantity || "1", 10);
      return sum + price * quantity;
    }, 0);

    const shipping = parseFloat(shippingCost || "0");
    const total = productsTotal + shipping;

    return total.toFixed(2);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-10">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Extract data from the response
  const data = draftOrder?.data || [];
  console.log("Draft Orders Data:", data  );

  return (
    <div className="p-10 max-w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="2xl:!text-5xl">Draft orders</h1>
        <Link href={"/manage/orders/add"}>
          <button className="btn-primary flex items-center 2xl:!text-2xl gap-2">
            <Plus className="h-6 w-6" /> Add new
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader className="h-18">
            <TableRow>
              <TableHead className="2xl:!text-[1.6rem]">Date</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Customer</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">URL</TableHead>
              <TableHead className="text-center">Channel</TableHead>
              <TableHead className="2xl:!text-[1.6rem]">Total</TableHead>
              <TableHead className="text-right pr-10 2xl:!text-[1.6rem]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="h-18">
            {data && data.length > 0 ? (
              data.map((row: any, index: number) => {
                // Extract customer name
                const customerName =
                  `${row.firstName || ""} ${row.lastName || ""}`.trim() ||
                  `${row.billingInformation?.firstName || ""} ${row.billingInformation?.lastName || ""}`.trim() ||
                  "N/A";

                // Extract company name if available
                const companyInfo =
                  row.companyName || row.billingInformation?.companyName;
                const displayName = companyInfo
                  ? `${customerName} (${companyInfo})`
                  : customerName;

                // ✅ Calculate total
                const shippingCost = row.shippingMethod?.cost || "0.00";
                const totalAmount = calculateTotal(row.products, shippingCost);

                return (
                  <TableRow key={row.customerId || index}>
                    <TableCell className="2xl:!text-2xl">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell className="2xl:!text-2xl">
                      <div className="flex flex-col">
                        <span>{displayName}</span>
                        {row.email && (
                          <span className="text-xs text-gray-500">
                            {row.email}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          value={row.cartUrl || row.url || ""}
                          className="h-12 w-[220px]"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-[#4f6ef7] text-[#4f6ef7]"
                          onClick={() => handleCopyUrl(row.cartUrl || row.url)}
                          disabled={!row.cartUrl && !row.url}
                        >
                          <Copy className="!h-5 !w-5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 bg-[#312e81] rounded flex items-center justify-center text-[10px] text-white font-bold">
                          {row.channel
                            ? row.channel.charAt(0).toUpperCase()
                            : "D"}
                        </div>
                        <span className="text-slate-700 2xl:!text-2xl">
                          {row.channel || "Draft"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="2xl:!text-2xl">
                      <div className="font-semibold">${totalAmount}</div>
                      <div className="text-sm text-gray-500">
                        {row.products?.length || 0} item(s)
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <OrderActionsDropdown
                        actions={getDropdownActions(row)}
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-xl cursor-pointer"
                          >
                            <MoreHorizontal className="!h-7 !w-7" />
                          </Button>
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 text-lg 2xl:!text-2xl font-medium">
                        No draft orders found
                      </p>
                      <p className="text-gray-400 text-sm 2xl:!text-xl mt-1">
                        Draft orders will appear here when customers save their
                        carts
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DraftOrder;