"use client";

import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";



export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),

  email: z.email(),

  firstname: z.string().trim().min(2, "First name is required."),

  lastname: z.string().trim().min(2, "Last name is required."),

  country: z.string().trim().min(2, "Country is required."),

  state: z.string().trim().min(2, "State is required."),

  city: z.string().trim().min(2, "City is required."),

  postalCode: z.string().trim().optional(),

  street: z.string().trim().min(5, "Street address is required."),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

export default function EditProfileForm() {

  const router = useRouter();



  return (
    <form  className="mt-10 space-y-8">
      {/* Personal Information */}
      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Input
            
            label="Full Name"
            placeholder="John Doe"
          />

          <Input
            label="Phone Number"
            placeholder="+234..."
          />

          <div className="md:col-span-2">
            <Input  label="Email Address" disabled />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">Shipping Address</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Input
            
            label="First Name"
          />
          <Input
            label="Last Name"
          />
          <Input
            label="Country"
          />

          <Input
            label="State"
          />

          <Input
            label="City"
          />

          <Input
            label="Postal Code"
            placeholder="100001"
          />

          <div className="md:col-span-2">
            <Input
              label="Street Address"
              placeholder="Enter your address"
              variant="textarea"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        

        <Button type="submit">
          {"Save Changes"}
        </Button>
      </div>
    </form>
  );
}
