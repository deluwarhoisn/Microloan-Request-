import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://microloan-request-server.vercel.app/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`https://microloan-request-server.vercel.app/users/${userId}/role`, { role: newRole });
      Swal.fire({
        icon: "success",
        title: "Role updated",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
      });
    }
  };

  // Approve / Suspend user
  const handleSuspendToggle = async (userId, currentStatus) => {
    const action = currentStatus === "active" ? "Suspend" : "Approve";
    const result = await Swal.fire({
      title: `${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: action,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`https://microloan-request-server.vercel.app/users/${userId}/status`, {
          status: currentStatus === "active" ? "suspended" : "active",
        });
        Swal.fire({
          icon: "success",
          title: `User ${action}ed`,
          showConfirmButton: false,
          timer: 1500,
        });
        fetchUsers();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Action failed",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status || "active"}</td>
                  <td className="flex gap-2">
                    {/* Update Role */}
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="borrower">Borrower</option>
                      <option value="manager">Manager</option>
                    </select>

                    {/* Suspend / Approve */}
                    <button
                      onClick={() => handleSuspendToggle(user._id, user.status || "active")}
                      className={`btn btn-sm ${
                        user.status === "suspended" ? "btn-success" : "btn-error"
                      }`}
                    >
                      {user.status === "suspended" ? "Approve" : "Suspend"}
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

export default ManageUsers;
