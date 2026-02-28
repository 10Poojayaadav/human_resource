import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "../../store/slices/attendanceSlice";

const StudentList = () => {
  const dispatch = useDispatch();

  const attendance = useSelector(
    (state) => state.attendance.items || []
  );

  console.log(attendance, "pooja");
  const loading = useSelector(
    (state) => state.attendance.loading
  );

  const [filterText, setFilterText] = useState("");

  const [formData, setFormData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(addPost(formData));
    setIsModalOpen(false);
  };

  const filteredData = attendance.filter((item) =>
    item.employee?.full_name
      ?.toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Employee",
      selector: (row) => row.employee?.full_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded text-white ${
            row.status === "Present"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Employee Attendance
      </h1>

      {/* FILTER + ADD */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Search employee..."
          className="border p-2 rounded"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Mark Attendance
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        progressPending={loading}
      />

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold mb-4">
              Mark Attendance
            </h2>

            <input
              placeholder="Employee ID"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employee_id: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />

            <select
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <option>Present</option>
              <option>Absent</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;