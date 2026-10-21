import { ReactNode } from "react";
import type { GeneralSection } from "../constant";
import type {
  CheckboxSettingConfig,
  ShareNetworkConfig,
  UrlStructureSectionConfig,
} from "../type";

export interface SettingsNoticeProps {
  tone?: "info" | "warning";
  children: ReactNode;
}

export interface InlineFieldRowProps {
  /** Left column label, aligned with InputField's horizontal labels */
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}

// Field component for InputField: one share network on/off tile
export interface ShareNetworkToggleProps {
  network: ShareNetworkConfig;
  value?: boolean;
  onChange?: (value: boolean) => void;
  id?: string;
}

export interface UrlStructureCardProps {
  section: UrlStructureSectionConfig;
}

// Field component for InputField: the three URL format radios
export interface UrlFormatFieldProps {
  section: UrlStructureSectionConfig;
  /** Rendered next to the "Custom" option */
  customInput: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
}

export interface CheckboxSettingsListProps {
  section: GeneralSection;
  items: CheckboxSettingConfig[];
}
