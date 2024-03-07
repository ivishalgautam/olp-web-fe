import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="h-screen">
      <div className="grid h-4/6 grid-cols-2">
        <div className="flex flex-col items-start justify-center px-10">
          <h2 className="relative text-4xl font-extrabold tracking-wide before:absolute before:-left-4 before:h-full before:w-1 before:bg-primary">
            <span className="text-primary"> ONE STOP SOLUTION </span> FOR <br />
            EARTHMOVING SPARE PARTS
          </h2>
          <p className="text-sm">
            It's good to trust the parts, it's better to trust the hands who
            give you the parts.
          </p>
        </div>

        <div className="relative bg-secondary">
          <Image
            src={"/jcb-2.png"}
            fill
            alt="jcb"
            className="h-full w-full -translate-x-16 object-contain object-center"
          />
        </div>
      </div>

      {/* images */}
      <div className="grid h-2/6 grid-cols-3 p-4">
        <div className="relative">
          <Image src={"/genuine-big.jpg"} fill alt="genuine" />
        </div>
        <div className="relative">
          <Image src={"/oem-big.jpg"} fill alt="genuine" />
        </div>
        <div className="relative">
          <Image src={"/aftermarket-big.jpg"} fill alt="genuine" />
        </div>
      </div>
    </div>
  );
}
