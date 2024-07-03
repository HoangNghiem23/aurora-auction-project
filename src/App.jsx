import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { toast } from "react-toastify";
import HomePage from "./pages/home";
import LoginPopup from "./pages/login";
import RegisterPopup from "./pages/register";
import ForgetPassword from "./pages/forgetpassword";
import ResetPassword from "./pages/resetpassword";
import EmailTemplate from "./pages/emailtemplate";
import Dashboard from "./pages/admin/dashboard";
import Category from "./pages/admin/category";
import Jewelry from "./pages/jewelry";
import ManagermentDashboard from "./pages/manager/Dashboard";

import OrderReview from "./pages/test/Order-Review";
import LayoutTest from "./components/compo-test/layout-test";
import FillInfo from "./pages/test/Infomation-Shipment";
import Account from "./pages/admin/account";
import JewelryManegement from "./pages/admin/jewelrymanagerment";
import AboutUs from "./pages/aboutus";
import Policy from "./pages/policy";
import ItemDetails from "./pages/itemdetails";
import Article from "./pages/article";
import Manager from "./pages/manager/Dashboard";
import AuctionManager from "./pages/manager/auction";
import Auction from "./pages/aution/Auction";

function App() {
  const PrivateRoute = ({ children, role }) => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    if (user.roleEnum !== role) {
      toast.error("Unauthorized access");
      return <Navigate to="/" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPopup />,
    },
    {
      path: "/register",
      element: <RegisterPopup />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/itemdetails",
      element: <ItemDetails />,
    },
    {
      path: "/jewelry",
      element: <Jewelry />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/policy",
      element: <Policy />,
    },
    {
      path: "/article",
      element: <Article />,
    },
    {
      path: "/admin",
      children: [
        {
          path: "/admin/dashboard",
          element: (
            <PrivateRoute role={"ADMIN"}>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/admin/dashboard/category",
              element: <Category />,
            },
            {
              path: "/admin/dashboard/account",
              element: <Account />,
            },
            {
              path: "/admin/dashboard/jewelry",
              element: <JewelryManegement />,
            },
          ],
        },
      ],
    },
    {
      path: "/manager",
      children: [
        {
          path: "/manager",
          element: (
            <PrivateRoute role={"MANAGER"}>
              <Manager />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/manager/auction",
              element: <AuctionManager />,
            },
          ],
        },
      ],
    },
    {
      path: "/staff",
      children: [
        {
          path: "/staff",
          element: (
            <PrivateRoute role={"STAFF"}>
              <ManagermentDashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/test",
      element: <LayoutTest />,
      children: [
        {
          path: "/test/order-review",
          element: <OrderReview />,
        },
        {
          path: "/test/fillinfo",
          element: <FillInfo />,
        },
      ],
    },
    {
      path: "/auction",
      element: <Auction />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
