import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
//Authentication
import LoginPopup from "./pages/login";
import RegisterPopup from "./pages/register";
import ForgetPassword from "./pages/forgetpassword";
import ResetPassword from "./pages/resetpassword";

// import EmailTemplate from "./pages/emailtemplate";
import Layout from "./components/layout";
import HomePage from "./pages/home";

//Admin
import Dashboard from "./pages/admin/dashboard";
import Category from "./pages/admin/category";
import Account from "./pages/admin/account";
import JewelryManegement from "./pages/admin/jewelrymanagerment";

import Jewelry from "./pages/jewelry";
import OrderReview from "./pages/test/Order-Review";
import FillInfo from "./pages/test/Infomation-Shipment";
//Redux
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
//Manager
import Manager from "./pages/manager/Dashboard";
import RequestAuctionManager from "./pages/manager/request_auction";
import AuctionManager from "./pages/manager/auction";
//Staff
import StaffPage from "./pages/staff/Dashboard";
import RequestSellInStaff from "./pages/staff/Jewelry_process_staff";
//Sell
import SellPagse from "./pages/sell";
//auction
import UpcomingAuction from "./pages/UpcomingAuctions";
import AuctioResults from "./pages/AuctionResults";
//...
import { toast } from "react-toastify";
import ItemDetails from "./pages/itemdetails";

//about
import Policy from "./pages/policy";
import Article from "./pages/article";

import AboutUs from "./pages/aboutus";
import Auction from "./pages/aution/Auction";
import useRealtime from "./assets/hook/useRealtime";
import Historytransition from "./pages/history_transition";
import Buyandsell from "./Howtobill-buy";
import Supporttobid from "./Howtobill-buy/support";
// import useRealtime from "./assets/hook/useRealtime";

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
      element: <Layout />,
      children: [
       
        {
          path: "/supporttobid",
          element: < Supporttobid />,
        },
        {
          path: "/buy-sell",
          element: <Buyandsell />,
        },
        {
          path: "/wallet",
          element: <Historytransition />,
        },
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/detail",
          element: <ItemDetails />,
        },
        {
          path: "/jewelry",
          element: <Jewelry />,
        },

        {
          path: "/upcoming-auctions",
          element: <UpcomingAuction />,
        },
        {
          path: "auction-results",
          element: <AuctioResults />,
        },

        {
          path: "aboutus",
          element: <AboutUs />,
        },
        {
          path: "policy",
          element: <Policy />,
        },
        {
          path: "article",
          element: <Article />,
        },
        {
          path: "/order-review",
          element: <OrderReview />,
        },
        {
          path: "/fillinfo",
          element: <FillInfo />,
        },
      ],
    },
    {
      path: "sell",
      element: <SellPagse />,
    },
    {
      path: "/auction/:id",
      element: <Auction />,
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
            {
              path: "/manager/request-auction",
              element: <RequestAuctionManager />,
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
              <StaffPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: "/staff/request",
              element: <RequestSellInStaff />,
            },
          ],
        },
      ],
    },
    {
      path: "/auction",
      element: <Auction />,
    },
    // {
    //   path: "/test-chuc-nang",
    //   element: <OrderManagement />,
    // },
  ]);

  useRealtime((data) => {
    console.log(data);
  });

  return <RouterProvider router={router} />;
}

export default App;
