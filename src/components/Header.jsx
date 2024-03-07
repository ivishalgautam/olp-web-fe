import React from "react";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch, FiUser } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="">
      <div className="bg-secondary py-2.5">
        <div className="container flex items-center justify-between text-sm font-medium text-white">
          <div className="flex items-center justify-center gap-2">
            <FaPhone />
            <span>+91 9811632400</span>
          </div>
          <Link href={"login"}>Log In / Sign Up</Link>
        </div>
      </div>
      <div className="container min-h-16 overflow-hidden">
        <div className="flex items-center justify-between py-8">
          <div className="relative h-16 w-24">
            <Image
              fill
              src={"/logo.png"}
              alt="logo"
              className="h-full w-full object-contain object-center"
            />
          </div>

          <div className="hidden w-1/2 md:block">
            <div className="flex h-14 rounded-full border-2">
              {/* select */}
              <div className="flex items-center justify-center rounded-l-full border-r-2 bg-gray-100 px-4">
                <select name="" id="" className="bg-transparent">
                  <option value="">All categories</option>
                  <option value="">cat1</option>
                  <option value="">cat1</option>
                  <option value="">cat1</option>
                </select>
              </div>
              {/* input */}
              <div className="relative h-full w-full">
                <input
                  placeholder="Search for items"
                  className="h-full w-full rounded-r-full px-4"
                />
                <button className="absolute right-0.5 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white">
                  <FiSearch size={25} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link href={"/cart"}>
              <MdOutlineShoppingCart size={30} />
            </Link>
            <button>
              <FiUser size={30} />
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
}
