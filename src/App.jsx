import React from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUser } from './redux/features/counterSlice';
import { child } from 'firebase/database';

// Pages
import HomePage from './pages/home';
import LoginPopup from './pages/login';
import RegisterPopup from './pages/register';
import ForgetPassword from './pages/forgetpassword';
import ResetPassword from './pages/resetpassword';
import EmailTemplate from './pages/emailtemplate';
import Dashboard from './pages/admin/dashboard';
import Category from './pages/admin/category';
import Jewelry from './pages/jewelry';
import ManagermentDashboard from './pages/manager/Dashboard';
import ManagerJewelry from './pages/manager/Jewelry';
import OrderReview from './pages/test/Order-Review';
import FillInfo from './pages/test/Infomation-Shipment';
import Account from './pages/admin/account';
import JewelryManegement from './pages/admin/jewelrymanagerment';
import AboutUs from './pages/aboutus';
import Policy from './pages/policy';
import ItemDetails from './pages/itemdetails';
import Article from './pages/article';

// Components
import Layout from './components/layout';
import LayoutTest from './components/compo-test/layout-test';

// Jewelry Categories
import Necklaces from './pages/5itemjewelry/necklaces';
import Rings from './pages/5itemjewelry/rings';
import Earrings from './pages/5itemjewelry/earrings';
import Bracelets from './pages/5itemjewelry/bracelets';
import Charms from './pages/5itemjewelry/charms';
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
              <ManagermentDashboard />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/manager/dashboard/jewelry",
              element: <ManagerJewelry />,
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
      path: "/necklaces",
      element: <Necklaces />,
    },
    {
      path: "/rings",
      element: <Rings />,
    },
    {
      path: "/earrings",
      element: <Earrings />,
    },
    {
      path: "/bracelets",
      element: <Bracelets />,
    },
    {
      path: "/charms",
      element: <Charms />,
    },

    {
      path: "/testt",
      element: <Layout />,
      children: [
        {
          path: "aboutus",
          element: <AboutUs />,
        },
        {
          path: "articte",
          element: <Article />,
        },
      ],
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
