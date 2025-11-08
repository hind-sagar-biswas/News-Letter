"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const SubscribeButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      const element = document.getElementById("subscribe-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/?scrollTo=subscribe");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("scrollTo") === "subscribe") {
      const element = document.getElementById("subscribe-section");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            window.history.replaceState(null, "", window.location.pathname);
          }, 500);
        }, 100);
      }
    }
  });

  return (
    <button
      className="mt-4 sm:mt-6 h-10 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 py-2 sm:py-3 bg-linear-to-br from-[#292F6E] to-[#B400CF] rounded-2xl border-2 border-[#FFFFFF30] shadow-lg hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-lg font-semibold cursor-pointer"
      onClick={handleClick}
    >
      SUBSCRIBE NOW
    </button>
  );
};

export default SubscribeButton;
