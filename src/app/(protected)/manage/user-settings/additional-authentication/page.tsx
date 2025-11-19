"use client"
import React, { useState } from "react";
import { Mail, Smartphone, Save, AlertTriangle } from "lucide-react";

// --- SHADCN/UI Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Only necessary components are imported, removing unused ones like Input/Label for this view

// Helper component for the two-factor authentication option card
const AuthOptionCard = ({
  icon: Icon,
  title,
  status,
  description,
  recommended,
  actionButton,
  onAction,
}: {
  icon: any;
  title: any;
  status: any;
  description: any;
  recommended: any;
  actionButton: any;
  onAction: any;
}) => {
  return (
    <Card className="border-gray-200 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex items-start p-6">
        {/* Icon */}
        <div className="flex-shrink-0 mr-4 mt-1">
          <div className="p-5 rounded-lg bg-blue-50 text-blue-600">
            <Icon className="h-8 w-8" />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="">{title}</h2>
            {status === "ENABLED" && (
              <span className="text-base font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                ENABLED
              </span>
            )}
            {recommended && (
              <span className="text-xs font-medium text-gray-500">
                (recommended)
              </span>
            )}
          </div>
          <p className="mb-2">
            {description.split("\n")[0]}
          </p>
          <span className=" whitespace-pre-line">
            {description.split("\n").slice(1).join("\n")}
          </span>
        </div>

        {/* Action Button */}
        {actionButton && (
          <div className="flex-shrink-0 ml-4">
            <Button
            className="!p-5 !text-xl"
              variant={status === "ENABLED" ? "destructive" : "outline"} // Use 'destructive' to signify disable/remove
              onClick={onAction}
            >
              {actionButton}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Page = () => {
  const [emailAuthStatus, setEmailAuthStatus] = useState("ENABLED");
  const [authenticatorAppStatus, setAuthenticatorAppStatus] =
    useState("DISABLED");

  const handleEmailAction = () => {
    // In this UI, Email is ENABLED. The action button is not visible for the enabled one.
    // If we wanted to disable it, the logic would go here.
    console.log("Email authentication action triggered.");
  };

  const handleAuthenticatorAction = () => {
    if (authenticatorAppStatus === "DISABLED") {
      console.log("Enabling Authenticator app...");
      // Simulate enabling the app (would show a QR code step in reality)
      alert("Simulating enable. You would now see a QR code setup screen.");
      setAuthenticatorAppStatus("ENABLED");
      setEmailAuthStatus("DISABLED"); // Assuming only one can be active at a time
    } else {
      console.log("Disabling Authenticator app...");
      setAuthenticatorAppStatus("DISABLED");
      setEmailAuthStatus("ENABLED"); // Reverting to email
    }
  };

  return (
    <div className="min-h-screen  p-10">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="!font-extralight">
            Two-factor authentication
          </h1>
          <p className=" mt-1">
            Two-factor authentication protects your account with an extra
            security step. This means that even if someone has your password,
            they won't be able to log into your account.
          </p>
        </div>

        {/* Two-factor authentication options section */}
        <Card className="mb-6 border-gray-200 shadow-sm p-6">
          <h2 className="!font-semibold mb-2">
            Two-factor authentication options
          </h2>
          <p className="mb-6">
            Only one authentication method may be selected at a time.
          </p>

          <div className="space-y-4">
            {/* Email Verification Card */}
            <AuthOptionCard
              icon={Mail}
              title="Email verification"
              status={emailAuthStatus}
              description="Basic security Receive tokens in an email to authenticate your login."
              actionButton={
                emailAuthStatus === "ENABLED" ? "Disable" : "Enable"
              }
              onAction={handleEmailAction}
              recommended={false}
            />

            {/* Authenticator App Card */}
            <AuthOptionCard
              icon={Smartphone}
              title="Authenticator app"
              status={authenticatorAppStatus}
              description="Advanced security\nWhen you log in, the authenticator app will generate a unique password to help us verify your identity. You'll need access to the device with app installed to finish logging in."
              recommended={true}
              actionButton={
                authenticatorAppStatus === "DISABLED" ? "Enable" : "Disable"
              }
              onAction={handleAuthenticatorAction}
            />
          </div>
        </Card>

        {/* The original image did not show floating buttons, but I'll add a fixed block 
            to ensure space at the bottom is accounted for, mimicking the style of 
            the previous requests. If the buttons are not needed, this section can be removed. 
            For now, I'll omit the floating buttons since the form doesn't strictly require a "Save" action. */}
      </div>
    </div>
  );
};

export default Page;
