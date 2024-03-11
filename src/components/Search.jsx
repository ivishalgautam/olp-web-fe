import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import { searchProducts } from "@/hooks/useSearchProducts";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const throttleTimeoutRef = useRef(null);

  const handleSearch = async (value) => {
    if (!value.trim()) return setSearchResults([]);
    const searchQuery = value.replace(/\s+/g, "-");
    const results = await searchProducts(searchQuery);
    setSearchResults(results);
    console.log({ results });
  };

  useEffect(() => {
    const throttledInputChange = (value) => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
        handleSearch(value);
      }, 1000);
    };

    throttledInputChange(inputVal);

    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [inputVal]);

  return (
    <div className="relative h-full w-full">
      <Input
        placeholder="Search for items"
        className="h-full w-full rounded-full px-4"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button className="absolute right-0.5 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white">
        <FiSearch size={25} />
      </button>
      <div className="absolute left-0 top-full w-full translate-y-1 rounded-xl bg-white">
        {searchResults.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="flex items-center justify-between p-3"
              >
                <span>{result.title}</span>
                <Link
                  href={`/products/${result.slug}`}
                  className={buttonVariants("primary")}
                  onClick={() => setSearchResults([])}
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
