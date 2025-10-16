"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaHeadset, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const paymentMethods = [
  { name: "bKash", img: "/images/bkash.png", route: "/bkash" },
  { name: "Nagad", img: "/images/nagad.png", route: "/nagad" },
  // { name: "Rocket", img: "https://seeklogo.com/images/R/rocket-by-dutch-bangla-bank-logo-9E838A3E66-seeklogo.com.png" },
  // { name: "Upay", img: "https://seeklogo.com/images/U/upay-logo-45B70F3957-seeklogo.com.png" },
  // { name: "Cellfin", img: "https://www.cellfin.com.bd/assets/images/logo.png" },
];

const UddoktaPaySandbox = () => {
    const {price} = useSelector((state) => state.manualSubscriptionSlice);

    const router = useRouter();

  useEffect(() => {
    if (!price) {
      router.push("/"); // redirect to home
    }
  }, [price, router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-[500px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-3xl text-red-600 font-bold">O</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              OptNational
            </h2>
            <p className="text-sm text-gray-400">Secure Payment Portal</p>
          </div>
        </div>

        {/* Options */}
        <div className="flex justify-around py-4 border-b border-gray-200 text-gray-600 text-md">
          <button className="flex items-center gap-1 hover:text-blue-600">
            <FaHeadset /> Support
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600">
            <FaQuestionCircle /> FAQ
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600">
            <FaInfoCircle /> Details
          </button>
        </div>

        {/* Payment section */}
        <div className="px-5 py-5">
          <h3 className="text-center text-md py-2 font-semibold text-white bg-blue-600 rounded-lg mb-4">
            MOBILE BANKING
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {paymentMethods.map((method) => (
              <Link href={`/payment-form${method.route}`} key={method.name}>
                <div
                  
                  className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl py-2 hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src={method.img}
                    alt={method.name}
                    className="h-12 object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Payment button */}
          <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-xl transition">
            Pay {price} BDT
          </button>
        </div>
      </div>
    </div>
  );
};

export default UddoktaPaySandbox;
