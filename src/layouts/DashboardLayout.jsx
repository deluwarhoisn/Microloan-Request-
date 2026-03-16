import React, { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { isAdmin, isManager, role, isRoleLoading } = useUserRole();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogOut = () => {
    logOut()
      .then(() => Swal.fire("Logged Out", "You have logged out successfully", "success"))
      .catch((error) => console.log(error));
  };

  const adminLinks = [
    { name: "📊 Overview", path: "/dashboard" },
    { name: "📋 Loan Applications", path: "/dashboard/loan-applications" },
    { name: "👥 Manage Users", path: "/dashboard/manage-users" },
    { name: "🏦 All Loans", path: "/dashboard/admin-loans" },
    { name: "➕ Add Loan", path: "/dashboard/add-loan" },
    { name: "👤 My Profile", path: "/dashboard/profile" },
  ];

  const managerLinks = [
    { name: "📊 Overview", path: "/dashboard" },
    { name: "➕ Add Loan", path: "/dashboard/add-loan" },
    { name: "🏦 Manage Loans", path: "/dashboard/manage-loans" },
    { name: "⏳ Pending Loans", path: "/dashboard/pending-loans" },
    { name: "✅ Approved Loans", path: "/dashboard/approved-loans" },
    { name: "👤 My Profile", path: "/dashboard/profile" },
  ];

  const borrowerLinks = [
    { name: "📊 Overview", path: "/dashboard" },
    { name: "📄 My Loans", path: "/dashboard/my-loans" },
    { name: "👤 My Profile", path: "/dashboard/profile" },
  ];

  const links = isAdmin ? adminLinks : isManager ? managerLinks : borrowerLinks;

  const roleBadge = isAdmin
    ? { label: "Admin Panel", cls: "bg-blue-100 text-blue-700" }
    : isManager
    ? { label: "Manager Panel", cls: "bg-purple-100 text-purple-700" }
    : { label: "User Panel", cls: "bg-emerald-100 text-emerald-700" };

  useEffect(() => {
    const currentLink = links.find((link) => link.path === location.pathname);
    document.title = currentLink ? `Dashboard | ${currentLink.name.replace(/[^\w\s]/gi, "").trim()}` : "Dashboard";
  }, [location.pathname, links]);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Header */}
      <header className="bg-base-100 shadow-md py-4 px-6 flex justify-between items-center z-10">
        <Link to="/" className="text-xl font-semibold text-base-content">
          🏦 LoanLink Dashboard
        </Link>

        <div className="flex items-center space-x-3">
          <span className={`hidden md:inline-flex px-3 py-1 text-xs font-medium rounded-full ${roleBadge.cls}`}>
            {isRoleLoading ? "Loading..." : roleBadge.label}
          </span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-ghost btn-sm btn-circle text-lg"
            aria-label="Toggle Theme"
          >
            {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoonStars />}
          </button>

          {user ? (
            <button onClick={handleLogOut} className="btn btn-outline btn-sm gap-1">
              <BiLogOut /> Log Out
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          )}

          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`w-64 bg-gray-900 text-white p-5 space-y-3 fixed md:sticky top-0 h-screen z-30 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="pb-3 border-b border-gray-700 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/Z8QqSmN/avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.displayName || "User"}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                <p className="text-xs text-yellow-400 mt-0.5 uppercase tracking-wider">{role || "..."}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all ${
                  location.pathname === link.path
                    ? "bg-primary text-white font-medium"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto min-h-screen">
          <Outlet />
        </main>
      </div>

      <footer className="bg-base-100 text-center py-3 shadow-inner">
        <p className="text-base-content/50 text-sm">
          © {new Date().getFullYear()} LoanLink — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
