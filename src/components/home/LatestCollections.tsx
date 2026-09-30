import { Suspense } from "react";

import ProductCard from "../products/ProductCard";
import SectionHeader from "../ui/SectionHeader";
import { getLatestProducts } from "@/server-actions/products/getLatestProducts";
import ProductCardSkeleton from "../loading/skeletons/ProductCardSkeleton";


export default function LatestCollections() {
  return (
    <section>
      <SectionHeader
        title="Latest Collections"
        subtitle="New Arrivals added weekly."
      />

      <Suspense fallback={<ProductCardSkeleton number={5}/>}>
        <LatestCollectionsContent />
      </Suspense>
    </section>
  );
}

async function LatestCollectionsContent() {
  const products = await getLatestProducts();

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