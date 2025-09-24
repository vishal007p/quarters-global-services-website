import React, { Suspense } from "react";
import Passport from "./Passport";
 
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Passport />
    </Suspense>
  );
}
