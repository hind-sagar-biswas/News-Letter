"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiUserSettingsFill, RiUserStarFill } from "react-icons/ri";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

const UserList = ({ children }) => {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path);

  return (
    <div>
      {/* Tabs */}
      <div className="w-full flex items-center bg-amber-100 rounded-t-xl overflow-hidden lg:text-2xl">
        <Link
          href="/admin/users/all"
          className={`px-6 py-3 font-medium transition flex-1 flex gap-2 ${
            isActive("/admin/users/all")
              ? "bg-amber-300 text-white"
              : "text-gray-800 hover:bg-yellow-200"
          }`}
        >
          <RiUserSettingsFill />
          All User
        </Link>

        <Link
          href="/admin/users/subscriber"
          className={`px-6 py-3 font-medium transition flex-1 flex gap-2 ${
            isActive("/admin/users/subscriber")
              ? "bg-amber-300 text-white"
              : "text-gray-800 hover:bg-yellow-200"
          }`}
        >
          <RiUserStarFill />
          All Subscriber
        </Link>
        <Link
          href="/admin/users/active"
          className={`px-6 py-3 font-medium transition flex-1 flex gap-2 ${
            isActive("/admin/users/active")
              ? "bg-amber-300 text-white"
              : "text-gray-800 hover:bg-yellow-200"
          }`}
        >
          <FaUserCheck />
          Active
        </Link>
        {/* <Link
          href="/admin/users/expired"
          className={`px-6 py-3 font-medium transition flex-1 flex gap-2 ${
            isActive("/admin/users/expired")
              ? "bg-amber-300 text-white"
              : "text-gray-800 hover:bg-yellow-200"
          }`}
        >
          <FaUserTimes />
          Expires
        </Link> */}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserList;
