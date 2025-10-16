'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const dynamic = "force-dynamic";

export default function FailPayment() {
  const searchParams = useSearchParams()
  const tran_id = searchParams.get('tran_id')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#191949] via-[#0c0c3a] to-[#3b0a43] text-white">
      <div className="max-w-xl w-full text-center bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl border border-white/10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">
          ❌ Payment Failed
        </h1>
        <p className="text-lg sm:text-xl text-red-200 font-medium mb-2">
          We couldn’t complete your transaction.
        </p>
        <p className="text-gray-300 mb-2">
          This might have happened due to a network issue or payment rejection. Please try again later.
        </p>

        {tran_id && (
          <p className="text-sm text-gray-400 mb-6">
            Transaction ID: <span className="text-white font-medium">{tran_id}</span>
          </p>
        )}

        <Link href="/" passHref>
          <div className="inline-block bg-gradient-to-br from-[#B400CF] to-[#FF0022] hover:shadow-[0_0_25px_rgba(180,0,207,0.5)] border border-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer">
            Return to Homepage
          </div>
        </Link>
      </div>
    </div>
  )
}
