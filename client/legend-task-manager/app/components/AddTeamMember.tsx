"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { FaTimes } from "react-icons/fa";
import { addTeamMember } from "../api/team";

interface Member {
    email: string;
}

interface Props {
  close: Function;
  teamId: string;
}

function AddTeamMemberForm({ close, teamId }: Props) {
  const { register, handleSubmit } = useForm<Member>();
  const onSubmit = async (data: Member) => {
    const token = localStorage.getItem("token");
    if (token) {
      const results = await addTeamMember(token, data.email, teamId);
      console.log(results)
      window.location.reload();
    }
  };
  return (
    <div className="absolute top-0 left-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-base-100 p-5 rounded-lg relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            close((currentValue: boolean) => !currentValue);
          }}
          className="z-50 absolute top-2 right-2 bg-primary text-white p-2 rounded"
        >
          <FaTimes />
        </button>
        <h3 className="font-bold">Add Team Member</h3>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            formRegisterReturn={register("email")}
            label="Email"
            inputId="email"
            type="email"
            placeholder="example@mail.com"
          />

          <button
            className="max-h-10 py-1 rounded w-full bg-primary text-white mt-8"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTeamMemberForm;
