import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaBuilding,
  FaLayerGroup,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const SideBar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOrganizationOpen, setIsOrganizationOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleOrganization = () => {
    setIsOrganizationOpen(!isOrganizationOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged Out!", "", "success");

        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    });
  };

  const menuClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-green-100 dark:hover:bg-gray-700";

  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"} h-screen bg-white dark:bg-gray-900 shadow-xl flex flex-col transition-all duration-300 relative`}
    >
      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 -right-3 bg-green-500 text-white p-2 rounded-full shadow-md"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Logo */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {isOpen ? <>HUM_S_OURCE</> : "HR"}
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-2">
        <Link to="/" className={menuClass}>
          <FaTachometerAlt />
          {isOpen && "Dashboard"}
        </Link>

        <Link to="/user-list" className={menuClass}>
          <FaUsers />
          {isOpen && "Employees"}
        </Link>

        <Link to="/student-list" className={menuClass}>
          <FaCalendarCheck />
          {isOpen && "Attendance"}
        </Link>

        {/* Organization */}
        {/* <div
          onClick={toggleOrganization}
          className={`${menuClass} cursor-pointer`}
        >
          <FaBuilding />
          {isOpen && "Organization"}
        </div>

        {isOrganizationOpen && (
          <div className="ml-6 space-y-1">

            <Link to="/org-list" className={menuClass}>
              <FaBuilding size={14} />
              {isOpen && "Org List"}
            </Link>

            <Link to="/group-list" className={menuClass}>
              <FaLayerGroup size={14} />
              {isOpen && "Group"}
            </Link>

            <Link to="/department-list" className={menuClass}>
              <FaUsers size={14} />
              {isOpen && "Department"}
            </Link>

            <Link to="/role-list" className={menuClass}>
              <FaUserShield size={14} />
              {isOpen && "Roles"}
            </Link>

          </div>
        )} */}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 transition w-full"
        >
          <FaSignOutAlt />
          {isOpen && "Logout"}
        </button>
      </nav>

      {/* Theme */}
      <button
        onClick={toggleTheme}
        className="m-4 p-3 bg-green-100 dark:bg-gray-700 rounded-xl flex justify-center hover:bg-green-200"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default SideBar;
