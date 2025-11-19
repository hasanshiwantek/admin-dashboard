"use client";
import React, { useState } from "react";
import { ChevronDown, Save, X } from "lucide-react";

// --- SHADCN/UI Imports ---
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languageOptions = [
  { value: "en", label: "English (English)" },
  { value: "es-es", label: "Español (Castellano) (Spanish/Castilian)" },
  { value: "es-la", label: "Español Latinoamérica (Spanish Latin America)" },
  { value: "fr", label: "Français (French)" },
  { value: "it", label: "Italiano (Italian)" },
  { value: "zh", label: "中文 (Chinese)" },
  { value: "de", label: "Deutsch (German)" },
];

const page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSave = () => {
    console.log("Profile Saved:", { firstName, lastName, selectedLanguage });
    // In a real application, you'd send this data to a backend.
  };

  const handleCancel = () => {
    console.log("Cancelled changes.");
    // In a real application, you might navigate back or reset form.
    setFirstName("");
    setLastName("");
    setSelectedLanguage("en");
  };

  return (
    <div className="min-h-screen  p-10 ">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="!font-extralight">Edit Profile</h1>
          <p className=" mt-1">Set up basic information about you</p>
        </div>

        {/* Profile Name Card */}
        <Card className="mb-6  shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">
              Profile name
            </CardTitle>
            <CardDescription className="text-gray-700 text-xl">
              This is the name associated with your user profile and will be
              used in email communications we send you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Card */}
        <Card className="mb-6 border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700">
              Language
            </CardTitle>
            <CardDescription className="text-gray-700 text-xl">
              Your preferred language will be used in your BigCommerce Control
              Panel and for emails we send to you about your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5 w-full sm:w-80">
              <Label htmlFor="preferred-language">Preferred language</Label>
              <Select
                onValueChange={setSelectedLanguage}
                defaultValue={selectedLanguage}
              >
                <SelectTrigger id="preferred-language" className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Floating Action Buttons */}
        <div className="flex justify-end  gap-10 items-center fixed w-full bottom-0 right-0  bg-white/90 z-10 shadow-xs border-t  p-4">
          <div className=" flex justify-end space-x-8">
            <button onClick={handleCancel} className="btn-outline-primary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center">
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
