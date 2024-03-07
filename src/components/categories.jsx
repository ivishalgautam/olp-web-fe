"use client";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import Image from "next/image";
import { H3 } from "./ui/typography";

export default function Categories() {
  const { data } = useFetchCategories();
  return (
    <div className="bg-[#f4f5f9] py-16">
      <div className="container space-y-4">
        <H3>Feature categories</H3>
        <div className="grid grid-cols-8">
          {data?.data?.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-wrap items-center justify-center rounded-md bg-white p-2 shadow-sm"
            >
              <div>
                <figure className="relative size-32">
                  <Image
                    fill
                    src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${cat.image}`}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
              </div>
              <span className="mt-3 font-semibold capitalize">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
