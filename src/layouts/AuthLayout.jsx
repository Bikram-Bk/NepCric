import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <main className="flex items-center justify-center min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
