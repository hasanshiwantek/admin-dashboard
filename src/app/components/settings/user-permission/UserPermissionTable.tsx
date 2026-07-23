"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
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
import { deleteAdminUser, fetchAdminUsers, fetchPermissions } from "@/redux/slices/userPermission";

export default function UserPermissionTable() {
    const dispatch = useAppDispatch();
    const { adminUsers, loading, permissionGroups } = useAppSelector(
        (state) => state?.userPermission
    );

    useEffect(() => {
        dispatch(fetchAdminUsers());
        dispatch(fetchPermissions());
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

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            // TODO: dispatch delete action here
            // dispatch(deleteAdminUser(id));
            await dispatch(deleteAdminUser({ id: Number(id) }))
            dispatch(fetchAdminUsers());
        }
    };

    return (
        <div className="w-full bg-white border border-[#dcdcdc] rounded-sm overflow-hidden">
            <div>
                <Table>
                    <TableHeader className="h-18">
                        <TableRow className="border-b border-[#e5e5e5] bg-white hover:bg-white">
                            <TableHead className="w-[180px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Name
                            </TableHead>
                            <TableHead className="text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Email
                            </TableHead>
                            <TableHead className="w-[260px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Date
                            </TableHead>
                            <TableHead className="w-[100px] text-center py-4 px-4 font-semibold text-[13px] text-[#333]">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-10 text-[13px] text-gray-500"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : adminUsers?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-10 text-[13px] text-gray-500"
                                >
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            adminUsers?.map((item: any) => (
                                <TableRow
                                    key={item.id}
                                    className="border-b border-[#ececec] hover:bg-[#fafafa] transition-colors"
                                >
                                    {/* Name */}
                                    <TableCell className="py-4 px-4 align-top whitespace-nowrap">
                                        <span className="text-[13px] text-[#222] capitalize">
                                            {item.name || "-"}
                                        </span>
                                    </TableCell>

                                    {/* Email */}
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

                                    {/* Actions */}
                                    <TableCell className="py-4 px-4 align-top">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Edit Button */}
                                            <Link
                                                href={`/manage/settings/user-permission/${item.id}`}
                                                className="p-1.5 rounded hover:bg-gray-100 transition"
                                                title="Edit"
                                            >
                                                <Pencil
                                                    size={15}
                                                    strokeWidth={1.8}
                                                    className="text-[#4a64d8]"
                                                />
                                            </Link>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(item.id, item.name)}
                                                className="p-1.5 rounded hover:bg-red-50 transition"
                                                title="Delete"
                                            >
                                                <Trash2
                                                    size={15}
                                                    strokeWidth={1.8}
                                                    className="text-red-500"
                                                />
                                            </button>
                                        </div>
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