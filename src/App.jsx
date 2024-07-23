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
//auction
import UpcomingAuction from "./pages/UpcomingAuctions";
import AuctioResults from "./pages/AuctionResults";
//...
import { toast } from "react-toastify";
import ItemDetails from "./pages/itemdetails";

//about
import Policy from "./pages/policy";
import Article from "./pages/article";
//profile
import Profile from "./pages/profile/Profile";
import AuctionsProfilePage from "./pages/profile/Auctions";
import BidsProfilePage from "./pages/profile/Bids";
//

import AboutUs from "./pages/aboutus";
import Auction from "./pages/aution/Auction";
import useRealtime from "./assets/hook/useRealtime";

import Historytransition from "./pages/history_transition";
import Buyandsell from "./Howtobill-buy";
import Supporttobid from "./Howtobill-buy/support";
import Error404 from "./pages/error404/Error404";
import SaleComparision from "./components/chart";
// import useRealtime from "./assets/hook/useRealtime";
import JewelryInAuctionList from "./pages/admin/jewelryinauction";
import HowToBid from "./Howtobill-buy/how-to-bid";
import Auctionclose from "./pages/manager/auction-close";
import Historyauction from "./pages/manager/history";
import SalePage from "./Howtobill-buy/sale";
import SellingPage from "./Howtobill-buy/selling";

import Glossary from "./pages/glossary";
import Contact from "./pages/contact";


import SellPage from "./pages/sell";



function App() {
  const PrivateRoute = ({ children, role }) => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    if (user?.roleEnum !== role) {
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
          element: <Supporttobid />,
        },
        {
          path: "/buy-sell",
          element: <Buyandsell />,
        },
        {
          path: "/selling",
          element: <SellingPage />,
        },
        {
          path: "/how-to-bid",
          element: <HowToBid />,
        },
        {
          path: "/how-to-sale",
          element: <SalePage />,
        },
        {
          path: "/wallet",
          element: <Historytransition />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/glossary",
          element: <Glossary />,
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
          path: "/auction-results",
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
          path: "fillinfo",
          element: <FillInfo />,
        },
        {
          path: "/sell",
          element: <SellPage />,
        },
        {
          path: "/my-account",
          children: [
            {
              path: "/my-account/profile",
              element: <Profile />,
            },
            {
              path: "/my-account/auctions",
              element: <AuctionsProfilePage />,
            },
            {
              path: "/my-account/bids",
              element: <BidsProfilePage />,
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <Error404 />,
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
          path: "/admin",
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
            {
              path: "/admin/dashboard/chart",
              element: <SaleComparision />,
            },
            {
              path: "/admin/dashboard/jewelryauction",
              element: <JewelryInAuctionList />,
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
            {
              path: "/manager/auction-close",
              element: <Auctionclose />,
            },
            {
              path: "/manager/history-auction",
              element: <Historyauction />,
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
