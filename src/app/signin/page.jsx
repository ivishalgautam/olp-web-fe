import { SignInForm } from "@/components/forms/signin";
import AuthLayout from "@/components/layout/auth-layout";
import React from "react";

export default function Signin() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
