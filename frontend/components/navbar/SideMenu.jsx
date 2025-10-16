"use client";

import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SideMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user } = useSelector((state) => state.authData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#050A2A]  shadow-xl z-50 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-4 text-2xl text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <RxCross2 />
        </button>

        {/* Menu Items */}
        <ul className="mt-16 p-4 space-y-4 text-white hover:bg-amber-700">
          {user?.isAdmin && (
            <Link href="/admin">
              <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer">
                Admin
              </li>
            </Link>
          )}
          <Link href="/">
            <li className="p-2 hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer">
              Home
            </li>
          </Link>
          <Link href="/review">
            <li className="p-2 md:hidden hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer">
              Review
            </li>
          </Link>
          <Link href="/blogs">
            <li className="p-2 md:hidden hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer">
              Blogs
            </li>
          </Link>
          <Link href="/about">
            <li className="p-2 md:hidden hover:bg-amber-100 hover:text-[#a31212] hover:font-bold cursor-pointer">
              About us
            </li>
          </Link>
        </ul>
      </div>

      {/* Overlay (click outside to close) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideMenu;
