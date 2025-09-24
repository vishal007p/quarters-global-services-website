import React, { Suspense } from "react";
 import PlanSelection from "./PlanSelection";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlanSelection />
    </Suspense>
  );
}
