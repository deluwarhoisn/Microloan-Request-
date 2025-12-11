import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminAllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all loans
  const fetchLoans = async () => {
    try {
      const res = await axios.get("https://microloan-request-server.vercel.app/AllLoans");
      setLoans(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Delete Loan
  const handleDelete = async (loanId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://microloan-request-server.vercel.app/loans/${loanId}`);
        Swal.fire({
          icon: "success",
          title: "Loan deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchLoans();
      } catch (error) {
        console.error(error);
        Swal.fire({ icon: "error", title: "Failed to delete loan" });
      }
    }
  };

  // Show on Home toggle
  const handleShowOnHome = async (loanId, current) => {
    try {
      await axios.put(`https://microloan-request-server.vercel.app/loans/${loanId}/home`, {
        showOnHome: !current,
      });
      fetchLoans();
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Failed to update" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage All Loans</h1>

      {loading ? (
        <p>Loading loans...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Interest</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Show on Home</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-100">
                  <td>
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{loan.title}</td>
                  <td>{loan.interest}%</td>
                  <td>{loan.category}</td>
                  <td>{loan.createdBy || "Admin"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={loan.showOnHome || false}
                      onChange={() => handleShowOnHome(loan._id, loan.showOnHome)}
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td className="flex gap-2">
                    {/* Update button - redirect to edit page */}
                    <button
                      onClick={() => window.location.href = `/dashboard/edit-loan/${loan._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
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

export default AdminAllLoans;
