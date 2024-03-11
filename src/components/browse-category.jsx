import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuBarChartHorizontal } from "react-icons/lu";

export default function BrowseCategory() {
  const [isCategory, setIsCategory] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center gap-2 text-white"
        onClick={() => setIsCategory(!isCategory)}
      >
        <LuBarChartHorizontal size={25} />
        <span>Browse categories</span>
        <IoIosArrowDown size={25} className={isCategory && "rotate-180"} />
      </button>
      <div
        className={`absolute h-16 w-full bg-black ${isCategory ? "opacity-100" : "opacity-0"} mt-4 transition-all`}
      ></div>
    </div>
  );
}
