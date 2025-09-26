"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DynamicForm } from "@/components/DynamicForm/DynamicForm";
import { serviceForms } from "@/lib/serviceForms";
import { useCreateApplication2Mutation } from "@/services/applicationApi2";
 
export default function CreateApplication() {
  const params = useSearchParams();
  const type = params.get("type") as keyof typeof serviceForms | null;

  const [createApplication, { isLoading, isError, isSuccess, error }] =
    useCreateApplication2Mutation();

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
    const payload = {
      applications: [
        {
          platformServices: [
            {
              platformServiceId: "123",
              platformServiceCategoryId: "abc",
              platformServiceCategoryPackageId: "pkg1",
              platformServiceCategoryPackageAddonsId: ["addon1"],
            },
          ],
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          countryCode: "+1",
          phone: "1234567890",
          status: "Submitted",
          serviceFields: {
            ...values,
            serviceType: type,
          },
        },
      ],
    };

    try {
      await createApplication(payload).unwrap();
    } catch (err) {
      console.error("Failed to create application:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Form</h1>

      {showAlert && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300">
          ✅ Application submitted successfully!
        </div>
      )}

      <DynamicForm schema={schema} fields={fields} onSubmit={handleSubmit} />

      {isLoading && <p className="text-blue-600 mt-2">Submitting...</p>}
      {isError && <p className="text-red-600 mt-2">❌ {error?.toString()}</p>}
    </div>
  );
}
