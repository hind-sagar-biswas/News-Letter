export default function AdminHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e2761] to-[#131c45] text-white p-6">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
          Welcome to the <span className="text-amber-400">Admin Dashboard</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Manage your platform content efficiently — from blogs to user reviews — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/admin/users/active"
            className="bg-amber-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition"
          >
            Manage Users
          </a>
          <a
            href="/admin/reviews"
            className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Manage Reviews
          </a>
        </div>
      </div>
    </div>
  );
}
