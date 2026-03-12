import React from 'react';
import useUserRole from '../../../../hooks/useUserRole';
import AdminDashboard from '../../dashboard/AdminDashboard';
import UserDashboard from '../../dashboard/UserDashboard';

const DashboardHome = () => {
    const { isAdmin } = useUserRole();

    return (
        <div>{isAdmin ? <AdminDashboard /> : <UserDashboard />}</div>
    );
};

export default DashboardHome;