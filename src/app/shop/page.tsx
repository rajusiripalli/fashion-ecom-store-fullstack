import FrontendLayout from "@/components/layouts/FrontendLayout";
import FilterOptions from "@/components/shop/FilterOptions";

export default function ShopPage() {
  return (
    <FrontendLayout>
    <div className="flex flex-col sm:flex-row gap-5 my-10"> 
        
       <FilterOptions />
        
  </div>
    </FrontendLayout>
  )
}
