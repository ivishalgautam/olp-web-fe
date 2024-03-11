"use client";
import { MainContext } from "@/store/context";
import React, { useContext } from "react";
import { H4, P, Small } from "./ui/typography";

export default function Overview() {
  const { user } = useContext(MainContext);
  return (
    <div>
      <H4>
        Hello, {user?.first_name} {user?.last_name}
      </H4>
      <Small className={"mt-4 inline-block text-gray-500"}>
        From your account dashboard. you can easily manage your profile,
        addresses and edit your password and account details.{" "}
      </Small>
    </div>
  );
}
