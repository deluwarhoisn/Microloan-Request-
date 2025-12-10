import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

import Swal from "sweetalert2";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const Profile = () => {
  const { user, logOut } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // simulate loading
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged Out", "You have logged out successfully", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10">
      <div className="text-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/Z8QqSmN/avatar.png"}
          className="w-24 h-24 rounded-full mx-auto"
          alt="profile"
        />
        <h2 className="text-2xl font-semibold mt-3 dark:text-white">
          {user?.displayName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>

        <p className="mt-2 px-4 py-1 bg-blue-600 text-white inline-block rounded-md">
          Role: User
        </p>

        <button
          onClick={handleLogout}
          className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
