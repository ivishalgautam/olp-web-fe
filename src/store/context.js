"use client";
import { useEffect, createContext, useState } from "react";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export const MainContext = createContext(null);

function Context({ children }) {
  const [user, setUser] = useState();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      await http()
        .get(endpoints.profile)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!["/signin", "/signup"].includes(pathname)) fetchData();
  }, [pathname]);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default Context;
