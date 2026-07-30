"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchStaffLogs } from "@/redux/slices/storeLogsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";

export default function StoreLogsTable() {
  const dispatch = useAppDispatch();

  const { staffLogs, meta, loading, error } = useAppSelector(
    (state: RootState) => state.storeLogs
  );

  // Filter states
  const [selectedStaff, setSelectedStaff] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchStaffLogs({ page: 1 }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    if (!meta) return;
    if (page < 1 || page > meta.last_page) return;
    dispatch(fetchStaffLogs({ page }));
  };

  const handleSearch = () => {
    // Later you can pass filters to the API
    // For now just refetch page 1
    dispatch(fetchStaffLogs({ page: 1 }));
  };

  // Generate page numbers
  const getPageNumbers = () => {
    if (!meta) return [];

    const { current_page, last_page } = meta;
    const pages: (number | string)[] = [];

    if (last_page <= 7) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current_page > 3) {
        pages.push("...");
      }

      const start = Math.max(2, current_page - 1);
      const end = Math.min(last_page - 1, current_page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current_page < last_page - 2) {
        pages.push("...");
      }

      pages.push(last_page);
    }

    return pages;
  };

  return (
    <div className="w-full">
      {/* Filters */}
      {/* <div className="flex justify-end gap-3 mb-6">
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          className="w-[220px] h-[38px] border border-gray-300 px-3 text-[14px] bg-white outline-none"
        >
          <option value="">-- All Staff --</option>
          <option value="nick">Nick</option>
          <option value="support">Support</option>
        </select>

        <input
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          placeholder="Filter By Action"
          className="w-[220px] h-[38px] border border-gray-300 px-3 text-[14px] outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-[#4361ee] text-white px-6 h-[38px] rounded-sm text-[14px] hover:bg-[#3651d4]"
        >
          Search
        </button>
      </div> */}

      {/* Table Card */}
      <div className="w-full bg-white border border-[#dcdcdc] rounded-sm overflow-hidden mt-3.5">
        {/* Top Pagination */}
        <div className="flex justify-end items-center gap-2 px-6 py-3 border-b border-[#e6e6e6] text-[12px]">
          <ChevronLeft
            size={14}
            className={`cursor-pointer ${
              !meta || meta.current_page <= 1
                ? "text-gray-300 pointer-events-none"
                : "text-[#4361ee]"
            }`}
            onClick={() => handlePageChange((meta?.current_page || 1) - 1)}
          />

          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`top-ellipsis-${idx}`} className="text-[#4361ee]">
                ...
              </span>
            ) : (
              <span
                key={`top-${p}`}
                onClick={() => handlePageChange(p as number)}
                className={`cursor-pointer ${
                  meta?.current_page === p
                    ? "font-semibold text-[#4361ee]"
                    : "text-[#4361ee]"
                }`}
              >
                {p}
              </span>
            )
          )}

          <span
            className={`cursor-pointer ${
              !meta || meta.current_page >= meta.last_page
                ? "text-gray-300 pointer-events-none"
                : "text-[#4361ee]"
            }`}
            onClick={() => handlePageChange((meta?.current_page || 1) + 1)}
          >
            Next
          </span>
        </div>

        {/* Table */}
        <div>
          <Table>
            <TableHeader className="h-18">
              <TableRow className="border-b border-[#e5e5e5] bg-white hover:bg-white">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                  Username
                </TableHead>
                <TableHead className="text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                  Action
                </TableHead>
                <TableHead className="w-[260px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                  Date
                </TableHead>
                <TableHead className="w-[180px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                  IP Address
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-16 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#4361ee]">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-[13px]">Loading staff logs...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-16 text-center text-red-500 text-[13px]"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : staffLogs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-16 text-center text-[#666] text-[13px]"
                  >
                    No staff logs found.
                  </TableCell>
                </TableRow>
              ) : (
                staffLogs.map((item: any) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#ececec] hover:bg-[#fafafa] transition-colors"
                  >
                    {/* Icon */}
                    <TableCell className="py-4 px-4 align-top">
                      <Pencil
                        size={13}
                        strokeWidth={1.8}
                        className="text-[#9d9d9d]"
                      />
                    </TableCell>

                    {/* Username */}
                    <TableCell className="py-4 px-4 align-top">
                      <span
                        // href="#"
                        className="text-[13px]  break-all"
                      >
                        {item.username}
                      </span>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-4 px-4 align-top">
                      <div className="text-[13px] leading-6 text-[#222] whitespace-normal break-words">
                        {item.action}
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-4 px-4 align-top whitespace-nowrap">
                      <span className="text-[13px] text-[#222]">
                        {item.date}
                      </span>
                    </TableCell>

                    {/* IP */}
                    <TableCell className="py-4 px-4 align-top whitespace-nowrap">
                      <span className="text-[13px] text-[#222]">
                        {item.ip_address}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Bottom Pagination */}
        <div className="flex justify-end items-center gap-2 px-6 py-4 border-t border-[#e6e6e6] text-[12px] bg-white">
          <ChevronLeft
            size={14}
            className={`cursor-pointer ${
              !meta || meta.current_page <= 1
                ? "text-gray-300 pointer-events-none"
                : "text-[#4361ee]"
            }`}
            onClick={() => handlePageChange((meta?.current_page || 1) - 1)}
          />

          {getPageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`bottom-ellipsis-${idx}`} className="text-gray-500">
                ...
              </span>
            ) : (
              <span
                key={`bottom-${p}`}
                onClick={() => handlePageChange(p as number)}
                className={`cursor-pointer ${
                  meta?.current_page === p
                    ? "font-semibold text-[#4a64d8]"
                    : "text-[#4a64d8]"
                }`}
              >
                {p}
              </span>
            )
          )}

          <span
            className={`cursor-pointer ${
              !meta || meta.current_page >= meta.last_page
                ? "text-gray-300 pointer-events-none"
                : "text-[#4a64d8]"
            }`}
            onClick={() => handlePageChange((meta?.current_page || 1) + 1)}
          >
            Next
          </span>

          <ChevronRight
            size={14}
            className={`cursor-pointer ${
              !meta || meta.current_page >= meta.last_page
                ? "text-gray-300 pointer-events-none"
                : "text-[#4361ee]"
            }`}
            onClick={() => handlePageChange((meta?.current_page || 1) + 1)}
          />
        </div>
      </div>
    </div>
  );
}