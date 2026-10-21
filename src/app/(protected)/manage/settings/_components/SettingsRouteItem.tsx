import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SettingRoute } from "../types";

const SettingsRouteItem = ({ route }: { route: SettingRoute }) => {
  return (
    <Link
      href={`/manage/settings/${route.id}`}
      className="group grid grid-cols-1 gap-1 px-[1.6rem] py-[1.2rem] border-b border-gray-200
      hover:bg-gray-50 transition-colors
      md:grid-cols-[29rem_1fr_auto] md:items-center md:gap-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-black! text-[1.5rem]! 2xl:text-[1.6rem]! font-semibold!">
          {route.title}
        </span>

        {route.isNew && (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 !text-[1.1rem] font-medium px-2 py-0.5"
          >
            NEW
          </Badge>
        )}
      </div>

      <p className="text-[1.5rem]! 2xl:text-[1.6rem]! text-gray-500!">
        {route.description}
      </p>

      <ChevronRight className="hidden md:block w-[1.8rem] h-[1.8rem] text-black" />
    </Link>
  );
};

export default SettingsRouteItem;
