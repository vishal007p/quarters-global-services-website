"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DynamicForm } from "@/components/DynamicForm/DynamicForm";
import { serviceForms } from "@/lib/serviceForms";
import { useCreateApplication2Mutation } from "@/services/applicationApi2";
import { clearPlatformServices } from "@/lib/platformServiceStorage";
import { toast } from "sonner";
import { ApplicationPayload } from "@/lib/Types";
import { useVerifyEmailMutation } from "@/services/verifyEmail";
import EmailVerifyDialog from "@/components/StepForm/EmailVerifyDialog";

export default function CreateApplication() {
  const params = useSearchParams();
  const type = params.get("type") as keyof typeof serviceForms | null;

  const [createApplication, { isLoading, isError, isSuccess, error }] =
    useCreateApplication2Mutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const [emailOtpVerify, setEmailVerify] = useState(false)
  const [payload, setPayload] = useState<any>()


  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 4000); // hide after 4s
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (!type || !serviceForms[type]) {
    return (
      <div className="p-6 text-red-600 text-center">
        ❌ Invalid or missing service type
      </div>
    );
  }

  const { schema, fields } = serviceForms[type];

  const handleSubmit = async (values: any) => {

    const payload: any = {
      applications: [
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          countryCode: "+91",
          company: values.company || "",
          status: "Submitted",
          applicationSource: "Website",
          address: {
            addressLine1: values.senderAddress || "",
            addressLine2: "",
            city: values.citySender || "",
            state: values.stateSender || "",
            zipCode: values.zipCodeSender || "",
            country: values.countrySender || "",
          },

          currentLegalAddress: {
            addressLine1: values.recipientAddress || "",
            addressLine2: "",
            city: values.cityRecipient || "",
            state: values.stateRecipient || "",
            zipCode: values.zipCodeRecipient || "",
            country: values.countryRecipient || "",
          },

          fromCountryId: values.fromCountryId || "68d839b82ea0a4e770b07daf",
          toCountryId: values.toCountryId || "68d839b82ea0a4e770b07daf",

          platformServices: [{
            platformServiceId: "68e968e1e7bd0d029655fa49",
            platformServiceCategoryId: "68e968e2e7bd0d029655fa4c",
            platformServiceCategoryPackageAddonsId: [],
            platformServiceCategoryPackageId: "68e968e2e7bd0d029655fa4f"
          }],

          serviceFields: {
            serviceType: values.serviceType || type,
          },
        },
      ],
    };
    setPayload(payload)
    try {
      const res = await verifyEmail({
        email: values.email
      }).unwrap();

      if (res?.message === "Email is already verified.") {
        const response = await createApplication(payload).unwrap();
        if (response?.status && response.data?.redirectURL) {
          clearPlatformServices();
          localStorage.removeItem("applications");
          window.location.href = response.data.redirectURL;
        } else {
          toast.error("Application created but no redirect URL returned");
        }
      } else {
        console.error(res?.message || "Email verification failed");
        if (res?.message === "We have sent OTP to your email. Please check your inbox."
        ) {
          setEmailVerify(true);
        }
        setEmailVerify(false);
      }
    } catch (err: any) {
      const message =
        err?.message ||
        err?.data?.message ||
        "Something went wrong while verifying email.";

      // Show toast message
      toast.error(message);

      // ✅ If backend indicates OTP sent, open verification dialog
      if (
        message === "We have sent OTP to your email. Please check your inbox." ||
        message.toLowerCase().includes("otp")
      ) {
        setEmailVerify(true);
      } else {
        setEmailVerify(false);
      }
    }


  };


  const handleVerify = async () => {
    const response = await createApplication(payload as ApplicationPayload).unwrap();
    if (response?.status && response.data?.redirectURL) {
      clearPlatformServices();
      localStorage.removeItem("applications");
      window.location.href = response.data.redirectURL;
    } else {
      toast.error("Application created but no redirect URL returned");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Form</h1>

      {showAlert && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300">
          ✅ Application submitted successfully!
        </div>
      )}

      <DynamicForm schema={schema} fields={fields} onSubmit={handleSubmit} serviceType={type} />

      {isLoading && <p className="text-blue-600 mt-2">Submitting...</p>}
      {isError && (() => {
        if (typeof error === "string") return <p className="text-red-600 mt-2">❌ {error}</p>;

        // RTK Query often returns error as { data: {...}, status: number }
        if (typeof error === "object" && error !== null && "data" in error) {
          const e = error as { data?: any }; // narrow to 'any' safely
          return (
            <div className="text-red-600 mt-2">
              ❌ {e.data?.message || "Unknown error"}
              {e.data?.errors && (
                <ul className="ml-4 list-disc">
                  {Object.entries(e.data.errors).map(([field, msg]) => (
                    <li key={field}>
                      {field}: {String(msg)}  {/* Cast unknown to string */}
                    </li>
                  ))}
                </ul>
              )}

            </div>
          );
        }

        return <p className="text-red-600 mt-2">❌ Unknown error</p>;
      })()}
      {emailOtpVerify && <EmailVerifyDialog email={payload?.applications[0]?.email ?? ""} handleSubmite={handleVerify} />}

    </div>
  );
}
