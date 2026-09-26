"use client"

import Link from "next/link";
import FrontendLayout from '@/components/layouts/FrontendLayout'
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const signupSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long.")
})

type SignInFormValues = z.infer<typeof signupSchema>


export default function SigninPage() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignInFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: ""
        }
})

  const onSubmit = async (data: SignInFormValues) => {
        console.log(data);
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
              "Signing In..." : "Sign In"}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
    </section>

    </FrontendLayout>
  )
}

