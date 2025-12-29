"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, X } from "lucide-react";

interface ScriptFormData {
  scriptName: string;
  description: string;
  placement: "footer" | "header";
  location: "storefront" | "checkout" | "orderConfirmation" | "allPages";
  scriptCategory: "essential" | "analytics" | "functional" | "targeting";
  scriptType: "url" | "script";
  loadMethod?: string;
  scriptUrl?: string;
  integrityHashes?: string[];
  scriptContents?: string;
}

const AddScript = () => {
  const { register, handleSubmit, watch, setValue } = useForm<ScriptFormData>({
    defaultValues: {
      placement: "footer",
      location: "storefront",
      scriptCategory: "essential",
      scriptType: "url",
      loadMethod: "defer",
      integrityHashes: [],
    },
  });

  const [integrityHashes, setIntegrityHashes] = useState<string[]>([]);
  const [currentHash, setCurrentHash] = useState("");

  const scriptType = watch("scriptType");

  const onSubmit = (data: ScriptFormData) => {
    console.log({ ...data, integrityHashes });
  };

  const addHash = () => {
    // Add the current hash value to the list (even if empty)
    setIntegrityHashes([...integrityHashes, currentHash]);
    setCurrentHash(""); // Clear the input field
  };

  const updateHash = (index: number, value: string) => {
    const newHashes = [...integrityHashes];
    newHashes[index] = value;
    setIntegrityHashes(newHashes);
  };

  const removeHash = (index: number) => {
    setIntegrityHashes(integrityHashes.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Header */}
      <div className="  p-10">
        <h1 className="!font-light 2xl:!text-5xl mb-2">Create script</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-full">
        {/* Main Content */}
        <div className="bg-white m-6 rounded-sm border p-10">
          {/* Script Name */}
          <div className="mb-6">
            <Label htmlFor="scriptName" className=" mb-2 block">
              Script name
            </Label>
            <Input id="scriptName" {...register("scriptName")} />
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center justify-start gap-5 mb-2">
              <Label htmlFor="description" className="">
                Description
              </Label>
              <span className="">optional</span>
            </div>
            <Input id="description" {...register("description")} />
          </div>

          {/* Placement */}
          <div className="mb-6">
            <Label className=" mb-3 block">Placement</Label>
            <RadioGroup
              defaultValue="footer"
              onValueChange={(value) =>
                setValue("placement", value as "footer" | "header")
              }
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="footer" id="footer" />
                <Label htmlFor="footer" className="cursor-pointer">
                  Footer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="header" id="header" />
                <Label htmlFor="header" className="cursor-pointer">
                  Header
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Location */}
          <div className="mb-6">
            <Label className=" mb-3 block">Location</Label>
            <RadioGroup
              defaultValue="storefront"
              onValueChange={(value) => setValue("location", value as any)}
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="storefront" id="storefront" />
                <Label htmlFor="storefront" className=" flex items-center">
                  Storefront pages
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="checkout" id="checkout" />
                <Label
                  htmlFor="checkout"
                  className=" cursor-pointer flex items-center"
                >
                  Checkout
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value="orderConfirmation"
                  id="orderConfirmation"
                />
                <Label
                  htmlFor="orderConfirmation"
                  className=" cursor-pointer flex items-center"
                >
                  Order confirmation
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="allPages" id="allPages" />
                <Label
                  htmlFor="allPages"
                  className="cursor-pointer flex items-center"
                >
                  All pages
                  <Info className="w-4 h-4 ml-1 text-gray-400" />
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Script Category */}
          <div className="mb-6">
            <Label className="mb-3 block">Script category</Label>
            <RadioGroup
              defaultValue="essential"
              onValueChange={(value) =>
                setValue("scriptCategory", value as any)
              }
            >
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem value="essential" id="essential" />
                  <Label htmlFor="essential" className="cursor-pointer">
                    Essential
                  </Label>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Essential for the site and any requested services to work, but
                  do not perform any additional or secondary function.
                </p>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem value="analytics" id="analytics" />
                  <Label htmlFor="analytics" className=" cursor-pointer">
                    Analytics
                  </Label>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Provide statistical information on site usage, e.g., web
                  analytics so we can improve this website over time.
                </p>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem value="functional" id="functional" />
                  <Label htmlFor="functional" className="cursor-pointer">
                    Functional
                  </Label>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Enables enhanced functionality, such as videos and live chat.
                  If you do not allow these, then some or all of these functions
                  may not work properly.
                </p>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <RadioGroupItem value="targeting" id="targeting" />
                  <Label htmlFor="targeting" className=" cursor-pointer">
                    Targeting/Advertising
                  </Label>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Provides statistical information on site usage, such as web
                  analytics, leading to website improvements over time.
                </p>
              </div>
            </RadioGroup>
          </div>

          {/* Script Type */}
          <div className="mb-6">
            <Label className=" mb-3 block">Script type</Label>
            <RadioGroup
              defaultValue="url"
              onValueChange={(value) =>
                setValue("scriptType", value as "url" | "script")
              }
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="url" id="url" />
                <Label
                  htmlFor="url"
                  className="font-normal text-gray-700 cursor-pointer"
                >
                  URL
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="script" id="script" />
                <Label
                  htmlFor="script"
                  className="font-normal text-gray-700 cursor-pointer"
                >
                  Script
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Fields based on Script Type */}
          {scriptType === "url" ? (
            <>
              {/* Load Method */}
              <div className="mb-6">
                <Label htmlFor="loadMethod" className="mb-2 block">
                  Load method
                </Label>
                <Select
                  defaultValue="defer"
                  onValueChange={(value) => setValue("loadMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defer">Defer</SelectItem>
                    <SelectItem value="async">Async</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Script URL */}
              <div className="mb-6">
                <Label htmlFor="scriptUrl" className="mb-2 block">
                  Script URL
                </Label>
                <Input
                  id="scriptUrl"
                  {...register("scriptUrl")}
                  placeholder="https://"
                  className="max-w-full"
                />
              </div>

              {/* Integrity Hashes */}
              <div className="mb-6">
                <Label className=" mb-2 block">Integrity Hashes</Label>
                <p className=" mb-3">
                  The integrity hash is a security feature used by browsers to
                  verify that the script is delivered without unexpected
                  manipulation. For any scripts that live on the checkout page,
                  at least one integrity hash is required to meet PCI 4.0 & 4.3
                  requirements. If your script is located on the checkout page,
                  please work with the script provider/host to generate a hash
                  and enter it here.
                </p>

                <div className="space-y-3">
                  {integrityHashes.map((hash, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={hash}
                        onChange={(e) => updateHash(index, e.target.value)}
                        placeholder="Enter integrity hash"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHash(index)}
                        className="shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Current input field for new hash */}
                  <div className="flex items-center gap-2">
                    <Input
                      value={currentHash}
                      onChange={(e) => setCurrentHash(e.target.value)}
                      placeholder="Enter integrity hash"
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addHash();
                        }
                      }}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addHash}
                  className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50 text-xl font-medium p-6"
                >
                  + Add hash
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Script Contents */}
              <div className="mb-6">
                <Label htmlFor="scriptContents" className="mb-2 block">
                  Script contents
                </Label>
                <div className="border rounded-md">
                  <div className="bg-gray-50 px-3 py-2 border-b">
                    <span className=" font-mono">1</span>
                  </div>
                  <Textarea
                    id="scriptContents"
                    {...register("scriptContents")}
                    placeholder="<script></script>"
                    className="min-h-[200px] border-0 rounded-none font-mono text-sm resize-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 w-full border-t p-6 bg-white flex justify-end gap-4 shadow-lg">
          <button type="button" className="btn-outline-primary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScript;
