"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/Badge";
import { Ellipsis } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { EmailTemplate } from "./types";
import { ChannelOptions, emailTemplatesData } from "./constant";

import SelectField from "@/components/form/fields/SelectField";
import { Button } from "@/components/ui/Button";

const Page = () => {
  const [templates, setTemplates] =
    useState<EmailTemplate[]>(emailTemplatesData);
  const [selectedChannel, setSelectedChannel] = useState("global");

  const toggleTemplate = (id: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === id
          ? { ...template, enabled: !template.enabled }
          : template,
      ),
    );
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="px-8 py-5">
        <PageTitle
          title="Transactional emails"
          titleClassName="font-light! 2xl:text-5xl!"
          hideActionButton
        />
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Channel Selector */}
        <div className="bg-white border rounded-sm shadow-sm p-6 mb-6">
          <SelectField
            options={ChannelOptions}
            value={selectedChannel}
            onChange={(value) => setSelectedChannel(value)}
            placeholder="Select channel"
          />
        </div>

        {/* Email Templates Section */}
        <div className="bg-white border shadow-sm rounded-sm">
          {/* Section Header */}
          <div className="px-6 py-5 border-b">
            <PageTitle
              title="Email Templates"
              titleClassName="font-light! text-3xl! 2xl:!text-4xl"
              hideActionButton
            />
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
                  <h3 className="text-2xl! font-normal text-blue-600! mb-1">
                    {template.title}
                  </h3>
                  <p className="text-[12px] text-gray-600">
                    {template.description}
                  </p>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 ml-4">
                  {template.enabled ? (
                    <Badge className="bg-green-600 hover:bg-green-700 text-white! px-3 py-1 text-[10px] font-medium">
                      ENABLED
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-600 px-3 py-1 text-[10px] font-medium"
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
                    <DropdownMenuContent
                      align="end"
                      className="w-[150px] space-y-4"
                    >
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

export default Page;
