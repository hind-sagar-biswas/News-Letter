"use client";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCopy,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import UserAccordion from "./UserAccordion";

const UserTable = ({ users, copiedEmail, handleCopy, showPackage }) => {
  const dispatch = useDispatch();
  const [expandedUserId, setExpandedUserId] = useState(null);

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
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
          <th className="p-4 border-b border-white/10">Expand</th>
        </tr>
      </thead>
      <tbody>
        {users?.length > 0 ? (
          users.map((user, index) => (
            <React.Fragment key={user?._id}>
              <tr className="hover:bg-gray-800 transition-all">
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
                <td className="p-4 border-b border-white/10 text-center">
                  <button onClick={() => toggleExpand(user._id)}>
                    {expandedUserId === user._id ? (
                      <FaChevronUp className="cursor-pointer" />
                    ) : (
                      <FaChevronDown className="cursor-pointer" />
                    )}
                  </button>
                </td>
              </tr>

              {/* Accordion row */}
              {expandedUserId === user._id && (
                <tr className="bg-gray-800">
                  <td colSpan={7 + (showPackage ? 1 : 0)} className="p-0">
                    <UserAccordion userId={user._id} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td
              colSpan={7 + (showPackage ? 1 : 0)}
              className="text-center p-6 text-gray-400"
            >
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
