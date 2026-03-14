import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/icons/user.svg";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../store/slices/dashboardSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const chartData = {
    labels: [
      "Computer Science",
      "Mechanical",
      "Electrical",
      "Civil",
      "Biotech",
    ],
    datasets: [
      {
        label: "Student Strength",
        data: [120, 90, 150, 80, 60],
        backgroundColor: "#22c55e",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-lg">Loading Dashboard...</p>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <section className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">

      <div className="max-w-[1200px] mx-auto">

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">

          {/* Employee */}
          <Link
            to="/user-list"
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                Total Employees
              </p>
              <h2 className="text-3xl font-bold text-green-500 mt-2">
                {stats?.posts_count || 0}
              </h2>
            </div>

            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <img src={userIcon} alt="icon" />
            </div>
          </Link>

          {/* Attendance */}
          <Link
            to="/student-list"
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                Total Attendance
              </p>
              <h2 className="text-3xl font-bold text-blue-500 mt-2">
                {stats?.pages_count || 0}
              </h2>
            </div>

            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <img src={userIcon} alt="icon" />
            </div>
          </Link>

          {/* Active Users */}
          <Link
            to="/user-list"
            className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                Active Users
              </p>
              <h2 className="text-3xl font-bold text-purple-500 mt-2">
                {stats?.users_count || 0}
              </h2>
            </div>

            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <img src={userIcon} alt="icon" />
            </div>
          </Link>

        </div>

        {/* Chart Section */}
       

      </div>
    </section>
  );
};

export default Dashboard;