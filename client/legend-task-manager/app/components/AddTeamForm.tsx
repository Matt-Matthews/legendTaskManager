"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { FaTimes } from "react-icons/fa";
import { addTeam } from "../api/team";

interface Team {
  name: string;
  description: string;
}

interface Props {
  close: Function;
  userId: string;
}

function AddTeamForm({ close, userId }: Props) {
  const { register, handleSubmit } = useForm<Team>();
  const onSubmit = async (data: Team) => {
    console.log(data, userId);
    const token = localStorage.getItem("token");
    if (token) {
      const results = await addTeam(token, data);
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
        <h3 className="font-bold">Add Team</h3>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            formRegisterReturn={register("name")}
            label="Name"
            inputId="name"
            type="text"
            placeholder="example name"
          />
          <div className="mt-3">
            <label htmlFor="desc">Description</label>
            <textarea
              {...register("description")}
              name="description"
              id="desc"
              placeholder="description"
              cols={30}
              rows={5}
              className="w-full py-1 px-2 rounded border-solid border-2 border-gray-400 mt-1"
            />
          </div>

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

export default AddTeamForm;
