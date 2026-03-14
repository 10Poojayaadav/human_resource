import React from "react";
import { useLocation } from "react-router-dom";
import AppRouter from "./router";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

export default function App() {

  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {hideLayout ? (
        <AppRouter />
      ) : (
        <div className="flex">
          <SideBar />

          <div className="flex-1 bg-gray-100">
            <header className="p-1 bg-white shadow">
              <h1 className="text-xl font-semibold">
                <Header />
              </h1>
            </header>

            <main>
              <AppRouter />
            </main>
          </div>
        </div>
      )}
    </>
  );
}