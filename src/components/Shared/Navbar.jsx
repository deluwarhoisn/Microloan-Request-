import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
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
  }

  const links = <>
    <li><NavLink to="">Home</NavLink></li>
    <li><NavLink to="loans">All-Loans</NavLink></li>
    <li><NavLink to="about">About Us</NavLink></li>
    <li><NavLink to="contact">Contact</NavLink></li>
    <li><NavLink to="loan-form">Loan Form</NavLink></li>
    <li><NavLink to="dashboard">Dashboard</NavLink></li>
  </>;

  return (
    <div className="navbar px-10 bg-base-100 shadow-sm sticky top-0 z-50">

      <div className="navbar-start flex items-center gap-3">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} className="btn btn-ghost">
            ☰
          </div>
          <ul 
            tabIndex={-1} 
            className="menu menu-compact dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 z-50 p-2"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Logo />
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {links}
        </ul>
      </div>

      {/* Right Side (Buttons) */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <button onClick={handleLogOut} className="btn btn-outline btn-sm">
            Log Out
          </button>
        ) : (
          <Link to="login" className="btn btn-outline btn-sm">
            Login
          </Link>
        )}

        {!user && (
          <Link to="register" className="btn btn-primary btn-outline btn-sm">
            Register
          </Link>
        )}

        {/* 🔥 Theme Toggle Button */}
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
