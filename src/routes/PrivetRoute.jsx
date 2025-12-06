import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    console.log(location);

    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivetRoute;