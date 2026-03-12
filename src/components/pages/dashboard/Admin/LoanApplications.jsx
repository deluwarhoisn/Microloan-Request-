import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const normalizeStatus = (status) => {
  const normalized = String(status || "Pending").toLowerCase();

  if (normalized === "approved") return "Approved";
  if (normalized === "rejected") return "Rejected";
  if (normalized === "cancelled" || normalized === "canceled") return "Cancelled";
  return "Pending";
};

const getStatusBadgeClass = (status) => {
  if (status === "Approved") return "bg-green-600";
  if (status === "Rejected") return "bg-red-600";
  if (status === "Cancelled") return "bg-gray-600";
  return "bg-yellow-500";
};

const LoanApplications = () => {
  const baseUrl = "https://microloan-request-server.vercel.app";
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
      : applications.filter((app) => normalizeStatus(app.status) === filter);

  const statusCounts = applications.reduce(
    (acc, app) => {
      const status = normalizeStatus(app.status);
      acc[status] += 1;
      return acc;
    },
    { Pending: 0, Approved: 0, Rejected: 0, Cancelled: 0 }
  );

  const handleStatusUpdate = async (applicationId, nextStatus) => {
    const normalized = normalizeStatus(nextStatus);

    const requests = [
      () => axios.put(`${baseUrl}/loan-applications/${applicationId}/status`, { status: normalized }),
      () => axios.patch(`${baseUrl}/loan-applications/${applicationId}/status`, { status: normalized }),
      () => axios.patch(`${baseUrl}/loan-applications/${applicationId}`, { status: normalized }),
      () => axios.put(`${baseUrl}/loan-applications/${applicationId}`, { status: normalized }),
    ];

    let updated = false;
    for (const request of requests) {
      try {
        await request();
        updated = true;
        break;
      } catch {
        // try next endpoint
      }
    }

    setApplications((prev) =>
      prev.map((app) =>
        app._id === applicationId ? { ...app, status: normalized } : app
      )
    );

    if (updated) {
      Swal.fire("Updated", `Status changed to ${normalized}.`, "success");
    } else {
      Swal.fire("Updated Locally", `Status set to ${normalized} in dashboard view.`, "warning");
    }
  };

  // View details popup
  const handleView = (application) => {
    const fullName =
      application.name ||
      [application.firstName, application.lastName].filter(Boolean).join(" ") ||
      "N/A";

    const email = application.email || "N/A";
    const loanId = application.loanId || application._id || "N/A";
    const category = application.category || application.loanCategory || "N/A";
    const amount = application.amount || application.loanAmount || "N/A";
    const status = application.status || "Pending";
    const submittedAt = application.createdAt || application.appliedDate;
    const info = application.additionalInfo || application.reason || application.extraNotes || "N/A";

    Swal.fire({
      title: "Loan Application Details",
      html: `
        <div style="text-align:left">
          <p><strong>User:</strong> ${fullName} (${email})</p>
          <p><strong>Loan ID:</strong> ${loanId}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Submitted:</strong> ${
            submittedAt
              ? new Date(submittedAt).toLocaleString()
              : "N/A"
          }</p>
          <p><strong>Info:</strong> ${info}</p>
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
          className="select select-bordered w-52"
        >
          <option value="All">All ({applications.length})</option>
          <option value="Pending">Pending ({statusCounts.Pending})</option>
          <option value="Approved">Approved ({statusCounts.Approved})</option>
          <option value="Rejected">Rejected ({statusCounts.Rejected})</option>
          <option value="Cancelled">Cancelled ({statusCounts.Cancelled})</option>
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

                    <td>${app.amount || app.loanAmount || "N/A"}</td>

                    <td>
                      {/** Normalize status so filtering and badge colors always match. */}
                      {(() => {
                        const status = normalizeStatus(app.status);
                        return (
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${getStatusBadgeClass(status)}`}
                      >
                        {status}
                      </span>
                        );
                      })()}
                    </td>

                    <td className="flex gap-2 items-center">
                      <button
                        onClick={() => handleView(app)}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </button>

                      <select
                        className="select select-bordered select-sm w-32"
                        value={normalizeStatus(app.status)}
                        onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
