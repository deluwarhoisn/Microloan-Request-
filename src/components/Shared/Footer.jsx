import React from 'react';
import logo from '../../assets/images.png'

const Footer = () => {
    return (
        <div>
           <footer className="bg-base-200 border-t border-base-300 py-10 mt-20">
  <div className="container mx-auto px-4 flex flex-col items-center gap-6">

    {/* Brand */}
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-2 text-primary font-semibold text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          className="fill-primary"
        >
         
        </svg>
       <img className="w-10 h-10" src={logo} alt="Logo" />
           <p className="font-bold text-2xl text-primary">Microloan</p>
      </div>

      <p className="text-sm opacity-70 max-w-md mt-2 leading-relaxed">
        Empowering micro-loans with secure tracking and approval system for businesses & individuals.
      </p>

      <p className="text-xs opacity-50 mt-3">
        © {new Date().getFullYear()} LoanLink — All Rights Reserved.
      </p>
    </div>

    {/* Navigation */}
   

    {/* Social Icons */}
    <div className="flex gap-5">
      <a className="hover:text-primary transition">
        <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2H15L9 14l-3-6H3l6 12h3l6-12z" />
        </svg>
      </a>

      <a className="hover:text-primary transition">
        <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.6 3H4.4C2 3 0 5 0 7.4v9.2C0 19 2 21 4.4 21h15.2c2.4 0 4.4-2 4.4-4.4V7.4C24 5 22 3 19.6 3zM9 16V8l7 4z" />
        </svg>
      </a>

      <a className="hover:text-primary transition">
        <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 9H8V12H10V20H14V12H17L18 9H14V7.5C14 7 14.2 6.5 15 6.5H18V3H14C11 3 10 5 10 7V9Z" />
        </svg>
      </a>
    </div>
  </div>
</footer>


        </div>
    );
};

export default Footer;