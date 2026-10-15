"use client";

import { useState } from "react";
import {
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Printer,
  ThumbsUp,
  Pin,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShareId =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "pinterest"
  | "facebook-like"
  | "email"
  | "print";

const SHARE_CONFIG: {
  id: ShareId;
  icon: typeof Facebook;
  color: string;
  iconOnly?: boolean;
}[] = [
  { id: "facebook", icon: Facebook, color: "bg-[#1877F2]" },
  { id: "twitter", icon: Twitter, color: "bg-[#1DA1F2]" },
  { id: "linkedin", icon: Linkedin, color: "bg-[#0A66C2]" },
  { id: "pinterest", icon: Pin, color: "bg-[#E60023]" },
  {
    id: "facebook-like",
    icon: ThumbsUp,
    color: "text-[#1877F2]",
    iconOnly: true,
  },
  { id: "email", icon: Mail, color: "bg-slate-500" },
  { id: "print", icon: Printer, color: "bg-slate-500" },
];

export const SocialSharingSettings = ({ control }: { control?: any }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [poweredByLink, setPoweredByLink] = useState(true);
  const [active, setActive] = useState<Record<ShareId, boolean>>({
    facebook: true,
    twitter: true,
    linkedin: true,
    pinterest: true,
    "facebook-like": false,
    email: true,
    print: true,
  });

  const toggle = (id: ShareId) => {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-sm border border-gray-200 p-6">
      <h2 className="!font-semibold mb-4 text-xl 2xl:!text-[2.4rem]">
        Social Sharing Settings
      </h2>

      <p className="text-sm text-gray-600 mb-6 2xl:!text-xl">
        Share controls are displayed on product pages and blog posts.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Share buttons */}
        <div className="flex-1">
          {/* Row 1 */}
          <div className="flex gap-3 max-w-md">
            {SHARE_CONFIG.slice(0, 4).map((btn) => {
              const Icon = btn.icon;
              const isActive = active[btn.id];
              return (
                <div
                  key={btn.id}
                  //   type="button"
                  onClick={() => toggle(btn.id)}
                  className={cn(
                    `w-20 h-20 flex items-center justify-center cursor-pointer text-white transition-colors ${
                      isActive ? btn.color : "bg-gray-300"
                    }`,
                  )}
                >
                  <Icon className="w-10 h-10" />
                </div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="flex gap-3 mt-3 max-w-md items-end">
            {SHARE_CONFIG.slice(4).map((btn) => {
              const Icon = btn.icon;
              const isActive = active[btn.id];
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => toggle(btn.id)}
                  className={`w-20 h-20 flex items-center justify-center transition-colors ${
                    btn.iconOnly
                      ? isActive
                        ? btn.color
                        : "text-gray-400"
                      : isActive
                        ? `${btn.color} text-white`
                        : "bg-gray-300 text-white"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                </button>
              );
            })}
          </div>

          {/* More options */}
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className="mt-6 flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                moreOpen ? "rotate-90" : ""
              }`}
            />
            More options
          </button>

          {moreOpen && (
            <div className="mt-4 pl-5">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  &apos;Powered by Bigcommerce&apos; link in eBay store
                </span>
                <Switch
                  checked={poweredByLink}
                  onCheckedChange={setPoweredByLink}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
