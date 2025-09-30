"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

// --- OTP validation schema ---
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

type OTPFormData = z.infer<typeof otpSchema>;

type Props = {
  email: string;
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
};

export default function EmailOTPDialog({ email, open, onClose, onVerified }: Props) {
  const [isSending, setIsSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [message, setMessage] = useState("");

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Countdown for resend OTP
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleVerify = async (data: OTPFormData) => {
    try {
      setIsSending(true);
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp: data.otp }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.success) {
        onVerified();
        onClose();
      } else {
        setMessage(result.message || "Invalid OTP, please try again.");
      }
    } catch {
      setMessage("Something went wrong. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsSending(true);
      await fetch("/api/resend-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      setMessage("OTP sent successfully!");
      setResendTimer(60);
    } catch {
      setMessage("Failed to resend OTP. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full   rounded-lg flex flex-col justify-center items-center min-h-[50vh]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Verify Your Email</DialogTitle>
          <DialogDescription className="mt-1 text-gray-600 text-sm">
            We sent a 6-digit OTP to <strong>{email}</strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}  >
          <form
            onSubmit={form.handleSubmit(handleVerify)}
             
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex justify-center my-3">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      className="gap-2"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-12 text-center text-lg border rounded-lg" />
                        <InputOTPSlot index={1} className="w-12 h-12 text-center text-lg border rounded-lg" />
                        <InputOTPSlot index={2} className="w-12 h-12 text-center text-lg border rounded-lg" />
                      </InputOTPGroup>
                      <InputOTPSeparator className="w-4" />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} className="w-12 h-12 text-center text-lg border rounded-lg" />
                        <InputOTPSlot index={4} className="w-12 h-12 text-center text-lg border rounded-lg" />
                        <InputOTPSlot index={5} className="w-12 h-12 text-center text-lg border rounded-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {message && <p className="text-red-500 text-sm">{message}</p>}

            <Button type="submit" disabled={isSending} className="w-full">
              {isSending ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </Form>

        <Button
          variant="link"
          disabled={resendTimer > 0 || isSending}
          onClick={handleResend}
          className="mt-3 text-sm"
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
