import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/images.png'
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const {user,logOut} = useAuth();

  const handleLogOut = () =>{
    logOut()
    .then()
    .catch(error => {
      console.log(error);
    })
  }
    
    
    const links = <>
        <li><NavLink to="">Home</NavLink></li>
        <li><NavLink to="all-loans">All-Loans</NavLink></li>
        <li><NavLink to="about">About Us</NavLink></li>
        <li><NavLink to="">Contact</NavLink></li>
        <li><NavLink to="dashboard">Dashboard</NavLink></li>
       

        

    </>



    return (
        <div>
           <div className="navbar px-10 bg-base-100 shadow-sm sticky top-0 z-50">

  {/* Navbar Start: Logo + Mobile Dropdown */}
  <div className="navbar-start flex items-center gap-3">

    {/* Mobile dropdown button */}
    <div className="dropdown lg:hidden">
      <div tabIndex={0} className="btn btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul tabIndex={-1} className="menu menu-compact dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 z-50 p-2">
       {links}
      </ul>
    </div>

    {/* Logo */}
    <img className="w-10 h-10" src={logo} alt="Logo" />
    <p className="font-bold text-2xl text-primary">Microloan</p>
  </div>

  {/* Navbar Center: Desktop Menu */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-4">
     {links}
    </ul>
  </div>

  {/* Navbar End: Buttons + Theme Toggle */}
  <div className="navbar-end flex items-center gap-3">
  {user ?   <Link onClick={handleLogOut} to="login" className="btn btn-outline btn-sm">Log Out</Link> :   <Link to="login" className="btn btn-outline btn-sm">Login</Link>}
    <Link to="register" className="btn btn-primary btn-sm">Register</Link>
    <button className="btn btn-ghost btn-sm">🌙</button> {/* Theme toggle */}
  </div>

</div>

        </div>
    );
};

export default Navbar;