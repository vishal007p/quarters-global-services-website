import React, { Suspense } from "react";
import EVisaPlan from "./EVisaPlan";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
  return (
    <Suspense fallback={<FullScreenLoader />}>      <EVisaPlan />
    </Suspense>
  );
}
