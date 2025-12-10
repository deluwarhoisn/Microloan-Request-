import React, { useState, useEffect } from "react";
import { BiLogOut, BiSun, BiMoon } from "react-icons/bi";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply theme to html/body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Logout handler
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged Out", "You have logged out successfully", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Sidebar links
  const links = [
    { name: "Overview", path: "/dashboard" },
    { name: "Loans", path: "/loans" },
    { name: "Loan Applications", path: "/dashboard/loan-applications" },
    { name: "Manage Users", path: "/dashboard/manage-users" },
    { name: "Add Loan", path: "/dashboard/add-loan" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "My Loans", path: "/dashboard/my-loans" },
  ];

  // Update page title dynamically
  useEffect(() => {
    const currentLink = links.find((link) => link.path === location.pathname);
    document.title = currentLink ? `Dashboard | ${currentLink.name}` : "Dashboard";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-white">📊 Dashboard</Link>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl text-gray-800 dark:text-white"
            aria-label="Toggle Theme"
          >
            {darkMode ? <BiSun /> : <BiMoon />}
          </button>

          {/* Logout/Login */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="flex items-center btn btn-outline btn-sm gap-1"
            >
              <BiLogOut /> Log Out
            </button>
          ) : (
            <Link to="login" className="btn btn-outline btn-sm">Login</Link>
          )}

          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden px-2 py-1 bg-gray-800 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-gray-900 text-white p-6 space-y-4 absolute md:relative md:block transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="space-y-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === link.path ? "bg-gray-700" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 text-center py-3 shadow-inner mt-auto">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          © {new Date().getFullYear()} Microloan Dashboard — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
