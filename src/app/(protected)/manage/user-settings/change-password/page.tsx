"use client";
import React, { useState } from "react";
import { Save, AlertTriangle, Eye, EyeOff } from "lucide-react"; // Added AlertTriangle for the warning box

// --- SHADCN/UI Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Component for displaying a single password requirement
const RequirementItem = ({ text, isMet }: { text: any; isMet: any }) => (
  <div className="flex items-center text-lg" aria-live="polite">
    <span
      className={`mr-2 h-7 w-7 flex items-center justify-center rounded-full ${
        isMet ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <svg
        className="h-4 w-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span className={isMet ? "text-gray-700" : "text-gray-500"}>{text}</span>
  </div>
);

const Page = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // Password requirement logic
  const requirements = {
    minLength: newPassword.length >= 12,
    upperCase: /[A-Z]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    lowerCase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };
  const isNewPasswordValid = Object.values(requirements).every(Boolean);
  const passwordsMatch =
    newPassword === confirmPassword && newPassword.length > 0;

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all password fields.");
      return;
    }
    if (!isNewPasswordValid) {
      alert("New password does not meet all requirements.");
      return;
    }
    if (!passwordsMatch) {
      alert("New and confirmation passwords do not match.");
      return;
    }

    console.log("Attempting to change password...");
    // In a real app, this would be an API call
    alert("Password change initiated. You will be signed out.");
    const payload={
      currentPassword:currentPassword,
      newPassword:newPassword,
      confirmPassword:confirmPassword
    }
    console.log("Changed password payload: ",payload );
    
  };

  const handleCancel = () => {
    console.log("Cancelled password change.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 ">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="!font-extralight">Password</h1>
        </div>

        {/* Change Password Card */}
        <Card className="mb-6 border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            {/* Sub-Header */}
            <div className="mb-6">
              <h2 className="!font-bold">Change Password</h2>
              <span className=" mt-1">
                Change the password you use to log into BigCommerce.
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Password Inputs */}
              <div className="flex flex-col space-y-6 w-full ">
                {/* Current Password */}
                <div className="flex flex-col space-y-1.5 relative w-96 ">
                  <Label htmlFor="current-password">Current Password</Label>
                  <input
                    id="current-password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-4 border-2 rounded-sm !text-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-17 -translate-y-1/2  text-gray-600"
                  >
                    {showCurrent ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>

                {/* New Password */}
                <div className="flex flex-col space-y-1.5 w-96 relative">
                  <Label htmlFor="new-password">New Password</Label>
                  <input
                    id="new-password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 border-2 rounded-sm !text-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3  top-17 -translate-y-1/2 text-gray-600"
                  >
                    {showNew ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col space-y-1.5 w-96 relative">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-4 border-2 rounded-sm !text-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-17 -translate-y-1/2 text-gray-600"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Password Requirements */}
              <div className="w-full lg:w-1/2 pt-10">
                <h2 className="!font-semibold mb-2">
                  Your password must contain:
                </h2>
                <div className="grid gap-2">
                  <RequirementItem
                    text="At least 12 characters"
                    isMet={requirements.minLength}
                  />
                  <RequirementItem
                    text="One or more uppercase letters"
                    isMet={requirements.upperCase}
                  />
                  <RequirementItem
                    text="One or more special characters or symbols"
                    isMet={requirements.specialChar}
                  />
                  <RequirementItem
                    text="One or more lowercase letters"
                    isMet={requirements.lowerCase}
                  />
                  <RequirementItem
                    text="One or more numbers"
                    isMet={requirements.number}
                  />
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="mt-8 p-4 rounded-lg bg-white border border-yellow-200 flex items-center ">
              <AlertTriangle className="h-7 w-7 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-base text-yellow-800">
                Changing your password will sign you out of your current
                session. You'll need to enter the new password when you sign
                back in.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Floating Action Buttons */}
        <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
          <div className=" flex justify-end space-x-8">
            <button onClick={handleCancel} className="btn-outline-primary">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center"
            >
              <Save className="mr-1 -mt-1 h-5 w-5" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
