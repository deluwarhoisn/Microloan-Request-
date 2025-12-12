import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivetRoute from "./PrivetRoute";

import Home from "../components/pages/Home/Home";
import AllLoans from "../components/pages/Loans/AllLoans";
import LoanDetails from "../components/pages/Loans/LoanDetails";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Auth/Register";
import LoanApplication from "../components/pages/dashboard/Admin/LoanForm";
import LoanApplications from "../components/pages/dashboard/Admin/LoanApplications";
import ManageUsers from "../components/pages/dashboard/Admin/ManageUsers";
import AddLoan from "../components/pages/dashboard/Manager/AddLoan";
import Profile from "../components/pages/dashboard/User/Profile";
import MyLoans from "../components/pages/dashboard/User/MyLoans";
import PageNotFound from "../components/pages/PageNotFound";
import AboutUs from "../layouts/AboutUs/AboutUs";
import Contact from "../layouts/AboutUs/Contact";

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
      { index: true, element: <div>Dashboard Overview</div> },
      { path: "loan-applications", element: <LoanApplications /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "add-loan", element: <AddLoan /> },
      { path: "profile", element: <Profile /> },
      { path: "my-loans", element: <MyLoans /> },
      {}
    ]
  }
]);
