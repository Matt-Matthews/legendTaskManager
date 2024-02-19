import React from "react";
import { FaEllipsisH } from "react-icons/fa";

function TaskTable() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className=" mt-3">
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item}>
                <td>the name</td>
                <td>Quality Control Specialist</td>
                <td>Cy Ganderton</td>
                <td>Blue</td>
                <td>
                  <button className="dropdown dropdown-end">
                    <FaEllipsisH />
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <div>Edit</div>
                      </li>
                      <li>
                        <div>View Details</div>
                      </li>
                    </ul>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-center mt-5">
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 1</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
}

export default TaskTable;
