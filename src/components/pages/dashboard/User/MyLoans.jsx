import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner";


const MyLoans = () => {
  const LOCAL_CANCEL_KEY = "cancelled_loan_ids";
  const baseUrl = "https://microloan-request-server.vercel.app";
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loans, setLoans] = useState(null);

  const markCancelledLocally = (id) => {
    const existing = JSON.parse(localStorage.getItem(LOCAL_CANCEL_KEY) || "[]");
    const updated = Array.from(new Set([...existing, id]));
    localStorage.setItem(LOCAL_CANCEL_KEY, JSON.stringify(updated));
    setLoans((prev) => prev.map((loan) => (loan._id === id ? { ...loan, status: "Cancelled" } : loan)));
  };

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    axios
      .get(`https://microloan-request-server.vercel.app/loan-applications?email=${user?.email}`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        const cancelledIds = JSON.parse(localStorage.getItem(LOCAL_CANCEL_KEY) || "[]");
        const merged = list.map((loan) =>
          cancelledIds.includes(loan._id) ? { ...loan, status: "Cancelled" } : loan
        );
        setLoans(merged);
      })
      .catch((error) => {
        console.log(error);
        setLoans([]);
      });
  }, [user?.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel your loan request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const requests = [
        () => axios.patch(`${baseUrl}/cancel-loan/${id}`),
        () => axios.patch(`${baseUrl}/loan-applications/${id}/cancel`),
        () => axios.patch(`${baseUrl}/loan-applications/${id}`, { status: "Cancelled" }),
        () => axios.put(`${baseUrl}/loan-applications/${id}`, { status: "Cancelled" }),
      ];

      let lastError = null;

      for (const request of requests) {
        try {
          await request();
          Swal.fire("Cancelled!", "Your loan request has been cancelled.", "success");
          markCancelledLocally(id);
          return;
        } catch (error) {
          lastError = error;
        }
      }

      const serverMessage =
        lastError?.response?.data?.message ||
        lastError?.response?.data?.error ||
        "Cancel endpoint not available on server.";

      markCancelledLocally(id);
      Swal.fire("Updated Locally", `${serverMessage} Loan has been marked as cancelled in your dashboard.`, "warning");
    });
  };

  const handlePayment = (loan) => {
    Swal.fire({
      title: "Proceed to Checkout",
      text: "You will pay $10 application fee.",
      icon: "info",
      confirmButtonText: "Proceed"
    }).then(() => {
      navigate(`/dashboard/checkout/${loan._id}`);
    });
  };

  const handleViewDetails = (loan) => {
    Swal.fire({
      title: loan.loanTitle || loan.loanName || loan.title || "Loan Details",
      html: `
        <div style="text-align:left">
          <p><strong>Loan:</strong> ${loan.loanTitle || loan.loanName || loan.title || "N/A"}</p>
          <p><strong>Amount:</strong> $${loan.amount || loan.loanAmount || "N/A"}</p>
          <p><strong>Status:</strong> ${loan.status || "Pending"}</p>
          <p><strong>Fee Status:</strong> ${loan.applicationFeeStatus || "Unpaid"}</p>
          <p><strong>Category:</strong> ${loan.category || "N/A"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  if (authLoading || loans === null) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">My Loans</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th>#</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No loan applications found for your account.
                </td>
              </tr>
            )}

            {loans.map((loan, index) => (
              <tr key={loan._id} className="border-b">
                <td>{index + 1}</td>
                <td>{loan.loanTitle || loan.loanName || loan.title || "N/A"}</td>
                <td>${loan.amount || loan.loanAmount || "N/A"}</td>
                <td>
                  <span className={`badge ${loan.status === "Pending" ? "bg-yellow-400" : loan.status === "Approved" ? "bg-green-500" : "bg-gray-400"}`}>
                    {loan.status || "Pending"}
                  </span>
                </td>

                <td>
                  {loan.applicationFeeStatus === "Paid" ? (
                    <span className="badge bg-green-600 text-white">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(loan)}
                      className="btn btn-sm btn-primary"
                    >
                      Pay
                    </button>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleViewDetails(loan)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>

                  {(loan.status || "Pending") === "Pending" && (
                    <button
                      onClick={() => handleCancel(loan._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoans;
