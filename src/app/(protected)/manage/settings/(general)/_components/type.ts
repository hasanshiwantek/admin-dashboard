import { ReactNode } from "react";
import type { GeneralSection } from "../constant";
import type {
  CheckboxSettingConfig,
  ShareNetworkConfig,
  UrlStructureSectionConfig,
} from "../type";

export interface InlineFieldRowProps {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface ShareNetworkToggleProps {
  network: ShareNetworkConfig;
  value?: boolean;
  onChange?: (value: boolean) => void;
  id?: string;
}

export interface UrlStructureCardProps {
  section: UrlStructureSectionConfig;
}

export interface UrlFormatFieldProps {
  section: UrlStructureSectionConfig;
  customInput: ReactNode;
  action?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
}

export interface CheckboxSettingsListProps {
  section: GeneralSection;
  items: CheckboxSettingConfig[];
}
