"use client";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const RenewPackageModal = ({ onClose }) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-linear-to-br from-white/90 via-blue-100 to-purple-100 border border-gray-200 w-full max-w-md mx-4 p-6 rounded-2xl relative text-black backdrop-blur shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <RxCross2 size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Subscribe Again
        </h2>
        <p className="text-center text-sm xl:text-lg text-gray-800 mb-6">
          Please return to the home page and click "Buy Now" on the same package
          to continue your subscription.
        </p>

        {/* Go to Home Button */}
        <button
          onClick={() => {
            router.push("/");
            onClose();
          }}
          className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold py-2 rounded-md hover:opacity-90 transition cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default RenewPackageModal;
