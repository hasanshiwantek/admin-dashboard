"use client";
import AddUserModal from "@/app/components/settings/user-permission/AddUserModal";
import UserPermissionTable from "@/app/components/settings/user-permission/UserPermissionTable";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Page() {
    const router = useRouter()
    const [openAddUser, setOpenAddUser] = useState(false);
    return (
        <>
            {/* {openAddUser && <AddUserModal
                open={openAddUser}
                onClose={() => setOpenAddUser(false)}
            />} */}
            <div className="w-full p-6 bg-[#f6f7fb] min-h-screen">

                {/* Back */}

                <button className="flex items-center gap-2 text-[#6b7280] text-[14px] hover:text-black mb-5" onClick={() => router.back()}>
                    <ArrowLeft size={12} />
                    <span>Settings</span>
                </button>

                {/* Title */}

                <h1 className="text-[38px] font-light text-[#222]">
                    Users
                </h1>

                <p className="text-[14px] text-[#555] mt-3">
                    Store Users
                </p>

                {/* Filters */}

                <div className="flex justify-end gap-3 mt-8 mb-6">
                    <button
                        // onClick={() => setOpenAddUser(true)} 
                        onClick={() => router.push("/manage/settings/user-permission/add-user")}
                        className="bg-[#4361ee] text-white px-6 h-[38px] rounded-sm text-[14px] hover:bg-[#3651d4]">
                        Add user
                    </button>
                </div>

                {/* Table */}

                <UserPermissionTable />

            </div>
        </>
    );
}