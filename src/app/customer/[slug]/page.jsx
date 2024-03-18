"use client";
import { MainContext } from "@/store/context";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { H4, H6, Small } from "@/components/ui/typography";
import { IoBagHandleOutline, IoCartOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoKeyOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProfileForm from "@/components/forms/profile";
import Orders from "@/app/orders/page";
import ChangePasswordForm from "@/components/forms/change-password";
import { logout } from "@/components/Navbar";
import Overview from "@/components/Overview";
import Enquiries from "@/app/enquiries/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "@/components/Spinner";

export default function Page({ params: { slug } }) {
  const { user } = useContext(MainContext);
  if (!user) return <Spinner />;

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="rounded-md bg-white p-4">
              <Sidebar {...user} slug={slug} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <div className="rounded-md bg-white p-4">
              {slug === "overview" && <Overview />}
              {slug === "enquiry-product" && (
                <div className="rounded-lg border p-4">
                  <H4>Enquiries</H4> <Enquiries />
                </div>
              )}
              {slug === "orders" && (
                <div className="rounded-lg border p-4">
                  <H4>Orders</H4> <Orders />
                </div>
              )}
              {slug === "profile" && <ProfileForm />}
              {slug === "change-password" && <ChangePasswordForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sidebar({ image_url, first_name, last_name, email, slug }) {
  const tabs = [
    {
      title: "Enquiry product",
      href: "enquiry-product",
      icon: <IoBagHandleOutline size={18} />,
    },
    {
      title: "Orders",
      href: "orders",
      icon: <IoCartOutline size={18} />,
    },
    {
      title: "Profile",
      href: "profile",
      icon: <LiaUserEditSolid size={18} />,
    },
    {
      title: "Change password",
      href: "change-password",
      icon: <IoKeyOutline size={18} />,
    },
  ];
  const fullname = `${first_name} ${last_name}`;
  return (
    <div className="">
      <div className="flex items-center justify-start gap-4 border-b py-4">
        <div>
          <Avatar>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image_url}`}
              alt={fullname}
            />
            <AvatarFallback>
              {first_name.charAt(0).toUpperCase() +
                last_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <H6 className={"text-sm"}>{fullname}</H6>
          <Small className={"text-xs text-gray-500"}>{email}</Small>
        </div>
      </div>

      <ul className="mt-4 divide-y overflow-hidden rounded border">
        {tabs.map(({ title, href, icon }) => (
          <li
            key={href}
            className={cn("text-sm hover:bg-primary hover:text-white", {
              "bg-primary text-white": href === slug,
            })}
          >
            <Link
              className="flex items-center  justify-start gap-4 p-4"
              href={`/customer/${href}`}
            >
              <div>{icon}</div>
              <div>{title}</div>
            </Link>
          </li>
        ))}
        <li className="text-sm">
          <Button
            onClick={() => logout()}
            className="flex w-full items-center justify-start gap-4 rounded-none bg-transparent px-4 py-6 text-sm text-black hover:bg-transparent"
          >
            <CiLogout />
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
}
