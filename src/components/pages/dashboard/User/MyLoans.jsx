import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner";


const MyLoans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/loan-applications?email=${user?.email}`)
      .then((res) => setLoans(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel your loan request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/cancel-loan/${id}`)
          .then(() => {
            Swal.fire("Cancelled!", "Your loan request has been cancelled.", "success");
            setLoans(loans.map(loan => loan._id === id ? { ...loan, status: "Cancelled" } : loan));
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  const handlePayment = (loan) => {
    Swal.fire({
      title: "Redirecting to Payment",
      text: "You will pay $10 application fee.",
      icon: "info",
      confirmButtonText: "Proceed"
    }).then(() => {
      // Redirect user to stripe payment page
      window.location.href = `http://localhost:5000/pay/${loan._id}`;
    });
  };

  if (loading) return <LoadingSpinner />;

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
            {loans.map((loan, index) => (
              <tr key={loan._id} className="border-b">
                <td>{index + 1}</td>
                <td>{loan.loanName}</td>
                <td>${loan.amount}</td>
                <td>
                  <span className={`badge ${loan.status === "Pending" ? "bg-yellow-400" : loan.status === "Approved" ? "bg-green-500" : "bg-gray-400"}`}>
                    {loan.status}
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
                  <Link to={`/dashboard/loan-details/${loan._id}`} className="btn btn-sm btn-info">
                    View
                  </Link>

                  {loan.status === "Pending" && (
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
