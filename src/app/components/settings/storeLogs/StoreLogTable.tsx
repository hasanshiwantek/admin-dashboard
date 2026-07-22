"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";

const logs = [
  {
    id: 1,
    username: "hassan.mujtaba@shiwantek.com",
    action: "(Successfully logged in)",
    date: "22nd Jul 2026 @ 9:39 AM",
    ip: "103.86.53.108",
  },
  {
    id: 2,
    username: "operation@serverblink.com",
    action: "(Successfully logged in)",
    date: "22nd Jul 2026 @ 9:14 AM",
    ip: "103.86.53.108",
  },
  {
    id: 3,
    username: "operation@serverblink.com",
    action: "(Successfully logged in)",
    date: "22nd Jul 2026 @ 9:01 AM",
    ip: "72.255.0.18",
  },
  {
    id: 4,
    username: "support@serverblink.com",
    action: "(Successfully logged in)",
    date: "22nd Jul 2026 @ 8:49 AM",
    ip: "72.255.0.18",
  },
  {
    id: 5,
    username: "nick@serverblink.com",
    action:
      "Product IB8RM | Tripp Lite | Isobar Ultra Surge 9in Remote On/Off Switch 8 outlet 12' Cord 3840 upda (567838, IB8RM)",
    date: "22nd Jul 2026 @ 8:25 AM",
    ip: "103.86.53.108",
  },
  {
    id: 6,
    username: "nick@serverblink.com",
    action:
      "Product SU10000RT3UPM | TRIPP LITE | SmartOnline 200-240V 10kVA 9kW UPS updated",
    date: "22nd Jul 2026 @ 8:17 AM",
    ip: "149.40.240.110",
  },
  {
    id: 7,
    username: "adil.yousuf@shiwantek.com",
    action: "(Successfully logged in)",
    date: "22nd Jul 2026 @ 8:17 AM",
    ip: "149.40.240.110",
  },
  {
    id: 8,
    username: "nick@serverblink.com",
    action: "(Successfully logged in)",
    date: "22nd Jul 2026 @ 8:09 AM",
    ip: "72.255.0.18",
  },
  {
    id: 9,
    username: "support@serverblink.com",
    action:
      "Product SD-SDSDPH-002GBLK | Sandisk Ultra II 2Gb Class 4 Sd Flash Memory Card updated",
    date: "21st Jul 2026 @ 5:18 PM",
    ip: "72.255.0.18",
  },
  {
    id: 10,
    username: "huzaifa.asif@shiwantek.com",
    action: "(Blog Post Edited, blogId : 79)",
    date: "21st Jul 2026 @ 4:36 PM",
    ip: "149.40.240.110",
  },
];

export default function StoreLogsTable() {
  return (
    <div className="w-full bg-white border border-[#dcdcdc] rounded-sm overflow-hidden">

      {/* Pagination */}

      <div className="flex justify-end items-center gap-2 px-6 py-3 border-b border-[#e6e6e6] text-[12px]">

        <ChevronLeft size={14} className="!text-[#4361ee] cursor-pointer"/>

        <span className="!text-[#4361ee] cursor-pointer">1</span>

        <span className="!text-[#4361ee] cursor-pointer">2</span>

        <span className="!text-[#4361ee] cursor-pointer">3</span>

        <span className="!text-[#4361ee] cursor-pointer">4</span>

        <span className="!text-[#4361ee]   cursor-pointer">5</span>

        <span className="!text-[#4361ee]  cursor-pointer">6</span>

        <span className="!text-[#4361ee]  cursor-pointer">7</span>

        <span className="!text-[#4361ee] ">...</span>

        <span className="!text-[#4361ee]  cursor-pointer">886</span>

        <span className="!text-[#4361ee]  cursor-pointer">
          Next
        </span>

      </div>

      <table className="w-full border-collapse">

        <thead>

          <tr className="border-b border-[#e5e5e5] bg-white">

            <th className="w-[50px]"></th>

            <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
              Username
            </th>

            <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
              Action
            </th>

            <th className="w-[260px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
              Date
            </th>

            <th className="w-[180px] text-left py-4 px-4 font-semibold text-[13px] text-[#333]">
              IP Address
            </th>

          </tr>

        </thead>

        <tbody>

          {/* PART 2 se start hoga yahan */}
                    {logs.map((item) => (
            <tr
              key={item.id}
              className="border-b border-[#ececec] hover:bg-[#fafafa] transition-colors"
            >
              {/* Icon */}
              <td className="py-4 px-4 align-top">
                <Pencil
                  size={13}
                  strokeWidth={1.8}
                  className="text-[#9d9d9d]"
                />
              </td>

              {/* Username */}
              <td className="py-4 px-4 align-top">
                <a
                  href="#"
                  className="text-[13px] text-[#4a64d8] hover:underline break-all"
                >
                  {item.username}
                </a>
              </td>

              {/* Action */}
              <td className="py-4 px-4 align-top">
                <div className="text-[13px] leading-6 text-[#222] break-words">
                  {item.action}
                </div>
              </td>

              {/* Date */}
              <td className="py-4 px-4 align-top whitespace-nowrap">
                <span className="text-[13px] text-[#222]">
                  {item.date}
                </span>
              </td>

              {/* IP */}
              <td className="py-4 px-4 align-top whitespace-nowrap">
                <span className="text-[13px] text-[#222]">
                  {item.ip}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bottom Pagination */}

      <div className="flex justify-end items-center gap-2 px-6 py-4 border-t border-[#e6e6e6] text-[12px] bg-white">

        <ChevronLeft
          size={14}
          className="text-gray-400 cursor-pointer"
        />

        <span className="text-[#4a64d8] cursor-pointer">1</span>
        <span className="text-[#4a64d8] cursor-pointer">2</span>
        <span className="text-[#4a64d8] cursor-pointer">3</span>
        <span className="text-[#4a64d8] cursor-pointer">4</span>
        <span className="text-[#4a64d8] cursor-pointer">5</span>
        <span className="text-[#4a64d8] cursor-pointer">6</span>
        <span className="text-[#4a64d8] cursor-pointer">7</span>

        <span className="text-gray-500">...</span>

        <span className="text-[#4a64d8] cursor-pointer">
          886
        </span>

        <span className="text-[#4a64d8] cursor-pointer">
          Next
        </span>

        <ChevronRight
          size={14}
          className="text-gray-400 cursor-pointer"
        />

      </div>

    </div>
  );
}
