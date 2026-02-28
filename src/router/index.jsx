import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import UserList from "../pages/user/UserList";
import StudentList from "../pages/student/AttendanceList";
import OrgList from "../pages/organization/OrgList";
import RoleList from "../pages/role/RoleList";
import GroupList from "../pages/group/GroupList";
import DepartList from "../pages/department/DepartList";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

export default function AppRouter() {
  return (
    <Routes>

      {/* ---------- PUBLIC AUTH ROUTES ---------- */}
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />

      {/* ---------- PROTECTED ROUTES ---------- */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-list"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-list"
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/org-list"
        element={
          <ProtectedRoute>
            <OrgList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/role-list"
        element={
          <ProtectedRoute>
            <RoleList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/group-list"
        element={
          <ProtectedRoute>
            <GroupList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/department-list"
        element={
          <ProtectedRoute>
            <DepartList />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}