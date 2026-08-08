import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90"
        style={{
          backgroundColor: "#C4954A",
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
          letterSpacing: "0.06em",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
