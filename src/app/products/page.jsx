"use client";
import { MainContext } from "@/store/context";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function Page() {
  const { user } = useContext(MainContext);
  const router = useRouter();
  if (!user) return router.push("/login");

  return <div>Page</div>;
}
