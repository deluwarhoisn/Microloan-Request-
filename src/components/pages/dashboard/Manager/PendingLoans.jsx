import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const BASE_URL = "https://microloan-request-server.vercel.app";

const PendingLoans = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewLoan, setViewLoan] = useState(null);

    const fetchPending = () => {
        axios
            .get(`${BASE_URL}/loan-applications`)
            .then((res) => {
                const list = Array.isArray(res.data) ? res.data : [];
                setApplications(list.filter((a) => (a.status || "Pending") === "Pending"));
            })
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const updateStatus = async (id, status) => {
        const endpoints = [
            () => axios.put(`${BASE_URL}/loan-applications/${id}/status`, { status, approvedAt: new Date().toISOString() }),
            () => axios.patch(`${BASE_URL}/loan-applications/${id}/status`, { status, approvedAt: new Date().toISOString() }),
            () => axios.patch(`${BASE_URL}/loan-applications/${id}`, { status, approvedAt: new Date().toISOString() }),
            () => axios.put(`${BASE_URL}/loan-applications/${id}`, { status, approvedAt: new Date().toISOString() }),
        ];

        let success = false;
        for (const req of endpoints) {
            try { await req(); success = true; break; } catch { /* next */ }
        }

        setApplications((prev) => prev.filter((a) => a._id !== id));

        Swal.fire(
            success ? "Done!" : "Updated Locally",
            `Application ${status.toLowerCase()}.`,
            success ? "success" : "warning"
        );
    };

    const handleApprove = (id) => {
        Swal.fire({
            title: "Approve this application?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve",
            confirmButtonColor: "#16a34a",
        }).then((r) => r.isConfirmed && updateStatus(id, "Approved"));
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject",
            confirmButtonColor: "#dc2626",
        }).then((r) => r.isConfirmed && updateStatus(id, "Rejected"));
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">⏳ Pending Loan Applications</h1>
                <span className="badge badge-warning badge-lg">{applications.length} Pending</span>
            </div>

            {applications.length === 0 ? (
                <div className="text-center py-16 text-base-content/50">
                    <p className="text-4xl mb-3">🎉</p>
                    <p className="text-lg font-medium">No pending applications!</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-base-300">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Loan ID</th>
                                <th>Borrower</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, i) => {
                                const name = app.name || [app.firstName, app.lastName].filter(Boolean).join(" ") || "N/A";
                                const date = app.appliedDate || app.createdAt;
                                return (
                                    <tr key={app._id}>
                                        <td>{i + 1}</td>
                                        <td className="font-mono text-xs text-base-content/60">{app._id?.slice(-8)}</td>
                                        <td>
                                            <div className="font-medium">{name}</div>
                                            <div className="text-xs text-base-content/50">{app.email}</div>
                                        </td>
                                        <td>${app.amount || app.loanAmount || "N/A"}</td>
                                        <td className="text-sm text-base-content/60">
                                            {date ? new Date(date).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="flex gap-2 flex-wrap">
                                            <button
                                                onClick={() => setViewLoan(app)}
                                                className="btn btn-xs btn-info"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleApprove(app._id)}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(app._id)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* View Modal */}
            {viewLoan && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Application Details</h2>
                            <button
                                onClick={() => setViewLoan(null)}
                                className="btn btn-ghost btn-sm btn-circle"
                            >✕</button>
                        </div>
                        <div className="space-y-2 text-sm">
                            {[
                                ["Loan Title", viewLoan.loanTitle || "N/A"],
                                ["Name", viewLoan.name || [viewLoan.firstName, viewLoan.lastName].filter(Boolean).join(" ") || "N/A"],
                                ["Email", viewLoan.email],
                                ["Amount", `$${viewLoan.amount || viewLoan.loanAmount}`],
                                ["Category", viewLoan.category || "N/A"],
                                ["Interest Rate", viewLoan.interestRate ? `${viewLoan.interestRate}%` : "N/A"],
                                ["Income Source", viewLoan.incomeSource || "N/A"],
                                ["Monthly Income", viewLoan.monthlyIncome ? `$${viewLoan.monthlyIncome}` : "N/A"],
                                ["Contact", viewLoan.contactNumber || "N/A"],
                                ["National ID", viewLoan.nationalID || "N/A"],
                                ["Reason", viewLoan.reason || viewLoan.additionalInfo || "N/A"],
                                ["Applied Date", viewLoan.appliedDate ? new Date(viewLoan.appliedDate).toLocaleString() : "N/A"],
                            ].map(([label, value]) => (
                                <div key={label} className="flex gap-2">
                                    <span className="font-semibold w-36 shrink-0 text-base-content/70">{label}:</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => { handleApprove(viewLoan._id); setViewLoan(null); }} className="btn btn-success btn-sm flex-1">Approve</button>
                            <button onClick={() => { handleReject(viewLoan._id); setViewLoan(null); }} className="btn btn-error btn-sm flex-1">Reject</button>
                            <button onClick={() => setViewLoan(null)} className="btn btn-outline btn-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingLoans;