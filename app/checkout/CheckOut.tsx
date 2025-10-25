"use client"; // needed for hooks in Next 13 app directory
import MultiStepForm from "@/components/StepForm/MultiStepForm";
// import MultiStepForm2 from "@/components/StepForm2/MultiStepForm2";

export default function CheckoutPage() {
  let type: string | null = null;

  if (typeof window !== "undefined") {
    type = sessionStorage.getItem("formType");
  } 

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {/* {type === "OCI" ? <MultiStepForm2 /> : <MultiStepForm />} */}
      <MultiStepForm />
    </main>
  );
}
