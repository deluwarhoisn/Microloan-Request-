import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const BASE_URL = "https://microloan-request-server.vercel.app";
const ADMIN_EMAILS = ["babuhossen301@gmail.com"];

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user?.email) {
      setRole("guest");
      setIsRoleLoading(false);
      return;
    }

    const normalizedEmail = user.email.toLowerCase();
    if (ADMIN_EMAILS.includes(normalizedEmail)) {
      setRole("admin");
      setIsRoleLoading(false);
      return;
    }

    setIsRoleLoading(true);
    axios
      .get(`${BASE_URL}/users?email=${encodeURIComponent(user.email)}`)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        const found = list.find(
          (u) => u.email?.toLowerCase() === normalizedEmail
        );
        setRole(ADMIN_EMAILS.includes(normalizedEmail) ? "admin" : found?.role || "borrower");
      })
      .catch(() => {
        // fallback: first-registered email treated as admin via localStorage
        const adminEmail = localStorage.getItem("microloan_admin_email");
        if (!adminEmail) {
          localStorage.setItem("microloan_admin_email", user.email);
          setRole("admin");
        } else {
          setRole(
            adminEmail?.toLowerCase() === normalizedEmail || ADMIN_EMAILS.includes(normalizedEmail)
              ? "admin"
              : "borrower"
          );
        }
      })
      .finally(() => setIsRoleLoading(false));
  }, [user?.email, authLoading]);

  return {
    role,
    isAdmin: role === "admin",
    isManager: role === "manager",
    isUser: role === "borrower" || role === "user",
    isRoleLoading,
  };
};

export default useUserRole;
