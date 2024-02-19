import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  formRegisterReturn: UseFormRegisterReturn;
}

function StatusInput({ formRegisterReturn }: Props) {
  const statusList = ["Pending", "In Progress", "Completed"];
  return (
    <div className="mt-3">
      <p>Status</p>
      {statusList.map((status, index) => {
        return (
          <div key={status} className="flex items-center ">
            <input
              type="radio"
              id={index.toString()}
              value={status}
              {...formRegisterReturn}
            />
            <label className="ml-1 mb-px" htmlFor={index.toString()}>{status}</label>
          </div>
        );
      })}
    </div>
  );
}

export default StatusInput;
