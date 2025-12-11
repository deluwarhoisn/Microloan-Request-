import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch all loans
  const fetchLoans = async () => {
    try {
      const res = await axios.get("https://microloan-request-server.vercel.app/AllLoans");
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch loans", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Delete loan
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://microloan-request-server.vercel.app/loans/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Loan has been deleted.", "success");
            fetchLoans();
          })
          .catch(() => Swal.fire("Error!", "Failed to delete loan.", "error"));
      }
    });
  };

  // Navigate to update page
  const handleEdit = (id) => {
    navigate(`/dashboard/update-loan/${id}`);
  };

  // Filtered loans by title or category
  const filteredLoans = loans.filter((loan) =>
    (loan.loanTitle || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (loan.category || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Loans</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 border px-4 py-2 rounded"
        />
      </div>

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-100">
                  <td>
                    <img
                      src={loan.image || "https://via.placeholder.com/80x40"}
                      alt={loan.loanTitle}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{loan.loanTitle}</td>
                  <td>{loan.interest}%</td>
                  <td>{loan.category}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(loan._id)}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No loans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageLoans;
