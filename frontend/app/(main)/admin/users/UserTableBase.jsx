// components/UserTableBase.jsx
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
import ActiveSubscriberNav from "./active/ActiveSubscriberNav";
import UserAccordion from "./UserAccordion";
import UserTable from "./UserTable";

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
  const [expandedUserId, setExpandedUserId] = useState(null);

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

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

      <UserTable
        users={users}
        copiedEmail={copiedEmail}
        handleCopy={handleCopy}
        showPackage={showPackage}
      />

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
