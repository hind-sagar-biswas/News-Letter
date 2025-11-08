import Link from "next/link";
import React from "react";
import { LayoutDashboard, FileText, MessageSquare } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

export default function AdminLayout({ children }) {
  return (
    <div className="relative z-20 min-h-screen flex flex-col lg:flex-row text-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/5 bg-linear-to-b mb-3 lg:mr-3 from-[#1e2761] to-[#131c45] p-6 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">
          <Link
            href="/admin/users/all"
            className="flex items-center gap-3 text-lg hover:text-amber-400 transition"
          >
            <FaUsers size={30} />
            Users
          </Link>
          <Link
            href="/admin/new-blog"
            className="flex items-center gap-3 text-lg hover:text-amber-400 transition"
          >
            <FileText size={20} />
            Create Blogs
          </Link>

          <Link
            href="/admin/blog-list"
            className="flex items-center gap-3 text-lg hover:text-amber-400 transition"
          >
            <LayoutDashboard size={20} />
            Blog List
          </Link>

          <Link
            href="/admin/reviews"
            className="flex items-center gap-3 text-lg hover:text-amber-400 transition"
          >
            <MessageSquare size={20} />
            Manage Reviews
          </Link>
          <Link
            href="/admin/payments"
            className="flex items-center gap-3 text-lg hover:text-amber-400 transition"
          >
            <TbCurrencyTaka size={20} />
            Payments
          </Link>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 rounded-xl shadow-inner overflow-auto">
        {children}
      </main>
    </div>
  );
}
