'use client'
import Link from 'next/link'


export default function SuccessPayment() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-[#43053c] via-[#070737] to-[#35023c] text-white">
      <div className="max-w-xl w-full text-center bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl border border-white/10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-linear-to-r from-[#FF00E5] to-[#FF0022] text-transparent bg-clip-text">
          🎉 Welcome to Opt National!
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-2 font-medium">
          Payment Successful!
        </p>

        <p className="text-gray-300 mb-3">
          Thank you for your subscription to <span className="text-white font-semibold">Opt National</span>. You’ve just taken a big step toward unlocking valuable opportunities.
        </p>

        {/* 🔹 Extra message about transaction verification */}
        <p className="text-sm text-amber-300 mb-4 font-medium">
          Note: All transactions will be verified manually by our admin team. 
          If your transaction is found invalid, your subscription may be cancelled.
        </p>

        <p className="text-sm text-gray-400 mb-6">
          Stay tuned — your personalized, curated newsletters are on the way.
        </p>

        <Link href="/" passHref>
          <div className="inline-block bg-linear-to-br from-[#292F6E] to-[#B400CF] hover:shadow-[0_0_25px_rgba(180,0,207,0.6)] border border-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer">
            Go to Homepage
          </div>
        </Link>
      </div>
    </div>
  )
}
