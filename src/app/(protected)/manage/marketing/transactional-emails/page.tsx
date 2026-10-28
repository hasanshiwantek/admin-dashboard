"use client";

import { Badge } from "@/components/ui/Badge";
import PageTitle from "@/components/ui/PageTitle";
import { ChannelOptions } from "./constant";
import SelectField from "@/components/form/fields/SelectField";
import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import ActionButton from "@/components/ActionButton/ActionButton";
import { ActionEnums } from "@/const/appConstants";
import useTransactionalEmailsContainer from "./container";

const Page = () => {
  const {
    templates,
    selectedChannel,
    setSelectedChannel,
    handleAction,
  } = useTransactionalEmailsContainer();

  return (
    <div className="p-10">
      <div className="px-8 py-5">
        <PageTitle
          title="Transactional emails"
          titleClassName="font-light! 2xl:text-5xl!"
          hideActionButton
        />
      </div>

      <div className="p-8">
        <div className="bg-white border rounded-sm shadow-sm p-6 mb-6">
          <SelectField
            options={ChannelOptions}
            value={selectedChannel}
            onChange={(value) => setSelectedChannel(value)}
            placeholder="Select channel"
          />
        </div>

        <div className="bg-white border shadow-sm rounded-sm">
          <div className="px-6 py-5 border-b">
            <PageTitle
              title="Email Templates"
              titleClassName="font-light! text-3xl! 2xl:!text-4xl"
              hideActionButton
            />
          </div>

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
                    onAction={handleAction}
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