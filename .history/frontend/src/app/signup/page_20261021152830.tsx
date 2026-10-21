"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signupAction } from "@/src/actions/auth/signup_action";



const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(
        50,
        "Name must not exceed 50 characters",
      ),

    email: z
      .string()
      .trim()
      .email(
        "Please provide a valid email address",
      ),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters",
      )
      .max(
        100,
        "Password must not exceed 100 characters",
      ),

    confirmPassword: z
      .string()
      .min(
        1,
        "Please confirm your password",
      ),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

type SignupFormData = z.infer<
  typeof signupSchema
>;

export default function SignupPage() {
  const router = useRouter();

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (
    data: SignupFormData,
  ) => {
    try {
      setServerError("");

      await signupAction({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(
        "Account created successfully",
      );

      router.push("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Signup failed. Please try again.";

      setServerError(message);

      toast.error(message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Student Account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Register to submit and track your
            project
          </p>
        </div>

   
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
        
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2"
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

        
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2"
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

        
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2"
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2"
              />

              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {
                    errors.confirmPassword
                      .message
                  }
                </p>
              )}
            </div>

            
            {serverError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {serverError}
              </div>
            )}

         
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

         
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}