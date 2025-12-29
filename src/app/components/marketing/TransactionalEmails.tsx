"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ellipsis, MoreVertical } from "lucide-react";

interface EmailTemplate {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const emailTemplatesData: EmailTemplate[] = [
  {
    id: "1",
    title: "Account Settings Edited",
    description: "Sent when a customer or store admin edits account settings",
    enabled: true,
  },
  {
    id: "2",
    title: "Password Reset",
    description:
      "Sent when a customer account password is reset on the customer details page or by the customer",
    enabled: false,
  },
  {
    id: "3",
    title: "Order Status Update",
    description: "Sent when the status of an an order is changed",
    enabled: true,
  },
  {
    id: "4",
    title: "Order Email",
    description: "Sent when an order is created",
    enabled: true,
  },
  {
    id: "5",
    title: "Guest Account Created",
    description:
      "Sent when a customer or store admin creates their account as a guest",
    enabled: true,
  },
  {
    id: "6",
    title: "Gift Certificate Recipient",
    description: "Sent to the recipient of a gift certificate",
    enabled: true,
  },
  {
    id: "7",
    title: "Sign-in Link Request",
    description:
      "Sent when an existing customer requests to use passwordless login while checking out",
    enabled: true,
  },
  {
    id: "8",
    title: "Order Notification",
    description:
      "The customer receives this when the store admin sends them an order message",
    enabled: true,
  },
  {
    id: "9",
    title: "Product Review Request",
    description: "Sent to customer after purchasing a product to request a review",
    enabled: true,
  },
  {
    id: "10",
    title: "Return Requested",
    description: "Sent to customer after a return has been requested",
    enabled: true,
  },
];

const TransactionalEmails = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(
    emailTemplatesData
  );
  const [selectedChannel, setSelectedChannel] = useState("global");

  const toggleTemplate = (id: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === id
          ? { ...template, enabled: !template.enabled }
          : template
      )
    );
  };

  return (
    <div className="p-10 ">
      {/* Header */}
      <div className="px-8 py-5">
        <h1  className="!font-light 2xl:!text-5xl">
          Transactional emails
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Channel Selector */}
        <div className="bg-white border rounded-sm shadow-sm p-6 mb-6">
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">
                Global (storefront defaults)
              </SelectItem>
              <SelectItem value="channel1">Channel 1</SelectItem>
              <SelectItem value="channel2">Channel 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email Templates Section */}
        <div className="bg-white border shadow-sm rounded-sm">
          {/* Section Header */}
          <div className="px-6 py-5 border-b">
            <h2 className="!font-light !text-3xl 2xl:!text-4xl">
              Email Templates
            </h2>
          </div>

          {/* Templates List */}
          <div className="divide-y">
            {templates.map((template) => (
              <div
                key={template.id}
                className="px-15 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                {/* Left Content */}
                <div className="flex-1">
                  <h3 className="!text-2xl font-normal !text-blue-600 mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 ml-4">
                  {template.enabled ? (
                    <Badge className="bg-green-600 hover:bg-green-700 !text-white px-3 py-1 text-xs font-medium">
                      ENABLED
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-600 px-3 py-1 text-xs font-medium"
                    >
                      DISABLED
                    </Badge>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                      >
                        <Ellipsis className="!h-6 !w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end"  className="w-[150px] space-y-4">
                      <DropdownMenuItem className="cursor-pointer">
                        Edit Template
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => toggleTemplate(template.id)}
                      >
                        {template.enabled ? "Disable" : "Enable"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionalEmails;