import { createBrowserRouter } from "react-router";
import Home from "../components/pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AllLoans from "../components/pages/Loans/AllLoans";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";

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
                path: "/all-loans",
                Component: AllLoans
            },

 {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            }

        ]
    },
   
]);