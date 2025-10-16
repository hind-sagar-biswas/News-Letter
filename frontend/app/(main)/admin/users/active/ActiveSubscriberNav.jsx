"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveSubscriberNav = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 sm:gap-4 items-center px-2 lg:mx-6 py-2 bg-emerald-500 rounded-xl shadow-md min-w-max sm:min-w-0">
        {[
          { href: "/admin/users/active", label: "All" },
          { href: "/admin/users/active/scholar-track", label: "ScholarTrack." },
          { href: "/admin/users/active/career-catch", label: "CareerCatch." },
          { href: "/admin/users/active/all-access", label: "OpT. All-Access" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap px-3 py-1 rounded-lg font-semibold text-sm sm:text-base transition-colors ${
              isActive(link.href)
                ? "bg-fuchsia-600 text-black"
                : "text-white hover:bg-amber-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActiveSubscriberNav;
