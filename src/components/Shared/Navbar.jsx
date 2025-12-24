import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary"
      : "hover:text-primary transition duration-200";

  const links = (
    <>
      <li><NavLink className={navLinkStyle} to="/">Home</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/loans">All Loans</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/about">About Us</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/contact">Contact</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/loan-form">Loan Form</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md px-5 lg:px-12 shadow-md sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost text-xl">☰</button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-xl w-56"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 text-sm font-medium">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-3">

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="btn btn-circle btn-ghost text-lg"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* User Section */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                  alt="user"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-xl w-60"
            >
              <li className="mb-2">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </li>
              <hr />
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
              <li>
                <button onClick={handleLogOut} className="text-error">
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
