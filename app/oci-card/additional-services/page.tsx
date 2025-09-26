import React, { Suspense } from "react";
 import AdditionalServices from "../OCACard";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
  return (
  <Suspense fallback={<FullScreenLoader/>}>      <AdditionalServices />
    </Suspense>
  );
}
