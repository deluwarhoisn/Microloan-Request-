import { useMemo } from "react";
import useAuth from "./useAuth";

const ADMIN_EMAIL_KEY = "microloan_admin_email";

const useUserRole = () => {
	const { user, loading } = useAuth();

	const roleInfo = useMemo(() => {
		if (loading) {
			return { role: null, isAdmin: false, isUser: false, adminEmail: null };
		}

		if (!user?.email) {
			return { role: "guest", isAdmin: false, isUser: false, adminEmail: null };
		}

		let adminEmail = localStorage.getItem(ADMIN_EMAIL_KEY);

		// First authenticated email becomes admin if no admin email has been set yet.
		if (!adminEmail) {
			adminEmail = user.email;
			localStorage.setItem(ADMIN_EMAIL_KEY, adminEmail);
		}

		const isAdmin = adminEmail === user.email;

		return {
			role: isAdmin ? "admin" : "user",
			isAdmin,
			isUser: !isAdmin,
			adminEmail,
		};
	}, [loading, user]);

	return {
		...roleInfo,
		isRoleLoading: loading,
	};
};

export default useUserRole;
