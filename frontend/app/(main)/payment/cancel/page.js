import React, { Suspense } from 'react';
import CancelPayment from './CancelPayment';

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="text-white p-8 text-center">Loading...</div>}>
      <CancelPayment />
    </Suspense>
  );
}
