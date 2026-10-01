"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "low-high";

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    router.replace(`/shop?${params.toString()}`);
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-primary">
        Shop
      </h2>

      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"
      >
        <option value="low-high">
          Sort By: Price (Low to High)
        </option>

        <option value="high-low">
          Sort By: Price (High to Low)
        </option>

        <option value="newest">
          Sort By: Newest
        </option>

        <option value="oldest">
          Sort By: Oldest
        </option>
      </select>
    </div>
  );
}