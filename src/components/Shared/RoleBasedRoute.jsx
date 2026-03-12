import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import LoadingSpinner from "./LoadingSpinner";

const RoleBasedRoute = ({ allowedRoles = [], children }) => {
    const { user, loading } = useAuth();
    const { role, isRoleLoading } = useUserRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/login" state={location.pathname} replace />;
    }

    // Admin can access all protected role-based pages.
    if (role === "admin") {
        return children;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleBasedRoute;