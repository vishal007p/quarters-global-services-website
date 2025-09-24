import React, { Suspense } from "react";
 import AdditionalServices from "../OCACard";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdditionalServices />
    </Suspense>
  );
}
