import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaRegCopyright,
} from "react-icons/fa6";
import { SlSocialPintarest } from "react-icons/sl";
import SubscribeButton from "./SubscribeButton";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white px-4 sm:px-6 py-10 sm:py-16">
      {/* CTA Section */}
      <section className="max-w-6xl mx-auto text-center mb-8 sm:mb-10">
        <h5 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-[#FF00E5] to-[#FF0022] bg-clip-text text-transparent">
          Ready to Unlock Your Future?
        </h5>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto text-gray-300 mb-6 sm:mb-8">
          At OpT. National, we believe that opportunity should never be out of
          reach. Stay informed. Stay ahead. Take control of your career journey
          with verified, curated opportunities delivered directly to you.
        </p>
        <SubscribeButton />
      </section>

      {/* New Product Section */}
      <section className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-3 mb-5 sm:mb-7">
        <span className="sm:text-xl lg:text-4xl font-sans tracking-wider text-white">A Product Of </span>
        <Image
          src="/images/motherBrand.png" // your logo in /public folder
          alt="Company Logo"
          width={96} // example width in pixels
          height={32} // example height in pixels
          className="object-contain text-fuchsia-800"
        />
      </section>

      {/* Social Section */}
      <section className="pt-6 sm:pt-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center w-full before:content-[''] before:h-[2px] before:bg-linear-to-r before:from-transparent before:via-white/50 before:to-transparent before:w-1/2 before:block before:mx-auto before:mb-4">
            Join Our Community
          </h3>

          <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
            {[
              {
                href: "https://www.facebook.com/share/15dakuSNdY/",
                icon: (
                  <FaFacebookF className="text-white w-6 sm:w-7 md:w-8 lg:w-10 h-6 sm:h-7 md:h-8 lg:h-10" />
                ),
                bg: "bg-[#1877F2]",
                shadow: "hover:shadow-[#1877F2]/40",
              },
              {
                href: "https://www.instagram.com/opt_national?igsh=amkxbWdxZWVpdWNj",
                icon: (
                  <FaInstagram className="text-white w-6 sm:w-7 md:w-8 lg:w-10 h-6 sm:h-7 md:h-8 lg:h-10" />
                ),
                bg: "bg-linear-to-tr from-[#FEDA75] to-[#D62976]",
                shadow: "hover:shadow-[#D62976]/40",
              },
              {
                href: "https://x.com/opt_national?t=jSuLmDKT2vsRJhcQE6SJ9w&s=09",
                icon: (
                  <FaXTwitter className="text-white w-6 sm:w-7 md:w-8 lg:w-10 h-6 sm:h-7 md:h-8 lg:h-10" />
                ),
                bg: "bg-[#000000]",
                shadow: "hover:shadow-gray-600/40",
              },
              {
                href: "https://www.linkedin.com/company/opt-national/",
                icon: (
                  <FaLinkedinIn className="text-white w-6 sm:w-7 md:w-8 lg:w-10 h-6 sm:h-7 md:h-8 lg:h-10" />
                ),
                bg: "bg-[#0077B5]",
                shadow: "hover:shadow-[#0077B5]/40",
              },
              {
                href: "https://pin.it/10fcw1WX8",
                icon: (
                  <SlSocialPintarest className="text-white w-6 sm:w-7 md:w-8 lg:w-10 h-6 sm:h-7 md:h-8 lg:h-10" />
                ),
                bg: "bg-[#E60023]",
                shadow: "hover:shadow-[#E60023]/40",
              },
            ].map(({ href, icon, bg, shadow }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bg} p-3 sm:p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-lg ${shadow}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <ul className="flex flex-wrap justify-center md:justify-between items-center w-full gap-3 sm:gap-4 md:gap-6 text-center text-gray-400 text-xs sm:text-sm border-t border-white/10 pt-6 sm:pt-8">
          <li className="order-2 md:order-1 flex items-center justify-center w-full md:w-auto">
            <FaRegCopyright className="inline mr-1" />
            OPT. National — All rights reserved
          </li>
          <li className="order-1 md:order-2 hover:text-white transition-colors cursor-pointer">
            <Link href="/terms-and-conditions" >Terms and conditions applied</Link>
          </li>
          <li className="order-1 md:order-2 hover:text-white transition-colors cursor-pointer">
            <Link href="/privacy-policy" >Privacy Policy</Link>
          </li>
          <li className="order-1 md:order-2 hover:text-white transition-colors cursor-pointer">
            Contact: contact@optnational.com
          </li>
          <li className="order-1 md:order-2 hover:text-white transition-colors cursor-pointer">
            Address: Patuakhali Science and Technology University
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
