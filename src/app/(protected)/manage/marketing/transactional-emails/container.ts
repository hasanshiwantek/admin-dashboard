"use client";

import { useState } from "react";
import { ActionEnums } from "@/const/appConstants";
import { EmailTemplate } from "./types";
import { emailTemplatesData } from "./constant";

const useTransactionalEmailsContainer = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(emailTemplatesData);
  const [selectedChannel, setSelectedChannel] = useState("global");

  const toggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === id
          ? { ...template, enabled: !template.enabled }
          : template,
      ),
    );
  };

const handleAction = (template: EmailTemplate) => (action: ActionEnums) => {
  switch (action) {
    case ActionEnums.EDIT:
      break;
    case ActionEnums.DISABLE:
    case ActionEnums.ENABLE:
      toggleTemplate(template.id);
      break;
  }
};

  return {
    templates,
    selectedChannel,
    setSelectedChannel,
    toggleTemplate,
    handleAction,
  };
};

export default useTransactionalEmailsContainer;