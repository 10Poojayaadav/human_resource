// src/components/EmployeeList.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable, { createTheme } from "react-data-table-component";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../../store/slices/postSlice";

createTheme("light", {
  text: { primary: "#1E1E1E" },
  background: { default: "#FFFFFF" },
});

const UserList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts.items) || [];
  const loading = useSelector((state) => state.posts.loading);

  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [newPost, setNewPost] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddOrEdit = () => {
    if (selectedPost) {
      dispatch(
        updatePost({
          id: selectedPost.id,
          employee_id: newPost.employee_id,
          full_name: newPost.full_name,
          email: newPost.email,
          department: newPost.department,
        }),
      );
    } else {
      dispatch(addPost(newPost));
    }

    setIsModalOpen(false);
    setSelectedPost(null);

    setNewPost({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });
    dispatch(fetchPosts());
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const filteredData = data.filter((emp) =>
    emp.full_name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Employee ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.full_name,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email },
    { name: "Department", selector: (row) => row.department },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedPost(row);
              setNewPost({
                employee_id: row.employee_id,
                full_name: row.full_name,
                email: row.email,
                department: row.department,
              });
              setIsModalOpen(true);
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search Employee"
          className="border p-2 rounded"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Employee
        </button>
      </div>

      <DataTable
        title="Employee List"
        columns={columns}
        data={filteredData}
        pagination
        progressPending={loading}
        theme="light"
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">
              {selectedPost ? "Edit Employee" : "Add Employee"}
            </h2>

            <input
              placeholder="Employee ID"
              className="w-full p-2 border rounded mb-3"
              value={newPost.employee_id}
              onChange={(e) =>
                setNewPost({ ...newPost, employee_id: e.target.value })
              }
            />

            <input
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3"
              value={newPost.full_name}
              onChange={(e) =>
                setNewPost({ ...newPost, full_name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={newPost.email}
              onChange={(e) =>
                setNewPost({ ...newPost, email: e.target.value })
              }
            />

            <input
              placeholder="Department"
              className="w-full p-2 border rounded mb-4"
              value={newPost.department}
              onChange={(e) =>
                setNewPost({ ...newPost, department: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddOrEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {selectedPost ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
