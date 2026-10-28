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
    if (action === ActionEnums.EDIT) {
      // edit logic
    } else {
      toggleTemplate(template.id);
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