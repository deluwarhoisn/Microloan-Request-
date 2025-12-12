import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch loan applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://microloan-request-server.vercel.app/loan-applications"
      );

      setApplications(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load loan applications.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter
  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  // View details popup
  const handleView = (application) => {
    Swal.fire({
      title: "Loan Application Details",
      html: `
        <div style="text-align:left">
          <p><strong>User:</strong> ${application.name || "N/A"} (${application.email || "N/A"})</p>
          <p><strong>Loan ID:</strong> ${application.loanId || "N/A"}</p>
          <p><strong>Category:</strong> ${application.category || "N/A"}</p>
          <p><strong>Amount:</strong> $${application.amount || "N/A"}</p>
          <p><strong>Status:</strong> ${application.status || "N/A"}</p>
          <p><strong>Submitted:</strong> ${
            application.createdAt
              ? new Date(application.createdAt).toLocaleString()
              : "N/A"
          }</p>
          <p><strong>Info:</strong> ${application.additionalInfo || "N/A"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Loan Applications</h1>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <span className="font-medium">Filter by Status:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-medium py-4">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Loan ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app._id} className="hover">
                    <td>{app.loanId || "N/A"}</td>

                    <td>
                      <div>
                        <div className="font-semibold">{app.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">
                          {app.email || "N/A"}
                        </div>
                      </div>
                    </td>

                    <td>{app.category || "N/A"}</td>

                    <td>${app.amount || "N/A"}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          app.status === "Pending"
                            ? "bg-yellow-500"
                            : app.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {app.status}
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
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-6 text-lg"
                  >
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
