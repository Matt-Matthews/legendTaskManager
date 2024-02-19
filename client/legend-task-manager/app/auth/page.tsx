"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import PasswordResetForm from "../components/PasswordResetForm";

function Authentication() {
  const [isRegister, setIsRegister] = React.useState(false);
  const [isPasswordReset, setIsPasswortReset] = React.useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border-solid border-2 border-gray-400 rounded-lg min-h-full max-w-80 p-3">
        {!isPasswordReset ? (
          !isRegister ? (
            <LoginForm resetPassword={setIsPasswortReset} />
          ) : (
            <RegisterForm />
          )
        ) : (
          <PasswordResetForm />
        )}

        {!isPasswordReset && (
          <button
            className="max-h-10 py-1 rounded w-full mt-5"
            onClick={(e) => {
              e.preventDefault()
              setIsRegister((currentValue) => !currentValue);
            }}
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        )}
      </div>
    </main>
  );
}

export default Authentication;
