"use client";

import React, { useState } from "react";



import { Badge } from "@/components/ui/Badge";
import { Ellipsis } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { EmailTemplate } from "./types";
import { ChannelOptions, emailTemplatesData } from "./constant";

import SelectField from "@/components/form/fields/SelectField";
import { Button } from "@/components/ui/Button";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import ActionButton from "@/components/ActionButton/ActionButton";
import { ActionEnums } from "@/const/appConstants";

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
          <ListRenderer
            data={templates}
            keyExtractor={(template) => template.id}
            className="divide-y"
            renderItem={(template) => (
              <div className="px-15 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h3 className="text-2xl! font-normal text-blue-600! mb-1">
                    {template.title}
                  </h3>
                  <p className="text-[12px] text-gray-600">
                    {template.description}
                  </p>
                </div>

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

                  <ActionButton
                    data={template}
                    actions={[
                      { type: ActionEnums.EDIT, label: "Edit Template" },
                      {
                        type: "toggle" as ActionEnums,
                        label: template.enabled ? "Disable" : "Enable",
                      },
                    ]}
                    onAction={(item) => (action) => {
                      if (action === ActionEnums.EDIT) {
                        // edit
                      } else {
                        toggleTemplate(item.id);
                      }
                    }}
                    contentClassName="w-[150px]"
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
