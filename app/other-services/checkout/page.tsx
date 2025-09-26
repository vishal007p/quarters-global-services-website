import React, { Suspense } from "react";
 import FullScreenLoader from "@/components/FullScreenLoader";
import CheckoutPage from "@/app/checkout/page";
 
export default function Page() {
  return (
  <Suspense fallback={<FullScreenLoader/>}>      <CheckoutPage />
    </Suspense>
  );
}
