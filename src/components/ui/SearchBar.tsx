"use client";

import { useSearchStore } from "@/store/search-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function SearchBar() {
  const router = useRouter();
  const { isOpen, closeSearch } = useSearchStore();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  function handleSearch() {
    const query = searchQuery.trim();

    if (!query) return;

    closeSearch();

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }
  return (
    <div className="border-b border-border bg-surface py-5">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="rounded-xl border border-border bg-background">
          {/* Search Input */}
          <div className="flex h-14 items-center gap-4 px-5">
            <FaSearch
              onClick={handleSearch}
              className="shrink-0 text-muted-foreground"
              size={18}
            />

            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="h-full w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
            />

            <button
              onClick={closeSearch}
              type="button"
              aria-label="Close search"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
