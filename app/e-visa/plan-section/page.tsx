import React, { Suspense } from "react";
import PlanSection from "./PlanSection";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PlanSection />
        </Suspense>
    );
}
