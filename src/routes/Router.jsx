import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivetRoute from "./PrivetRoute";
import RoleBasedRoute from "../components/Shared/RoleBasedRoute";

import Home from "../components/pages/Home/Home";
import AllLoans from "../components/pages/Loans/AllLoans";
import LoanDetails from "../components/pages/Loans/LoanDetails";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Auth/Register";
import LoanApplication from "../components/pages/dashboard/Admin/LoanForm";
import LoanApplications from "../components/pages/dashboard/Admin/LoanApplications";
import ManageUsers from "../components/pages/dashboard/Admin/ManageUsers";
import AddLoan from "../components/pages/dashboard/Manager/AddLoan";
import UpdateLoan from "../components/pages/dashboard/Manager/UpdateLoan";
import ManageLoans from "../components/pages/dashboard/Manager/ManageLoans";
import PendingLoans from "../components/pages/dashboard/Manager/PendingLoans";
import ApprovedLoans from "../components/pages/dashboard/Manager/ApprovedLoans";
import Profile from "../components/pages/dashboard/User/Profile";
import MyLoans from "../components/pages/dashboard/User/MyLoans";
import Checkout from "../components/pages/Payment/Checkout";
import PageNotFound from "../components/pages/PageNotFound";
import AboutUs from "../layouts/AboutUs/AboutUs";
import Contact from "../layouts/AboutUs/Contact";
import DashboardHome from "../components/pages/dashboard/Shared/DashboardHome";
import AdminAllLoans from "../components/pages/dashboard/Admin/AdminAllLoans";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "loans", element: <AllLoans /> },
      { path: "loan-details/:id", element: <PrivetRoute><LoanDetails /></PrivetRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "loan-form", element: <PrivetRoute><LoanApplication /></PrivetRoute> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <PageNotFound /> }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // Admin routes
      {
        path: "loan-applications",
        element: <RoleBasedRoute allowedRoles={["admin"]}><LoanApplications /></RoleBasedRoute>
      },
      {
        path: "manage-users",
        element: <RoleBasedRoute allowedRoles={["admin"]}><ManageUsers /></RoleBasedRoute>
      },
      {
        path: "admin-loans",
        element: <RoleBasedRoute allowedRoles={["admin"]}><AdminAllLoans /></RoleBasedRoute>
      },

      // Admin + Manager routes
      {
        path: "add-loan",
        element: <RoleBasedRoute allowedRoles={["admin", "manager"]}><AddLoan /></RoleBasedRoute>
      },
      {
        path: "update-loan/:id",
        element: <RoleBasedRoute allowedRoles={["admin", "manager"]}><UpdateLoan /></RoleBasedRoute>
      },
      {
        path: "edit-loan/:id",
        element: <RoleBasedRoute allowedRoles={["admin", "manager"]}><UpdateLoan /></RoleBasedRoute>
      },

      // Manager routes
      {
        path: "manage-loans",
        element: <RoleBasedRoute allowedRoles={["admin", "manager"]}><ManageLoans /></RoleBasedRoute>
      },
      {
        path: "pending-loans",
        element: <RoleBasedRoute allowedRoles={["admin", "manager"]}><PendingLoans /></RoleBasedRoute>
      },
      {
        path: "approved-loans",
        element: <RoleBasedRoute allowedRoles={["admin", "manager"]}><ApprovedLoans /></RoleBasedRoute>
      },

      // Borrower routes
      {
        path: "profile",
        element: <PrivetRoute><Profile /></PrivetRoute>
      },
      {
        path: "my-loans",
        element: <RoleBasedRoute allowedRoles={["borrower", "user"]}><MyLoans /></RoleBasedRoute>
      },
      {
        path: "checkout/:loanId",
        element: <RoleBasedRoute allowedRoles={["borrower", "user"]}><Checkout /></RoleBasedRoute>
      }
    ]
  }
]);
