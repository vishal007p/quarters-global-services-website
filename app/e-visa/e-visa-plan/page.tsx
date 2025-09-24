import React, { Suspense } from "react";
import EVisaPlan from "./EVisaPlan";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EVisaPlan />
    </Suspense>
  );
}
