import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';
import Navbar from '../components/Shared/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
             <Footer></Footer>
        </div>
    );
};

export default RootLayout;