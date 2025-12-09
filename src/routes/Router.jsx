import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AllLoans from "../components/pages/Loans/AllLoans";
import LoanDetails from "../components/pages/Loans/LoanDetails";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import PrivetRoute from "./PrivetRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import LoanApplication from "../components/pages/dashboard/Admin/LoanForm";
import LoanApplications from "../components/pages/dashboard/Admin/LoanApplications";
import ManageUsers from "../components/pages/dashboard/Admin/ManageUsers";
import AddLoan from "../components/pages/dashboard/Manager/AddLoan";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import AboutUs from "../layouts/AboutUs/AboutUs";
import Contact from "../layouts/AboutUs/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/loans",
        Component: AllLoans,
      },
      {
        path: "/loan-details/:id",
        element: <PrivetRoute><LoanDetails /></PrivetRoute> // <-- Loan Details page
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/loan-form",
        Component: LoanApplication,
      },
      {
     path: "/*",
     Component: LoadingSpinner,
      },
      {
        path: "/about",
        Component: AboutUs
      },
      {
        path:"/contact",
        Component: Contact
      },
      {
        path: "/dashboard/loan-applications",
        element: <PrivetRoute><LoanApplications></LoanApplications></PrivetRoute>
      },
      {
        path: "/dashboard/Manage-Users",
        element: <PrivetRoute><ManageUsers></ManageUsers></PrivetRoute>
      },
      {
        path: "/dashboard/add-Loan",
        element: <PrivetRoute><AddLoan></AddLoan></PrivetRoute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
   
  },
  
]);
