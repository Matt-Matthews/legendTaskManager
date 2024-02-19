import Link from "next/link";
import React from "react";
import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar flex items-center justify-between p-5">
      <h3 className="font-bold">Legend Task Manager</h3>
      <div className="flex items-center gap-x-5">
        <button className="indicator dropdown dropdown-end">
          <span className="indicator-item badge badge-info h-2 w-2 px-0"></span>
          <FaBell size={20} />
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Link href='#'>My profile</Link>
            </li>
            <li>
              <Link href="#">Logout</Link>
            </li>
          </ul>
        </button>
        <button className="avatar online placeholder dropdown dropdown-end">
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            <span className="text-xl">AI</span>
          </div>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Link href='#'>My profile</Link>
            </li>
            <li>
              <Link href="#">Logout</Link>
            </li>
          </ul>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
