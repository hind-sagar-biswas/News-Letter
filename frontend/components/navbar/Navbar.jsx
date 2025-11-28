import BlurCircle from "../helper/BlurCircle";
import Image from "next/image";
import SideMenuControl from "./SideMenuControl";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" relative z-20 lg:z-100">
      <BlurCircle
        top="-top-30"
        left="-left-30"
        className="hidden md:block"
      />
      <div className="mt-5 h-16">
        <div className="flex m-auto w-full md:w-[90%] h-7">
          {/* logo */}
          <div className="grow z-10">
            <Link href="/">
              <Image
                src="/images/navLogo.png"
                alt="nav-image"
                height={200}
                width={120}
                className="relative -top-6 md:-top-4 cursor-pointer"
              />
            </Link>
          </div>

          {/* navlink */}
          <div className="flex">
            <div className="mr-12">
              <ul className="hidden md:flex gap-10 pt-1.5 font-roboto">
                <li>
                  <Link href="/" className="hover:text-pink-700 cursor-pointer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/review"
                    className="hover:text-pink-700 cursor-pointer"
                  >
                    Review
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-pink-700 cursor-pointer"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-pink-700 cursor-pointer whitespace-nowrap"
                  >
                    About us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mr-2 md:mr-0">
              <SideMenuControl />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
