import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./StoreSettings";
import { CheckboxField } from "./StoreSettings";

// 🆕 DateTimezoneSettings Component
export const DateTimezoneSettings = ({
  settings,
  onSettingsChange,
}: {
  settings: any;
  onSettingsChange: any;
}) => {
  const updateSetting = (key: any, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  // Simplified list of timezones for UI
  const timezoneOptions = [
    { value: "pacific-gmt-8", label: "Pacific Time (US & Canada) (GMT -8:00)" },
    { value: "mountain-gmt-7", label: "Mountain Time (US & Canada) (GMT -7:00)" },
    { value: "central-gmt-6", label: "Central Time (US & Canada), Mexico City (GMT -6:00)" },
    { value: "eastern-gmt-5", label: "Eastern Time (US & Canada), Bogota, Lima (GMT -5:00)" },
    { value: "atlantic-gmt-4", label: "Atlantic Time (Canada), Caracas, La Paz (GMT -4:00)" },
    { value: "midway-gmt-11", label: "Midway Island, Samoa (GMT -11:00)" },
    { value: "hawaii-gmt-10", label: "Hawaii (GMT -10:00)" },
    { value: "alaska-gmt-9", label: "Alaska (GMT -9:00)" },
    { value: "newfoundland-gmt-3:30", label: "Newfoundland (GMT -3:30)" },
    { value: "brasilia-gmt-3", label: "Brasilia, Buenos Aires, Georgetown (GMT -3:00)" },
    { value: "midatlantic-gmt-2", label: "Mid-Atlantic (GMT -2:00)" },
    { value: "azores-gmt-1", label: "Azores, Cape Verde Islands (GMT -1:00)" },
    { value: "greenwich-gmt+0", label: "Western Europe Time, London, Lisbon, Casablanca (GMT)" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="!font-semibold mb-4">Date Settings</h2>

        <FormField label="Your Timezone">
          <Select
            value={settings.timezone}
            onValueChange={(value) => updateSetting("timezone", value)}
          >
            <SelectTrigger className="w-96">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezoneOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <CheckboxField
          label="Enable DST Correction?"
          checked={settings.enableDstCorrection}
          onCheckedChange={(checked) => updateSetting("enableDstCorrection", checked)}
          infoText="Yes, enable daylight saving time correction"
        />

        <FormField label="Display Date Format">
          <Input
            value={settings.displayDateFormat}
            onChange={(e) => updateSetting("displayDateFormat", e.target.value)}
            className="w-64"
          />
        </FormField>

        <FormField label="Extended Display Date Format">
          <Input
            value={settings.extendedDisplayDateFormat}
            onChange={(e) => updateSetting("extendedDisplayDateFormat", e.target.value)}
            className="w-64"
          />
        </FormField>
      </div>
    </div>
  );
};