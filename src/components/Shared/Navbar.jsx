import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // ✅ FIXED
import { FiLogIn } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Logo from './Logo';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on load
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut().catch(err => console.log(err));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/loans">All Loans</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/loan-form">Loan Form</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 px-5 lg:px-10 shadow-sm sticky top-0 z-50">

      {/* LEFT SIDE */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} className="btn btn-ghost">
            ☰
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-100 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Logo />
      </div>

      {/* CENTER LINKS (Desktop Only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {links}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end flex items-center gap-3">
        {user && (
          <Link to="/dashboard" className="flex items-center gap-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user?.displayName || "User"}
                title={user?.email || "User"}
                className="w-9 h-9 rounded-full object-cover border border-base-300"
              />
            ) : (
              <FaUserCircle title={user?.email || "User"} className="text-3xl text-base-content/70" />
            )}
          </Link>
        )}

        {user ? (
          <button onClick={handleLogOut} className="btn btn-outline btn-sm">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline btn-sm gap-1">
            <FiLogIn /> Login
          </Link>
        )}

        {!user && (
          <Link to="/register" className="btn btn-primary btn-sm">
            Register
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          className="btn btn-ghost btn-sm text-xl"
          onClick={handleThemeToggle}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

    </div>
  );
};

export default Navbar;
