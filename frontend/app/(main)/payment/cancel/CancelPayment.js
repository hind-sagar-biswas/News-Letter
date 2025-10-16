'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'


const CancelPayment = () => {
  const tran_id = useSearchParams().get('tran_id')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#191949] via-[#0c0c3a] to-[#3b0a43] text-white relative overflow-hidden">
      {/* Soft gradient overlays on top and bottom */}
      {/* <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#292F6E] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#B400CF] via-transparent to-transparent pointer-events-none" /> */}

      <div className="max-w-xl w-full text-center bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl border border-white/10 z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
          ⚠️ Payment Canceled
        </h1>
        <p className="text-lg sm:text-xl text-yellow-300 font-medium mb-2">
          You have canceled the payment process.
        </p>
        <p className="text-gray-300 mb-4">
          If this was a mistake, please try again or contact support for assistance.
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

export default CancelPayment
