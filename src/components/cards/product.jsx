import React from "react";
import Image from "next/image";
import { H6 } from "../ui/typography";

export default function ProductCard({ id, title, image }) {
  return (
    <div>
      <figure className="relative size-56 w-full overflow-hidden rounded-md">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform hover:scale-110"
        />
      </figure>
      <H6 className={"text-center"}>{title}</H6>
    </div>
  );
}
