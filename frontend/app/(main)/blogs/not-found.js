import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";

export default function NotFound() {
  return (
    <main role="main" className="min-h-[95vh] flex flex-col items-center justify-center text-center px-4">
      <MdErrorOutline className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-red-500 mb-2">
        Blog Post Not Found
      </h1>
      <p className="text-gray-300 text-lg mb-6 max-w-md">
        The blog post you&apos;re looking for doesn&apos;t exist, may have been removed, or the URL might be incorrect.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/blogs"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
        >
          Browse All Blogs
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
