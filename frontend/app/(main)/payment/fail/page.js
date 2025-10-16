import React, { Suspense } from 'react'
import FailPayment from './FailPayment';

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
      <FailPayment />
    </Suspense>
  )
}
