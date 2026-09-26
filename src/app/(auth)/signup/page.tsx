"use client"

import Link from "next/link";
import FrontendLayout from '@/components/layouts/FrontendLayout'
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long."),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long.")
})

type SignUpFormValues = z.infer<typeof signupSchema>


export default function SignupPage() {
    const router = useRouter();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
  const onSubmit = async (data: SignUpFormValues) => {
        const {error} = await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password
        })

        console.log("Error --->", error);

        if(error){
          toast.error(error.message as string);
          return
        }

        toast.success("Registration Successful");
        router.replace("/account");
  }


  return (
    <FrontendLayout>
    <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>

            <p className="mt-3 text-muted-foreground">
              Join us and start shopping your favorite styles.
            </p>
          </div>

              {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} 
          
          className="mt-8 space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
             error={errors.name?.message}
             {...register("name")}
            />

            <Input
              label="Email Address"
              type="text"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button fullWidth 
                disabled={isSubmitting}
            >
              {isSubmitting ? 
              "Creating Account..." : "Create Account"}
            </Button>

            <Button
              //onClick={signInWithGoogle}
              fullWidth
              type="button"
              variant="outline"
              leftIcon={<FcGoogle size={18} />}
            >
              Continue with Google
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
    </section>

    </FrontendLayout>
  )
}
