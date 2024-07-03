import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Homepages from "./pages/home";
import LoginPopup from "./pages/login";
import RegisterPopup from "./pages/register";
import ForgetPassword from "./pages/forgetpassword";
import ResetPassword from "./pages/resetpassword";
// import EmailTemplate from "./pages/emailtemplate";
import Dashboard from "./pages/admin/dashboard";
import Category from "./pages/admin/category";
import Jewelry from "./pages/jewelry";
import OrderReview from "./pages/test/Order-Review";
import LayoutTest from "./components/compo-test/layout-test";
import FillInfo from "./pages/test/Infomation-Shipment";
import Account from "./pages/admin/account";
import JewelryManegement from "./pages/admin/jewelrymanagerment";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/features/counterSlice";
import { toast } from "react-toastify";
import { child } from "firebase/database";

import Layout from "./components/layout";
import AboutUs from "./pages/aboutus";
import ItemDetails from "./pages/itemdetails";
import HomePage from "./pages/home";
import UpcomingAuction from "./pages/UpcomingAuctions";
import AuctioResults from "./pages/AuctionResults";
import SellPagse from "./pages/sell";
import StaffPage from "./pages/staff/Dashboard";
import Manager from "./pages/manager/Dashboard";
import RequestSellInStaff from "./pages/staff/Jewelry_process_staff";
import ManagerAuction from "./pages/manager/auction";
import Policy from "./pages/policy";
// import OrderManagement from "./pages/test/test-chuc-nang";
import RequestAuctionManager from "./pages/manager/request_auction";
import Article from "./pages/article";
import AuctionManager from "./pages/manager/auction";
import Auction from "./pages/aution/Auction";

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
      path: "/detail",
      element: <ItemDetails />,
    },
    {
      path: "/jewelry",
      element: <Jewelry />,
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
      path: "/upcoming-auctions",
      element: <UpcomingAuction />,
    },
    {
      path: "auction-results",
      element: <AuctioResults />,
    },
    {
      path: "sell",
      element: <SellPagse />,
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
    // {
    //   path: "/test-chuc-nang",
    //   element: <OrderManagement />,
    // },

    {
      path: "/auction",
      element: <Auction />,
    },
    
  ]);

  //  useRealtime((data) => {
  //    console.log(data);
  //  });
  return <RouterProvider router={router} />;
}

export default App;
