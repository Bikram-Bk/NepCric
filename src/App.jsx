import { router } from "@/routes";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartProvider";
import { WishlistProvider } from "@/context/WishlistProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#4ade80",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
