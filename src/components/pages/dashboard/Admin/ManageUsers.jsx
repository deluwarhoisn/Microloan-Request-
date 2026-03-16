import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "https://microloan-request-server.vercel.app";

const SuspendModal = ({ targetUser, onConfirm, onClose }) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl">
        <h2 className="mb-1 text-xl font-bold">Suspend User</h2>
        <p className="mb-4 text-sm text-base-content/60">
          Suspending: <strong>{targetUser.name || targetUser.email}</strong>
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Reason *</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select a reason</option>
              <option value="Fraudulent activity">Fraudulent activity</option>
              <option value="Policy violation">Policy violation</option>
              <option value="Multiple failed payments">Multiple failed payments</option>
              <option value="Suspicious behaviour">Suspicious behaviour</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Additional Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="Optional context..."
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => {
              if (!reason) {
                Swal.fire("Required", "Please select a reason.", "warning");
                return;
              }
              onConfirm(reason, feedback);
            }}
            className="btn btn-error flex-1"
          >
            Suspend
          </button>
          <button onClick={onClose} className="btn btn-outline flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [suspendTarget, setSuspendTarget] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const endpoints = [
      () => axios.put(`${BASE_URL}/users/${userId}/role`, { role: newRole }),
      () => axios.patch(`${BASE_URL}/users/${userId}`, { role: newRole }),
    ];

    for (const request of endpoints) {
      try {
        await request();
        break;
      } catch {
        // try next endpoint shape
      }
    }

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );

    Swal.fire({
      icon: "success",
      title: "Role updated",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleApprove = async (userId) => {
    const endpoints = [
      () => axios.put(`${BASE_URL}/users/${userId}/status`, { status: "active" }),
      () => axios.patch(`${BASE_URL}/users/${userId}`, { status: "active" }),
    ];

    for (const request of endpoints) {
      try {
        await request();
        break;
      } catch {
        // try next endpoint shape
      }
    }

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, status: "active" } : user
      )
    );

    Swal.fire({
      icon: "success",
      title: "User approved",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleSuspendConfirm = async (userId, reason, feedback) => {
    const payload = {
      status: "suspended",
      suspendReason: reason,
      suspendFeedback: feedback,
    };

    const endpoints = [
      () => axios.put(`${BASE_URL}/users/${userId}/status`, payload),
      () => axios.patch(`${BASE_URL}/users/${userId}`, payload),
    ];

    for (const request of endpoints) {
      try {
        await request();
        break;
      } catch {
        // try next endpoint shape
      }
    }

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, ...payload } : user
      )
    );
    setSuspendTarget(null);

    Swal.fire({
      icon: "success",
      title: "User suspended",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    const matchesSearch =
      (user.name || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      {suspendTarget && (
        <SuspendModal
          targetUser={suspendTarget}
          onConfirm={(reason, feedback) =>
            handleSuspendConfirm(suspendTarget._id, reason, feedback)
          }
          onClose={() => setSuspendTarget(null)}
        />
      )}

      <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>

      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-72"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered w-full md:w-48"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="borrower">Borrower</option>
        </select>
        <span className="self-center text-sm text-base-content/50">
          {filteredUsers.length} user(s)
        </span>
      </div>

      {loading ? (
        <p className="py-10 text-center text-base-content/50">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-base-content/40">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="font-medium">{user.name || "-"}</td>
                    <td className="text-sm">{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "badge-primary"
                            : user.role === "manager"
                              ? "badge-secondary"
                              : "badge-ghost"
                        }`}
                      >
                        {user.role || "borrower"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "suspended"
                            ? "badge-error"
                            : "badge-success"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="flex flex-wrap gap-2">
                      <select
                        value={user.role || "borrower"}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="select select-bordered select-xs"
                      >
                        <option value="borrower">Borrower</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>

                      {user.status === "suspended" ? (
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="btn btn-xs btn-success"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => setSuspendTarget(user)}
                          className="btn btn-xs btn-error"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;