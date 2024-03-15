"use client";
import React, { useContext, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams, usePathname, useRouter } from "next/navigation";
import { allRoutes } from "@/data/routes";
import { MainContext } from "@/store/context";
import Spinner from "../Spinner";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams();
  const { user } = useContext(MainContext);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/signup") {
      return;
    }

    // Find the current route in the AllRoutes array
    const currentRoute = allRoutes?.find(
      (route) => route.link === pathname.replace(slug, "[slug]"),
    );
    // console.log({ currentRoute });

    if (user && currentRoute.roles.length && !user?.is_verified)
      return router.push("/verify");
    // If the current route is not found in the array or the user's role is not allowed for this route

    if (
      currentRoute &&
      currentRoute.roles.length &&
      (!currentRoute || !currentRoute?.roles?.includes(user?.role))
    ) {
      router.replace("/login");
    }
  }, [pathname, user]);

  return (
    <div>
      <Header />
      <main className="h-screen">
        {children}
        <Footer />
      </main>
    </div>
  );
}
