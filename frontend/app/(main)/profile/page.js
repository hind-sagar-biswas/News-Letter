"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/profileRoute/ProfileCard";
import ButtonGroup from "@/components/profileRoute/ButtonGroup";
import ReviewForm from "@/components/profileRoute/ReviewForm";
import api from "@/lib/client-axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveSubscription } from "@/redux/slices/subscriptionSlice";
import { openModal } from "@/redux/slices/modalSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.subscriptionData);
  const {user:profileData} = useSelector((state) => state.authData);
  const router = useRouter();

  const MAX_SKILLS = 20;

  let skills = Array.isArray(profileData?.skills) ? profileData.skills : [];
  const hasSkills = skills.length > 0;

  let col1 = [],
    col2 = [];

    if(hasSkills){
    const half = Math.ceil(Math.min(skills.length, MAX_SKILLS) / 2);
    col1 = skills.slice(0, half);
    col2 = skills.slice(half, MAX_SKILLS);
      }

  useEffect(() => {
    dispatch(fetchActiveSubscription());
  }, [dispatch]);


  if (!profileData) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen text-white p-4 md:p-10">
      <h1 className="text-center text-3xl font-dmSans md:text-4xl font-bold mb-8">
        YOUR PROFILE
      </h1>

      <ProfileCard profileData={profileData} subscriptionData={data} />
      <ButtonGroup />

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <ReviewForm subscriptionData={data} />

        <div className="border-2 border-white/30 p-6 rounded-xl bg-cover bg-center relative overflow-hidden">
          <button
            onClick={() =>
              dispatch(openModal({ modalName: "updateSkills", data: skills }))
            }
            className="absolute top-2 right-2 bg-white/10 text-white border border-white/30 px-3 py-1 rounded hover:bg-white/20 transition cursor-pointer"
          >
            Edit
          </button>
          <h2 className="text-2xl font-bold text-red-400 mb-4">YOUR SKILLS</h2>
          {hasSkills ? (
            <div className="grid grid-cols-2 gap-4 text-sm text-white">
              <ul className="space-y-1">
                {col1.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <ul className="space-y-1">
                {col2.map((skill, index) => (
                  <li key={index + col1.length}>{skill}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-white/70 italic">
              No skills added. Click the &quot;Edit&quot; button to add your skills.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
