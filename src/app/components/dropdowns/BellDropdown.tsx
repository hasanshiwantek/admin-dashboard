"use client";
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { IoMdClose } from "react-icons/io";

export default function BellDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="relative !p-3 hover:bg-[#2d3748] cursor-pointer rounded-md"
      >
        <Bell
          size={20}
          className={open ? "text-black" : "text-white"}
          fill={open ? "white" : "none"}
        />
        <span className="absolute top-[1px] -right-0.5 text-sm bg-red-500 !text-white rounded-md !p-2 w-5 h-5 flex items-center justify-center !text-[10px]">
          38
        </span>
      </div>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-[120%] mt-2 w-[450px] max-h-[400px]  overflow-y-auto bg-white text-black rounded-md shadow-lg z-50">
          <h2 className="!p-2 font-semibold border-b  !text-[#5d5b66] !my-4  ">
            Notifications (38)
          </h2>
          <ul className="divide-y divide-gray-200 !space-y-5 ">
            {Array.from({ length: 10 }).map((_, i) => (
              <li
                key={i}
                className="!p-4 flex justify-between items-start  hover:bg-gray-100 "
              >
                <p className="!text-[1.4rem]  leading-snug">
                  Payment provider Test payment provider configuration with
                  currency USD has been deleted
                </p>
                <i>
                  <IoMdClose size={17} color="gray" />
                </i>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
