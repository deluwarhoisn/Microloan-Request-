import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const BASE_URL = "https://microloan-request-server.vercel.app";

const ApprovedLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/loan-applications`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setLoans(list.filter((l) => l.status === "Approved" || l.status === "approved"));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d) ? "—" : d.toLocaleDateString();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-3">
            <h3 className="text-xl font-bold">Application Detail</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Name:</span> {selected.name || selected.displayName || "—"}</p>
              <p><span className="font-medium">Email:</span> {selected.email}</p>
              <p><span className="font-medium">Loan:</span> {selected.loanTitle || selected.loanName || selected.title || "—"}</p>
              <p><span className="font-medium">Amount:</span> ${selected.amount || "—"}</p>
              <p><span className="font-medium">Purpose:</span> {selected.purpose || "—"}</p>
              <p><span className="font-medium">Approved:</span> {formatDate(selected.approvedDate || selected.approvedAt || selected.updatedAt)}</p>
              <p><span className="font-medium">Fee Status:</span>{" "}
                <span className={`badge ${selected.applicationFeeStatus === "Paid" ? "badge-success" : "badge-warning"}`}>
                  {selected.applicationFeeStatus || "Unpaid"}
                </span>
              </p>
            </div>
            <button className="btn btn-outline w-full mt-2" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">✅ Approved Loans</h2>

      {loans.length === 0 ? (
        <p className="text-center py-10 text-base-content/40">No approved loans yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Applicant</th>
                <th>Loan</th>
                <th>Amount</th>
                <th>Approved Date</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, i) => (
                <tr key={loan._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="font-medium">{loan.name || loan.displayName || "—"}</div>
                    <div className="text-xs text-base-content/50">{loan.email}</div>
                  </td>
                  <td>{loan.loanTitle || loan.loanName || loan.title || "—"}</td>
                  <td>${loan.amount || "—"}</td>
                  <td>{formatDate(loan.approvedDate || loan.approvedAt || loan.updatedAt)}</td>
                  <td>
                    <span className={`badge ${loan.applicationFeeStatus === "Paid" ? "badge-success" : "badge-warning"}`}>
                      {loan.applicationFeeStatus || "Unpaid"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => setSelected(loan)} className="btn btn-xs btn-info">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedLoans;
