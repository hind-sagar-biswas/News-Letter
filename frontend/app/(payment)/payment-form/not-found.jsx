import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800 px-4">
      {/* 404 Text */}
      <h1 className="text-[100px] sm:text-[140px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600 drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action Button */}
      <Link
        href="/"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}
