"use client";

import Link from "next/link";
import {
    Pencil,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useEffect } from "react";
import { fetchAdminUsers, fetchPermissions } from "@/redux/slices/userPermission";

export default function UserPermissionTable() {
    const dispatch = useAppDispatch();
    const { adminUsers, loading, permissionGroups } = useAppSelector((state) => state?.userPermission);

    useEffect(() => {
        dispatch(fetchAdminUsers());
        dispatch(fetchPermissions())
    }, []);

    const formatDate = (value: string) => {
        if (!value) return "-";
        const d = new Date(value);
        if (isNaN(d.getTime())) return "-";

        const day = d.getDate();
        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                        ? "rd"
                        : "th";

        const month = d.toLocaleString("en-US", { month: "short" });
        const year = d.getFullYear();
        const time = d.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        return `${day}${suffix} ${month} ${year} @ ${time}`;
    };

    return (
        <div className="w-full bg-white border border-[#dcdcdc] rounded-sm overflow-hidden">
            <div>
                <Table>
                    <TableHeader className="h-18">
                        <TableRow className="border-b border-[#e5e5e5] bg-white hover:bg-white">
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead className="w-[180px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Name
                            </TableHead>
                            <TableHead className="text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Email
                            </TableHead>

                            <TableHead className="w-[260px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {/* PART 2 se start hoga yahan */}
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-[13px] text-gray-500">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : adminUsers?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-[13px] text-gray-500">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            adminUsers?.map((item: any) => (
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
                                    {/* Name */}
                                    <TableCell className="py-4 px-4 align-top whitespace-nowrap">
                                        <span className="text-[13px] text-[#222] capitalize">
                                            {item.name || "-"}
                                        </span>
                                    </TableCell>
                                    {/* Username */}
                                    <TableCell className="py-4 px-4 align-top">
                                        <Link
                                            href={`/manage/settings/user-permission/${item.id}`}
                                            className="text-[13px] text-[#4a64d8] hover:underline break-all"
                                        >
                                            {item.email}
                                        </Link>
                                    </TableCell>

                                    {/* Date */}
                                    <TableCell className="py-4 px-4 align-top whitespace-nowrap">
                                        <span className="text-[13px] text-[#222]">
                                            {formatDate(item.created_at)}
                                        </span>
                                    </TableCell>


                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}