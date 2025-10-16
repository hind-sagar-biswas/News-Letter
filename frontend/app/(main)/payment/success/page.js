import React, { Suspense } from 'react'
import SuccessPayment from './SuccessPayment';

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
      <SuccessPayment />
    </Suspense>
  )
}
