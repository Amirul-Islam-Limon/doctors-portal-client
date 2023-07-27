import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import SignUp from "../../pages/SignUp/SignUp";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "../../layouts/DashboardLayout";
import MyAppointment from "../../pages/Dashboard/MyAppointment/MyAppointment";
import AllUser from "../../pages/Dashboard/AllUser/AllUser";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../pages/Dashboard/Payment/Payment";
import ErrorPage from "../../pages/shared/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element:<Home></Home>
            },
            {
                path: "/login",
                element:<Login></Login>
            },
            {
                path: "/signup",
                element:<SignUp></SignUp>
            },
            {
                path: "/forgotPassword",
                element:<ForgotPassword></ForgotPassword>
            },
            {
                path: "/appointment",
                element:<Appointment></Appointment>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: "/dashboard",
                element:<MyAppointment></MyAppointment>
            },
            {
                path: "/dashboard/allUsers",
                element:<AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: "/dashboard/addDoctor",
                element:<AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: "/dashboard/manageDoctors",
                element:<AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: "/dashboard/payment/:id",
                element: <AdminRoute><Payment></Payment></AdminRoute>,
                loader: (params) => {
                    return fetch(`https://doctors-portal-server-kappa-bice.vercel.app/bookings/${params.params.id}`)
                }
            },
        ]
    }
])

export default router;