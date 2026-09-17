import { dummyLatestCollections } from "@/constants/dummyProducts";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../products/ProductCard";



export default function LatestCollections() {
  return (
    <section>
        <SectionHeader title="Latest Collections" subTitle="New Arrivals added weekly." />

        <div className="my-10">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                  dummyLatestCollections.map((product) => {
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
