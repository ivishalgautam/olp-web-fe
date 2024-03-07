"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LuBarChartHorizontal } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLocalPhone } from "react-icons/md";
import { redirect } from "next/dist/server/api-utils";

const navList = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Products", href: "/products" },
  { title: "Contact", href: "/contact" },
];

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
  redirect("/signin");
};

export default function Navbar() {
  const [isCategory, setIsCategory] = useState(false);

  return (
    <div className="flex h-16 items-center justify-center bg-primary">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              className="flex items-center justify-center gap-2 text-white"
              onClick={() => setIsCategory(!isCategory)}
            >
              <LuBarChartHorizontal size={25} />
              <span>Browse categories</span>
              <IoIosArrowDown
                size={25}
                className={isCategory && "rotate-180"}
              />
            </button>
            <div
              className={`absolute h-16 w-full bg-black ${isCategory ? "opacity-100" : "opacity-0"} mt-4 transition-all`}
            ></div>
          </div>
          <nav>
            <ul className="flex gap-8">
              {navList.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm font-semibold text-white"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <button className="flex items-center justify-center gap-2 text-white">
              <MdOutlineLocalPhone />
              <span className="text-sm">Whatsapp</span>
              <span className="text-lg font-bold">+91 9811632400</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
