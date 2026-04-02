"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code"; // ✅ npm install react-qr-code

export default function EnableTOTPModal({
  open,
  onOpenChange,
  qrData, // ✅ pass API response here
  onConfirm,
  loading
}: {
  open: boolean;
  loading: boolean;
  onOpenChange: (value: boolean) => void;
  qrData: {
    secret: string;
    qr_code_url: string;
    message: string;
  } | null;
  onConfirm: (otp: string) => void;
}) {
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    if (!otp.trim() || otp.length < 6) {
      setShowError(true);
      return;
    }
    onConfirm(otp);
    setOtp("");
    setShowError(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[500px] p-10">
        <DialogHeader>
          <DialogTitle>Setup Authenticator App</DialogTitle>
        </DialogHeader>

        {qrData && (
          <div className="flex flex-col items-center gap-4">
            {/* ✅ QR Code */}
            <p className="text-sm text-center text-muted-foreground">
              {qrData.message}
            </p>

            <div className="border p-4 rounded-md bg-white">
              <QRCode
                value={qrData.qr_code_url}
                size={180}
              />
            </div>

            {/* ✅ Manual secret key */}
            <div className="w-full space-y-1">
              <Label>Or enter this key manually</Label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={qrData.secret}
                  className="!max-w-full font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(qrData.secret)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ OTP Input */}
        <div className="space-y-2 mt-2">
          <Label htmlFor="otp">Enter 6-digit code from your app</Label>
          <Input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "")); // ✅ numbers only
              setShowError(false);
            }}
            className="!max-w-full tracking-widest text-center text-xl"
          />
          {showError && (
            <p className="text-sm text-red-500">Please enter a valid 6-digit code</p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="ghost"
            type="button"
            className="text-lg p-5"
            onClick={() => {
              setOtp("");
              setShowError(false);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-lg p-5"
            disabled={otp.length !== 6}
            onClick={handleConfirm}
          >
            {loading ? "Verifying..." : "Verify & Enable"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}