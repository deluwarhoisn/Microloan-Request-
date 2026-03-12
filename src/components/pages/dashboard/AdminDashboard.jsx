import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import loansApi from '../../../api/Loans';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

const AdminDashboard = () => {
    const { user } = useAuth();

    const { data: loans = [] } = useQuery({
        queryKey: ['loans'],
        queryFn: loansApi.getLoans,
    });

    const categoryMap = loans.reduce((acc, loan) => {
        const key = loan.category || 'Other';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    const barData = loans.slice(0, 8).map((loan) => ({
        name: (loan.loanTitle || loan.title || 'Loan').slice(0, 10),
        interest: Number(loan.interest || 0),
        maxAmount: Number(loan.maxAmount || loan.limit || 0),
    }));

    const chartColors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6'];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <p className="text-sm text-gray-500">Admin Workspace</p>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Welcome back, {user?.displayName || "Admin"}</h1>
                <p className="text-gray-600 mt-2">Manage users, approve applications, and control platform loans from one place.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <p className="text-sm text-blue-700">Loan Pipeline</p>
                    <h3 className="text-2xl font-semibold mt-2">Review Queue</h3>
                    <p className="text-sm text-blue-700 mt-1">Check pending applications and take action quickly.</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                    <p className="text-sm text-emerald-700">User Management</p>
                    <h3 className="text-2xl font-semibold mt-2">Access Control</h3>
                    <p className="text-sm text-emerald-700 mt-1">Update member roles and account status securely.</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <p className="text-sm text-amber-700">Portfolio</p>
                    <h3 className="text-2xl font-semibold mt-2">Loan Catalog</h3>
                    <p className="text-sm text-amber-700 mt-1">Curate available loans and homepage visibility.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl shadow-sm border p-5 h-80">
                    <h3 className="text-lg font-semibold mb-3">Loans by Category</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={95}>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={chartColors[index % chartColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-5 h-80">
                    <h3 className="text-lg font-semibold mb-3">Interest Snapshot</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="interest" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;