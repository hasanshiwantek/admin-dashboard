"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Check } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Spinner from "../../loader/Spinner";
import { fetchCustomers } from "@/redux/slices/customerSlice";

export default function CustomerExportPreview() {
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector((state: any) => state?.customer);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const totalItems = customers?.pagination?.total || 0;
  const totalPages = customers?.lastPage

  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, pageSize: perPage }));
  }, [dispatch, perPage, currentPage])

  return (
    <div>
      <p className=" text-muted-foreground 2xl:!text-2xl">
        The <strong>{totalItems?.toLocaleString()}</strong> customers shown below
        will be exported when you click the continue button.
      </p>
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
                <TableHead className="2xl:!text-[1.6rem] !py-4">ID</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Name</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Email</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Phone</TableHead>
                <TableHead className="2xl:!text-[1.6rem] !py-4">Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10">
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : customers?.data?.length === 0 && !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-10 text-gray-500 text-xl"
                  >
                    No customers yet.
                  </TableCell>
                </TableRow>
              ) : (customers?.data?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item?.id}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item?.firstName + " " + item?.lastName}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item?.email}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item?.phone}</TableCell>
                  <TableCell className="2xl:!text-[1.6rem] !py-4">{item?.createdAt}</TableCell>
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
