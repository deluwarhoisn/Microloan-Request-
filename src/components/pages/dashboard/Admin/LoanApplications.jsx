import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Fetch all loan applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://microloan-request-server.vercel.app/loan-applications");
      setApplications(res.data || []); // fallback to empty array
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filtered applications
  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  // View loan application details
  const handleView = (application) => {
    Swal.fire({
      title: `Loan Application Details`,
      html: `
        <strong>User:</strong> ${application.name || "N/A"} (${application.email || "N/A"})<br/>
        <strong>Loan ID:</strong> ${application.loanId || "N/A"}<br/>
        <strong>Category:</strong> ${application.category || "N/A"}<br/>
        <strong>Amount:</strong> $${application.amount || "N/A"}<br/>
        <strong>Status:</strong> ${application.status || "N/A"}<br/>
        <strong>Submitted At:</strong> ${application.createdAt ? new Date(application.createdAt).toLocaleString() : "N/A"}<br/>
        <strong>Additional Info:</strong> ${application.additionalInfo || "N/A"}
      `,
      icon: "info",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Loan Applications</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-4 items-center">
        <span>Filter by Status:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>User (Email / Name)</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-100">
                    <td>{app.loanId || "N/A"}</td>
                    <td>
                      {app.email || "N/A"} <br /> {app.name || "N/A"}
                    </td>
                    <td>{app.category || "N/A"}</td>
                    <td>${app.amount || "N/A"}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm ${
                          app.status === "Pending"
                            ? "bg-yellow-500"
                            : app.status === "Approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {app.status || "N/A"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleView(app)}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No applications found.
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

export default LoanApplications;
