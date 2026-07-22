"use client";

import StoreLogsTable from "@/app/components/settings/storeLogs/StoreLogTable";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function StoreLogsPage() {
    const router = useRouter()
  return (
    <div className="w-full p-6 bg-[#f6f7fb] min-h-screen">

      {/* Back */}

      <button className="flex items-center gap-2 text-[#6b7280] text-[14px] hover:text-black mb-5" onClick={()=>router.back()}>
        <ArrowLeft size={12} />
        <span>Settings</span>
      </button>

      {/* Title */}

      <h1 className="text-[38px] font-light text-[#222]">
        Store logs
      </h1>

      <p className="text-[14px] text-[#555] mt-3">
        When an event occurs in your store, a log entry is created. Logs help
        troubleshoot issues and track events for the past 365 days.
      </p>

      {/* Tabs */}

      <div className="flex gap-10 border-b mt-8">

        <button className="pb-3 border-b-2 border-[#5b6dff] text-[14px] text-[#222] font-medium">
          Staff action log
        </button>

      </div>

      {/* Description */}

      <p className="text-[14px] text-[#444] mt-8">
        The staff log keeps track of all events that have taken place in the
        control panel of your store (the area your employees see).
      </p>

      {/* Filters */}

      <div className="flex justify-end gap-3 mt-8 mb-6">

        <select className="w-[220px] h-[38px] border border-gray-300 px-3 text-[14px] bg-white outline-none">

          <option>-- All Staff --</option>

          <option>Nick</option>

          <option>Support</option>

        </select>

        <input
          placeholder="Filter By Action"
          className="w-[220px] h-[38px] border border-gray-300 px-3 text-[14px] outline-none"
        />

        <button className="bg-[#4361ee] text-white px-6 h-[38px] rounded-sm text-[14px] hover:bg-[#3651d4]">
          Search
        </button>

      </div>

      {/* Table */}

      <StoreLogsTable />

    </div>
  );
}