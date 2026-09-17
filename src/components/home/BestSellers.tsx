import React from 'react'
import SectionHeader from '../ui/SectionHeader'
import { dummyBestSellers } from '@/constants/dummyProducts'
import ProductCard from '../products/ProductCard'

export default function BestSellers() {
  return (
        <section>
            <SectionHeader title="Best Sellers" subTitle="
                Discover our most-loved pieces, carefully selected by thousand of happy customers. Timeless styles designed to elevate
                your wardrobe.
            " />
    
            <div className="my-10">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {
                      dummyBestSellers.map((product) => {
                        return (
                         <ProductCard product={product} key={product.id} />
                        )
                      })
                    }
                    
                </div>
    
            </div>
        </section>
  )
}
