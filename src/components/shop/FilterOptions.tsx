"use client"

import { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

export default function FilterOptions() {
    const [showFilter, setShowFilter] = useState(false);
  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
        <button onClick={() => setShowFilter((prev) => !prev)}
            className="mb-4 flex items-center gap-2 text-xl font-semibold sm:cursor-default"
        >
            FILTERS
            <RiArrowRightDoubleFill 
                className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90": ""}`}
            />

        </button>
    </aside>
  )
}
