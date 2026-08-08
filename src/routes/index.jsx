// Public pages
import FAQ from "@/pages/public/FAQ/FAQ";
import Home from "@/pages/public/Home/Home";
import Shop from "@/pages/public/Shop/Shop";
import Help from "@/pages/public/Help/Help";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/public/Auth/Login";
import Terms from "@/pages/public/Terms/Terms";
import About from "@/pages/public/About/About";
import Register from "@/pages/public/Auth/Register";
import Contact from "@/pages/public/Contact/Contact";
import Privacy from "@/pages/public/Privacy/Privacy";
import { createBrowserRouter } from "react-router-dom";
import Shipping from "@/pages/public/Shipping/Shipping";
import NotFound from "@/pages/public/NotFound/NotFound";
import ResetSuccess from "@/pages/public/Auth/ResetSuccess";
import ForgotPassword from "@/pages/public/Auth/ForgotPassword";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import ProductDetails from "@/pages/public/Product/ProductDetails";

// Protected pages
import Cart from "@/pages/protected/Cart/Cart";
import Orders from "@/pages/protected/Orders/Orders";
import Profile from "@/pages/protected/Profile/Profile";
import Wishlist from "@/pages/protected/Wishlist/Wishlist";
import Checkout from "@/pages/protected/Checkout/Checkout";
import OrderDetails from "@/pages/protected/Orders/OrderDetails";
import OrderSuccess from "@/pages/protected/Checkout/OrderSuccess";

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
