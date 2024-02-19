"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
}

interface Props {
  resetPassword: Function;
}

function LoginForm({ resetPassword }: Props) {
  const { register, handleSubmit } = useForm<User>();
  const router = useRouter();
  const onSubmit = (data: User) => {
    
    console.log(data);
    router.push("/dashboard");
  };
  return (
    <>
      <h3 className="font-bold text-xl">Login</h3>
      <p>Enter your email below to login to your account</p>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          formRegisterReturn={register("email")}
          label="Email"
          inputId="email"
          type="email"
          placeholder="example@mail.com"
        />
        <div className="relative">
          <PasswordInput
            inputId="password"
            formRegisterReturn={register("password")}
            placeholder="*****"
            label="Password"
          />
          <button
            className="text-sm underline absolute top-0.5 right-1"
            onClick={(e) => {
              e.preventDefault();
              resetPassword((currentValue: boolean) => !currentValue);
            }}
          >
            Forgot your password?
          </button>
        </div>
        <button
          className="max-h-10 py-1 rounded w-full bg-primary text-white mt-5"
          type="submit"
        >
          Login
        </button>
      </form>

      <button className="border-solid border-2 border-gray-400 max-h-10 py-1 rounded w-full mt-5">
        Login with Google
      </button>
    </>
  );
}

export default LoginForm;
