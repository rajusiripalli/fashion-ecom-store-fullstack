"use client";

import { useState } from "react";
import Image from "next/image";
import { FiRefreshCw, FiShield, FiTruck } from "react-icons/fi";
import { IoBagAddOutline } from "react-icons/io5";

import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";



const images = [
  "/images/gallery1.png",
  "/images/gallery2.png",
  "/images/gallery3.png",
  "/images/gallery4.png",
];

const sizes = ["S", "M", "L", "XL"];

const colors = [
  {
    name: "Charcoal",
    value: "#1F2937",
  },
  {
    name: "Brown",
    value: "#8B5E3C",
  },
  {
    name: "Light Gray",
    value: "#E5E7EB",
  },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <section className="py-12">
      <Breadcrumb
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Shop",
            href: "/shop",
          },
          {
            label:  "Product Name",
          },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Images */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {/* Gallery */}
          <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
            {images.map((image) => (
              <button
                //key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  selectedImage === image ? "border-primary" : "border-border"
                }`}
              >
                <Image
                  src={image}
                  alt="Product"
                  width={90}
                  height={110}
                  className="h-24 w-20 object-cover md:h-28 md:w-24"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative h-87.5 w-full overflow-hidden rounded-2xl bg-surface sm:h-125">
            <Image
              src={selectedImage || ""}
              alt="Product"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        {/* Details */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <h1 className="text-3xl font-bold sm:text-4xl">{"product?.name"}</h1>


          <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
            ${"product?.price.toFixed(2)"}
          </h2>

          <p
            className={`mt-2 font-medium ${
              true ? "text-red-600" : "text-green-600"
            }`}
          >
            {true
              ? "Out of Stock"
              : `In Stock (${"product?.stock"} available)`}
          </p>

          <p className="mt-6 leading-8 text-muted-foreground">
            {"product?.description"}
          </p>

          {/* Sizes */}
          <div className="mt-8">
            <p className="mb-3 font-semibold">Select Size</p>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  //key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border font-medium transition ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-8">
            <p className="mb-3 font-semibold">Select Color</p>

            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${
                    selectedColor
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-border"
                  }`}
                >
                  <span
                    className="h-8 w-8 rounded-full"
                    style={{
                      backgroundColor: color.value,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Selected */}
          <div className="mt-6 rounded-xl bg-surface p-4">
            <p className="text-sm">
              <span className="font-semibold">Selected Size:</span>{" "}
              {selectedSize}
            </p>

            <p className="mt-2 text-sm">
              <span className="font-semibold">Selected Color:</span>{" "}
              {selectedColor?.name}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8">
            <Button
             // onClick={handleAddToCart}
              //disabled={isOutOfStock}    
              className="w-full sm:w-fit"
              paddingX="px-20"
              leftIcon={<IoBagAddOutline size={20} />}
            >
              Add to Cart
            </Button>
           

          
          </div>

          {/* Features */}
          <div className="mt-10 rounded-xl border border-border bg-surface p-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FiTruck className="text-primary" />
                <span>Free shipping on orders over $100</span>
              </div>

              <div className="flex items-center gap-3">
                <FiRefreshCw className="text-primary" />
                <span>7-Day easy returns</span>
              </div>

              <div className="flex items-center gap-3">
                <FiShield className="text-primary" />
                <span>100% secure checkout</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
