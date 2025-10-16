"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScholarTrackSubscribers } from "@/redux/slices/usersSlice";
import UserTableBase from "../../UserTableBase";

const ScholarTackSubscribersTable = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const { users, loading, error } = useSelector((state) => state.usersData);

  useEffect(() => {
    dispatch(fetchScholarTrackSubscribers(page));
  }, [dispatch, page]);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyAll = () => {
    const allEmails = users.map((u) => u.email).join(", ");
    navigator.clipboard.writeText(allEmails);
    setCopiedEmail("all");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (loading || !users) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500 text-3xl mt-5 mx-8"> {error}</p>;

  return (
    <UserTableBase
      users={users}
      page={page}
      setPage={setPage}
      heading="Active Subscribers"
      copiedEmail={copiedEmail}
      setCopiedEmail={setCopiedEmail}
      handleCopy={handleCopy}
      handleCopyAll={handleCopyAll}
      showPackage={true}
      showActiveSubscriberPage={true}
    />
  );
};

export default ScholarTackSubscribersTable;
