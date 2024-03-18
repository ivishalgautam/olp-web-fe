import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-10 py-10">
          <h2 className="relative text-2xl font-extrabold tracking-wide before:absolute before:-left-4 before:h-full before:w-1 before:bg-primary sm:text-4xl">
            <span className="text-primary"> ONE STOP SOLUTION </span> FOR <br />
            EARTHMOVING SPARE PARTS
          </h2>
          <p className="text-sm">
            It is good to trust the parts, it is better to trust the hands who
            give you the parts.
          </p>
        </div>

        <div className="relative flex items-center justify-center bg-secondary p-4">
          <Image
            src={"/jcb-2.png"}
            width={700}
            height={700}
            alt="jcb"
            className="md:-translate-x-14"
          />
        </div>
      </div>

      {/* images */}
      <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 sm:gap-0">
        <div className="">
          <Link href="/products?page=1&part=genuine">
            <Image
              src={"/genuine-big.jpg"}
              width={1000}
              height={500}
              alt="genuine"
            />
          </Link>
        </div>
        <div className="">
          <Link href="/products?page=1&part=oem">
            <Image src={"/oem-big.jpg"} width={1000} height={500} alt="oem" />
          </Link>
        </div>
        <div className="">
          <Link href="/products?page=1&part=aftermarket">
            <Image
              src={"/aftermarket-big.jpg"}
              width={1000}
              height={500}
              alt="aftermarket"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
