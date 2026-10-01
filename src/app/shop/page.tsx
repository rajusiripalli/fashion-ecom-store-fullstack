import { Suspense } from "react";

import FrontendLayout from "@/components/layouts/FrontendLayout";
import FilterOptions from "@/components/shop/FilterOptions";
import SortProducts from "@/components/shop/SortProducts";
import ShopProducts from "@/components/shop/ShopProducts";
import ProductCardSkeleton from "@/components/loading/skeletons/ProductCardSkeleton";


interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    productType?: string;
    sort?: "low-high" | "high-low" | "newest" | "oldest";
  }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;

  return (
    <FrontendLayout>
      <div className="my-10 flex flex-col gap-5 sm:flex-row">
        <FilterOptions />

        <div className="flex-1">
          <SortProducts />

          <Suspense fallback={<ProductCardSkeleton number={8} shop/>}>
            <ShopProducts searchParams={params} />
          </Suspense>
        </div>
      </div>
    </FrontendLayout>
  );
}