"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/client-axios";
import { Copy } from "lucide-react"; // icon

const UserAccordion = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/user/user-all-data/${userId}`);
        setUserDetails(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading)
    return <p className="text-gray-400 p-4 animate-pulse">Loading user data...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  // Handle copy
  const handleCopy = () => {
    if (!userDetails) return;

    const dataText = Object.entries(userDetails)
      .map(([key, value]) => {
        if (Array.isArray(value)) value = value.join(", ");
        else if (typeof value === "boolean") value = value ? "Yes" : "No";
        else if (value === null || value === undefined) value = "-";
        return `${key}: ${value}`;
      })
      .join("\n");

    navigator.clipboard.writeText(dataText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative p-6 text-gray-300 bg-gray-900/50 rounded-b-xl border-t border-white/10">
      <h3 className="text-lg font-semibold text-fuchsia-400 mb-4">
        User Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
        <UserField label="Full Name" value={userDetails?.fullName} />
        <UserField label="Email" value={userDetails?.email} />
        <UserField label="Profession" value={userDetails?.profession} />
        <UserField label="Occupation" value={userDetails?.occupation} />
        <UserField label="Institute" value={userDetails?.institute} />
        <UserField label="Field of Study" value={userDetails?.fieldOfStudy} />
        <UserField label="Interests" value={userDetails?.interests} />
        <UserField
          label="Prior Research Experience"
          value={
            userDetails?.priorResearchExperience === true
              ? "Yes"
              : userDetails?.priorResearchExperience === false
              ? "No"
              : "-"
          }
        />
        <UserField
          label="English Proficiency"
          value={
            userDetails?.englishProficiency === true
              ? "Yes"
              : userDetails?.englishProficiency === false
              ? "No"
              : "-"
          }
        />
        <UserField label="Preferred Degree" value={userDetails?.preferredDegree} />
        <UserField
          label="Country Preference"
          value={userDetails?.countrypreference}
        />
        <UserField
          label="Internship / Job Preferences"
          value={userDetails?.internshipJobPreferences}
        />
        <UserField
          label="Preferred Fields of Opportunity"
          value={userDetails?.preferredFieldsofOpportunity}
        />
        <UserField
          label="Skills"
          value={
            userDetails?.skills?.length ? userDetails.skills.join(", ") : "-"
          }
        />
        <UserField
          label="Verified"
          value={userDetails?.isVerified ? "Yes" : "No"}
        />
        <UserField label="Admin" value={userDetails?.isAdmin ? "Yes" : "No"} />
        <UserField
          label="Created At"
          value={new Date(userDetails?.createdAt).toLocaleString()}
        />
        <UserField
          label="Updated At"
          value={new Date(userDetails?.updatedAt).toLocaleString()}
        />
      </div>

      {/* Copy button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy All Data"}
        </button>
      </div>
    </div>
  );
};

// Reusable field component
const UserField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="font-medium text-white wrap-break-word">{value || "-"}</span>
  </div>
);

export default UserAccordion;
