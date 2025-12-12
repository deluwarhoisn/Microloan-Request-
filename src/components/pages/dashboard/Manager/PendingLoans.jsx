import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PendingLoans = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null); // For modal view
  const [loading, setLoading] = useState(true);

  // Fetch all pending loans
  const fetchPendingLoans = async () => {
    try {
      const res = await fetch("https://your-server.com/loans?status=pending");
      const data = await res.json();
      setLoans(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchPendingLoans();
  }, []);

  // Approve Loan
  const handleApprove = async (id) => {
    Swal.fire({
      title: "Approve this loan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`https://your-server.com/loans/approve/${id}`, {
          method: "PATCH",
        });

        if (res.ok) {
          Swal.fire("Approved!", "Loan has been approved.", "success");
          fetchPendingLoans();
        }
      }
    });
  };

  // Reject Loan
  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject this loan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`https://your-server.com/loans/reject/${id}`, {
          method: "PATCH",
        });

        if (res.ok) {
          Swal.fire("Rejected!", "Loan application was rejected.", "success");
          fetchPendingLoans();
        }
      }
    });
  };

  // View Modal
  const openModal = (loan) => {
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setSelectedLoan(null);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Loan Applications</h2>

      {loans.length === 0 ? (
        <p>No pending loan applications.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border">Loan ID</th>
                <th className="py-3 px-4 border">Borrower</th>
                <th className="py-3 px-4 border">Amount</th>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{loan._id}</td>
                  <td className="py-2 px-4 border">
                    {loan.userName} <br />
                    <span className="text-sm text-gray-500">{loan.userEmail}</span>
                  </td>
                  <td className="py-2 px-4 border">${loan.amount}</td>
                  <td className="py-2 px-4 border">{loan.date}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleApprove(loan._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 "
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(loan._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => openModal(loan)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Loan Details</h3>

            <p><strong>ID:</strong> {selectedLoan._id}</p>
            <p><strong>Name:</strong> {selectedLoan.userName}</p>
            <p><strong>Email:</strong> {selectedLoan.userEmail}</p>
            <p><strong>Amount:</strong> ${selectedLoan.amount}</p>
            <p><strong>Date:</strong> {selectedLoan.date}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PendingLoans;
