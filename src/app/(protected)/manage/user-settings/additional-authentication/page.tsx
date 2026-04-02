"use client"
import React, { useEffect, useState } from "react";
import { Mail, Smartphone, Save, AlertTriangle } from "lucide-react";

// --- SHADCN/UI Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { confirmAuthenticator, disableEmail2FA, enableAuthenticator2FA, enableEmail2FA, fetchTwofaStatus } from "@/redux/slices/authSlice";
import DisablePasswordModal from "./helpers/DiablePasswordModal";
import EnableTOTPModal from "./helpers/EnableTOTPModal";
import { set } from "react-hook-form";
import ConfirmationModal from "./helpers/ConfirmationModal";
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
  const dispatch = useAppDispatch();
  const [emailAuthStatus, setEmailAuthStatus] = useState("");
  const [authenticatorAppStatus, setAuthenticatorAppStatus] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationForEmailEnable, setConfirmationForEmailEnable] = useState(false);
  const [confirmationForAuthEnable, setConfirmationForAuthEnable] = useState(false);
  const [totpData, setTotpData] = useState(null);
  const [totpModalOpen, setTotpModalOpen] = useState(false);
  const fetchTwofa = useAppSelector((state: any) => state.auth.twoFaStatus);
  function twoFactorStatus() {
    dispatch(fetchTwofaStatus());
  }

  const handleEmailAction = () => {
    if (emailAuthStatus === "ENABLED") {
      setOpen(true);
    } else {
      setConfirmationForEmailEnable(true)
    }
  };

  const handleAuthenticatorAction = () => {
    if (authenticatorAppStatus === "ENABLED") {
      setOpen(true);
    } else {
      // setLoading(true);
      // dispatch(enableAuthenticator2FA()).then((res) => {
      //   if (res.payload) {
      //     setTotpModalOpen(true);
      //     setTotpData(res.payload);
      //   }
      // }).finally(() => {
      //   setLoading(false);
      // });
      setConfirmationForAuthEnable(true)
    }
  };

  useEffect(() => {
    if (fetchTwofa?.two_factor_type === "email") {
      setEmailAuthStatus("ENABLED");
      setAuthenticatorAppStatus("DISABLED");
    } else if (fetchTwofa?.two_factor_type === "authenticator") {
      setEmailAuthStatus("DISABLED");
      setAuthenticatorAppStatus("ENABLED");
    } else {
      setEmailAuthStatus("DISABLED");
      setAuthenticatorAppStatus("DISABLED");
    }
  }, [fetchTwofa])

  useEffect(() => {
    twoFactorStatus()
  }, [dispatch]);

  return (
    <React.Fragment>
      {open && (
        <DisablePasswordModal
          open={open}
          onOpenChange={setOpen}
          onConfirm={(password) => {
            setLoading(true);
            dispatch(disableEmail2FA({ password })).then((res) => {
              if (disableEmail2FA.fulfilled.match(res)) {
                setOpen(false);
              } else if (disableEmail2FA.rejected.match(res)) {
              }
            }).finally(() => {
              setLoading(false);
              twoFactorStatus();
            });
          }}
          loading={loading}
        />
      )}
      {totpModalOpen && (
        <EnableTOTPModal
          open={totpModalOpen}
          onOpenChange={setTotpModalOpen}
          qrData={totpData}
          loading={loading}
          onConfirm={(otp) => {
            setLoading(true);
            dispatch(confirmAuthenticator({ code: otp }))
              .then((res) => {
                if (confirmAuthenticator.fulfilled.match(res)) {
                  setTotpModalOpen(false);
                  setTotpData(null);
                } else if (confirmAuthenticator.rejected.match(res)) {
                }
              }).finally(() => {
                setLoading(false);
                twoFactorStatus()
              });
          }}
        />)}
      {confirmationForEmailEnable && <ConfirmationModal
        open={confirmationForEmailEnable}
        loading={loading}
        onOpenChange={setConfirmationForEmailEnable}
        variant="enable"
        title="Enable Email 2FA?"
        description="This will require an OTP code sent to your email on every login."
        onConfirm={() => {
          setLoading(true);
          dispatch(enableEmail2FA()).finally(() => {
            setLoading(false);
            setConfirmationForEmailEnable(false)
            twoFactorStatus();
          });
        }}
      />}
      {confirmationForAuthEnable && <ConfirmationModal
        open={confirmationForAuthEnable}
        loading={loading}
        onOpenChange={setConfirmationForAuthEnable}
        variant="enable"
        title="Enable Authenticator?"
        description="This will remove email verification from your login process."
        onConfirm={() => {
          setLoading(true);
          dispatch(enableAuthenticator2FA()).then((res) => {
            if (res.payload) {
              setConfirmationForAuthEnable(false)
              setTotpModalOpen(true);
              setTotpData(res.payload);
            }
          }).finally(() => {
            setLoading(false);
          });
        }}
      />}

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


        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
