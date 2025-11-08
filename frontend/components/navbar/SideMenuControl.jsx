"use client";
import { AlignJustify } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideMenu from "./SideMenu";
import Image from "next/image";
import ModalManager from "../modal/ModalManager";
import { openModal } from "@/redux/slices/modalSlice";
import UserOption from "./UserOption";
import { usePathname, useRouter } from "next/navigation";

const SideMenuControl = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userOptionOpen, setUserOptionOpen] = useState(false);
  const user = useSelector((state) => state.authData.user);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex gap-5 relative">
        {/* Subscribe Button */}

        {mounted && !user && (
          <div className="flex gap-4">
            {/* Login and Register with distinct style */}
            <button
              onClick={() => dispatch(openModal({ modalName: "login" }))}
              className="border border-pink-500 text-pink-600 text-sm md:text-base px-3 md:px-4 py-1 rounded-md hover:bg-pink-50 hover:shadow-[0_0_15px_#ec4899] transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => dispatch(openModal({ modalName: "signup" }))}
              className="bg-pink-600 text-white text-sm md:text-base px-3 md:px-4 py-1 rounded-md hover:bg-pink-700 hover:shadow-[0_0_15px_#ec4899] transition-all duration-300 cursor-pointer"
            >
              Register
            </button>
          </div>
        )}

        {mounted && !user?.isSubscribed && (
          <button
            onClick={handleClick}
            className="h-10 bg-linear-to-b from-[#292F6E] to-[#B400CF] rounded-2xl px-2 py-1.5 border border-[#F6E8E8] shadow-[0px_4px_43.7px_-1px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] hover:scale-105 transition-all duration-300 font-roboto font-semibold cursor-pointer"
          >
            SUBSCRIBE
          </button>
        )}

        {/* User Image Icon (only if logged in) */}
        {user?.img && mounted && (
          <div className="relative w-8 h-8 lg:w-10 lg:h-10 mt-1 rounded-full overflow-hidden cursor-pointer">
            <Image
              src={user?.img || "/images/userprofile.png"}
              alt="User Profile"
              fill
              sizes="32px"
              style={{ objectFit: "cover" }}
              priority={true}
              onClick={() => setUserOptionOpen(true)}
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        <AlignJustify
          className="md:hidden mt-2 shadow-2xl"
          onClick={() => setIsMenuOpen(true)}
        />

        {/* Mobile Side Menu */}
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {userOptionOpen && <UserOption setUserOptionOpen={setUserOptionOpen} />}
      </div>
      <ModalManager />
    </>
  );
};

export default SideMenuControl;
