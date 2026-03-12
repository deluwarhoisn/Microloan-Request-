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
      { path: "loan-form", element: <LoanApplication /> },
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
      {
        path: "add-loan",
        element: <RoleBasedRoute allowedRoles={["admin"]}><AddLoan /></RoleBasedRoute>
      },
      {
        path: "update-loan/:id",
        element: <RoleBasedRoute allowedRoles={["user"]}><UpdateLoan /></RoleBasedRoute>
      },
      {
        path: "edit-loan/:id",
        element: <RoleBasedRoute allowedRoles={["user"]}><UpdateLoan /></RoleBasedRoute>
      },
      {
        path: "profile",
        element: <RoleBasedRoute allowedRoles={["user"]}><Profile /></RoleBasedRoute>
      },
      {
        path: "my-loans",
        element: <RoleBasedRoute allowedRoles={["user"]}><MyLoans /></RoleBasedRoute>
      },
      {
        path: "checkout/:loanId",
        element: <RoleBasedRoute allowedRoles={["user"]}><Checkout /></RoleBasedRoute>
      }
    ]
  }
]);
