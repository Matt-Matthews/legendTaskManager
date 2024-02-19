import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

interface User {
  email: string;
}

function PasswordResetForm() {
  const { register, handleSubmit } = useForm<User>();
  const onSubmit = (data: User) => console.log(data);
  return (
    <>
      <h3 className="font-bold text-xl">Reset Password</h3>
      <p>Enter your email below to reset your password</p>

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          formRegisterReturn={register("email")}
          label="Email"
          inputId="email"
          type="email"
          placeholder="example@mail.com"
        />

        <button
          className="max-h-10 py-1 rounded w-full bg-primary text-white mt-5"
          type="submit"
        >
          Reset
        </button>
      </form>
    </>
  );
}

export default PasswordResetForm;
