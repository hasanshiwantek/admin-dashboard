"use client";
import { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

export default function HelpDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
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
    <div className="relative " ref={ref}>
      {/* Trigger Icon */}
      <div
        onClick={() => setOpen(!open)}
        className="p-3 hover:bg-[#2d3748] rounded-md cursor-pointer"
      >
        <HelpCircle
          size={20}
          className={open ? "text-black" : "text-white"}
          fill={open ? "white" : "none"} 
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[130%] w-[350px] bg-white  text-black rounded-md shadow-lg z-50 !px-8 !py-6  ">
          <div>
            <h2 className="!text-[#5d5b66] !text-3xl !my-4">Help</h2>
          </div>

          <div
            className="flex justify-start items-center bg-white text-center !px-2 !py-3 rounded-xl 
             focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200 border-2 border-gray-300  transition"
          >
            <i>
              <IoSearchOutline
                size={20}
                color="gray"
                className="cursor-pointer"
              />
            </i>
            <input
              type="text"
              placeholder=" Search support Articles"
              className="w-[40rem] !ml-3 bg-transparent !text-[#5d5b66] !text-2xl !font-medium outline-none placeholder:text-gray-300"
            />
          </div>

          <div className="p-3 text-sm ">
            <h2 className="font-semibold !my-4">Additional help</h2>
            <ul className="!space-y-5 text-[#5d5b66] ">
              <div className="flex justify-between items-center ">
                <li className="hover:text-blue-700 cursor-pointer !text-xl">
                  Ask the Community
                </li>
                <i>
                  <FaExternalLinkAlt size={15} color="gray" />
                </i>
              </div>

              <div className="flex justify-between items-center ">
                <li className="hover:text-blue-700 cursor-pointer !text-xl">
                  Visit the Help Center
                </li>
                <i>
                  <FaExternalLinkAlt size={15} color="gray" />
                </i>
              </div>

              <div className="flex justify-between items-center ">
                <li className="hover:text-blue-700 cursor-pointer !text-xl">
                  Submit a feature request
                </li>
                <i>
                  <FaExternalLinkAlt size={15} color="gray" />
                </i>
              </div>
            </ul>

            <h2 className="font-semibold !my-4">Services & support</h2>
            <ul className="!space-y-5 text-[#5d5b66] ">
              <div className="flex justify-between items-center ">
                <li className="hover:text-blue-700 cursor-pointer !text-xl">
                  BigCommerce University
                </li>
                <i>
                  <FaExternalLinkAlt size={15} color="gray" />
                </i>
              </div>
              <div className="flex justify-between items-center ">
                <li className="hover:text-blue-700 cursor-pointer !text-xl">
                  Email support
                </li>
                <i>
                  <FaExternalLinkAlt size={15} color="gray" />
                </i>
              </div>
              <li className="hover:text-blue-600 cursor-pointer !text-xl">
                Live chat
              </li>

              <div className="flex justify-between items-center ">
                <li className="hover:text-blue-700 cursor-pointer !text-xl">
                  Phone support
                </li>
                <i>
                  <IoIosArrowForward size={18} />
                </i>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
