import { Suspense } from "react";

import FrontendLayout from "@/components/layouts/FrontendLayout";
import ProductPageComponent from "@/components/products/ProductPage";


import { getProduct } from "@/server-actions/products/getProduct";
import { notFound } from "next/navigation";
import ProductPageSkeleton from "@/components/loading/skeletons/ProductPageSkeleton";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { productId } = await params;

  return (
    <FrontendLayout>
      <Suspense fallback={ <ProductPageSkeleton/> }>
        <ProductContent productId={productId} />
      </Suspense>
    </FrontendLayout>
  );
}

async function ProductContent({
  productId,
}: {
  productId: string;
}) {
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductPageComponent product={product} />;
}