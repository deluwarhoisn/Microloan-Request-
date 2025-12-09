import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
     const { user, logOut } = useAuth();
      const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">📊 Dashboard</Link>
        {user ? <Link onClick={handleLogOut} to="login" className="btn btn-outline btn-sm">Log Out</Link> : <Link to="login" className="btn btn-outline btn-sm">Login</Link>}
      </header>

      <div className="flex flex-1">
        
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-6 space-y-4 hidden md:block">
          <nav className="space-y-3">
            <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-700">Overview</Link>
            <Link to="/loans" className="block px-3 py-2 rounded hover:bg-gray-700">Loans</Link>
            <Link to="/dashboard/loan-applications" className="block px-3 py-2 rounded hover:bg-gray-700"> Loan Applications</Link>
            <Link to="/dashboard/manage-users" className="block px-3 py-2 rounded hover:bg-gray-700"> Manage Users</Link>
            <Link to="/dashboard/add-loan" className="block px-3 py-2 rounded hover:bg-gray-700"> Add Loan</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-3 shadow-inner">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Microloan Dashboard — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
