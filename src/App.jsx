import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepages from "./pages/home";
import LoginPopup from "./pages/login";
import RegisterPopup from "./pages/register";
import ForgetPassword from "./pages/forgetpassword";
import ResetPassword from "./pages/resetpassword";
import EmailTemplate from "./pages/emailtemplate";
import Dashboard from "./pages/admin/dashboard";
import Category from "./pages/admin/category";

import Layout from "./components/layout";
import AboutUs from "./pages/aboutus";
import Article from "./pages/articte";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepages />,
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
      path: "/reset-password/:token", // Chú ý URL này
      element: <ResetPassword />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard/category",
          element: <Category />,
        },
      ],
    },
    {
      path: "/email-template",
      element: <EmailTemplate />,
    },
   
    {
      path: "/testt",
      element: <Layout/>,
      children:[
        {
          path: "aboutus",
          element: <AboutUs/>,
        },
        {
          path: "articte",
          element: <Article/>,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
