import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

import Button from "@/components/ui/Button";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
//import { getProducts } from "@/server-actions/products/getProducts";
//import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        category: "Jackets",
        price: 79.99,
        stock: 18,
        status: "Active",
        image: "/images/product1.png",
    },
    {
        id: 2,
        name: "Premium Hoodie",
        category: "Hoodies",
        price: 59.99,
        stock: 8,
        status: "Active",
        image: "/images/product2.png",
    },
    {
        id: 3,
        name: "Oversized T-Shirt",
        category: "T-Shirts",
        price: 34.99,
        stock: 0,
        status: "Out of Stock",
        image: "/images/product3.png",
    },
    {
        id: 4,
        name: "Leather Sneakers",
        category: "Shoes",
        price: 99.99,
        stock: 25,
        status: "Active",
        image: "/images/product4.png",
    }
]

export default async function AdminProductsPage() {
  //const products = await getProducts();

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="mt-2 text-muted-foreground">
            Manage all products in your store.
          </p>
        </div>

        <Link href="/admin/add-product">
          <Button leftIcon={<FiPlus />}>Add Product</Button>
        </Link>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 hover:bg-surface/50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Image
                        //src={product.images[0]?.imageUrl}
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={70}
                        className="rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">{product.category}</td>

                  <td className="px-6 py-5 font-medium">
                    ${Number(product.price).toFixed(2)}
                  </td>

                  <td className="px-6 py-5">{product.stock}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                      }`}
                    >
                      {product.stock > 0 ? "Active" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                     {/* <DeleteProductButton productId={product.id} /> */}
                     <FaTrashAlt className="text-destructive" />
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
