import React, { Suspense } from "react";
import PlanSection from "./PlanSection";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Page() {
    return (
  <Suspense fallback={<FullScreenLoader/>}>            <PlanSection />
        </Suspense>
    );
}
