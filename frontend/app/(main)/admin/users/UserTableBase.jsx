// components/UserTableBase.jsx
"use client";
import React from "react";
import { FaCheckCircle, FaTimesCircle, FaCopy } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import ActiveSubscriberNav from "./active/ActiveSubscriberNav";

const UserTableBase = ({
  users,
  page,
  setPage,
  heading,
  copiedEmail,
  handleCopyAll,
  handleCopy,
  showPackage,
  showActiveSubscriberPage,
}) => {
  const dispatch = useDispatch();

  // const handleAddToBrevo = async (user) => {
  //   try {
  //     await dispatch(addUserToBrevo(user)).unwrap();
  //     toast.success("User added to Brevo successfully.");

  //     if (pathname === "/admin/users/active") {
  //       dispatch(getActiveSubscribers(page));
  //     } else if (pathname === "/admin/users/expired") {
  //       dispatch(getExpiredSubscribers(page));
  //     }
  //   } catch (err) {
  //     toast.error(err?.message || "Failed to add user.");
  //   }
  // };

  // const handleRemoveFromBrevo = async (user) => {
  //   try {
  //     await dispatch(removeUserFromBrevo(user)).unwrap();
  //     toast.success("User removed from Brevo successfully.");

  //     if (pathname === "/admin/users/active") {
  //       dispatch(getActiveSubscribers(page));
  //     } else if (pathname === "/admin/users/expired") {
  //       dispatch(getExpiredSubscribers(page));
  //     }
  //   } catch (err) {
  //     toast.error(err?.message || "Failed to remove user.");
  //   }
  // };

  return (
    <div className="overflow-x-auto bg-gray-950 rounded-b-2xl text-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6 flex-wrap lg:flex-nowrap gap-2 overflow-x-auto">
        <h2 className="text-sm lg:text-2xl font-bold text-red-400 whitespace-nowrap">
          {heading}
        </h2>

        {showActiveSubscriberPage && <ActiveSubscriberNav />}

        {copiedEmail === "all" && (
          <span className="text-green-400 text-sm font-semibold whitespace-nowrap">
            Copied!
          </span>
        )}

        <button
          onClick={handleCopyAll}
          className="text-sm bg-emerald-400 hover:bg-gray-700 ml-1 lg:px-4 py-2 rounded-lg border border-white/10 cursor-pointer whitespace-nowrap px-2"
        >
          Copy All Emails
        </button>
      </div>

      <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
        <thead className="bg-gray-900 text-left text-white">
          <tr>
            <th className="p-4 border-b border-white/10">#</th>
            <th className="p-4 border-b border-white/10">Image</th>
            <th className="p-4 border-b border-white/10">Full Name</th>
            <th className="p-4 border-b border-white/10 relative">Email</th>
            <th className="p-4 border-b border-white/10">Is Admin</th>
            {showPackage && (
              <th className="p-4 border-b border-white/10">Package</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user, index) => (
              <tr key={user?._id} className="hover:bg-gray-800 transition-all">
                {/* Table cells (same as before) */}
                <td className="p-4 border-b border-white/10">{index + 1}</td>
                <td className="p-4 border-b border-white/10">
                  <img
                    src={user?.img || "/images/userprofile.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                </td>
                <td className="p-4 border-b border-white/10">
                  {user?.fullName}
                </td>
                <td className="relative p-4 border-b border-white/10 flex items-center justify-between gap-2">
                  <span className="truncate max-w-[180px] p-4">
                    {user?.email}
                  </span>
                  <button
                    onClick={() => handleCopy(user?.email)}
                    className="text-gray-400 hover:text-white cursor-pointer pr-8 lg:pr-12"
                  >
                    <FaCopy />
                  </button>
                  {copiedEmail === user?.email && (
                    <span className="absolute right-0 text-green-400 text-sm ml-1">
                      Copied!
                    </span>
                  )}
                </td>
                <td className="p-4 border-b border-white/10">
                  {user?.isAdmin ? (
                    <FaCheckCircle
                      className="text-green-400 text-lg cursor-pointer"
                      onClick={() =>
                        dispatch(
                          openModal({
                            modalName: "giveAdminAccess",
                            data: user,
                          })
                        )
                      }
                    />
                  ) : (
                    <FaTimesCircle
                      className="text-red-500 text-lg cursor-pointer"
                      onClick={() =>
                        dispatch(
                          openModal({
                            modalName: "giveAdminAccess",
                            data: user,
                          })
                        )
                      }
                    />
                  )}
                </td>
                {showPackage && (
                  <td className="p-4 border-b border-white/10">
                    {user?.planTitle}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <td
              colSpan={6 + (showPackage ? 1 : 0)}
              className="text-center p-6 text-gray-400"
            >
              No users found.
            </td>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-sm text-gray-400 lg:text-xl font-bold">
          Page {page}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTableBase;
