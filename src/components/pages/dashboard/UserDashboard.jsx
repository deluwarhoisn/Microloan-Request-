import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const UserDashboard = () => {
    const { user } = useAuth();

    const { data: myLoans = [] } = useQuery({
        queryKey: ['my-loans-dashboard', user?.email],
        enabled: Boolean(user?.email),
        queryFn: async () => {
            const res = await axios.get(`https://microloan-request-server.vercel.app/loan-applications?email=${user.email}`);
            return Array.isArray(res.data) ? res.data : [];
        },
    });

    const statusMap = myLoans.reduce((acc, loan) => {
        const key = loan.status || 'Pending';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }));
    const amountTrendData = myLoans.slice(0, 8).map((loan, index) => ({
        name: `L${index + 1}`,
        amount: Number(loan.amount || 0),
    }));

    const totalAmount = myLoans.reduce((sum, loan) => sum + Number(loan.amount || 0), 0);
    const colors = ['#eab308', '#22c55e', '#ef4444', '#6366f1'];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <p className="text-sm text-gray-500">User Workspace</p>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Hello, {user?.displayName || "User"}</h1>
                <p className="text-gray-600 mt-2">Track loan applications, view approval status, and manage your account easily.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <p className="text-sm text-slate-600">My Loans</p>
                    <h3 className="text-xl font-semibold mt-2">{myLoans.length} Applications</h3>
                    <p className="text-sm text-slate-600 mt-1">Total requested amount: ${totalAmount.toLocaleString()}</p>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                    <p className="text-sm text-indigo-700">Account</p>
                    <h3 className="text-xl font-semibold mt-2">Profile & Security</h3>
                    <p className="text-sm text-indigo-700 mt-1">Keep your profile information up to date and secure.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl shadow-sm border p-5 h-80">
                    <h3 className="text-lg font-semibold mb-3">My Loan Status</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={95}>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-5 h-80">
                    <h3 className="text-lg font-semibold mb-3">Requested Amount Trend</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={amountTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="amount" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;