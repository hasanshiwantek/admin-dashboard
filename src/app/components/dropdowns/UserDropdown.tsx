"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { CircleUser } from "lucide-react";
import { logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import Link from "next/link";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [parsedUser, setParsedUser] = useState<any>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const updateMenuPos = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMenuPos({
      top: r.bottom + 8,
      right: window.innerWidth - r.right,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    setParsedUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    updateMenuPos();
    window.addEventListener("resize", updateMenuPos);
    window.addEventListener("scroll", updateMenuPos, true);
    return () => {
      window.removeEventListener("resize", updateMenuPos);
      window.removeEventListener("scroll", updateMenuPos, true);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const menu = document.getElementById("user-dropdown-menu");
      if (ref.current?.contains(target) || menu?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const ok = window.confirm("Are you sure want to logout?");
    if (!ok) return;
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((v) => !v)}
        className="p-3 hover:bg-[#2d3748] cursor-pointer rounded-md"
      >
        <CircleUser
          size={20}
          fill={open ? "white" : "none"}
          className={open ? "text-black" : "text-white"}
        />
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="user-dropdown-menu"
            className="fixed z-[9999] w-[250px] bg-white rounded-md shadow-lg text-black p-4"
            style={{
              top: menuPos.top,
              right: menuPos.right,
            }}
          >
            <p className="px-4 py-2 my-4 text-[12px] font-medium text-[#5d5b66] break-all">
              {parsedUser?.email}
            </p>
            <ul className="space-y-2 text-[#313440]">

              {/* <Link href={"/manage/user-settings/profile"}>
              <li className="!text-xl px-4 py-2 hover:text-blue-800 cursor-pointer ">
                Profile name and language
              </li>
             </Link> */}
              {/* <Link href={"/manage/user-settings/change-email"}>
             <li className=" !text-xl px-4 py-2  hover:text-blue-800  cursor-pointer ">
               Email address
            </li>
           </Link> */}
              <li>
                <Link
                  href="/manage/user-settings/change-password"
                  className="block text-xl px-4 py-2 hover:text-blue-800"
                  onClick={() => setOpen(false)}
                >
                  Password
                </Link>
              </li>
              <li>
                <Link
                  href="/manage/user-settings/additional-authentication"
                  className="block text-xl px-4 py-2 hover:text-blue-800"
                  onClick={() => setOpen(false)}
                >
                  Two-factor authentication
                </Link>
              </li>
            </ul>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full cursor-pointer mt-4 px-4 flex items-center justify-between text-xl font-medium text-[#313440] hover:text-blue-800"
            >
              Log out
              <IoIosLogOut size={18} />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}