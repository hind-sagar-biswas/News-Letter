import BkashPayment from "@/components/payment-pages/Bkash";
import NagadPayment from "@/components/payment-pages/Nagad";
import { notFound } from "next/navigation";

const PaymentForm = async ({params}) => {

  const {id} = await params;
  const allowedPath = ["bkash", "nagad"];
  
  if (!allowedPath.includes(id)) {
    notFound(); // Invalid route → go to 404
  }

  switch(id){
    case "bkash":
      return <BkashPayment />;
    case "nagad": 
      return <NagadPayment />; 
  }
}

export default PaymentForm;