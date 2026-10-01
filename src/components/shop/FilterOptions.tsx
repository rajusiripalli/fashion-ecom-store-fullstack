"use client";

import { Category, ProductType } from "@/generated/prisma/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const categories: { label: string; value: Category }[] = [
  { label: "Men", value: Category.MEN },
  { label: "Women", value: Category.WOMEN },
  { label: "Children", value: Category.CHILDREN },
];

const productTypes: {
  label: string;
  value: ProductType;
}[] = [
  { label: "T-Shirts", value: ProductType.T_SHIRTS },
  { label: "Shirts", value: ProductType.SHIRTS },
  { label: "Hoodies", value: ProductType.HOODIES },
  { label: "Jackets", value: ProductType.JACKETS },
  { label: "Jeans", value: ProductType.JEANS },
  { label: "Trousers", value: ProductType.TROUSERS },
  { label: "Shorts", value: ProductType.SHORTS },
  { label: "Shoes", value: ProductType.SHOES },
];

export default function FilterOptions() {
  const [showFilter, setShowFilter] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? [];

  const selectedTypes =
    searchParams.get("productType")?.split(",").filter(Boolean) ?? [];

  function toggleFilter(key: "category" | "productType", value: string) {
    const params = new URLSearchParams(searchParams.toString());

    const values = params.get(key)?.split(",").filter(Boolean) ?? [];

    const updatedValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    if (updatedValues.length === 0) {
      params.delete(key);
    } else {
      params.set(key, updatedValues.join(","));
    }

    router.replace(`/shop?${params.toString()}`);
  }

  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
      <button
        type="button"
        onClick={() => setShowFilter((prev) => !prev)}
        className="mb-4 flex items-center gap-2 text-xl font-semibold sm:cursor-default"
      >
        FILTERS
        <RiArrowRightDoubleFill
          className={`transition-transform duration-300 sm:hidden ${
            showFilter ? "rotate-90" : ""
          }`}
        />
      </button>

      <div className={`${showFilter ? "block" : "hidden"} space-y-6 sm:block`}>
        {/* Categories */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide">
            CATEGORIES
          </h3>

          <div className="space-y-3 text-sm text-muted-foreground">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => toggleFilter("category", category.value)}
                />

                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Types */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide">
            PRODUCT TYPE
          </h3>

          <div className="space-y-3 text-sm text-muted-foreground">
            {productTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => toggleFilter("productType", type.value)}
                />

                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
