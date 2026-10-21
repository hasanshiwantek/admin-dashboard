import type { AccessRule } from "@/utils/access";

export interface SettingRoute extends AccessRule {
  id: string;
  title: string;
  description: string;
  isNew?: boolean;
}

export interface SettingGroup extends AccessRule {
  group: string;
  routes: SettingRoute[];
}
