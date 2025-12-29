"use client";
import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StoreSettings } from "./StoreSettings";
const SettingsPage = () => {
//   const setupItems = [
//     {
//       title: "Store profile",
//       description: "Basic information about your business",
//     },
//     {
//       title: "Currencies",
//       description:
//         "Currencies customers will see and be charged in at your store",
//     },
//     {
//       title: "Payments",
//       description:
//         "Payment methods for the currencies you support in your store",
//     },
//     {
//       title: "Locations",
//       description:
//         "Locations represent the physical places where you stock inventory",
//     },
//     {
//       title: "Pick up methods",
//       description:
//         "Create and edit in-person pick up methods for online orders.",
//     },
//     {
//       title: "Shipping",
//       description:
//         "Store's origin address, shipping zones, and shipping services",
//     },
//     {
//       title: "Tax",
//       description: "Your own tax rules and recommended services",
//     },
//   ];

  const generalItems = [
    {
      id: "website",
      title: "Website",
      description:
        "Physical dimension settings, search engine optimization, HTTPS, search engine robots",
    },
    {
      id: "display",
      title: "Display",
      description:
        "Settings related to displaying products, categories, control panel etc.",
    },
    {
      id: "share",
      title: "Share",
      description: "Social sharing settings on product pages and blog posts",
    },
    {
      id: "date-timezone",
      title: "Date & Timezone",
      description: "Timezone, DST correction, display date format",
    },
    {
      id: "url-structure",
      title: "URL structure",
      description: "Product, category and web pages URL settings",
    },
    {
      id: "search",
      title: "Search",
      description: "Default product sort, default content sort, search logic",
      isNew: true,
    },
    {
      id: "security",
      title: "Security & Privacy",
      description:
        "Security & privacy settings for storefront and control panel",
    },
    {
      id: "misc",
      title: "Miscellaneous",
      description:
        "Email settings, advanced store settings, order settings, throttler",
    },
  ];

 const SettingsItem = ({ item, onClick }: { item: any; onClick: any }) => (
  <div
    onClick={() => onClick(item)}
    className="
      grid grid-cols-1 gap-3 py-4 border-b border-gray-200
      hover:bg-gray-50 cursor-pointer transition-colors
      md:grid-cols-[auto_1fr_auto] md:items-center
    "
  >
    {/* Left: Title + Badge */}
    <div className="flex items-center gap-2">
      <h2 className="!text-black !font-bold 2xl:!text-[1.6rem]">
        {item?.title}
      </h2>

      {item?.isNew && (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5"
        >
          NEW
        </Badge>
      )}
    </div>

    {/* Center: Description (SCREEN CENTER) */}
    <div className="text-left md:text-center">
      <p className="text-gray-600 2xl:!text-[1.6rem]">
        {item?.description}
      </p>
    </div>

    {/* Right: Arrow */}
    <div className="justify-self-end">
      <ChevronRight className="w-8 h-8 text-gray-400" />
    </div>
  </div>
);



  const [currentView, setCurrentView] = useState("main");
  const [currentSetting, setCurrentSetting] = useState<any>(null);

  const handleSettingClick = (item: any) => {
    setCurrentSetting(item);
    setCurrentView("detail");
  };

  const handleBack = () => {
    setCurrentView("main");
    setCurrentSetting(null);
  };

  return (
    <div className="min-h-screen  p-8">
      {currentView === "main" ? (
        <div className="">
          <h1 className=" mb-6 !font-extralight 2xl:!text-[3.2rem]">Settings</h1>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-white border-gray-300 !w-full !max-w-full"
            />
          </div>

          {/* <Card className="mb-6 bg-white shadow-sm">
       <div className="p-6">
         <h1 className="!font-semibold mb-4">Setup</h1>
            <div className="divide-y divide-gray-200">
           {setupItems.map((item, index) => (
                <SettingsItem
               key={index}
               title={item.title}
               description={item.description}
             />
           ))}
         </div>
       </div>
     </Card> */}

          <Card className="bg-white shadow-sm">
            <div className="p-6">
              <h1 className="!font-semibold  mb-4 2xl:!text-[2.4rem]">General</h1>
              <div className="divide-y divide-gray-200">
                {generalItems.map((item) => (
                  <SettingsItem
                    key={item.id}
                    item={item}
                    onClick={handleSettingClick}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <StoreSettings
          currentSetting={currentSetting}
          onBack={handleBack}
          initialTab={currentSetting?.id}
        />
      )}
    </div>
  );
};

export default SettingsPage;
