"use client";

import { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { FiX } from "react-icons/fi";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
//import toast from "react-hot-toast";
//import { Category, ProductType, Size } from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";
import Image from "next/image";

// const availableSizes: Size[] = [
//   Size.XS,
//   Size.S,
//   Size.M,
//   Size.L,
//   Size.XL,
//   Size.XXL,
// ];
const availableSizes = ["S", "M", "L", "XL", "XXL"];


// const productTypes: ProductType[] = [
//   ProductType.HOODIES,
//   ProductType.JACKETS,
//   ProductType.JEANS,
//   ProductType.SHIRTS,
//   ProductType.SHORTS,
//   ProductType.TROUSERS,
//   ProductType.T_SHIRTS,
//   ProductType.SHOES
// ];

// const categories: Category[] = [
//   Category.MEN,
//   Category.WOMEN,
//   Category.CHILDREN,
// ];

const availableColors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Gray", value: "#6B7280" },
  { name: "Navy", value: "#1E3A8A" },
  { name: "Blue", value: "#2563EB" },
  { name: "Brown", value: "#8B5E3C" },
  { name: "Green", value: "#15803D" },
  { name: "Red", value: "#DC2626" },
];

// type ProductFormValues = {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: Category;
//   productType: ProductType;
// };

export default function AddProductPage() {
  const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm<ProductFormValues>({
//     defaultValues: {
//       name: "",
//       description: "",
//       price: 0,
//       stock: 0,
//       category: "MEN",
//       productType: ProductType.T_SHIRTS,
//     },
//   });
  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [bestSeller, setBestSeller] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setImages((prev) => [...prev, ...files].slice(0, 4));

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

//   const toggleSize = (size: Size) => {
//     setSizes((prev) =>
//       prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
//     );
//   };

//   const toggleColor = (color: string) => {
//     setColors((prev) =>
//       prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
//     );
//   };

//   const handleCreateProduct = async (data: ProductFormValues) => {
//     if (images.length === 0) {
//       return toast.error("Please upload at least one image.");
//     }

//     if (sizes.length === 0) {
//       return toast.error("Please select at least one size.");
//     }

//     if (colors.length === 0) {
//       return toast.error("Please select at least one color.");
//     }

//     const selectedColors = availableColors.filter((color) =>
//       colors.includes(color.name),
//     );

//     const formData = new FormData();

//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", data.price.toString());
//     formData.append("category", data.category);
//     formData.append("productType", data.productType);
//     formData.append("bestSeller", String(bestSeller));
//     formData.append("stock",data.stock.toString())

//     sizes.forEach((size) => {
//       formData.append("sizes", size);
//     });

//     selectedColors.forEach((color) => {
//       formData.append("colors", JSON.stringify(color));
//     });

//     images.forEach((image) => {
//       formData.append("images", image);
//     });

//     try {
//       const response = await fetch("/api/products", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

     

//       if (!response.ok) {
//         return toast.error(result.message);
//       }

//       toast.success(result.message);

//       reset();
//       router.push("/admin/products");
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong.");
//     }
//   };

  return (
    <form
      //onSubmit={handleSubmit(handleCreateProduct)}
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Add Product</h1>

        <p className="mt-2 text-muted-foreground">
          Create a new product for your clothing store.
        </p>
      </div>

      {/* Images */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">Product Images</h2>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              {images[index] ? (
                <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <Image
                  fill
                    src={URL.createObjectURL(images[index])}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow transition hover:bg-destructive hover:text-white"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border transition hover:border-primary hover:bg-surface"
                >
                  <LuPlus size={30} className="text-muted-foreground" />

                  <span className="mt-3 text-sm text-muted-foreground">
                    Upload Image
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <p className="mt-4 text-sm text-muted-foreground">
          Upload between 1 and 4 product images.
        </p>
      </section>

      {/* Product Information */}
      <section className="space-y-5 rounded-2xl border border-border bg-background p-6">
        <h2 className="text-lg font-semibold">Product Information</h2>

        <Input
          //{...register("name")}
          label="Product Name"
          placeholder="Classic Black Hoodie"
        />

        <Input
          //{...register("description")}
          label="Product Description"
          variant="textarea"
          placeholder="Write a detailed description..."
        />

        <div className="grid gap-5 md:grid-cols-3">
          <Input
            //{...register("price")}
            label="Price"            
            placeholder="79.99"
          />

          <Input
            //{...register("stock")}
            label="Stock Quantity"
            type="number"
            placeholder="50"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>

            <select
              //{...register("category")}
              className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:border-primary"
            >
              {/* {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))} */}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Type
            </label>

            <select
             // {...register("productType")}
              className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:border-primary"
            >
              {/* {productTypes.map((productType) => (
                <option value={productType} key={productType}>
                  {productType}
                </option>
              ))} */}
            </select>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">Available Sizes</h2>

        <div className="flex flex-wrap gap-3">
          {availableSizes.map((size) => {
            const selected = sizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                //onClick={() => toggleSize(size)}
                className={`h-11 w-16 rounded-lg border font-medium transition ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary hover:bg-primary/5"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>

      {/* Colors */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">Available Colors</h2>

        <div className="flex flex-wrap gap-4">
          {availableColors.map((color) => {
            const selected = colors.includes(color.name);

            return (
              <button
                key={color.name}
                type="button"
               // onClick={() => toggleColor(color.name)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary"
                }`}
              >
                <span
                  className="h-6 w-6 rounded-full border border-border"
                  style={{
                    backgroundColor: color.value,
                  }}
                />

                <span className="font-medium">{color.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Options */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">Product Options</h2>

        <div className="space-y-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={bestSeller}
              onChange={(e) => setBestSeller(e.target.checked)}
              className="h-5 w-5 accent-primary"
            />

            <span>Mark as Best Seller</span>
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end">
        <Button>
           Save Product
        </Button>
      </div>
    </form>
  );
}
