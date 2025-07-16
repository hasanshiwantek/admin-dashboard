"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/Header/Header.module.css"
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import HelpDropdown from "../dropdowns/HelpDropdown";
import BellDropdown from "../dropdowns/BellDropdown";
import UserDropdown from "../dropdowns/UserDropdown";

const Header: React.FC = () => {
  const [companyOpen, setCompanyOpen] = useState<boolean>(false);
  const companyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        companyRef.current &&
        !companyRef.current.contains(e.target as Node)
      ) {
        setCompanyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed h-22 px-4 flex items-center justify-between relative z-40 bg-[var(--header-bg)]">
      {/* Left: Logo & Company Name */}
      <div className="flex items-center gap-2 !ml-10 ">
        <div className="flex justify-start items-center gap-10  ">
          <div className="!p-2 hover:bg-[#2d3748] cursor-pointer">
            <img src="/logo.svg" alt="Logo" className="h-8  cursor-pointer " />
          </div>
          <div ref={companyRef} className="relative">
            {/* Toggle Button */}
            <div
              className="flex justify-between gap-22 !px-4 items-center border-r-2 border-l-2 border-[#2d3748] h-[5rem] cursor-pointer hover:bg-[#2d3748]"
              onClick={() => setCompanyOpen(!companyOpen)}
            >
              <button className="text-white text-xl font-medium py-1 rounded-md cursor-pointer">
                CTS Point Inc
              </button>
              <IoIosArrowDown
                size={20}
                color="white"
                className={`transition-transform duration-200 ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {companyOpen && (
              <div className="absolute left-0 mt-2 w-[300px] bg-white rounded-md shadow-lg z-50 !p-5">
                <div className="p-4 !my-5">
                  <p className="!text-2xl !text-black">CTS Point Inc</p>
                  <p className="!text-xl !text-gray-500">Pro Plan Store</p>
                </div>
                <p className="p-3  cursor-pointer !text-2xl hover:text-blue-700">
                  Switch account
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center: Search Input */}
      <div
        className="flex justify-start items-center bg-[#1e2a3f] text-center !px-4 !py-3 rounded-md
             focus-within:ring-3 focus-within:ring-blue-200 focus-within:border-blue-200 border border-[#2c2c2c] transition hover:border-blue-200"
      >
        <i>
          <IoSearchOutline
            size={20}
            color="lightgray"
            className="cursor-pointer"
          />
        </i>
        <input
          type="text"
          placeholder=" Search products, orders, customers, or navigate to"
          className="w-[40rem]  !ml-3 bg-transparent text-white !text-xl !font-medium outline-none placeholder:text-gray-100"
        />
      </div>

      {/* Right: Icons and Link */}
      <div className="flex items-center  gap-1  !mr-2 ">
        <div className="flex items-center justify-between  ">
          <div className="!p-1 hover:bg-[#2d3748] cursor-pointer ">
            <HelpDropdown />
          </div>
          <div className=" !p-1 hover:bg-[#2d3748] cursor-pointer">
            <BellDropdown />
          </div>
          <div className="relative !p-1 hover:bg-[#2d3748] cursor-pointer">
            <UserDropdown />
          </div>
        </div>
        <div className="!p-1 hover:bg-[#2d3748] cursor-pointer text-white">
          <a
            href="#"
            className="!text-xl font-medium hover:underline flex items-center gap-1  h-[5rem] !px-3 border-l-2 border-[#2d3748]"
          >
            View storefront
            <span>
              <FaExternalLinkAlt size={15} color="gray" className="!ml-1" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

