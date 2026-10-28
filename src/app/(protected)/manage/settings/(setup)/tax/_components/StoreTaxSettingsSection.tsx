import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import SettingsCard from "@/components/SettingsCard/SettingsCard";
import { STORE_TAX_SETTINGS_ROUTE } from "../constant";
import { StoreTaxSettingsSectionProps } from "./type";

const StoreTaxSettingsSection = ({
  settings,
}: StoreTaxSettingsSectionProps) => (
  <SettingsCard
    title="Store tax settings"
    titleClassName="text-[2.2rem]! font-semibold! text-text-heading!"
    action={
      <Button asChild variant="outline">
        <Link href={STORE_TAX_SETTINGS_ROUTE}>Edit</Link>
      </Button>
    }
    className="border-0 shadow-sm"
  >
    <ListRenderer
      data={settings}
      keyExtractor={(setting) => setting.key}
      className="grid! grid-cols-1 gap-6 space-y-0! md:grid-cols-2"
      renderItem={(setting) => (
        <div className="flex h-full flex-col gap-3 rounded-sm bg-slate-100 px-6 py-7">
          <h3 className="text-[1.8rem]! font-semibold text-text-heading!">
            {setting.title}
          </h3>
          <p className="text-[1.4rem]! text-text-heading!">
            {setting.description}
          </p>
        </div>
      )}
    />
  </SettingsCard>
);

export default StoreTaxSettingsSection;
