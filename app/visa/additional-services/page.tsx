import React, { Suspense } from "react";
 import AdditionalServices from "./AdditionalServices";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdditionalServices />
    </Suspense>
  );
}
