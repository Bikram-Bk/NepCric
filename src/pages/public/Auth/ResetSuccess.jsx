import { Link } from "react-router-dom";

const ResetSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900">
          Password Reset Successful
        </h2>
        <p className="text-gray-600">
          Your password has been reset successfully. You can now log in with
          your new password.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetSuccess;
