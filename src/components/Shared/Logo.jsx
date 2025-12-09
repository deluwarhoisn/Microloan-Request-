import React from 'react';
import logo from '../../assets/images.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className='flex'>
            <img className="w-10 " src={logo} alt="Logo" />
          <Link to="/" className=" font-bold text-2xl text-primary">Microloan</Link>
        </div>
    );
};

export default Logo;