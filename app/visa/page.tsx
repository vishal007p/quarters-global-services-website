import React, { Suspense } from "react";
 import Visa from "./Visa";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Visa />
    </Suspense>
  );
}
