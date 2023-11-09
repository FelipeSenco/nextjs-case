"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-green-100 shadow-lg bg-gray-200 p-fixed">
      <div className="container mx-auto px-6 py-3 flex justify-center items-center w-1/3">
        <div className="flex space-x-4 justify-between w-full">
          <Link
            href="/"
            className={pathname === "/" ? "bg-green-300 px-4 rounded" : ""}
          >
            <span className={linkTextStyle}> Home</span>
          </Link>
          <Link
            href="/view/customers"
            className={
              pathname === "/view/customers" ? "bg-green-200 px-4 rounded" : ""
            }
          >
            <span className={linkTextStyle}> Customers</span>
          </Link>
          <Link
            href="/view/orders"
            className={
              pathname === "/view/orders" ? "bg-green-200 px-4 rounded" : ""
            }
          >
            <span className={linkTextStyle}>Orders</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

const linkTextStyle =
  "text-green-700 hover:text-green-900 font-semibold transition duration-300 cursor-pointer";
