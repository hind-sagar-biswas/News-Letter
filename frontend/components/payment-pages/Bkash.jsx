"use client";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeUserManually,
  updatePackageWithChargeManually,
} from "@/redux/slices/subscriptionSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../helper/LoadingSpinner";

export default function BkashPayment() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);

  const { requestType, servicePlanId, price, subscriptionId } = useSelector(
    (state) => state.manualSubscriptionSlice
  );
  const mobileNumber = process.env.NEXT_PUBLIC_BKASH_MOBILE_NUMBER;

  // console.log(requestType, servicePlanId, price, subscriptionId);

  // console.log(transactionId);

  const handleCopy = () => {
    navigator.clipboard.writeText("01929694084");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!requestType || !price) {
      router.push("/");
    }
  }, [requestType, price, router]);

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your Transaction ID.");
      return;
    }

    setLoading(true);

    try {
      let result;

      if (requestType === "subscribe") {
        result = await dispatch(
          subscribeUserManually({ price, servicePlanId, transactionId })
        ).unwrap();

        if (result) {
          window.location.href = result; // payment URL
          return; // stop execution
        }
      } else if (requestType === "update") {
        result = await dispatch(
          updatePackageWithChargeManually({
            price,
            servicePlanId,
            subscriptionId,
            transactionId,
          })
        ).unwrap();

        if (result) {
          window.location.replace(result); // redirect
          return;
        }
      } else {
        toast.error("Invalid request type.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-pink-100 text-white flex items-center justify-center py-3">
          <img
            src="/images/bkash.png"
            alt="bKash"
            className="h-8 mr-2 text-white"
          />
          <h1 className="text-lg font-semibold text-pink-600">bKash</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Merchant Info */}
          <div className="bg-[#E2136E] p-3 rounded-lg flex items-center justify-between border border-pink-200">
            <div>
              <h2 className="font-semibold text-gray-700">OptNational</h2>
              {/* <p className="text-sm text-gray-500">ইনভয়েস আইডিঃ b9SIGXAhPsU5AJBWt6c6</p> */}
            </div>
            <span className="text-xl font-bold text-white">৳ {price}</span>
          </div>

          {/* Transaction Input */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              ট্রানজেকশন আইডি দিন
            </label>
            <input
              type="text"
              placeholder="ট্রানজেকশন আইডি দিন"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full border border-pink-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-pink-500 text-black"
            />
          </div>

          {/* Instructions */}
          <div className="bg-pink-100 rounded-lg p-3 text-sm text-gray-700 space-y-2">
            <p>
              • *247# ডায়াল করে আপনার BKASH মোবাইল মেনুতে যান অথবা BKASH অ্যাপে
              যান।
            </p>
            <p>• "Send Money" -এ ক্লিক করুন।</p>
            <p className="flex items-center gap-2">
              • গ্রাহক নাম্বার লিখুন{" "}
              <span className="font-semibold text-pink-700">{mobileNumber}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 bg-pink-600 text-white px-2 py-1 rounded-md text-xs hover:bg-pink-700 cursor-pointer"
              >
                <Copy size={14} /> {copied ? "Copied" : "Copy"}
              </button>
            </p>
            <p>
              • টাকার পরিমাণ: <strong>{price}</strong>
            </p>
            <p>• রেফারেন্স হিসেবে আপনার BKASH মোবাইল নম্বর দিন।</p>
            <p>
              • সমস্ত কিছু ঠিক থাকলে, আপনি BKASH থেকে একটি নিশ্চিতকরণ বার্তা
              পাবেন।
            </p>
            <p>
              • এখন ওপরের বক্সে আপনার Transaction ID দিন এবং নিচের VERIFY বাটনে
              ক্লিক করুন।
            </p>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#E2136E] text-white font-semibold py-2 rounded-lg hover:bg-pink-700 transition flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? <LoadingSpinner message="VERIFYING..." /> : "VERIFY"}
          </button>
        </div>
      </div>
    </div>
  );
}
