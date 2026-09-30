import { Suspense } from "react";

import ProductCard from "../products/ProductCard";
import SectionHeader from "../ui/SectionHeader";
import { getBestSellerProducts } from "@/server-actions/products/getBestSellerProducts";
import ProductCardSkeleton from "../loading/skeletons/ProductCardSkeleton";

export default function BestSellers() {
  return (
    <section>
      <SectionHeader
        title="Best Sellers"
        subtitle="Discover our most-loved pieces, carefully selected by thousands of happy customers. Timeless styles designed to elevate your wardrobe."
      />

      <Suspense fallback={<ProductCardSkeleton number={5}/>}>
        <BestSellersContent />
      </Suspense>
    </section>
  );
}

async function BestSellersContent() {
  const products = await getBestSellerProducts();

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image:
                product.images[0]?.imageUrl ??
                "/images/placeholder.png",
            }}
          />
        ))}
      </div>
    </div>
  );
}