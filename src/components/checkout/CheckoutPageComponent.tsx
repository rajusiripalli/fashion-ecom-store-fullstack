"use client"

import FrontendLayout from "@/components/layouts/FrontendLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { FaMoneyBillWave, FaStripe } from "react-icons/fa";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters."),

  lastname: z.string().min(2, "Last name must be at least 2 characters."),

  email: z.email("Please enter a valid email address."),

  phone: z.string().min(10, "Please enter a valid phone number."),

  state: z.string().min(2, "State is required."),

  country: z.string().min(2, "Country is required."),

  city: z.string().min(2, "City is required."),

  street: z.string().min(5, "Street address is required."),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;


export default function CheckoutPageComponent() {
     const router  = useRouter();
     const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">("cod");

       const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstname:  "",
      lastname:  "",
      email:  "",
      phone:  "",
      state: "",
      city:  "",
      street:  "",
      country:  "",
    },
  });

    const onSubmit = async (data: CheckoutFormValues) => {
        console.log({
            ...data,
            paymentMethod
        })
    }

  return (
    <FrontendLayout>
            <section className="mx-auto max-w-7xl py-12">
        <div className="mb-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Cart", href: "/cart" },
              { label: "Checkout" },
            ]}
          />

          <p className="mt-2 text-muted-foreground">
            Complete your order securely.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-10 lg:grid-cols-[2fr_1fr]"
        >
          {/* LEFT */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold">Shipping Address</h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Input
                  label="First Name"
                  placeholder="John"
                  //error={errors.firstname?.message}
                  //{...register("firstname")}
                />

                <Input
                  label="Last Name"
                  placeholder="Doe"
                  //error={errors.lastname?.message}
                  //{...register("lastname")}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  //error={errors.email?.message}
                  //{...register("email")}
                />

                <Input
                  label="Phone Number"
                  placeholder="+234..."
                 // error={errors.phone?.message}
                  //{...register("phone")}
                />
                <Input
                  label="Country"
                  placeholder="Country"
                 // error={errors.country?.message}
                  //{...register("country")}
                />

                <Input
                  label="State"
                  placeholder="Lagos"
                  //error={errors.state?.message}
                  //{...register("state")}
                />

                <Input
                  label="City"
                  placeholder="Ikeja"
                //  error={errors.city?.message}
                  //{...register("city")}
                />

                <div className="md:col-span-2">
                  <Input
                    variant="textarea"
                    label="Street Address"
                    placeholder="15 Admiralty Way"
                    //error={errors.street?.message}
                   // {...register("street")}
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>

              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center rounded-xl border p-5 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                       paymentMethod === "cod"
                          ? "border-primary"
                          : "border-border"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>

                    <FaMoneyBillWave size={24} className="text-green-600" />

                    <div>
                      <p className="font-semibold">Cash on Delivery</p>

                      <p className="text-sm text-muted-foreground">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`flex w-full items-center rounded-xl border p-5 text-left transition ${
                    paymentMethod === "stripe"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        paymentMethod === "stripe"
                          ? "border-primary"
                          : "border-border"
                      }`}
                    >
                      {paymentMethod === "stripe" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>

                    <FaStripe size={30} className="text-indigo-600" />

                    <div>
                      <p className="font-semibold">Pay with Stripe</p>

                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, Apple Pay and more.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-6 rounded-xl bg-surface p-4">
                <p className="text-sm text-muted-foreground">
                  Selected Payment Method
                </p>

                <p className="mt-1 font-semibold">
                  Stripe
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="h-fit rounded-2xl border border-border p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-5">
              {Array(2).fill(0).map((item, index) => (
                <div key={index} className="flex gap-4">
                    <Image
                      src="/images/product1.png"
                      alt="Product"
                      width={70}
                      height={85}
                      className="rounded-lg"
                    />

                  <div className="flex flex-1 justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>

                      <p className="text-sm text-muted-foreground">
                        Qty: 2
                      </p>
                    </div>

                    <p className="font-semibold">
                      1000 x 2
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t border-border pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>1999</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>195</span>
              </div>

              <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
                <span>Total</span>
                <span>2000</span>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              className="mt-8"
              //disabled={isSubmitting}
            >
             
                   { paymentMethod === "stripe"
                  ? "Continue to Stripe"
                  : "Place Order"}
               
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Your payment information is securely processed.
            </p>
          </aside>
        </form>
        </section>
    </FrontendLayout>
  )
}
