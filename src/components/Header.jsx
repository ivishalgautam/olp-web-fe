"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import Navbar from "./Navbar";
import { MainContext } from "@/store/context";
import Search from "./Search";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchTempCart = async () => {
  return await http().get(endpoints.cart.temp);
};

export default function Header() {
  const { user } = useContext(MainContext);

  const { data } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart"],
    enabled: !!user,
  });

  return (
    <header className="">
      <HeaderTop user={user} />
      <HeaderMiddle data={data?.data} />
      <Navbar />
    </header>
  );
}

export const HeaderTop = ({ user }) => {
  return (
    <div className="hidden bg-secondary py-2.5 md:block">
      <div className="container flex items-center justify-between text-sm font-medium text-white">
        <div className="flex items-center justify-center gap-2">
          <FaPhone />
          <span>+91 9811632400</span>
        </div>
        <Link href={user ? "/customer/profile" : "/login"}>
          {user ? `${user?.first_name} ${user?.last_name}` : "Log In / Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export const HeaderMiddle = ({ data }) => {
  return (
    <div className="container hidden min-h-16 md:block">
      <div className="flex items-center justify-between py-8">
        <div className="">
          <Image
            width={100}
            height={100}
            src={"/logo.png"}
            alt="logo"
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="hidden w-1/2 md:block">
          <div className="flex h-14 rounded-full border-2">
            {/* input */}
            <div className="w-full">
              <Search />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link href={"/cart"} className="relative">
            {data?.length ? (
              <span className="absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                {data?.length}
              </span>
            ) : (
              <></>
            )}
            <MdOutlineShoppingCart size={30} />
          </Link>
          <Link href={"/customer/overview"}>
            <FiUser size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};
