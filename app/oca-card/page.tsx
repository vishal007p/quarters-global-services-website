import React, { Suspense } from "react";
 import OCACard from "./OCACard";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OCACard />
    </Suspense>
  );
}
