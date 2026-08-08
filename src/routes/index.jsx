import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages/public/Home/Home";
import About from "@/pages/public/About/About";
import Shop from "@/pages/public/Shop/Shop";
import ProductDetails from "@/pages/public/Product/ProductDetails";
import Login from "@/pages/public/Auth/Login";
import Register from "@/pages/public/Auth/Register";
import ForgotPassword from "@/pages/public/Auth/ForgotPassword";
import ResetSuccess from "@/pages/public/Auth/ResetSuccess";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import NotFound from "@/pages/public/NotFound/NotFound";
import Contact from "@/pages/public/Contact/Contact";
import FAQ from "@/pages/public/FAQ/FAQ";
import Help from "@/pages/public/Help/Help";
import Privacy from "@/pages/public/Privacy/Privacy";
import Shipping from "@/pages/public/Shipping/Shipping";
import Terms from "@/pages/public/Terms/Terms";

// Protected pages
import Cart from "@/pages/protected/Cart/Cart";
import Wishlist from "@/pages/protected/Wishlist/Wishlist";
import Profile from "@/pages/protected/Profile/Profile";
import Checkout from "@/pages/protected/Checkout/Checkout";
import OrderSuccess from "@/pages/protected/Checkout/OrderSuccess";
import Orders from "@/pages/protected/Orders/Orders";
import OrderDetails from "@/pages/protected/Orders/OrderDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public Routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "shipping",
        element: <Shipping />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      // Protected Routes
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/success",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      // 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  // Auth Routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-success",
        element: <ResetSuccess />,
      },
    ],
  },
]);
