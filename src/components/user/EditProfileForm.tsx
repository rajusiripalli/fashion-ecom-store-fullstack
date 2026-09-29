"use client";

import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { getProfile } from "@/server-actions/user/getProfile";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/server-actions/user/updateProfile";

interface EditProfileFormProps {
  user: Awaited<ReturnType<typeof getProfile>>;
}

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

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const address = user?.addresses[0];

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      email: user?.email ?? "",

      country: address?.country ?? "",
      firstname: address?.firstName ?? "",
      lastname: address?.lastName ?? "",
      state: address?.state ?? "",
      city: address?.city ?? "",
      postalCode: address?.postalCode ?? "",
      street: address?.street ?? "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    const result = await updateProfile(data);

    if (!result.success) {
      return toast.error(result.message);
    }

    toast.success(result.message);

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
      {/* Personal Information */}
      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Input
            {...register("name")}
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
          />

          <Input
            {...register("phone")}
            label="Phone Number"
            placeholder="+234..."
            error={errors.phone?.message}
          />

          <div className="md:col-span-2">
            <Input {...register("email")} label="Email Address" disabled />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">Shipping Address</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Input
            {...register("firstname")}
            label="First Name"
            error={errors.firstname?.message}
          />
          <Input
            {...register("lastname")}
            label="Last Name"
            error={errors.lastname?.message}
          />
          <Input
            {...register("country")}
            label="Country"
            error={errors.country?.message}
          />

          <Input
            {...register("state")}
            label="State"
            error={errors.state?.message}
          />

          <Input
            {...register("city")}
            label="City"
            error={errors.city?.message}
          />

          <Input
            {...register("postalCode")}
            label="Postal Code"
            placeholder="100001"
            error={errors.postalCode?.message}
          />

          <div className="md:col-span-2">
            <Input
              {...register("street")}
              label="Street Address"
              placeholder="Enter your address"
              error={errors.street?.message}
              variant="textarea"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        

        <Button type="submit">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
