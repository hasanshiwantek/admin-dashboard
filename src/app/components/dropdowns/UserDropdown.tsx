"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { CircleUser } from "lucide-react";
import { logout } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();



const [parsedUser, setParsedUser] = useState<any>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    setParsedUser(storedUser ? JSON.parse(storedUser) : null);
  }
}, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false); // Close dropdown on route change
  }, [pathname]);

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure want to logout?");
    if (!confirm) {
      return;
    } else {
      dispatch(logout());
      router.push("/login");
    }
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="p-3 hover:bg-[#2d3748] cursor-pointer rounded-md"
      >
        <CircleUser
          size={20}
          fill={open ? "white" : "none"}
          className={open ? "text-black" : "text-white"}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[120%] mt-2 w-[250px] bg-white rounded-md shadow-lg text-black z-50 !p-4">
          <p className="px-4 py-3  !my-4 !text-[12px] font-medium !text-[#5d5b66] ">
            {parsedUser?.email}
          </p>
          <ul className="  !space-y-5 !text-[#313440]">
            <Link href={"/manage/user-settings/profile"}>
              <li className="!text-xl px-4 py-2 hover:text-blue-800 cursor-pointer ">
                Profile name and language
              </li>
            </Link>
            <Link href={"/manage/user-settings/change-email"}>
              <li className=" !text-xl px-4 py-2  hover:text-blue-800  cursor-pointer ">
                Email address
              </li>
            </Link>
            <Link href={"/manage/user-settings/change-password"}>
              <li className=" !text-xl px-4 py-2  hover:text-blue-800  cursor-pointer ">
                Password
              </li>
            </Link>
            <Link href={"/manage/user-settings/additional-authentication"}>
              <li className="!text-xl px-4 py-2  hover:text-blue-800  cursor-pointer ">
                Two-factor authentication
              </li>
            </Link>
          </ul>
          <div
            onClick={handleLogout}
            className="cursor-pointer !ml-5 !my-5 flex justify-between flex-row group"
          >
            <a className="!text-xl !font-medium text-[#313440] group-hover:text-blue-800">
              Log out
            </a>
            <i className="group-hover:text-blue-800">
              <IoIosLogOut size={18} />
            </i>
          </div>
        </div>
      )}
    </div>
  );
}
