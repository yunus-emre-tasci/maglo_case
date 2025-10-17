"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Debug form errors
  if (Object.keys(errors).length > 0) {
    console.log("Form validation errors:", errors);
  }

  const onSubmit = async (data: RegisterFormData) => {
    console.log("🚀 Form submitted with data:", data);
    console.log("📝 Form errors:", errors);
    console.log("⏳ Is submitting:", isSubmitting);
    console.log("🔄 Is loading:", isLoading);

    try {
      console.log("📤 Calling registerUser...");
      await registerUser(data);
      console.log("✅ Registration successful");
    } catch (error) {
      console.error("❌ Registration failed:", error);
      // Error is handled in the auth context
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col px-8 py-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start mb-8 cursor-pointer">
              <Image
                src="/Logo.png"
                alt="Maglo"
                width={122}
                height={30}
                className="object-contain"
                priority
              />
            </div>
            <h1
              className="text-3xl font-bold mb-2 font-kumbh-sans"
              style={{ color: "#1B212D" }}
            >
              Create new account
            </h1>
            <p
              className="mb-4 font-kumbh-sans font-normal"
              style={{ color: "#78778B" }}
            >
              Welcome back! Please enter your details
            </p>

            <form
              onSubmit={(e) => {
                console.log("🎯 Form submit event triggered");
                handleSubmit(onSubmit)(e);
              }}
              className="space-y-4"
            >
              <Input
                label="Full Name"
                type="text"
                placeholder="Mahfuzul Nabil"
                {...register("fullName")}
                error={errors.fullName?.message}
                disabled={isSubmitting || isLoading}
              />

              <Input
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
                error={errors.email?.message}
                disabled={isSubmitting || isLoading}
              />

              <div>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  error={errors.password?.message}
                  disabled={isSubmitting || isLoading}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-semibold cursor-pointer"
                style={{ backgroundColor: "#C8EE44" }}
                loading={isSubmitting || isLoading}
                onClick={(e) => {
                  console.log("🖱️ Button clicked");
                  console.log(
                    "📊 Button state - isSubmitting:",
                    isSubmitting,
                    "isLoading:",
                    isLoading
                  );
                }}
              >
                Create Account
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full font-semibold cursor-pointer"
                style={{ color: "#78778B" }}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
              >
                Sign up with google
              </Button>

              <div className="text-center">
                <p className="font-normal" style={{ color: "#78778B" }}>
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-black font-semibold relative"
                  >
                    Sign in
                    <span className="absolute left-0 top-full mt-1">
                      <Image
                        src="/Vector11.png"
                        alt="Decorative Vector"
                        width={65}
                        height={5}
                        className="object-contain"
                      />
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Image.png"
            alt="Maglo Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
