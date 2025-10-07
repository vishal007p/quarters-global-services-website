"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useValidateOtpMutation } from "@/services/validateOtpApi";

type EmailVerifyDialogProps = {
  email: string;
  handleSubmite: () => void;
};


export default function EmailVerifyDialog({ email, handleSubmite }:EmailVerifyDialogProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [validateOtp, { data, isLoading, error }] = useValidateOtpMutation();


  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return; // only single digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) {
      (nextInput as HTMLInputElement).focus();
    }
  };

  const handleVerify = async () => {
  const code = otp.join(""); // convert ["1","2","3","4","5","6"] → "123456"

  const res = await validateOtp({ email: email, otp: code }).unwrap();
  console.log("Entered OTP:", code);
  handleSubmite();
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Verify Email</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Verification</DialogTitle>
          <DialogDescription>
            We’ve sent a 6-digit code to your email. Enter it below to verify
            your account.
          </DialogDescription>
        </DialogHeader>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 my-6">
          {otp.map((digit, i) => (
            <Input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 text-center text-lg font-bold"
            />
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline">Resend</Button>
          <Button onClick={handleVerify}>Verify</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
