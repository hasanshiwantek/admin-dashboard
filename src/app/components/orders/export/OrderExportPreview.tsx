"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchAllOrders } from "@/redux/slices/orderSlice";
import Spinner from "../../loader/Spinner";
const previewData = [
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },

  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
  {
    id: 296136,
    customer: "Syed Hassan",
    date: "20-July-2025",
    status: "Awaiting Payment",
    merchant_defined_status: "Awaiting Payment",
    total: "£1,461.00",
  },
];

export default function OrderExportPreview() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => state.order.orders);
  const { loading, } = useAppSelector((state) => state.order);

  const pagination = orders?.pagination;
  const total = pagination?.total || 0;
  const totalPages = pagination?.totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const orderList = orders?.data || [];

  useEffect(() => {
    dispatch(fetchAllOrders({ page: currentPage, perPage }));
  }, [dispatch, perPage, currentPage])


  return (
    <div>
      <p className=" text-muted-foreground 2xl:!text-2xl">{total} orders ready for export.</p>
      <div className="bg-white p-6 rounded-md border shadow-sm space-y-4">
        <div className="flex justify-end my-2">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
        <div className="overflow-auto border rounded">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Order Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : orderList?.length === 0 && !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-gray-500 text-xl"
                  >
                    No orders yet.
                  </TableCell>
                </TableRow>
              ) : (orderList?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="2xl:!text-2xl">{item?.id}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item?.orderNumber}</TableCell>
                  <TableCell className="2xl:!text-2xl">{`${item?.billingInformation?.firstName} ${item?.billingInformation?.lastName}`}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item?.billingInformation?.email} </TableCell>
                  <TableCell className="2xl:!text-2xl">{item?.status}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item?.totalAmount}</TableCell>
                  <TableCell className="2xl:!text-2xl">{item?.createdAt}</TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end my-6">
          {/* Pagination */}
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
}
