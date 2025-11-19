"use client"
import React, { useState } from "react";
import { Save } from "lucide-react";

// --- SHADCN/UI Imports ---
// Assuming standard import paths for your styled components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  console.log(parsedUser); // Now it’s the original object

  const currentEmail = parsedUser?.email; // Mock data for current email

  const handleChangeEmail = () => {
    if (newEmail && password) {
      console.log("Attempting to change email:", { newEmail, password });
      // In a real app, this would be an API call
      alert(
        "Email change process initiated! Check your inbox for verification."
      );
    } else {
      alert("Please enter a new email address and verify your password.");
    }
  };

  const handleCancel = () => {
    console.log("Cancelled email change.");
    // Resetting form fields
    setNewEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className=" !font-extralight">Change email address</h1>
          <p className=" mt-1">
            Change the email address that you use to log in to BigCommerce.
          </p>
        </div>

        {/* Form Card */}
        <Card className="mb-6 border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-6 max-w-lg">
              {/* Current Email */}
              <div className="flex flex-col space-y-1.5">
                <Label className="">Current email address</Label>
                <p className="">{currentEmail}</p>
              </div>

              {/* New Email Address */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="new-email">New email address</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="you@bigcommerce.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Verify Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="verify-password">Verify password</Label>
                <Input
                  id="verify-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
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
              onClick={handleChangeEmail}
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

export default page;
