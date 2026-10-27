import { ListRenderer } from "@/components/ListRenderer.tsx/ListRenderer";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { relatedSettings } from "../constant";

const RelatedSettingsSection = () => (
  <section className="flex flex-col gap-5">
    <h2 className="text-[1.8rem]! font-semibold! text-text-heading">
      Related Settings
    </h2>
    <ListRenderer
      data={relatedSettings}
      keyExtractor={(setting) => setting.title}
      className="grid grid-cols-1 gap-5 space-y-0! sm:grid-cols-2 xl:grid-cols-4"
      renderItem={(setting) => (
        <Link
          href={setting.href}
          className="flex h-full flex-col gap-3 rounded-sm bg-white p-8 shadow-sm transition-colors hover:bg-gray-50"
        >
          <span className="flex items-center justify-between text-[2rem] font-light text-text-heading">
            {setting.title}
            <ChevronRight className="size-8 text-gray-500" />
          </span>
          <span className="text-[1.4rem] text-gray-600">
            {setting.description}
          </span>
        </Link>
      )}
    />
  </section>
);

export default RelatedSettingsSection;
