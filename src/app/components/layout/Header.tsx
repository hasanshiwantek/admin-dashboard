"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/Header/Header.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import HelpDropdown from "../dropdowns/HelpDropdown";
import BellDropdown from "../dropdowns/BellDropdown";
import UserDropdown from "../dropdowns/UserDropdown";
import Image from "next/image";
import GlobalSearchBar from "./GlobalSearch";
import Link from "next/link";
interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [companyOpen, setCompanyOpen] = useState<boolean>(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const [storeData, setStoreData] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  useEffect(() => {
    // Runs only in browser
    const storedStores = localStorage.getItem('availableStores');
    const parsedStores = storedStores ? JSON.parse(storedStores) : [];
    setStoreData(parsedStores);

    const savedStoreId = localStorage.getItem('storeId');
    const selected =
      parsedStores.find((store: any) => store.id === savedStoreId) ||
      parsedStores[0] ||
      null;
    setSelectedStore(selected);
  }, []);

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
    <header className="w-full fixed h-22 px-4 flex items-center justify-start md:justify-between z-40  bg-[var(--header-bg)]">
      {/* Left: Logo & Company Name */}
      <div className="flex items-center gap-2 lg:!ml-10 2xl:!ml-5 ">
        {/* ☰ Mobile Sidebar Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-white p-2 hover:bg-[#2d3748]"
        >
          ☰
        </button>
        <div className="flex justify-start items-center gap-10  ">
          <div className="lg:!p-2 hover:bg-[#2d3748] cursor-pointer">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="h-8 cursor-pointer "
              width={20}
              height={20}
            />
          </div>
          <div ref={companyRef} className="relative">
            {/* Toggle Button */}
            <div
              className="relative flex justify-between gap-4 lg:gap-[62px] lg:!px-4 items-center lg:border-r-2 lg:border-l-2 border-[#2d3748] h-[5rem] cursor-pointer hover:bg-[#2d3748]"
              onClick={() => setCompanyOpen(!companyOpen)}
            >
              <button className="text-white text-xl font-medium py-1 rounded-md cursor-pointer 2xl:!text-2xl text-nowrap">
                {selectedStore?.name || 'Select Store'}
              </button>
              <IoIosArrowDown
                size={20}
                color="white"
                className={`transition-transform duration-200 ${companyOpen ? "rotate-180" : ""
                  }`}
              />
            </div>

            {/* Dropdown Menu */}
            {companyOpen && (
              <div className="absolute left-0 mt-2 w-[300px] bg-white rounded-md shadow-lg z-50 !p-5">
                {/* Current Store Info */}
                <div className="p-4 !my-5">
                  <p className="!text-2xl !text-black">{selectedStore?.name}</p>
                  <p className="!text-xl !text-gray-500">
                    {selectedStore?.planType || 'Pro Plan Store'}
                  </p>
                </div>

                {/* Store List */}
                {storeData && storeData.length > 1 && (
                  <div className="border-t border-gray-200 pt-3">
                    <p className="px-3 pb-2 !text-sm !text-gray-500 font-semibold uppercase">
                      Switch Store
                    </p>
                    {storeData.map((store: any) => (
                      <div
                        key={store.id}
                        className={`p-3 cursor-pointer rounded hover:bg-gray-100 ${selectedStore?.id === store.id ? 'bg-blue-50' : ''
                          }`}
                        onClick={() => {
                          setSelectedStore(store);
                          localStorage.setItem('selectedStoreId', store.id);
                          setCompanyOpen(false);
                        }}
                      >
                        <p className="!text-lg !text-black font-medium">{store.name}</p>
                        {store.planType && (
                          <p className="!text-sm !text-gray-500">{store.planType}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <GlobalSearchBar />
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
          <Link
            href={selectedStore?.baseUrl || '#'}
            target="_blank"
            className="!text-xl font-medium hover:underline flex items-center gap-1 h-[5rem] !px-3 border-l-2 border-[#2d3748] 2xl:!text-2xl"
          >
            View storefront
            <span>
              <FaExternalLinkAlt size={15} color="gray" className="!ml-1" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
